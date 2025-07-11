/* eslint-disable */
'use client'; // Add this for components with client-side interactivity like useState

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import Project interface and data
import { type Project, allProjects } from '@/data/projectData'; // Adjusted import path
import ProjectModal from './ProjectModal'; // Import the new modal component
import ImageModal from './ImageModal'; // Import the new image modal component

// Full Page Image component with manual scroll functionality
const FullPageImage = ({ 
  src, 
  alt, 
}: { 
  src: string; 
  alt: string;  
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [maxScrollDistance, setMaxScrollDistance] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isTouching, setIsTouching] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset scroll position when image changes
  useEffect(() => {
    setCurrentY(0);
    setHasScrolled(false);
    if (imageRef.current) {
      imageRef.current.style.transform = 'translateY(0)';
    }
  }, [src]);

  const calculateMaxScroll = useCallback(() => {
    if (imageRef.current && containerRef.current && isLoaded) {
      const imgHeight = imageRef.current.naturalHeight;
      const imgWidth = imageRef.current.naturalWidth;
      const containerHeight = containerRef.current.clientHeight;
      const containerWidth = containerRef.current.clientWidth;
      
      // Calculate the actual displayed height based on how the image is scaled
      const aspectRatio = imgWidth / imgHeight;
      const displayedHeight = containerWidth / aspectRatio;
      
      // Only allow scrolling if the image is taller than the container
      const scrollDistance = Math.max(0, displayedHeight - containerHeight);
      setMaxScrollDistance(scrollDistance);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      // Add a small delay to ensure the image is fully rendered
      setTimeout(() => {
        calculateMaxScroll();
      }, 100);
    }
  }, [isLoaded, calculateMaxScroll]);

  useEffect(() => {
    const handleResize = () => calculateMaxScroll();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateMaxScroll]);

  // Mouse wheel events for desktop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheelEvent = (e: WheelEvent) => {
      if (maxScrollDistance === 0) return;
      
      e.preventDefault();
      e.stopPropagation();
      
      const img = imageRef.current;
      if (!img) return;
      
      const scrollSpeed = 30;
      const deltaY = e.deltaY > 0 ? scrollSpeed : -scrollSpeed;
      const newY = Math.max(-maxScrollDistance, Math.min(0, currentY - deltaY));
      
      if (!hasScrolled && newY !== 0) {
        setHasScrolled(true);
      }
      
      setCurrentY(newY);
      img.style.transform = `translateY(${newY}px)`;
    };

    container.addEventListener('wheel', handleWheelEvent, { passive: false });
    return () => container.removeEventListener('wheel', handleWheelEvent);
  }, [maxScrollDistance, hasScrolled, currentY]);

  // Touch events for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (maxScrollDistance === 0) return;
    
    setIsTouching(true);
    setTouchStartY(e.touches[0].clientY);
  }, [maxScrollDistance]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isTouching || maxScrollDistance === 0) return;
    
    e.preventDefault();
    
    const img = imageRef.current;
    if (!img) return;
    
    const touchY = e.touches[0].clientY;
    const deltaY = touchStartY - touchY;
    const newY = Math.max(-maxScrollDistance, Math.min(0, currentY - deltaY * 0.5)); // Slower scroll for better control
    
    if (!hasScrolled && newY !== 0) {
      setHasScrolled(true);
    }
    
    setCurrentY(newY);
    img.style.transform = `translateY(${newY}px)`;
  }, [isTouching, maxScrollDistance, touchStartY, currentY, hasScrolled]);

  const handleTouchEnd = useCallback(() => {
    setIsTouching(false);
  }, []);

  const handleScroll = useCallback((e: React.WheelEvent) => {
    if (maxScrollDistance === 0) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const img = imageRef.current;
    if (!img) return;
    
    const scrollSpeed = 30;
    const deltaY = e.deltaY > 0 ? scrollSpeed : -scrollSpeed;
    const newY = Math.max(-maxScrollDistance, Math.min(0, currentY - deltaY));
    
    if (!hasScrolled && newY !== 0) {
      setHasScrolled(true);
    }
    
    setCurrentY(newY);
    img.style.transform = `translateY(${newY}px)`;
  }, [maxScrollDistance, hasScrolled, currentY]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden group bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onWheel={handleScroll}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: maxScrollDistance > 0 ? 'none' : 'auto' }}
    >
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        width={800}
        height={1200}
        className="object-cover object-top w-full transition-transform duration-200 ease-out"
        style={{
          height: 'auto',
          minHeight: '100%',
          transform: 'translateY(0)',
        }}
        onLoad={() => setIsLoaded(true)}
      />
      
      {/* Loading indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
      
      {/* Scroll indicator - hide once scrolling has begun */}
      {isLoaded && maxScrollDistance > 0 && !hasScrolled && (
        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
          <span>Scroll</span>
        </div>
      )}
      
      {/* Hover instruction */}
      <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-white text-xs text-center font-medium">
          {maxScrollDistance > 0 ? '🖱️ Scroll to explore the full page' : 'Full page visible'}
        </p>
      </div>
    </div>
  );
};

