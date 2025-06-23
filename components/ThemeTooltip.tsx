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

  const handleDismiss = () => {
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
      <div className="relative bg-primary dark:bg-black text-primary-foreground dark:text-white px-3 py-2 rounded-lg shadow-lg dark:border dark:border-white/10 max-w-48 text-sm">
        {/* Tooltip Arrow */}
        <div className="absolute -top-1 left-4 w-2 h-2 bg-primary dark:bg-black rotate-45"></div>
        
        {/* Content */}
        <div className="flex items-center justify-between gap-2">
          <span className="flex-1">Toggle between themes</span>
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 w-4 h-4 flex items-center justify-center hover:bg-primary-foreground/20 rounded-sm transition-colors"
            aria-label="Dismiss tooltip"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeTooltip; 