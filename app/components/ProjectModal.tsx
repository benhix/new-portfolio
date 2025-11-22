// components/ProjectModal.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { type Project } from '@/data/projectData';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [swiperKey, setSwiperKey] = useState(0);

  // Handle Escape key to close modal
  React.useEffect(() => {
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

  // Prevent body scroll on modal open (iOS fix)
  React.useEffect(() => {
    if (project) {
      const scrollY = window.scrollY;
      const originalStyle = window.getComputedStyle(document.body).overflow;
      
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      return () => {
        document.body.style.overflow = originalStyle;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [project]);

  // Reset swiper when project changes
  React.useEffect(() => {
    if (project) {
      setSwiperKey(prev => prev + 1);
    }
  }, [project]);

  if (!project) {
    return null;
  }

  // Format technical content with custom header styling (similar to detail page)
  const formatTechnicalContent = (content: string) => {
    const lines = content.split('\n');
    let inList = false;
    let result = '';

    lines.forEach((line) => {
      const trimmed = line.trim();
      
      // Check if line starts with ###
      if (trimmed.startsWith('### ')) {
        if (inList) {
          result += '</ul>';
          inList = false;
        }
        const headerText = trimmed.substring(4); // Remove "### "
        result += `<h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 mt-6 first:mt-0">${headerText}</h3>`;
      }
      // Check for bullet points
      else if (trimmed.startsWith('- ')) {
        if (!inList) {
          result += '<ul class="list-disc mb-3 space-y-1.5">';
          inList = true;
        }
        const bulletText = trimmed.substring(2);
        result += `<li class="ml-6 text-gray-700 dark:text-gray-300 text-sm">${bulletText}</li>`;
      }
      // Regular line
      else {
        if (inList) {
          result += '</ul>';
          inList = false;
        }
        if (trimmed === '') {
          result += '<br/>';
        } else {
          result += `<p class="mb-3 text-gray-700 dark:text-gray-300 leading-relaxed text-sm">${line}</p>`;
        }
      }
    });

    // Close any open list
    if (inList) {
      result += '</ul>';
    }

    return result;
  };

  const formattedTechnical = formatTechnicalContent(project.technical);

  // Prepare images for carousel: use images array if available, otherwise fall back to imageUrl
  const carouselImages = project.images && project.images.length > 0 
    ? project.images 
    : [project.imageUrl];

  const isMobile = project.imageType === 'mobile';

  // Carousel component
  const CarouselSection = () => (
    <div className={`relative bg-gray-200 dark:bg-gray-700 ${isMobile ? 'w-full h-full overflow-hidden' : 'w-full shrink-0 h-[400px]'}`}>
      {carouselImages.length > 0 && (
        <Swiper
          key={swiperKey}
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={true}
          pagination={{ clickable: true }}
          className={`w-full h-full`}
          style={{
            '--swiper-navigation-color': 'rgb(var(--primary))',
            '--swiper-pagination-color': 'rgb(var(--primary))',
          } as React.CSSProperties}
        >
          {carouselImages.map((imageUrl, index) => (
            <SwiperSlide key={index} className={`h-full ${isMobile ? 'overflow-y-auto' : 'overflow-y-auto'}`}>
              <div className={`relative ${isMobile ? 'w-full h-full flex items-start justify-center py-4' : 'w-full h-full flex items-start justify-center'}`}>
                <div className={`relative ${isMobile ? 'max-w-full' : 'w-full'}`}>
                  <Image
                    src={imageUrl}
                    alt={`${project.title} screenshot ${index + 1}`}
                    width={1200}
                    height={1600}
                    className={`${isMobile ? 'object-contain max-w-full h-auto' : 'object-contain w-full h-auto'}`}
                    priority={index === 0}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );

  // Technical Description component
  const TechnicalSection = () => (
    <div className={`overflow-y-auto bg-gray-100 dark:bg-gray-800 ${isMobile ? 'h-full' : 'grow'} ${isMobile ? 'px-6 py-6' : 'px-6 py-6'}`}>
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-space-grotesk">Technical Details</h3>
      <div className="max-w-none">
        <div
          className="text-gray-700 dark:text-gray-300"
          dangerouslySetInnerHTML={{ __html: formattedTechnical }}
        />
      </div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 overflow-y-auto"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000
      }}
      onClick={onClose}
      onTouchEnd={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className={`bg-gray-100 dark:bg-gray-800 rounded-lg shadow-2xl w-full ${isMobile ? 'max-w-5xl' : 'max-w-4xl'} my-8 overflow-hidden flex flex-col max-h-[90vh] border border-gray-300 dark:border-gray-700`}
        style={{ zIndex: 1001 }}
        onClick={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-300 dark:border-gray-700 flex justify-between items-center shrink-0 bg-gray-100 dark:bg-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-space-grotesk">{project.title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 text-3xl leading-none transition-colors"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Content Area - Two columns for mobile, stacked for others */}
        {isMobile ? (
          <div className="flex flex-row grow overflow-hidden">
            {/* Left Column - Carousel */}
            <div className="w-2/5 border-r border-gray-300 dark:border-gray-700 flex flex-col">
              <CarouselSection />
            </div>
            {/* Right Column - Technical Description */}
            <div className="w-3/5 flex flex-col">
              <TechnicalSection />
            </div>
          </div>
        ) : (
          <>
            <CarouselSection />
            <TechnicalSection />
          </>
        )}

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-300 text-white dark:border-gray-700 flex justify-end shrink-0 bg-gray-100 dark:bg-gray-800">
          <button 
            onClick={onClose}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;