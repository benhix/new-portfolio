// components/Projects.tsx
'use client'; // Add this for components with client-side interactivity like useState

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import Project interface and data
import { type Project, allProjects } from '@/data/projectData'; // Adjusted import path
import ProjectModal from './ProjectModal'; // Import the new modal component

// Enhanced project card component
const ProjectCard = ({ 
  project,
  onShowDetails
}: { 
  project: Project,
  onShowDetails: (project: Project) => void // New prop to trigger modal
}) => {
  return (
    <div className="bg-card rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
      <div className="w-full h-48 relative">
        <Image 
          src={project.imageUrl || "/placeholder.png"} // Fallback image
          alt={`${project.title} project screenshot`}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-semibold mb-2 text-card-foreground">{project.title}</h3>
        <p className="text-sm text-muted-foreground mb-3">Tech Stack: {project.stack.join(' • ')}</p>
        <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>
        
        <div className="flex space-x-4 mb-4">
          {project.demoUrl && (
            <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors text-sm">
                View Demo
              </button>
            </Link>
          )}
          {project.githubUrl && (
            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <button className="border border-primary text-primary px-4 py-2 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors text-sm">
                GitHub
              </button>
            </Link>
          )}
        </div>

        <button
          onClick={() => onShowDetails(project)} // Call onShowDetails with the project data
          className="text-sm text-accent-foreground hover:underline mt-auto pt-2"
        >
          View Technical Summary
        </button>
      </div>
    </div>
  );
};

const Projects = () => {
  const [activeTab, setActiveTab] = useState<'JS/TS' | 'Python' | 'C++'>('JS/TS');
  // State to manage the currently selected project for the modal
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<Project | null>(null);

  const filteredProjects = allProjects.filter(project => project.category === activeTab);
  const categories: ('JS/TS' | 'Python' | 'C++')[] = ['JS/TS', 'Python', 'C++'];

  const handleShowDetails = (project: Project) => {
    setSelectedProjectForModal(project);
  };

  const handleCloseModal = () => {
    setSelectedProjectForModal(null);
  };

  return (
    <> {/* Use Fragment to return multiple top-level elements */}
      <section id="projects" className="min-h-screen py-16 md:py-20 bg-background text-foreground">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 font-space-grotesk">My Projects</h2>

          <div className="flex justify-center mb-12 space-x-2 md:space-x-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => {
                  setActiveTab(category);
                  handleCloseModal(); // Close modal when changing tabs
                }}
                className={`px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-medium rounded-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50
                  ${activeTab === category 
                    ? 'bg-primary text-primary-foreground shadow-lg scale-105' 
                    : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {filteredProjects.length > 0 ? (
            filteredProjects.length > 1 ? (
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                  // when window width is >= 768px (md)
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 30
                  },
                  // when window width is >= 1024px (lg)
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 40
                  }
                }}
                className="pb-12" // Add padding-bottom for pagination
              >
                {filteredProjects.map((project) => ( // Removed index as it's not needed for modal
                  <SwiperSlide key={project.id} className="h-auto pb-2"> {/* Ensure slides accommodate content */}
                    <ProjectCard 
                      project={project}
                      onShowDetails={handleShowDetails} // Pass the handler to ProjectCard
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              // Single project view (no swiper)
              <div className="max-w-2xl mx-auto">
                <ProjectCard 
                  project={filteredProjects[0]}
                  onShowDetails={handleShowDetails} // Pass the handler
                />
              </div>
            )
          ) : (
            <p className="text-center text-muted-foreground text-xl">
              No projects found in this category yet. Stay tuned!
            </p>
          )}
        </div>
      </section>

      {/* Render the Modal conditionally */}
      {selectedProjectForModal && (
        <ProjectModal project={selectedProjectForModal} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default Projects;