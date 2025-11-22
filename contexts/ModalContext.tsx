'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Project } from '@/data/projectData';
import ProjectModal from '@/app/components/ProjectModal';
import ImageModal from '@/app/components/ImageModal';

interface ModalContextType {
  openProjectModal: (project: Project) => void;
  closeProjectModal: () => void;
  openImageModal: (project: Project) => void;
  closeImageModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<Project | null>(null);
  const [selectedProjectForImageModal, setSelectedProjectForImageModal] = useState<Project | null>(null);

  const openProjectModal = (project: Project) => {
    setSelectedProjectForModal(project);
  };

  const closeProjectModal = () => {
    setSelectedProjectForModal(null);
  };

  const openImageModal = (project: Project) => {
    setSelectedProjectForImageModal(project);
  };

  const closeImageModal = () => {
    setSelectedProjectForImageModal(null);
  };

  return (
    <ModalContext.Provider
      value={{
        openProjectModal,
        closeProjectModal,
        openImageModal,
        closeImageModal,
      }}
    >
      {children}

      {/* Render modals at root level */}
      {selectedProjectForImageModal && (
        <ImageModal project={selectedProjectForImageModal} onClose={closeImageModal} />
      )}

      {selectedProjectForModal && (
        <ProjectModal project={selectedProjectForModal} onClose={closeProjectModal} />
      )}
    </ModalContext.Provider>
  );
};
