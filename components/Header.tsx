// app/components/Header.tsx
"use client";

import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContent'; // Adjust path if you placed ThemeProvider elsewhere
import ThemeTooltip from './ThemeTooltip';

// Simple Moon and Sun icons (can be replaced with SVGs or an icon library)
const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>;
const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-6.364-.386l1.591-1.591M3 12h2.25m.386-6.364l1.591 1.591" /></svg>;

// Hamburger Menu Icon with proper styling
const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => (
  <div className="w-6 h-5 flex flex-col justify-between cursor-pointer">
    <div className={`h-0.5 bg-current rounded-full transform transition-all duration-300 origin-center ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
    <div className={`h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></div>
    <div className={`h-0.5 bg-current rounded-full transform transition-all duration-300 origin-center ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
  </div>
);

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const headerHeight = 64; // Account for fixed header height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-4">
          {/* Left side: Theme Toggle */}
          <div className="relative">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
            <ThemeTooltip />
          </div>

          {/* Middle: Logo/Site Name (Optional) */}
          {/* <Link href="/" className="text-lg font-semibold text-foreground">
            MyPortfolio
          </Link> */}

          {/* Desktop Navigation - hidden on mobile */}
          <nav className="hidden sm:flex items-center space-x-6">
            <button 
              onClick={() => smoothScrollTo('about')}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => smoothScrollTo('case-studies')}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Case Studies
            </button>
            <button 
              onClick={() => smoothScrollTo('projects')}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Projects
            </button>
            <button 
              onClick={() => smoothScrollTo('contact')}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="sm:hidden p-2 rounded-md hover:bg-accent hover:text-accent-foreground text-muted-foreground hover:text-primary transition-colors"
            aria-label="Toggle mobile menu"
          >
            <HamburgerIcon isOpen={isMobileMenuOpen} />
          </button>
        </div>

        {/* Mobile Menu Dropdown - now inside header for proper positioning */}
        {isMobileMenuOpen && (
          <div className="sm:hidden absolute top-full left-0 right-0 bg-background/80 border-border/40">
            <nav className="px-4 py-3 space-y-1">
              <button 
                onClick={() => smoothScrollTo('about')}
                className="block w-full text-left px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent/50 rounded-md transition-all duration-200"
              >
                About
              </button>
              <button 
                onClick={() => smoothScrollTo('case-studies')}
                className="block w-full text-left px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent/50 rounded-md transition-all duration-200"
              >
                Case Studies
              </button>
              <button 
                onClick={() => smoothScrollTo('projects')}
                className="block w-full text-left px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent/50 rounded-md transition-all duration-200"
              >
                Projects
              </button>
              <button 
                onClick={() => smoothScrollTo('contact')}
                className="block w-full text-left px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent/50 rounded-md transition-all duration-200"
              >
                Contact
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="sm:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;