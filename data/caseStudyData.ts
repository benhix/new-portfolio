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
      description: 'Manual client onboarding process requiring 1-2 hours per client via phone and email, for over 50 new clients monthly.',
      impact: 'High staff burnout, client frustration from disruptive calls, and frequent data entry errors.',
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
      approach: 'Architected an automated client portal integrated with the ClickUp API, ensuring minimal training for staff already proficient with the tool.',
      alternatives: 'Hire additional staff vs code a completely custom dashboard for the portal vs improve manual process',
      reasoning: 'A custom portal was the most scalable solution, shifting the data entry burden to clients and integrating seamlessly into the existing ClickUp workflow.'
    },
    implementation: {
      solution: 'Developed a secure Next.js client portal featuring ClickUp API integration, MongoDB for data persistence, webhook-driven automation, and unique, secure URLs for each client.',
      tools: ['Next.js', 'ClickUp API', 'MongoDB', 'Webhooks', 'Redis', 'REST API', 'Typescript', 'Tailwind CSS'],
      timeline: 'Initial version developed and deployed, with ongoing iterative improvements based on staff and client feedback.'
    },
    results: {
      metrics: [
        { label: 'Time per Client', value: '10 minutes', improvement: '90% reduction (1.5 hours saved)' },
        { label: 'Monthly Time Saved', value: '120 hours', improvement: 'Staff freed for strategic work' },
        { label: 'Client Satisfaction', value: 'High', improvement: 'Self-service convenience' }
      ],
      lessons: [
        'Overcoming API documentation gaps requires patience and experimentation.',
        'Continuous improvement should be driven by direct feedback from both clients and internal users.',
        'Robust security measures are non-negotiable for client-facing portals.',
        'Webhook-based automation is key to enabling seamless, real-time workflow integration.'
      ]
    }
  },
  {
    id: 'reporting-compliance-automation',
    title: 'Automated Hourly Reporting System',
    category: 'Process Automation',
    challenge: {
      description: 'Daily requirement to submit hourly, strictly formatted compliance reports, consuming over 40 minutes of development time each day.',
      impact: 'Constant disruption of deep work, reduced coding productivity, and high cognitive load from frequent context switching.',
      timeframe: 'Daily requirement affecting development work over 12+ months'
    },
    analysis: {
      findings: [
        'Eight hourly reports plus end-of-day summary required daily',
        'Strict formatting template with specific spacing and line breaks',
        'Manual time calculations and overtime justification logic',
        'Context switching disrupted complex problem-solving sessions',
        'High risk of formatting errors affecting compliance',
        'Significant mental overhead required to manually track and meet reporting deadlines.'
      ],
      rootCause: 'Lack of an automated tool to handle a repetitive, time-sensitive, and strictly formatted compliance task.'
    },
    decision: {
      approach: 'Developed a custom automation tool integrating with the Google Calendar API and leveraging an AI model for intelligent note formatting.',
      alternatives: 'Continue manual process vs use existing time tracking tools vs request policy change',
      reasoning: 'A custom tool was the optimal solution to maintain 100% compliance while eliminating repetitive manual work and preserving development focus.'
    },
    implementation: {
      solution: 'Engineered a Next.js application that fetches calendar data, applies a rule-based formatting engine, and processes unstructured notes into compliant report entries using an AI API.',
      tools: ['Next.js', 'Google Calendar API', 'AI API', 'Client-side Logic', 'Automated Text Processing'],
      timeline: 'Developed and deployed in a single evening, providing immediate and continuous daily value.'
    },
    results: {
      metrics: [
        { label: 'Daily Time Saved', value: '35+ minutes', improvement: '87% reduction per day' },
        { label: 'Weekly Efficiency', value: '3+ hours', improvement: 'Freed for strategic work' },
        { label: 'Compliance Accuracy', value: '100%', improvement: 'Zero formatting errors' }
      ],
      lessons: [
        'Targeted automation can preserve deep work focus, significantly boosting technical productivity.',
        'AI integration is highly effective for transforming unstructured user input into structured, professional output.',
        'Well-designed automation can satisfy stringent compliance requirements while reducing cognitive load.',
        'Demonstrating improved consistency and reliability can lead to positive management recognition.'
      ]
    }
  }
];

export const categories = ['Process Automation', 'Data Analysis', 'System Optimization', 'Quality Improvement'] as const; 