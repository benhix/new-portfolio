// components/About.tsx
import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg mb-6">
          I&apos;m a software engineer based in Adelaide with a strong background in front-end and full-stack web development (React, Next.js, TypeScript). 
          Recently, I&apos;ve been transitioning into more technical and systems-focused work — including machine learning with Python, real-time data processing in C++, and secure backend tooling. 
          I&apos;m particularly passionate about software used in high-stakes environments like defence and simulation systems.


          </p>
          <p className="text-lg">
          I value performance, clarity, and engineering that actually solves problems — and I love learning tools that help me build better systems.
          </p>
          {/* Placeholder for skills or more detailed bio */}
        </div>
      </div>
    </section>
  );
};

export default About;