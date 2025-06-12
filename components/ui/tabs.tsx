// components/ui/tabs.tsx
import { cn } from '@/lib/utils';
import React from 'react';

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex space-x-4 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={cn(
            'px-4 py-2 rounded-md text-sm font-semibold',
            activeTab === tab
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600'
          )}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
