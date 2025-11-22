export interface Project {
  id: number;
  title: string;
  description: string;
  category: 'JS/TS' | 'Python' | 'C++' | 'Swift'; // Define the categories
  imageUrl: string;
  images?: string[]; // Array of image URLs for carousel
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

// Utility function to generate URL-friendly slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Helper function to get project by slug
export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find(project => generateSlug(project.title) === slug);
}

export const allProjects: Project[] = [
  // ==================== E-commerce Store for Subscriptions ====================
  { 
    id: 1, 
    title: "E-commerce Store for Subscriptions", 
    description: "A full-stack e-commerce platform built with Next.js and TypeScript, featuring secure Stripe integration for subscription-based transactions.", 
    category: "JS/TS",
    imageUrl: "/projects/dine-suite-new.png",
    videoUrl: "/videos/projects/sub-shop-demo.mp4",
    showImageModal: true,
    stack: ['Next.js', 'TypeScript', 'Stripe API', 'Tailwind CSS', 'MongoDB', 'Redis'],
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
  // ==================== Mandarin Dictionary AI ====================
  { 
    id: 2, 
    title: "Mandarin Dictionary AI", 
    description: "A custom Mandarin dictionary and learning tool featuring AI-powered handwriting recognition and real-time pronunciation analysis.", 
    category: "JS/TS",
    imageUrl: "/mandarin.png", 
    imageType: "fullpage",
    showImageModal: true,
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
  // ==================== Family Hub ====================
   { 
    id: 9, 
    title: "Family Hub", 
    description: "A real-time family management dashboard built with SwiftUI. Users can create family groups and share a calendar, shopping list, meal planning, and more. ", 
    category: "Swift",
    imageUrl: "/projects/family-hub/home.png",
    imageType: "mobile", 
    showImageModal: true, 
    images: [
      "/projects/family-hub/home.png",
      "/projects/family-hub/account.png",
      "/projects/family-hub/calendar.png",
      "/projects/family-hub/dinner.png",
      "/projects/family-hub/shopping.png",
    ],
    stack: ['SwiftUI', 'Swift', 'Firebase'],
    technical: `
### Core Architecture & Technology Stack
Family Hub is a comprehensive family management platform built with SwiftUI and Firebase, implementing a multi-user architecture for seamless family collaboration. The application leverages Firebase's Firestore for real-time data synchronization, Firebase Authentication for secure user management, and Firebase Storage for image handling. The system features a family-based data model where users create or join family groups through unique alphanumeric family IDs, enabling automatic data sharing across all family members.


### Family-Centric Data Architecture & Real-Time Collaboration
The core data architecture centers on family groups, with each family maintaining a centralized Firestore document containing shared calendar events, shopping lists, dinner plans, and meal schedules. Users can create new families or join existing ones during registration, with support for legacy user migration. The real-time synchronization ensures instant updates across devices when any family member adds items, creates events, or modifies plans. User preferences include profile images, nicknames, and notification settings for personalized experiences.

### Multi-Feature Dashboard with Interactive Widgets
The home screen provides a widget-based dashboard featuring calendar events, shopping lists, and dinner planning insights. The calendar widget displays upcoming events, birthdays, and reminders with customizable view counts (3, 5, or 10 items) and filtering options. Shopping widgets show active lists organized by category (Grocery, Fruits & Vegetables) with priority levels and completion tracking. Dinner widgets provide meal planning overviews. Each widget supports direct navigation, inline editing, and real-time refresh functionality.

### Comprehensive Feature Set & Production Architecture
The application includes four main feature modules: Calendar (with event categories, birthdays, and reminders), Shopping (with categories, priorities, and collaborative lists), Dinner Planning (with recipe libraries and weekly meal scheduling), and Home Dashboard. The calendar supports rich event metadata including locations, attendees, and color coding. Shopping lists feature image attachments, notes, and multiple view modes. Dinner planning includes drag-and-drop weekly scheduling with proposal locking. The codebase demonstrates strong engineering with modular services, comprehensive error handling, Adelaide timezone utilities, and robust authentication flows supporting family management and user preferences.
`
  },
  // ==================== Real-Time Face Recognition ====================
  { 
    id: 4, 
    title: "Real-Time Face Recognition", 
    description: "A desktop application with a PySide6 GUI for training and running a real-time face recognition model using Python, OpenCV, and TensorFlow.", 
    category: "Python",
    imageUrl: "/projects/face_rec_v2.png",
    imageType: "desktop", 
    showImageModal: true, 
    githubUrl: "https://github.com/benhix/Face-Recognition",
    stack: ['Python', 'OpenCV', 'PySide6', 'TensorFlow', 'MTCNN', 'SVM'],
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
  // ==================== Know Your Rep ====================
  { 
    id: 5, 
    title: "Know Your Rep", 
    description: "A web application that allows users to find out more about their local representatives including their voting history, spending, investments, and speeches.", 
    category: "JS/TS",
    imageUrl: "/projects/know-your-rep/profile-main.png", 
    imageType: "fullpage",
    showImageModal: true,
    images: [
      "/projects/know-your-rep/home.png",
      "/projects/know-your-rep/profile-main.png",
      "/projects/know-your-rep/voting.png",
      "/projects/know-your-rep/spending.png",
      "/projects/know-your-rep/speeches.png",
    ],
    demoUrl: "https://knowyourrep.com.au/",
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'TypeSense'],
    technical: `
### Core Features
- Comprehensive Politician Search System featuring multi-modal search across names, postcodes, electoral divisions, and states with real-time autocomplete and support for both House representatives and Senators.
- Detailed Politician Profiles with tabbed interface displaying overview information, voting records and policy alignments, parliamentary spending breakdowns, and historical speech archives.
- Advanced Data Integration combining OpenAustralia API, TheyVoteForYou API, and custom parliamentary spending databases with automated data import and validation workflows.
- Intelligent Search Infrastructure powered by Typesense cloud search with automatic data synchronization and seamless fallback to direct API queries.

### Technical Architecture
- Next.js 14 Application built with the App Router and server-side rendering, using TypeScript throughout with comprehensive type definitions and API responses.
- Multi-Source API Integration with robust authentication middleware implementing internal secret headers and comprehensive error handling with graceful degradation.
- Database Architecture combining MongoDB for structured spending data with Typesense for high-performance search indexing and automated ETL pipelines.
- Authentication Framework built with Clerk providing route-level protection and secure API endpoint authentication.

### Development Excellence
- Modular Component Architecture with clear separation between reusable components and feature-specific implementations, following Next.js 14 conventions.
- Data Processing Pipeline including automated CSV import scripts and scheduled synchronization jobs that maintain data freshness across external APIs.
- Performance Optimization featuring code splitting, lazy loading, and responsive design using Tailwind CSS with mobile-first architecture.
- Production Deployment on Vercel with automated CI/CD and cron job scheduling for data synchronization.

### Technical Highlights
- Intelligent Search Fallback System that seamlessly transitions from Typesense queries to direct API calls when infrastructure is unavailable.
- Comprehensive Data Aggregation combining spending records, voting patterns, and biographical information into unified politician profiles.
- Real-time Synchronization featuring automated daily data updates via Vercel cron jobs with manual trigger capabilities.
    `
  },
];