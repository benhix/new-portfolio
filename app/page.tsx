// app/page.tsx
import React from 'react';
import Hero from '@/app/components/Hero';
import About from '@/app/components/About';
import CaseStudies from '@/app/components/CaseStudies';
import Projects from '@/app/components/Projects';
import CallToAction from '@/app/components/CallToAction';
import ScrollReveal from '@/components/ScrollReveal';

const Home = () => {
  return (
    <main className="w-full">
      <Hero />
      <div className="section-divider" />
      <ScrollReveal direction="up" delay={100}>
        <About />
      </ScrollReveal>
      <div className="section-divider" />
      <ScrollReveal direction="up" delay={200}>
        <Projects />
      </ScrollReveal>
      <div className="section-divider" />
      <ScrollReveal direction="up" delay={300}>
        <CaseStudies />
      </ScrollReveal>
      <div className="section-divider" />
      <ScrollReveal direction="up" delay={400}>
        <CallToAction />
      </ScrollReveal>
      {/* Placeholder for a Footer component */}
    </main>
  );
};

export default Home;