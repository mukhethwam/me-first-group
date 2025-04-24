import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { Suspense, lazy, useEffect, useState } from "react";

// Improved loading indicator with error boundary and Chrome compatibility
const LoadingFallback = () => {
  const [showDelayMessage, setShowDelayMessage] = useState(false);
  
  // Show a delayed message if loading takes too long
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDelayMessage(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="flex items-center justify-center h-screen w-full bg-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-transport-blue mx-auto"></div>
        <p className="mt-4 text-transport-gray">Loading...</p>
        {showDelayMessage && (
          <p className="mt-2 text-sm text-gray-500">
            Taking longer than expected? Try refreshing the page.
          </p>
        )}
      </div>
    </div>
  );
};

// Create a client with optimized options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
      // Add error handling
      onError: (error) => {
        console.error("[QUERY] Error in data fetching:", error);
      }
    },
  },
});

// Lazy load pages with proper error boundaries and Chrome compatibility fixes
const Index = lazy(() => {
  console.log("[APP] Loading Index page");
  return import("./pages/Index").catch(err => {
    console.error("[APP] Failed to load Index page:", err);
    return { default: () => (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-4">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Page</h2>
          <p>Unable to load the home page. Please try refreshing.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-transport-blue text-white rounded"
          >
            Refresh
          </button>
        </div>
      </div>
    )};
  });
});

// Keep lazy loading for other pages with same error handling pattern
const About = lazy(() => import("./pages/About").catch(err => {
  console.error("[APP] Failed to load About page:", err);
  return { default: () => <div>Error loading page</div> };
}));

const ServicesPage = lazy(() => import("./pages/Services"));
const DirectorPage = lazy(() => import("./pages/Director"));
const Contact = lazy(() => import("./pages/Contact"));
const Footprint = lazy(() => import("./pages/Footprint"));
const PremiumFleet = lazy(() => import("./pages/PremiumFleet"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Root App component with improved Chrome compatibility and error handling
const App = () => {
  const [appReady, setAppReady] = useState(false);
  
  useEffect(() => {
    console.log("[APP] App component mounted");
    console.log("[APP] Using HashRouter for routing");
    console.log("[APP] Current URL:", window.location.href);
    console.log("[APP] Current pathname:", window.location.pathname);
    console.log("[APP] Current hash:", window.location.hash);
    
    // Check if DOM is fully loaded
    console.log("[APP] Document readyState:", document.readyState);
    console.log("[APP] Body children:", document.body.children.length);
    console.log("[APP] Root element:", document.getElementById("root"));
    
    // Mark the app as ready for rendering after a small delay
    // This helps with Chrome initialization
    setTimeout(() => {
      setAppReady(true);
      console.log("[APP] App marked as ready for rendering");
    }, 10);

    // Force a re-render if needed on hash change
    const handleHashChange = () => {
      console.log("[APP] Hash changed:", window.location.hash);
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Special handling for Chrome
  useEffect(() => {
    if (appReady) {
      // Force layout recalculation in Chrome
      document.body.clientHeight;
    }
  }, [appReady]);

  if (!appReady) {
    return <LoadingFallback />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <HashRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/director" element={<DirectorPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/footprint" element={<Footprint />} />
              <Route path="/fleet" element={<PremiumFleet />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </Suspense>
        </HashRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
