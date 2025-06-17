// app/page.tsx
import React from 'react';
import Hero from '@/app/components/Hero';
import About from '@/app/components/About';
import CaseStudies from '@/app/components/CaseStudies';
import Projects from '@/app/components/Projects';

const Home = () => {
  return (
    <main className="flex flex-col items-center">
      <Hero />
      <About />
      <CaseStudies />
      <Projects />
      {/* Placeholder for a Footer component */}
      {/* Dark mode toggle will be added later, likely in a Layout component or Navbar */}
    </main>
  );
};

export default Home;