// Enhanced project card component
const ProjectCard = ({ 
  project,
  onShowDetails,
  onShowImage
}: { 
  project: Project,
  onShowDetails: (project: Project) => void, // New prop to trigger modal
  onShowImage: (project: Project) => void // New prop to trigger image modal
}) => {
  const isMobile = project.imageType === 'mobile';
  const isFullpage = project.imageType === 'fullpage';
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // State for dropdown functionality
  const [isCredentialsOpen, setIsCredentialsOpen] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };
  
  return (
    <div className="bg-card rounded-lg shadow-lg overflow-hidden flex flex-col h-full group">
      <div 
        className={`w-full relative ${isMobile ? 'h-64 flex justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900' : 'h-48 sm:h-56'} ${isFullpage ? 'overflow-hidden group' : ''} ${project.showImageModal ? 'cursor-pointer' : ''}`}
        onClick={project.showImageModal ? () => onShowImage(project) : undefined}
        onTouchEnd={project.showImageModal ? (e) => {
          e.preventDefault();
          e.stopPropagation();
          onShowImage(project);
        } : undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        title={project.showImageModal ? `Click to view ${project.videoUrl ? 'video' : 'full size'}` : undefined}
      >
        {project.videoUrl ? (
          <div className="relative w-full h-full bg-black">
            <video
              ref={videoRef}
              src={project.videoUrl}
              loop
              muted
              playsInline
              className="object-cover w-full h-full transition-opacity duration-300 group-hover:opacity-70"
              poster={project.imageUrl}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/90 rounded-full p-3">
                <svg className="w-8 h-8 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1 pointer-events-none">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              <span>Video</span>
            </div>
          </div>
        ) : isMobile ? (
          <div className="relative w-32 h-full">
            <Image 
              src={project.imageUrl || "/placeholder.png"}
              alt={`${project.title} mobile screenshot`}
              fill
              className={`object-contain rounded-lg shadow-md ${project.showImageModal ? 'group-hover:scale-105 transition-transform duration-300' : ''}`}
            />
            {/* Click indicator for mobile images */}
            {project.showImageModal && (
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-lg flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-2">
                  <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ) : isFullpage ? (
          <div className="relative w-full h-full">
            <FullPageImage 
              src={project.imageUrl || "/placeholder.png"}
              alt={`${project.title} full page screenshot`}
            />
            {/* Click indicator for fullpage images */}
            {project.showImageModal && (
              <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
                <span>Full Size</span>
              </div>
            )}
          </div>
        ) : (
          <div className="relative w-full h-full">
            <Image 
              src={project.imageUrl || "/placeholder.png"}
              alt={`${project.title} project screenshot`}
              fill
              className={`object-contain sm:object-cover ${project.showImageModal ? 'group-hover:scale-105 transition-transform duration-300' : ''}`}
            />
            {/* Click indicator for desktop images */}
            {project.showImageModal && (
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                  <svg className="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-semibold mb-2 text-card-foreground">{project.title}</h3>
        <p className="text-sm text-muted-foreground mb-3">Tech Stack: {project.stack.join(' • ')}</p>
        <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>
        
        <div className="flex justify-center gap-4 mb-4">
          {/* Demo Button - Always shown */}
          <div className="relative group/demo">
            {project.demoUrl ? (
              <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <button className="border border-primary text-primary text-xs px-4 py-2 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors w-28 md:w-32">
                  View Demo
                </button>
              </Link>
            ) : (
              <button 
                disabled 
                className="border border-gray-300 text-gray-400 px-4 py-2 rounded-md cursor-not-allowed text-xs bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 w-28 md:w-32"
              >
                No Live Demo
              </button>
            )}
            
            {/* Demo Credentials Tooltip - Only show on lg+ screens if demo URL exists */}
            {project.demoUrl && project.demoCredentials && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover/demo:opacity-100 hover:opacity-100 transition-opacity duration-300 pointer-events-auto z-10 hidden lg:block">
                <div className="bg-black/95 dark:bg-white/95 text-white dark:text-black text-xs px-3 py-2 rounded-lg shadow-xl backdrop-blur-sm whitespace-nowrap">
                  <div className="font-medium text-yellow-300 dark:text-yellow-600 mb-1 flex items-center gap-1 justify-center">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-3a1 1 0 011-1h2.586l6.243-6.243C12.8 9.51 15 9.51 15 7z" />
                    </svg>
                    Demo Login
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-300 dark:text-gray-600">User:</span>
                      <code className="bg-white/20 dark:bg-black/20 px-1 rounded text-white dark:text-black">{project.demoCredentials.username}</code>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigator.clipboard.writeText(project.demoCredentials!.username);
                          toast.success('📋 Username copied!');
                        }}
                        className="text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-black transition-colors"
                        title="Copy username"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-300 dark:text-gray-600">Pass:</span>
                      <code className="bg-white/20 dark:bg-black/20 px-1 rounded text-white dark:text-black">{project.demoCredentials.password}</code>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigator.clipboard.writeText(project.demoCredentials!.password);
                          toast.success('📋 Password copied!');
                        }}
                        className="text-gray-300 dark:text-gray-600 hover:text-white dark:hover:text-black transition-colors"
                        title="Copy password"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                    {project.demoCredentials.note && (
                      <div className="text-yellow-200 dark:text-yellow-700 text-xs italic pt-1 text-center">{project.demoCredentials.note}</div>
                    )}
                  </div>
                  {/* Tooltip Arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black/95 dark:border-t-white/95"></div>
                </div>
              </div>
            )}
          </div>

          {/* GitHub Button - Always shown */}
          {project.githubUrl ? (
            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <button className="border border-primary text-primary text-xs px-4 py-2 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors w-28 md:w-32">
                GitHub
              </button>
            </Link>
          ) : (
            <button 
              disabled 
              className="border border-gray-300 text-gray-400 px-4 py-2 rounded-md cursor-not-allowed text-xs bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 w-28 md:w-32"
            >
              Private Code
            </button>
          )}
        </div>

        {/* Demo Credentials for smaller screens - Only show on sm/md screens if demo URL exists */}
        {project.demoUrl && project.demoCredentials && (
          <div className="flex justify-center mb-4 lg:hidden">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-3 inline-block transition-all duration-300 ease-in-out">
              <div className="text-center">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-3a1 1 0 011-1h2.586l6.243-6.243C12.8 9.51 15 9.51 15 7z" />
                    </svg>
                    <span className="font-medium text-primary text-sm">Demo Login</span>
                  </div>
                  
                  {/* Dropdown Arrow */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsCredentialsOpen(!isCredentialsOpen);
                    }}
                    className="text-primary hover:text-primary/70 transition-colors p-1"
                    title={isCredentialsOpen ? "Hide credentials" : "Show credentials"}
                  >
                    <svg 
                      className={`w-4 h-4 transition-transform duration-300 ${isCredentialsOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                
                {/* Collapsible credentials content */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isCredentialsOpen ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-muted-foreground text-sm">Username:</span>
                    <code className="bg-muted px-2 py-1 rounded text-sm font-mono">{project.demoCredentials.username}</code>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigator.clipboard.writeText(project.demoCredentials!.username);
                        toast.success('📋 Username copied!');
                      }}
                      className="text-muted-foreground hover:text-primary transition-colors p-1"
                      title="Copy username"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-muted-foreground text-sm">Password:</span>
                    <code className="bg-muted px-2 py-1 rounded text-sm font-mono">{project.demoCredentials.password}</code>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigator.clipboard.writeText(project.demoCredentials!.password);
                        toast.success('📋 Password copied!');
                      }}
                      className="text-muted-foreground hover:text-primary transition-colors p-1"
                      title="Copy password"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                  
                                        {project.demoCredentials.note && (
                      <div className="text-muted-foreground text-xs italic mt-1">{project.demoCredentials.note}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => onShowDetails(project)} // Call onShowDetails with the project data
          onTouchEnd={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onShowDetails(project);
          }}
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
  // State to manage the currently selected project for the image modal
  const [selectedProjectForImageModal, setSelectedProjectForImageModal] = useState<Project | null>(null);
  // Add a state to force Swiper re-initialization
  const [swiperKey, setSwiperKey] = useState(0);

  const filteredProjects = allProjects.filter(project => project.category === activeTab);
  const categories: ('JS/TS' | 'Python')[] = ['JS/TS', 'Python'];

  // Effect to force Swiper re-initialization when tab changes
  useEffect(() => {
    setSwiperKey(prev => prev + 1);
  }, [activeTab, filteredProjects.length]);

  const handleShowDetails = (project: Project) => {
    setSelectedProjectForModal(project);
  };

  const handleCloseModal = () => {
    setSelectedProjectForModal(null);
  };

  const handleShowImage = (project: Project) => {
    setSelectedProjectForImageModal(project);
  };

  const handleCloseImageModal = () => {
    setSelectedProjectForImageModal(null);
  };

  // Dynamic slidesPerView calculation based on number of projects
  const getSlidesPerView = (projectCount: number, screenSize: 'sm' | 'md' | 'lg') => {
    switch (screenSize) {
      case 'sm':
        return Math.min(1, projectCount);
      case 'md':
        return Math.min(2, projectCount);
      case 'lg':
        return Math.min(3, projectCount);
      default:
        return 1;
    }
  };

  return (
    <> {/* Use Fragment to return multiple top-level elements */}
      <section id="projects" className="min-h-screen py-14 bg-background text-foreground">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 font-space-grotesk">My Projects</h2>

          <div className="flex justify-center mb-12 space-x-2 md:space-x-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => {
                  setActiveTab(category);
                  handleCloseModal(); // Close modal when changing tabs
                  handleCloseImageModal(); // Close image modal when changing tabs
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
              <div className="relative">
                {/* Navigation Buttons - positioned above the swiper */}
                <div className="flex justify-center items-center gap-4 mb-8">
                  <button 
                    className="swiper-button-prev-custom w-10 h-10 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all"
                    onClick={() => {
                      const swiperEl = document.querySelector('.swiper') as any;
                      if (swiperEl && swiperEl.swiper) swiperEl.swiper.slidePrev();
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    className="swiper-button-next-custom w-10 h-10 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all"
                    onClick={() => {
                      const swiperEl = document.querySelector('.swiper') as any;
                      if (swiperEl && swiperEl.swiper) swiperEl.swiper.slideNext();
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <Swiper
                  key={`${activeTab}-${swiperKey}`}
                  modules={[Navigation, Pagination, A11y]}
                  spaceBetween={30}
                  slidesPerView={getSlidesPerView(filteredProjects.length, 'sm')}
                  navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                  }}
                  pagination={{ 
                    clickable: true,
                    el: '.swiper-pagination',
                    dynamicBullets: true,
                  }}
                  breakpoints={{
                    // when window width is >= 768px (md)
                    768: {
                      slidesPerView: getSlidesPerView(filteredProjects.length, 'md'),
                      spaceBetween: 30
                    },
                    // when window width is >= 1024px (lg)
                    1024: {
                      slidesPerView: getSlidesPerView(filteredProjects.length, 'lg'),
                      spaceBetween: 40
                    }
                  }}
                  className="pb-16"
                  style={{
                    '--swiper-navigation-color': 'rgb(var(--primary))',
                    '--swiper-pagination-color': 'rgb(var(--primary))',
                  } as React.CSSProperties}
                  centeredSlides={filteredProjects.length < 3}
                  loop={filteredProjects.length > 2}
                  watchOverflow={true}
                  observer={true}
                  observeParents={true}
                >
                  {filteredProjects.map((project) => (
                    <SwiperSlide key={project.id} className="h-auto pb-2">
                      <ProjectCard 
                        project={project}
                        onShowDetails={handleShowDetails}
                        onShowImage={handleShowImage}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                
                {/* Custom Pagination */}
                <div className="swiper-pagination !bottom-0 !relative !mt-4"></div>
              </div>
            ) : (
              // Single project view (no swiper)
              <div className="max-w-2xl mx-auto">
                <ProjectCard 
                  project={filteredProjects[0]}
                  onShowDetails={handleShowDetails}
                  onShowImage={handleShowImage}
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

      {/* Render the Image Modal conditionally */}
      {selectedProjectForImageModal && (
        <ImageModal project={selectedProjectForImageModal} onClose={handleCloseImageModal} />
      )}
    </>
  );
};

export default Projects;