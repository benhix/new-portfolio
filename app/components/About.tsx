// components/About.tsx
import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-14">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-base mb-6">
            As a software engineer, I leverage a versatile skill set that spans from high-level web applications to low-level systems programming. My foundation in full-stack development with <strong>React, Next.js, and TypeScript</strong> is complemented by deep experience in <strong>Python</strong> for machine learning and <strong>C++</strong> for real-time data processing. This combination allows me to build robust, end-to-end solutions tailored for performance and reliability.
          </p>
          <p className="text-base">
            I am driven by the challenge of creating software for high-stakes environments, particularly in the defence and simulation sectors, where clarity and precision are paramount. I thrive on engineering that solves concrete problems and am constantly expanding my toolkit to build more efficient and resilient systems.
          </p>
          {/* Placeholder for skills or more detailed bio */}
        </div>
      </div>
    </section>
  );
};

export default About;