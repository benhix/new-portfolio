// app/page.tsx
import React from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';

const Home = () => {
  return (
    <main className="flex flex-col items-center">
      <Hero />
      <About />
      <Projects />
      {/* Placeholder for a Footer component */}
      {/* Dark mode toggle will be added later, likely in a Layout component or Navbar */}
    </main>
  );
};

export default Home;