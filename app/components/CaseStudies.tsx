// @es-lint disable

'use client';

import React, { useState, useEffect } from 'react';
import { type CaseStudy, allCaseStudies /* categories */ } from '@/data/caseStudyData';

// Timeline step component
const TimelineStep = ({ 
  icon, 
  title, 
  content, 
  isExpanded, 
  onToggle,
  isLast
}: {
  icon: string;
  title: string;
  content: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  isLast: boolean;
}) => {
  return (
    <div className="relative flex">
      {/* Timeline line and icon - hidden on mobile */}
      <div className="hidden md:flex flex-col items-center mr-6 flex-shrink-0">
        <div className={`w-16 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
          isExpanded 
            ? '' 
            : 'bg-card text-card-foreground border-border hover:border-primary/50'
        }`}>
          <span className="text-3xl leading-none mt-8">{icon}</span>
        </div>
        {!isLast && (
          <div className="w-0.5 bg-gradient-to-b from-primary/30 to-transparent mt-2" style={{minHeight: '60px'}}></div>
        )}
      </div>

      {/* Mobile timeline line only */}
      <div className="hidden flex flex-col items-center flex-shrink-0">
        <div className="w-4 h-4 rounded-full bg-primary/30 mt-6"></div>
        {!isLast && (
          <div className="w-0.5 bg-gradient-to-b from-primary/30 to-transparent mt-2" style={{minHeight: '60px'}}></div>
        )}
      </div>
      
      {/* Content */}
      <div className="flex-1 pb-4">
        <div 
          className={`bg-card rounded-lg border transition-all duration-300 cursor-pointer hover:shadow-lg min-h-[80px] ${
            isExpanded ? 'shadow-lg border-primary/50' : 'border-border hover:border-primary/30'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                {/* Mobile emoji inside dropdown */}
                <span className="md:hidden text-2xl flex-shrink-0">{icon}</span>
                <h4 className="text-xl font-semibold text-card-foreground">{title}</h4>
              </div>
              <div className={`transition-transform duration-200 flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}>
                <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            <div className={`transition-all duration-300 overflow-hidden ${
              isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="mt-6 pt-6 border-t border-border">
                {content}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Individual case study component
const CaseStudyCard = ({ 
  caseStudy, 
  isExpanded, 
  onToggle,
  cardRef
}: { 
  caseStudy: CaseStudy;
  isExpanded: boolean;
  onToggle: () => void;
  cardRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const toggleStep = (stepNumber: number) => {
    if (!isExpanded) return; // Prevent clicking when case study is collapsed
    setExpandedStep(expandedStep === stepNumber ? null : stepNumber);
  };

  const steps = [
    {
      icon: '🚨',
      title: 'Challenge',
      content: (
        <div className="space-y-3">
          <p className="text-muted-foreground">{caseStudy.challenge.description}</p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-semibold text-card-foreground">Impact: </span>
              <span className="text-muted-foreground">{caseStudy.challenge.impact}</span>
            </div>
            <div>
              <span className="font-semibold text-card-foreground">Duration: </span>
              <span className="text-muted-foreground">{caseStudy.challenge.timeframe}</span>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: '🔍',
      title: 'Analysis',
      content: (
        <div className="space-y-3">
          <div>
            <h5 className="font-semibold text-card-foreground mb-2">Key Findings:</h5>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
              {caseStudy.analysis.findings.map((finding, index) => (
                <li key={index}>{finding}</li>
              ))}
            </ul>
          </div>
          <div>
            <span className="font-semibold text-card-foreground">Root Cause: </span>
            <span className="text-muted-foreground">{caseStudy.analysis.rootCause}</span>
          </div>
        </div>
      )
    },
    {
      icon: '💡',
      title: 'Decision',
      content: (
        <div className="space-y-3">
          <div>
            <span className="font-semibold text-card-foreground">Chosen Approach: </span>
            <span className="text-muted-foreground">{caseStudy.decision.approach}</span>
          </div>
          <div>
            <span className="font-semibold text-card-foreground">Alternatives Considered: </span>
            <span className="text-muted-foreground">{caseStudy.decision.alternatives}</span>
          </div>
          <div>
            <span className="font-semibold text-card-foreground">Reasoning: </span>
            <span className="text-muted-foreground">{caseStudy.decision.reasoning}</span>
          </div>
        </div>
      )
    },
    {
      icon: '⚙️',
      title: 'Implementation',
      content: (
        <div className="space-y-3">
          <div>
            <span className="font-semibold text-card-foreground">Solution: </span>
            <span className="text-muted-foreground">{caseStudy.implementation.solution}</span>
          </div>
          <div>
            <span className="font-semibold text-card-foreground">Tools Used: </span>
            <div className="flex flex-wrap gap-2 mt-1">
              {caseStudy.implementation.tools.map((tool, index) => (
                <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                  {tool}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="font-semibold text-card-foreground">Timeline: </span>
            <span className="text-muted-foreground">{caseStudy.implementation.timeline}</span>
          </div>
        </div>
      )
    },
    {
      icon: '📊',
      title: 'Results',
      content: (
        <div className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            {caseStudy.results.metrics.map((metric, index) => (
              <div key={index} className="bg-muted/30 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-primary">{metric.value}</div>
                <div className="text-sm font-medium text-card-foreground">{metric.label}</div>
                <div className="text-xs text-green-600 font-medium">{metric.improvement}</div>
              </div>
            ))}
          </div>
          <div>
            <h5 className="font-semibold text-card-foreground mb-2">Key Lessons:</h5>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
              {caseStudy.results.lessons.map((lesson, index) => (
                <li key={index}>{lesson}</li>
              ))}
            </ul>
          </div>
        </div>
      )
    }
  ];

  return (
    <div ref={cardRef} className="bg-background border border-border rounded-lg p-6 shadow-sm w-full max-w-5xl mx-auto">
      <div 
        className="mb-6 cursor-pointer hover:bg-muted/20 -m-2 p-2 rounded-lg transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
          <h3 className="text-2xl font-semibold text-card-foreground">{caseStudy.title}</h3>
          <div className="flex items-center justify-between sm:justify-end space-x-3">
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full flex-shrink-0">
              {caseStudy.category}
            </span>
            <div className={`transition-transform duration-200 flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}>
              <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Steps */}
      <div className={`w-full transition-all duration-300 overflow-hidden ${
        isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        {steps.map((step, index) => (
          <TimelineStep
            key={index}
            icon={step.icon}
            title={step.title}
            content={step.content}
            isExpanded={expandedStep === index}
            onToggle={() => toggleStep(index)}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

const CaseStudies = () => {
  // const [activeCategory, setActiveCategory] = useState<string>('All');
  const [expandedCaseStudy, setExpandedCaseStudy] = useState<string | null>(allCaseStudies[0]?.id || null);
  const [justOpenedCaseStudy, setJustOpenedCaseStudy] = useState<string | null>(null);
  
  // Temporarily showing all case studies without filtering
  const filteredCaseStudies = allCaseStudies;

  // const availableCategories = ['All', ...categories.filter(cat => 
  //   allCaseStudies.some(study => study.category === cat)
  // )];

  // Create refs for each case study - use useMemo to avoid recreating refs
  const caseStudyRefs = React.useMemo(() => {
    const refs: { [key: string]: React.RefObject<HTMLDivElement | null> } = {};
    allCaseStudies.forEach(study => {
      refs[study.id] = React.createRef<HTMLDivElement | null>();
    });
    return refs;
  }, []);

  const toggleCaseStudy = (caseStudyId: string) => {
    const newExpandedState = expandedCaseStudy === caseStudyId ? null : caseStudyId;
    setExpandedCaseStudy(newExpandedState);
    
    // Always scroll when opening a case study
    if (newExpandedState) {
      setJustOpenedCaseStudy(newExpandedState);
    }
  };

  // Auto-scroll to newly opened case study positioned below nav
  useEffect(() => {
    if (justOpenedCaseStudy && caseStudyRefs[justOpenedCaseStudy]?.current) {
      // Wait longer for layout animations to complete, then scroll with offset for navigation
      setTimeout(() => {
        const element = caseStudyRefs[justOpenedCaseStudy]?.current;
        if (element) {
          const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
          const navHeight = 80; // Approximate navigation height
          const offsetPosition = elementTop - navHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
        setJustOpenedCaseStudy(null);
      }, 350); // Increased delay to account for closing animations
    }
  }, [justOpenedCaseStudy, caseStudyRefs]);

  return (
    <section id="case-studies" className="min-h-screen py-14 bg-background text-foreground w-full">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-6 font-space-grotesk">Case Studies</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
          A selection of engineering challenges I have successfully navigated. Each case study breaks down my process for analysing complex problems, architecting robust solutions, and delivering measurable improvements in automation and efficiency.
        </p>

        {/* Category Filter - Temporarily commented out */}
        {/* <div className="flex justify-center mb-12 flex-wrap gap-2">
          {availableCategories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-medium rounded-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50
                ${activeCategory === category 
                  ? 'bg-primary text-primary-foreground shadow-lg scale-105' 
                  : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
            >
              {category}
            </button>
          ))}
        </div> */}

        {/* Case Studies */}
        <div className="space-y-8">
          {filteredCaseStudies.length > 0 ? (
            filteredCaseStudies.map((caseStudy) => (
              <CaseStudyCard 
                key={caseStudy.id} 
                caseStudy={caseStudy}
                isExpanded={expandedCaseStudy === caseStudy.id}
                onToggle={() => toggleCaseStudy(caseStudy.id)}
                cardRef={caseStudyRefs[caseStudy.id]}
              />
            ))
          ) : (
            <p className="text-center text-muted-foreground text-xl">
              No case studies found in this category yet. More coming soon!
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies; 