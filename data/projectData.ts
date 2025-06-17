export interface Project {
  id: number;
  title: string;
  description: string;
  category: 'JS/TS' | 'Python' | 'C++'; // Define the categories
  imageUrl: string;
  imageType?: 'mobile' | 'desktop' | 'fullpage'; // New field to specify screenshot type
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
    description: "A full-stack e-commerce site built with Next.js, TypeScript, and Stripe integration for seamless online transactions.", 
    category: "JS/TS",
    imageUrl: "/projects/dine-suite-screen.png",
    stack: ['Next.js', 'TypeScript', 'Stripe API', 'Tailwind CSS', 'PostgreSQL', 'Prisma'],
    technical: `
### Advanced Security & Middleware Architecture
The platform implements a comprehensive multi-layered security system through Next.js middleware that handles authentication, rate limiting, and geographic restrictions. The middleware integrates Clerk authentication with custom cookie-based sessions, implements Redis-powered rate limiting using Upstash with different tiers for various endpoints (global limits and stricter Clerk handshake protection), and enforces geographic restrictions limiting access to Australia and New Zealand only. Additionally, it blocks Vercel's default domain access to prevent unauthorized usage, showcasing production-ready security considerations.

### Automated Workflows & Third-Party Integration
The system demonstrates advanced service orchestration with automated document generation and communication workflows. It generates professional PDF receipts using React-PDF, implements automated email workflows through SendGrid with branded templates and attached invoices, and integrates with ClickUp for project management task creation and Slack for real-time sales notifications. Additional integrations include Google Maps API for address validation, WooCommerce for legacy compatibility, and IP geolocation for compliance tracking.

### Database Architecture & Performance
Built on MongoDB with sophisticated order tracking, the platform implements comprehensive order models with product relationships, tracks processing status to prevent duplicate operations, and provides advanced search and filtering with CSV export capabilities. Deployed on Vercel with custom server configuration, it includes Redis-based rate limiting, geographic content delivery optimization, comprehensive error monitoring, and audit trails with IP address and location tracking for complete order lifecycle management.
This platform represents a production-ready enterprise solution that successfully handles complex business requirements while maintaining security, performance, and user experience standards. The Xero API integration demonstrates advanced third-party API handling, while the overall architecture showcases modern full-stack development practices with comprehensive automation workflows.
    `
  },
  { 
    id: 2, 
    title: "Mandarin Dictionary AI", 
    description: "A custom dictionary for Mandarin learners with AI-powered character recognition and pronunciation feedback.", 
    category: "JS/TS",
    imageUrl: "/mandarin.png", 
    imageType: "fullpage",
    demoUrl: "https://chinese-dictionary.vercel.app/",
    githubUrl: "https://github.com/benhix/Chinese-Dictionary",
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'TensorFlow.js', 'Pinyin.js'],
    technical: `
### Core Functionality:
- Search and browse Mandarin words/phrases.
- AI model for handwriting recognition of Chinese characters.
- Real-time pronunciation analysis using Web Audio API and a custom ML model.
- User accounts for saving vocabulary lists.

### Technical Implementation:
The frontend was built with React for a dynamic user experience. TensorFlow.js allowed for in-browser ML model execution for immediate feedback. The backend handles user data and dictionary content.

### Learning & Iteration:
Developing the ML models for character recognition and pronunciation required significant data collection and iterative training. Optimizing model size for browser performance was crucial.
    `
  },
   { 
    id: 9, 
    title: "Family Hub", 
    description: "A comprehensive family management platform built with Next.js 14, featuring real-time collaboration, advanced authentication, and mobile-responsive design.", 
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
- Collaborative Shopping Lists with real-time updates, category organization, and optimistic UI updates that provide immediate feedback while syncing with the server.
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
- This project showcases advanced React patterns including custom hooks, context providers, and server component integration. The authentication system demonstrates sophisticated middleware patterns that handle edge cases gracefully. Database operations feature proper connection management and optimized queries suitable for production environments.
- The application architecture supports real-time collaboration while maintaining data integrity through optimistic updates and conflict resolution strategies.
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
    description: "PySide GUI to train the model by adding new users and then run live face recognition", 
    category: "Python",
    imageUrl: "/projects/face_rec_v2.png",
    imageType: "desktop", // Regular desktop screenshot
    demoUrl: "https://py-chatbot-demo.example.com",
    githubUrl: "https://github.com/benhix/Face-Recognition",
    stack: ['Python', 'OpenCV', 'PySide6', 'Shiboken'],
    technical: `
### Model & Training:
Utilized a sequence-to-sequence model with LSTMs for intent recognition and response generation. Trained on a custom dataset of conversations. NLTK was used for text preprocessing.

### Backend & Deployment:
Flask API serves the chatbot model. Docker was used for containerization, simplifying deployment and ensuring environment consistency.

### Future Enhancements:
Integration with external APIs for richer responses, context awareness over longer conversations, and a more sophisticated NLU pipeline.
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