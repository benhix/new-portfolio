export interface Project {
  id: number;
  title: string;
  description: string;
  category: 'JS/TS' | 'Python' | 'C++'; // Define the categories
  imageUrl: string;
  videoUrl?: string; // Optional URL for project video
  imageType?: 'mobile' | 'desktop' | 'fullpage'; // New field to specify screenshot type
  showImageModal?: boolean; // Optional property to enable image modal feature
  demoUrl?: string; // Optional
  githubUrl?: string; // Optional
  stack: string[];
  technical: string; // Markdown or HTML string for the technical write-up
  demoCredentials?: {
    username: string;
    password: string;
    note?: string; // Optional context like "Admin account" or "Demo user"
  };
}

export const allProjects: Project[] = [
  { 
    id: 1, 
    title: "E-commerce Store for Subscriptions", 
    description: "A full-stack e-commerce platform built with Next.js and TypeScript, featuring secure Stripe integration for subscription-based transactions.", 
    category: "JS/TS",
    imageUrl: "/projects/dine-suite-new.png",
    videoUrl: "/videos/projects/sub-shop-demo.mp4", // Video for the modal
    showImageModal: true, // Enable image modal for this project
    stack: ['Next.js', 'TypeScript', 'Stripe API', 'Tailwind CSS', 'PostgreSQL', 'Prisma'],
    technical: `
### Advanced Security & Middleware Architecture
The platform implements a comprehensive multi-layered security system through Next.js middleware that handles authentication, rate limiting, and geographic restrictions. The middleware integrates Clerk authentication with custom cookie-based sessions, implements Redis-powered rate limiting using Upstash with different tiers for various endpoints (global limits and stricter Clerk handshake protection), and enforces geographic restrictions limiting access to Australia and New Zealand only. Additionally, it blocks Vercel's default domain access to prevent unauthorized usage, showcasing production-ready security considerations.

### Automated Workflows & Third-Party Integration
The system demonstrates advanced service orchestration with automated document generation and communication workflows. It generates professional PDF receipts using React-PDF, implements automated email workflows through SendGrid with branded templates and attached invoices, and integrates with ClickUp for project management task creation and Slack for real-time sales notifications. Additional integrations include Google Maps API for address validation, WooCommerce for legacy compatibility, and IP geolocation for compliance tracking.

### Database Architecture & Performance
Built on MongoDB with sophisticated order tracking, the platform implements comprehensive order models with product relationships, tracks processing status to prevent duplicate operations, and provides advanced search and filtering with CSV export capabilities. Deployed on Vercel with custom server configuration, it includes Redis-based rate limiting, geographic content delivery optimization, comprehensive error monitoring, and audit trails with IP address and location tracking for complete order lifecycle management.
This platform is a production-ready, enterprise-grade solution that handles complex business requirements while upholding the highest standards of security, performance, and user experience. The architecture demonstrates mastery of modern full-stack development practices, including advanced third-party API integration and comprehensive workflow automation.
    `
  },
  { 
    id: 2, 
    title: "Mandarin Dictionary AI", 
    description: "A custom Mandarin dictionary and learning tool featuring AI-powered handwriting recognition and real-time pronunciation analysis.", 
    category: "JS/TS",
    imageUrl: "/mandarin.png", 
    imageType: "fullpage",
    showImageModal: true, // Enable image modal for this project
    demoUrl: "https://chinese-dictionary.vercel.app/",
    githubUrl: "https://github.com/benhix/Chinese-Dictionary",
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB'],
    technical: `
### Project Overview
This full-stack web application was developed to solve the personal challenge of efficiently learning and organizing Mandarin Chinese vocabulary. It is a self-directed project that demonstrates end-to-end development capabilities, from database design to production deployment, while addressing the unique complexities of multilingual text processing and search functionality.

### Technical Architecture
The application leverages a modern tech stack including Next.js 14 with TypeScript for type-safe development, MongoDB with Mongoose for flexible data modeling, and Tailwind CSS for responsive design. The architecture follows RESTful API principles with organized route handlers, custom React contexts for state management, and reusable component patterns. The codebase demonstrates clean separation of concerns with dedicated models, utilities, and contexts, showcasing scalable application structure.

### Advanced Search Implementation
The core technical innovation is an intelligent, real-time search engine that simultaneously queries Chinese characters, Pinyin romanization, and English translations. A key innovation was implementing automatic pinyin normalization using custom utilities that strip diacritical marks, enabling accurate fuzzy matching regardless of tone mark variations. This search functionality required careful regex optimization, database indexing strategies, and client-side debouncing to deliver instantaneous results across three different writing systems.

### Features & Deployment
Additional features include a comprehensive learning management system with favoriting, learning progress tracking, and category organization. The application includes loading states, confirmation modals, and error handling for a polished user experience. Successfully deployed to Vercel with MongoDB Atlas integration, demonstrating production deployment and cloud database management skills. The project solved a real-world learning challenge while showcasing advanced text processing, database optimization, and modern web development practices.
    `
  },
   { 
    id: 9, 
    title: "Family Hub", 
    description: "A real-time family management dashboard built with Next.js 14, featuring collaborative tools, advanced authentication, and a fully-responsive design.", 
    category: "JS/TS",
    imageUrl: "/projects/fam-dash.png", // Placeholder - replace
    imageType: "fullpage", // Specify this as a full page screenshot that can be scrolled
    demoUrl: "https://family-hub-henna.vercel.app/",
    githubUrl: "https://github.com/benhix/family-hub",
    stack: ['Next.js', 'Tailwind CSS', 'TypeScript', 'REST API'],
    demoCredentials: {
      username: "demo",
      password: "DemoUser4785"
    },
    technical: `
### Core Features
- Collaborative Shopping Lists with real-time database synchronization and optimistic UI updates for a seamless user experience.
- Integrated Calendar System featuring event management, birthday tracking, and dynamic widgets that display upcoming events with live data synchronization.
- QR Code Integration for pet feeding tracking, implementing camera-based scanning with custom validation and automated data entry workflows.
- Advanced User Management with customizable preferences, theme switching, and personalized dashboard configurations that persist across sessions.
- Activity Logging System providing comprehensive user analytics and interaction tracking with detailed audit trails.

### Technical Architecture
- Built on Next.js 14 with the App Router, leveraging server-side rendering and React Server Components for optimal performance. The frontend uses TypeScript throughout with custom type definitions and interfaces for complete type safety.
- Custom Authentication Middleware implements route-level protection with graceful error handling, avoiding common "Failed to fetch" issues through proper API response patterns. The authentication system uses Clerk with custom helper functions that provide reusable auth patterns across all API routes.
- MongoDB Integration features optimized connection pooling, custom document schemas, and efficient query patterns with proper indexing strategies.
- Advanced State Management combines React Context API with custom hooks for global state, implementing optimistic updates that immediately reflect user actions while maintaining data consistency.
- Responsive Design System built with Tailwind CSS, featuring mobile-first architecture and adaptive layouts that work seamlessly across all device sizes.

### Development Excellence
- The codebase demonstrates separation of concerns with reusable components, custom hooks for business logic abstraction, and proper error boundaries. API routes implement consistent response patterns with comprehensive input validation and sanitization.
- Performance optimizations include code splitting, lazy loading, and efficient caching strategies. The application features progressive web app capabilities with offline functionality and installable interfaces.
- Production deployment on Vercel with automated CI/CD, environment-specific configurations, and comprehensive error tracking for production monitoring.

### Technical Highlights
- This project showcases advanced React patterns, including custom hooks, context providers, and server component integration. The architecture supports real-time collaboration via optimistic UI updates and robust data consistency strategies, while the custom authentication middleware demonstrates sophisticated, production-ready access control.
`
  },
/*   { 
    id: 3, 
    title: "Portfolio Website v2", 
    description: "This very portfolio, showcasing projects and skills, built with Next.js and Tailwind CSS for a modern, responsive design.", 
    category: "JS/TS",
    imageUrl: "/project-images/portfolio.jpg",
    demoUrl: "/", // Link to current site
    githubUrl: "https://github.com/user/portfolio-nextjs",
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Framer Motion'],
    technical: `
### Design Goals:
- Clean, modern, and performant.
- Easy to navigate and update.
- Effectively showcase technical projects and skills.

### Technologies Used:
Next.js App Router for structure and optimized page loading. Tailwind CSS for rapid UI development. Framer Motion for subtle animations. Deployed on Vercel for CI/CD and global CDN.

### Process:
Iterative design and development process, focusing on user experience and content clarity. Implemented dark mode and responsive layouts for various devices.
    `
  }, */
  { 
    id: 4, 
    title: "Real-Time Face Recognition", 
    description: "A desktop application with a PySide6 GUI for training and running a real-time face recognition model using Python, OpenCV, and TensorFlow.", 
    category: "Python",
    imageUrl: "/projects/face_rec_v2.png",
    imageType: "desktop", // Regular desktop screenshot
    showImageModal: true, // Enable image modal for this project
    githubUrl: "https://github.com/benhix/Face-Recognition",
    stack: ['Python', 'OpenCV', 'PySide6', 'Shiboken'],
    technical: `
### Core Architecture & Technology Stack
This face recognition application represents a complete, end-to-end computer vision pipeline. Built with TensorFlow and OpenCV, the system leverages the state-of-the-art FaceNet architecture for generating high-quality facial embeddings, combined with an SVM classifier that achieves 90% accuracy on a 10-person test dataset. The application demonstrates proficiency in both deep learning model integration and classical machine learning techniques, utilizing MTCNN for accurate face detection and extraction.

### Automated Training Pipeline & Data Collection
The system features a comprehensive automated data collection module that streamlines the training process by capturing 30 high-quality face samples per person through real-time camera interaction. This is complemented by a sophisticated training pipeline that processes multi-class datasets, generates 128-dimensional face embeddings using the pre-trained FaceNet model, and trains an optimized SVM classifier with proper train/test split validation. The modular architecture includes a dedicated FACELOADING class for efficient dataset management and preprocessing.

### Real-Time Recognition Performance
The production-ready real-time recognition system delivers impressive performance with live video processing at 1280x720 resolution, featuring smooth face detection using Haar cascades, real-time embedding generation, and instant classification results. The application maintains high accuracy through proper preprocessing pipelines, including face normalization to 160x160 pixels to match FaceNet's input requirements, and implements robust error handling for unknown faces.

### Software Engineering & Deployment
The implementation demonstrates strong software engineering principles, including a well-structured and modular codebase, comprehensive dependency management, and efficient model serialization for persistence. The system successfully bridges the gap between a research-grade deep learning model and a practical, real-world application, showcasing expertise in computer vision, ML model deployment, and real-time system optimization.
    `
  },
  /* { 
    id: 5, 
    title: "Web Scraper & Analyzer", 
    description: "A Python tool for extracting data from websites using BeautifulSoup and Scrapy, with data analysis features.", 
    category: "Python",
    imageUrl: "/project-images/scraper.jpg",
    demoUrl: "https://py-scraper.example.com",
    githubUrl: "https://github.com/user/python-scraper",
    stack: ['Python', 'BeautifulSoup', 'Scrapy', 'Requests', 'Pandas', 'Matplotlib'],
    technical: `
### Scraping Engine:
Combines Scrapy for robust crawling and link extraction with BeautifulSoup for parsing HTML from specific pages. Handles various anti-scraping measures like user-agents and proxies.

### Data Processing & Analysis:
Collected data is cleaned and structured using Pandas DataFrames. Matplotlib is used for generating basic visualizations from the scraped data.

### Use Cases:
Market research, price tracking, sentiment analysis from reviews, and lead generation. Ethical considerations and website T&Cs were paramount.
    `
  }, */
/*   { 
    id: 7, 
    title: "Game Engine Core (C++)", 
    description: "A foundational 2D game engine developed with C++ and SDL, focusing on core engine components.", 
    category: "C++",
    imageUrl: "/project-images/game-engine.jpg",
    demoUrl: "https://cpp-game-engine.example.com",
    githubUrl: "https://github.com/user/cpp-game-engine",
    stack: ['C++', 'SDL2', 'OpenGL (optional for rendering)', 'CMake', 'Box2D (for physics)'],
    technical: `
### Core Systems:
- **Rendering:** Abstracted rendering system (initially SDL_Renderer, with plans for OpenGL).
- **Entity-Component System (ECS):** For flexible game object management.
- **Input Handling:** Keyboard, mouse, and gamepad input.
- **Basic Physics:** Integration with Box2D for 2D physics simulation.
- **Scene Management:** Loading and transitioning between game scenes.

### Build & Structure:
CMake for cross-platform build management. Modular design to allow for easy extension and addition of new features.

### Learning Objectives:
Deepen understanding of game engine architecture, C++ best practices, memory management, and real-time application development.
    `
  }, */
];