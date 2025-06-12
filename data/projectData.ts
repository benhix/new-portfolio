export interface Project {
  id: number;
  title: string;
  description: string;
  category: 'JS/TS' | 'Python' | 'C++'; // Define the categories
  imageUrl: string;
  demoUrl?: string; // Optional
  githubUrl?: string; // Optional
  stack: string[];
  technical: string; // Markdown or HTML string for the technical write-up
}

export const allProjects: Project[] = [
  { 
    id: 1, 
    title: "E-commerce Platform", 
    description: "A full-stack e-commerce site built with Next.js, TypeScript, and Stripe integration for seamless online transactions.", 
    category: "JS/TS",
    imageUrl: "/project-images/ecommerce.jpg",
    demoUrl: "https://ecommerce-demo.example.com",
    githubUrl: "https://github.com/user/ecommerce-platform",
    stack: ['Next.js', 'TypeScript', 'Stripe API', 'Tailwind CSS', 'PostgreSQL', 'Prisma'],
    technical: `
### Key Features:
- User authentication and profiles.
- Product catalog with search and filtering.
- Shopping cart and checkout process.
- Stripe integration for payment processing.
- Admin panel for managing products and orders.

### Architectural Decisions:
Leveraged Next.js for its hybrid rendering capabilities and serverless functions for backend logic. Prisma ORM was chosen for database interactions due to its type safety with TypeScript.

### Challenges Overcome:
Ensuring secure payment handling with Stripe and managing complex application state across components were significant challenges. Implemented robust error handling and data validation.
    `
  },
  { 
    id: 2, 
    title: "Mandarin Dictionary AI", 
    description: "A custom dictionary for Mandarin learners with AI-powered character recognition and pronunciation feedback.", 
    category: "JS/TS",
    imageUrl: "/mandarin.png", 
    demoUrl: "https://mandarin-ai.example.com",
    githubUrl: "https://github.com/user/mandarin-ai",
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
    title: "Interactive Data Dashboard", 
    description: "A web application for visualizing complex datasets with interactive charts and filters, built with React and D3.js.", 
    category: "JS/TS",
    imageUrl: "/project-images/dashboard-js.jpg", // Placeholder - replace
    demoUrl: "https://js-dashboard.example.com",
    githubUrl: "https://github.com/user/js-dashboard",
    stack: ['React', 'D3.js', 'Node.js', 'Express', 'CSS Modules'],
    technical: `
### Purpose:
To provide an intuitive interface for users to explore and understand large datasets through various chart types (bar, line, pie, scatter) and dynamic filtering options.

### Architecture:
- **Frontend:** React for component-based UI, D3.js for complex data visualizations and SVG manipulation.
- **Backend:** Node.js/Express API to serve data to the frontend, potentially connecting to a database or static files.
- **State Management:** React Context API or Redux for managing filter states and shared data.

### Challenges:
- Optimizing D3.js performance for large datasets to ensure smooth interactions.
- Designing a flexible and reusable charting component system.
- Implementing accessible and responsive chart designs.
    `
  },
  { 
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
  },
  { 
    id: 4, 
    title: "AI Chatbot (Python)", 
    description: "A machine learning chatbot using TensorFlow and Flask, capable of understanding and responding to user queries.", 
    category: "Python",
    imageUrl: "/project-images/chatbot.jpg",
    demoUrl: "https://py-chatbot-demo.example.com",
    githubUrl: "https://github.com/user/python-chatbot",
    stack: ['Python', 'TensorFlow', 'Keras', 'Flask', 'NLTK', 'Docker'],
    technical: `
### Model & Training:
Utilized a sequence-to-sequence model with LSTMs for intent recognition and response generation. Trained on a custom dataset of conversations. NLTK was used for text preprocessing.

### Backend & Deployment:
Flask API serves the chatbot model. Docker was used for containerization, simplifying deployment and ensuring environment consistency.

### Future Enhancements:
Integration with external APIs for richer responses, context awareness over longer conversations, and a more sophisticated NLU pipeline.
    `
  },
  { 
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
  },
  { 
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
  },
];