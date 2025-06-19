import React from 'react';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import BenefitsSection from '../components/BenefitsSection';
import ContactSection from '../components/ContactSection';
import AboutSection from '../components/AboutSection';
import TestimonialsSection from '../components/TestimonialsSection';
import TeamSection from '../components/TeamSection';
import InsightsSection from '../components/InsightsSection';


const Home = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <BenefitsSection />
      <TestimonialsSection />
      <TeamSection />
      <InsightsSection />
      <ContactSection />
    </div>
  );
};

export default Home;