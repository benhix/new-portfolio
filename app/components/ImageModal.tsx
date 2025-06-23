'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { type Project } from '@/data/projectData';

interface ImageModalProps {
  project: Project | null;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ project, onClose }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [maxScrollDistance, setMaxScrollDistance] = useState(0);
  const [currentScrollY, setCurrentScrollY] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  // Reset states when project changes
  useEffect(() => {
    if (project) {
      setIsLoaded(false);
      setHasScrolled(false);
      setMaxScrollDistance(0);
      setCurrentScrollY(0);
    }
  }, [project]);

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

  const handleScroll = useCallback((e: React.WheelEvent) => {
    if (maxScrollDistance === 0) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const img = imageRef.current;
    if (!img) return;
    
    const scrollSpeed = 30;
    const deltaY = e.deltaY > 0 ? scrollSpeed : -scrollSpeed;
    const newY = Math.max(-maxScrollDistance, Math.min(0, currentScrollY - deltaY));
    
    // Mark as scrolled if position changes from initial (0)
    if (!hasScrolled && newY !== 0) {
      setHasScrolled(true);
    }
    
    setCurrentScrollY(newY);
    img.style.transform = `translateY(${newY}px)`;
  }, [maxScrollDistance, hasScrolled, currentScrollY]);

  // Add wheel event listener to container for better scroll capture
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
      const newY = Math.max(-maxScrollDistance, Math.min(0, currentScrollY - deltaY));
      
      if (!hasScrolled && newY !== 0) {
        setHasScrolled(true);
      }
      
      setCurrentScrollY(newY);
      img.style.transform = `translateY(${newY}px)`;
    };

    container.addEventListener('wheel', handleWheelEvent, { passive: false });
    return () => container.removeEventListener('wheel', handleWheelEvent);
  }, [maxScrollDistance, hasScrolled, currentScrollY]);

  if (!project) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="relative w-full h-full max-w-6xl max-h-[90vh] bg-white rounded-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-4 z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-black truncate pr-4">{project.title}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-black text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>
        </div>

        {/* Image Container */}
        <div 
          ref={containerRef}
          className="w-full h-full pt-16 pb-4 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onWheel={handleScroll}
          style={{ touchAction: 'none' }}
        >
          <Image
            ref={imageRef}
            src={project.imageUrl}
            alt={`${project.title} full screen view`}
            width={1200}
            height={1600}
            className="object-contain object-top w-full transition-transform duration-200 ease-out"
            style={{
              height: 'auto',
              minHeight: '100%',
              transform: 'translateY(0)',
            }}
            onLoad={() => setIsLoaded(true)}
            priority
          />
          
          {/* Loading indicator */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}
          
          {/* Scroll indicator - hide once scrolling has begun */}
          {isLoaded && maxScrollDistance > 0 && !hasScrolled && (
            <div className="absolute top-20 right-4 bg-black/70 text-white text-sm px-3 py-2 rounded-md flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
              <span>Scroll to explore</span>
            </div>
          )}
          
          {/* Hover instruction */}
          <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-white text-sm text-center font-medium">
              {maxScrollDistance > 0 ? '🖱️ Use mouse wheel to scroll through the image' : 'Full image visible'}
            </p>
          </div>

          {/* Scroll progress indicator */}
          {maxScrollDistance > 0 && hasScrolled && (
            <div className="absolute right-2 top-20 bottom-4 w-1 bg-black/20 rounded-full">
              <div 
                className="w-full bg-blue-600 rounded-full transition-all duration-200"
                style={{
                  height: `${((Math.abs(currentScrollY) / maxScrollDistance) * 100)}%`
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageModal; 