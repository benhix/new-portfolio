// components/ProjectModal.tsx
'use client';

import React from 'react';
import { type Project } from '@/data/projectData'; // Assuming projectData.ts is in '@/data/'

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Handle Escape key to close modal - Move before early return
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

  if (!project) {
    return null;
  }

  // Format technical content with custom header styling
  const formatTechnicalContent = (content: string) => {
    return content
      .split('\n')
      .map(line => {
        // Check if line starts with ###
        if (line.trim().startsWith('### ')) {
          const headerText = line.trim().substring(4); // Remove "### "
          return `<h3 class="text-lg font-bold text-black first:-mt-8 mb-3 mt-6">${headerText}</h3>`;
        }
        // Return regular line with break
        return line.trim() === '' ? '<br/>' : line;
      })
      .join('<br/>');
  };

  const formattedTechnical = formatTechnicalContent(project.technical);

  return (
    <div 
      className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50"
      onClick={onClose} // Close modal when clicking on the backdrop
    >
      <div 
        className="bg-white text-black rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal content
      >
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl text-black font-bold font-space-grotesk">{project.title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-black text-2xl"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        <div className="px-6 py-4 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 150px)' }}>
          <div className="text-black leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: formattedTechnical }} />
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button 
            onClick={onClose}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;