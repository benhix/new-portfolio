// components/ProjectModal.tsx
'use client';

import React from 'react';
import { type Project } from '@/data/projectData'; // Assuming projectData.ts is in '@/data/'

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) {
    return null;
  }

  const formattedTechnical = project.technical.replace(/\n/g, '<br/>');

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

  return (
    <div 
      className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50"
      onClick={onClose} // Close modal when clicking on the backdrop
    >
      <div 
        className="bg-white dark:bg-gray-900 text-card-foreground rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal content
      >
        <div className="px-6 py-4 border-b border-border flex justify-between items-center">
          <h2 className="text-2xl font-bold font-space-grotesk text-foreground">{project.title}</h2>
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground text-2xl"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        <div className="px-6 py-4 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 150px)' }}>
          <div className="prose prose-sm dark:prose-invert">
            <div dangerouslySetInnerHTML={{ __html: formattedTechnical }} />
          </div>
        </div>
        <div className="px-6 py-4 border-t border-border flex justify-end">
          <button 
            onClick={onClose}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;