"use client";

import React, { useState, useEffect } from 'react';

const ThemeTooltip = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if tooltip has been dismissed and hasn't expired
    const dismissedData = localStorage.getItem('theme-tooltip-dismissed');
    
    if (dismissedData) {
      try {
        const { timestamp } = JSON.parse(dismissedData);
        const oneMonth = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
        const now = Date.now();
        
        // If more than a month has passed, show the tooltip again
        if (now - timestamp > oneMonth) {
          localStorage.removeItem('theme-tooltip-dismissed');
          setIsVisible(true);
        }
      } catch (error) {
        // If there's an error parsing, remove the item and show tooltip
        console.error('Error parsing theme tooltip dismissed data:', error);
        localStorage.removeItem('theme-tooltip-dismissed');
        setIsVisible(true);
      }
    } else {
      // First time user - show the tooltip
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = (): void => {
    // Save dismissal with timestamp to localStorage
    const dismissalData = {
      timestamp: Date.now()
    };
    localStorage.setItem('theme-tooltip-dismissed', JSON.stringify(dismissalData));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="absolute top-full left-0 mt-2 z-60">
      <div className="theme-tooltip-container relative border border-border/40 text-foreground px-4 py-3 rounded-lg shadow-xl max-w-52 text-sm mt-4">
        {/* Tooltip Arrow */}
        <div className="absolute -top-1 left-4 w-2 h-2 bg-background/95 supports-[backdrop-filter]:bg-background/60 rotate-45 border-l border-t border-border/40"></div>
        
        {/* Content */}
        <div className="flex items-center justify-between gap-3">
          <span className="font-medium">Switch between themes</span>
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 w-5 h-5 flex items-center justify-center hover:bg-accent hover:text-accent-foreground rounded-full transition-all duration-200 group"
            aria-label="Dismiss tooltip"
          >
            <svg className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeTooltip; 