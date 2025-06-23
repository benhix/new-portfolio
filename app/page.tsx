// app/page.tsx
import React from 'react';
import Hero from '@/app/components/Hero';
import About from '@/app/components/About';
import CaseStudies from '@/app/components/CaseStudies';
import Projects from '@/app/components/Projects';

const Home = () => {
  return (
    <main className="w-full">
      <Hero />
      <About />
      <CaseStudies />
      <Projects />
      {/* Placeholder for a Footer component */}
    </main>
  );
};

export default Home;