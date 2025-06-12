// app/page.tsx
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

const projects = [
  {
    category: 'ML/AI',
    title: 'Real-Time Mandarin Pronunciation Feedback',
    summary:
      'A computer vision tool that provides real-time visual feedback on Mandarin tones using OpenCV and TensorFlow.',
    stack: ['Python', 'OpenCV', 'TensorFlow', 'Flask'],
    github: 'https://github.com/benhix/mandarin-assistant',
    demo: '',
    image: '/images/mandarin.png',
    technical: `
### Problem
Language learners struggle with Mandarin tones, especially in isolation. I wanted to build a real-time tool that provides feedback using camera input.

### Architecture
- **Frontend:** OpenCV captures live frames
- **Backend:** TensorFlow model predicts tone classification
- **Overlay UI:** Real-time feedback drawn onto video stream
- **Deployment:** Flask API locally served for testing

### Challenges
- Latency reduction for real-time video
- Training dataset for tone prediction (custom-built small dataset)
- Handling lighting variance and face positioning

### Takeaways
Learned a lot about real-time constraints, inference on CPU, and model deployment tradeoffs.
`,
  },
  {
    category: 'Systems',
    title: 'Simulated Satellite Telemetry Processor',
    summary:
      'CLI-based C++ application that simulates and processes real-time telemetry data packets from a ground station.',
    stack: ['C++', 'UDP', 'Multithreading', 'ncurses'],
    github: 'https://github.com/benhix/telemetry-cpp',
    demo: '',
    image: '/images/telemetry.png',
    technical: `
### Problem
In defence systems, telemetry data must be processed and displayed in real-time. I simulated this environment with C++ to practice working with UDP sockets and terminal UIs.

### Architecture
- **UDP Listener:** Captures data packets on a defined port
- **Parser:** Validates and converts binary packet to readable telemetry
- **Dashboard:** ncurses-powered real-time display
- **Threading:** Separated receiver and processor threads to prevent dropped packets

### Challenges
- Ensuring non-blocking I/O with safe buffer handling
- Thread safety without performance loss
- Simulating packet loss and timing to replicate real scenarios

### Takeaways
This project helped solidify my understanding of real-time C++ programming and concurrency.
`,
  },
];

export default function HomePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 px-6 py-12 text-gray-900 dark:text-white">
      <h1 className="text-4xl font-bold mb-6">Technical Projects — Ben Hicks</h1>
      <p className="mb-12 text-gray-600 dark:text-gray-400 max-w-2xl">
        These are deeper dives into projects focused on ML, real-time systems, and defence-adjacent software —
        emphasizing system architecture, problem-solving, and low-level development.
      </p>

      <div className="space-y-12">
        {projects.map((proj, i) => (
          <div
            key={proj.title}
            className="rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 p-6 shadow"
          >
            <h2 className="text-2xl font-semibold">{proj.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{proj.category}</p>
            <p className="mb-4">{proj.summary}</p>

            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              Tech Stack: {proj.stack.join(' • ')}
            </p>

            <div className="flex space-x-4 mb-4">
              {proj.github && (
                <a
                  href={proj.github}
                  target="_blank"
                  className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
                >
                  GitHub Repo
                </a>
              )}
              {proj.demo && (
                <a
                  href={proj.demo}
                  target="_blank"
                  className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
                >
                  Live Demo
                </a>
              )}
            </div>

            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="text-sm text-blue-500 hover:underline"
            >
              {openIndex === i ? 'Hide Technical Summary' : 'View Technical Summary'}
            </button>

            {openIndex === i && (
              <div className="prose dark:prose-invert mt-4">
                <div
                  dangerouslySetInnerHTML={{ __html: proj.technical.replace(/\n/g, '<br/>') }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
