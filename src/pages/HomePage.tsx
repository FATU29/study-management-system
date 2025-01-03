import React, { useEffect, useState } from 'react';
import Footer from "../components/Home/Footer";
import Header from "../components/Home/Header";
import Carousel from "../components/Home/Carousel";
import Feature from "../components/Home/Feature";
import MembersGrid from '../components/Home/MembersGrid';
import Welcome from '../components/Home/Welcome';
import ThemeToggle from "../components/utils/toggleTheme";
import Snowfall from 'react-snowfall';

const HomePage = () => {
  const [isScrolledOut, setIsScrolledOut] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const welcomeSection = document.getElementById('welcome-section');
      if (welcomeSection) {
        const rect = welcomeSection.getBoundingClientRect();
        setIsScrolledOut(rect.bottom < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <Snowfall />
      <Header isScrolledOut={isScrolledOut} />
      <div id="welcome-section">
        <Welcome />
      </div>
      <div id="carousel-section">
        <div style={{ paddingTop: '3rem' }}></div>
        <Carousel />
      </div>
      <div id="feature-section">
        <div style={{ paddingTop: '3rem' }}></div>
        <Feature />
      </div>
      <div id="members-section">
        <div style={{ paddingTop: '3rem' }}></div>
        <MembersGrid />
      </div>
      <div id="footer-section">
      <Footer />
      </div>
      
    </div>
  );
};

export default HomePage;
