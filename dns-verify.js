
#!/usr/bin/env node

const dns = require('dns');
const { promisify } = require('util');
const readline = require('readline');

// Promisify DNS methods
const lookupPromise = promisify(dns.lookup);
const resolveMx = promisify(dns.resolveMx);
const resolveTxt = promisify(dns.resolveTxt);
const resolve4 = promisify(dns.resolve4);
const resolve = promisify(dns.resolve);

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Ask question helper
const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function checkDNS() {
  console.log('\n=== DNS Verification Tool ===');
  console.log('This tool will check the DNS configuration for your domain\n');

  try {
    // Get domain from user
    const domain = await question('Enter your domain (e.g., mefirstgroup.co.za): ');
    console.log(`\nChecking DNS configuration for ${domain}...\n`);

    // Check A record
    console.log('Checking A record (domain → IP)...');
    try {
      const aRecords = await resolve4(domain);
      console.log('✅ A record found:', aRecords.join(', '));
    } catch (error) {
      console.log('❌ No A record found. Your domain may not be pointing to a server.');
    }

    // Check CNAME for www
    console.log('\nChecking www subdomain...');
    try {
      const wwwRecords = await resolve(`www.${domain}`);
      console.log(`✅ www.${domain} resolves to:`, wwwRecords.join(', '));
    } catch (error) {
      console.log(`❌ www.${domain} does not resolve. CNAME record may be missing.`);
    }

    // Check MX records
    console.log('\nChecking MX records (for email)...');
    try {
      const mxRecords = await resolveMx(domain);
      console.log('✅ MX records found:');
      mxRecords.forEach(record => {
        console.log(`   Priority: ${record.priority}, Exchange: ${record.exchange}`);
      });
    } catch (error) {
      console.log('❓ No MX records found. This is only an issue if you need email for this domain.');
    }

    // Check TXT records (SPF, DKIM, etc.)
    console.log('\nChecking TXT records (SPF, DKIM, etc.)...');
    try {
      const txtRecords = await resolveTxt(domain);
      console.log('✅ TXT records found:');
      txtRecords.forEach(record => {
        console.log(`   ${record.join('')}`);
      });
    } catch (error) {
      console.log('❓ No TXT records found. This is only an issue if you need email authentication.');
    }

    console.log('\n=== DNS Verification Summary ===');
    console.log('If any checks failed, please refer to the dns-configuration.html file for guidance on setting up your DNS records correctly.');
    console.log('Remember that DNS changes can take up to 48 hours to fully propagate, though often much faster.');

  } catch (error) {
    console.error('\nAn error occurred during DNS verification:', error.message);
  } finally {
    rl.close();
  }
}

checkDNS();

console.log('\nTo run this verification again, use: node dns-verify.js');
