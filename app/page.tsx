// app/page.tsx
import React from 'react';
import Hero from '@/app/components/Hero';
import About from '@/app/components/About';
import CaseStudies from '@/app/components/CaseStudies';
import Projects from '@/app/components/Projects';
import CallToAction from '@/app/components/CallToAction';

const Home = () => {
  return (
    <main className="w-full">
      <Hero />
      <div className="section-divider" />
      <About />
      <div className="section-divider" />
      <CaseStudies />
      <div className="section-divider" />
      <Projects />
      <div className="section-divider" />
      <CallToAction />
      {/* Placeholder for a Footer component */}
    </main>
  );
};

export default Home;