
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Director from '../components/Director';
import Footer from '../components/Footer';

const DirectorPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <Director />
      <Footer />
    </>
  );
};

export default DirectorPage;
