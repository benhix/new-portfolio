// components/About.tsx
import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-14">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-base mb-6">
          I’m a full-stack software developer with three years of experience delivering <strong>end-to-end web applications</strong>, from planning and architecture through to deployment and optimisation. My core expertise is in <strong>React, Next.js, TypeScript</strong>, and modern backend development with <strong>Node.js, Express, and MongoDB</strong>. I also work across mobile platforms with <strong>React Native and SwiftUI</strong>, and use <strong>Python</strong> for automation and data-driven features.
          </p>
          <p className="text-base mb-6">
          I build systems that emphasise clean code, performance, and practical problem-solving. My work ranges from e-commerce platforms with secure payments and CRM automation to internal dashboards, API-driven applications, and production-ready mobile apps. I’m comfortable owning the full development lifecycle, integrating third-party services, and designing intuitive user experiences.
          </p>
          <p className="text-base">
          I enjoy creating software that is reliable, efficient and easy to maintain, and I’m always refining my skills to deliver faster, more scalable solutions.
          </p>

        </div>
      </div>
    </section>
  );
};

export default About;