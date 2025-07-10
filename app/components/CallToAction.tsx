"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import GetInTouchModal from './GetInTouchModal';

const CallToAction = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="contact" className="bg-secondary/50 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Let&apos;s connect and explore opportunities
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-muted-foreground">
            I&apos;m actively seeking new opportunities and open to discussing roles, projects, or collaborations. Feel free to reach out!
          </p>
          <div className="mt-8">
            <Button 
              variant="outline" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 md:text-lg"
              onClick={() => setIsModalOpen(true)}
            >
              Get in touch <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
      <GetInTouchModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </section>
  );
};

export default CallToAction; 