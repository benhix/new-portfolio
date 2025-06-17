export interface CaseStudy {
  id: string;
  title: string;
  category: 'Process Automation' | 'Data Analysis' | 'System Optimization' | 'Quality Improvement';
  challenge: {
    description: string;
    impact: string;
    timeframe: string;
  };
  analysis: {
    findings: string[];
    rootCause: string;
  };
  decision: {
    approach: string;
    alternatives: string;
    reasoning: string;
  };
  implementation: {
    solution: string;
    tools: string[];
    timeline: string;
  };
  results: {
    metrics: {
      label: string;
      value: string;
      improvement: string;
    }[];
    lessons: string[];
  };
}

export const allCaseStudies: CaseStudy[] = [
  {
    id: 'client-onboarding-automation',
    title: 'Client Onboarding Portal Automation',
    category: 'Process Automation',
    challenge: {
      description: 'Manual client onboarding through phone calls and emails taking 1-2 hours per client with around 50+ new clients monthly',
      impact: 'Staff burnout, client frustration from poorly-timed calls, data collection errors',
      timeframe: 'Recurring bottleneck affecting 3+ staff members daily'
    },
    analysis: {
      findings: [
        'Multiple phone calls and emails required per client',
        'Information scattered across calls, emails, and manual forms',
        'Clients frustrated by interruptions during business hours',
        'Staff spending 120+ hours monthly on repetitive data collection',
        'High error rate due to manual transcription and missed details'
      ],
      rootCause: 'No self-service system for clients to submit onboarding information at their convenience'
    },
    decision: {
      approach: `Build automated client portal with ClickUp API integration and webhook synchronization. Staff use ClickUp heavily so there's minimal new training.`,
      alternatives: 'Hire additional staff vs code a completely custom dashboard for the portal vs improve manual process',
      reasoning: 'Custom portal: shifts burden to clients, integrates with existing ClickUp workflow, scalable solution'
    },
    implementation: {
      solution: 'Next.js client portal with ClickUp API integration, MongoDB storage, webhook automation, and custom URL generation allowing the client to have their own unique portal.',
      tools: ['Next.js', 'ClickUp API', 'MongoDB', 'Webhooks', 'Redis', 'REST API', 'Typescript', 'Tailwind CSS'],
      timeline: 'Ongoing development with iterative improvements based on staff and client feedback. Currently v1.0'
    },
    results: {
      metrics: [
        { label: 'Time per Client', value: '10 minutes', improvement: '90% reduction (1.5 hours saved)' },
        { label: 'Monthly Time Saved', value: '120 hours', improvement: 'Staff freed for strategic work' },
        { label: 'Client Satisfaction', value: 'High', improvement: 'Self-service convenience' }
      ],
      lessons: [
        'API documentation challenges require patience and experimentation',
        'Client and staff feedback drives iterative improvements',
        'Security considerations critical for client-facing portals',
        'Webhook automation enables seamless workflow integration'
      ]
    }
  },
  {
    id: 'reporting-compliance-automation',
    title: 'Automated Hourly Reporting System',
    category: 'Process Automation',
    challenge: {
      description: 'Hourly structured reporting requirements consuming 40+ minutes daily with strict formatting and compliance standards',
      impact: 'Disrupted deep work flow, reduced coding productivity, high cognitive load from context switching',
      timeframe: 'Daily requirement affecting development work over 12+ months'
    },
    analysis: {
      findings: [
        'Eight hourly reports plus end-of-day summary required daily',
        'Strict formatting template with specific spacing and line breaks',
        'Manual time calculations and overtime justification logic',
        'Context switching disrupted complex problem-solving sessions',
        'High risk of formatting errors affecting compliance',
        'Mental overhead from setting alarms and tracking schedule manually'
      ],
      rootCause: 'No automation for repetitive compliance tasks that required consistent formatting and time tracking'
    },
    decision: {
      approach: 'Build custom automation tool with Google Calendar integration and AI-powered note formatting',
      alternatives: 'Continue manual process vs use existing time tracking tools vs request policy change',
      reasoning: 'Custom solution maintains full compliance while eliminating repetitive work and preserving development focus'
    },
    implementation: {
      solution: 'Next.js application with Google Calendar API integration, automated formatting engine, and AI note processing',
      tools: ['Next.js', 'Google Calendar API', 'AI API', 'Client-side Logic', 'Automated Text Processing'],
      timeline: 'Few hours development in one evening, immediate deployment and daily use'
    },
    results: {
      metrics: [
        { label: 'Daily Time Saved', value: '35+ minutes', improvement: '87% reduction per day' },
        { label: 'Weekly Efficiency', value: '3+ hours', improvement: 'Freed for strategic work' },
        { label: 'Compliance Accuracy', value: '100%', improvement: 'Zero formatting errors' }
      ],
      lessons: [
        'Automation can maintain compliance while reducing cognitive burden',
        'AI integration transforms unstructured input into professional output',
        'Preserving deep work flow significantly improves technical productivity',
        'Management recognized improved consistency and reliability'
      ]
    }
  }
];

export const categories = ['Process Automation', 'Data Analysis', 'System Optimization', 'Quality Improvement'] as const; 