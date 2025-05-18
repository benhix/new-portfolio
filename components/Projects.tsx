// components/Projects.tsx
'use client'; // Add this for components with client-side interactivity like useState

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Project {
  id: number;
  title: string;
  description: string;
  category: 'JS/TS' | 'Python' | 'C++'; // Define the categories
  imageUrl: string;
  demoUrl: string;
  // Add other project properties here, like imageUrl, projectUrl, repoUrl, technologies, etc.
}

// Enhanced project card component with image and demo button
const ProjectCard = ({ title, description, imageUrl, demoUrl }: { 
  title: string, 
  description: string,
  imageUrl: string,
  demoUrl: string 
}) => (
  <div className="bg-card rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
    {/* Image Container */}
    <div className="w-full h-48 relative">
      <Image 
        src={imageUrl} 
        alt={`${title} project screenshot`}
        fill
        className="object-cover"
      />
    </div>
    
    {/* Content */}
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-3 text-card-foreground">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      
      {/* Demo Button */}
      <Link href={demoUrl} target="_blank" rel="noopener noreferrer">
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors">
          View Demo
        </button>
      </Link>
    </div>
  </div>
);

const Projects = () => {
  const [activeTab, setActiveTab] = useState<'JS/TS' | 'Python' | 'C++'>('JS/TS');

  const allProjects: Project[] = [
    // JS/TS Projects
    { 
      id: 1, 
      title: "E-commerce Platform", 
      description: "A full-stack e-commerce site built with Next.js, TypeScript, and Stripe integration.", 
      category: "JS/TS",
      imageUrl: "/project-images/ecommerce.jpg", // Replace with actual path
      demoUrl: "https://ecommerce-demo.example.com"
    },
    { 
      id: 2, 
      title: "Mandarin Dictionary", 
      description: "A custom dictionary used to store new words and phrases in Mandarin. AI integration allows for character and pronunciation feedback.", 
      category: "JS/TS",
      imageUrl: "/mandarin.png", 
      demoUrl: "https://dashboard-demo.example.com"
    },
    { 
      id: 3, 
      title: "Portfolio Website v2", 
      description: "This very portfolio, built with Next.js and Tailwind CSS.", 
      category: "JS/TS",
      imageUrl: "/project-images/portfolio.jpg",
      demoUrl: "https://portfolio-demo.example.com"
    },

    // Python Projects
    { 
      id: 4, 
      title: "AI Chatbot", 
      description: "A machine learning chatbot using TensorFlow and Flask.", 
      category: "Python",
      imageUrl: "/project-images/chatbot.jpg",
      demoUrl: "https://chatbot-demo.example.com"
    },
    { 
      id: 5, 
      title: "Web Scraper Tool", 
      description: "A Python script for extracting data from various websites using BeautifulSoup and Scrapy.", 
      category: "Python",
      imageUrl: "/project-images/scraper.jpg",
      demoUrl: "https://scraper-demo.example.com"
    },
    { 
      id: 6, 
      title: "Data Analysis Suite", 
      description: "A collection of scripts for data processing and analysis with Pandas and NumPy.", 
      category: "Python",
      imageUrl: "/project-images/data-analysis.jpg",
      demoUrl: "https://data-analysis-demo.example.com"
    },

    // C++ Projects
    { 
      id: 7, 
      title: "Game Engine Core", 
      description: "A foundational 2D game engine developed with C++ and SDL.", 
      category: "C++",
      imageUrl: "/project-images/game-engine.jpg",
      demoUrl: "https://game-engine-demo.example.com"
    },
    { 
      id: 8, 
      title: "Operating System Simulator", 
      description: "A simulator for basic OS concepts like scheduling and memory management.", 
      category: "C++",
      imageUrl: "/project-images/os-simulator.jpg",
      demoUrl: "https://os-simulator-demo.example.com"
    },
  ];

  const filteredProjects = allProjects.filter(project => project.category === activeTab);
  const categories: ('JS/TS' | 'Python' | 'C++')[] = ['JS/TS', 'Python', 'C++'];

  return (
    <section id="projects" className="min-h-screen py-20 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">My Projects</h2>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12 space-x-2 md:space-x-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-medium rounded-md transition-all duration-300 ease-in-out
                ${activeTab === category 
                  ? 'bg-primary text-primary-foreground shadow-lg scale-105' 
                  : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <ProjectCard 
                key={project.id} 
                title={project.title} 
                description={project.description} 
                imageUrl={project.imageUrl}
                demoUrl={project.demoUrl}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-xl">
            No projects found in this category yet. Stay tuned!
          </p>
        )}
      </div>
    </section>
  );
};

export default Projects;