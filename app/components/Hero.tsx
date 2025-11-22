// components/Hero.tsx
'use client'

import React, { useState } from 'react';
import Image from "next/image";
import TypewriterEffect from "../../components/Typewriter";
import profileImg from "@/public/hero/cartoon-long-no-bg_v2.png";
import gitImg from "@/public/github.png";
import stackImg from "@/public/techstack.png";
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import GetInTouchModal from './GetInTouchModal';
import { useSpring, animated, useTrail } from '@react-spring/web';
import { useHover } from '@use-gesture/react';

// Animated Profile Image Component
const AnimatedProfileImage = () => {
    const [{ scale, rotateY, rotateX }, api] = useSpring(() => ({
        scale: 1,
        rotateY: 0,
        rotateX: 0,
        config: { mass: 1, tension: 280, friction: 60 }
    }));

    const bind = useHover(({ hovering, event }) => {
        if (hovering) {
            const rect = (event?.target as HTMLElement)?.getBoundingClientRect();
            if (rect) {
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const mouseX = event.clientX;
                const mouseY = event.clientY;

                // Calculate rotation based on mouse position relative to center
                const rotateYValue = ((mouseX - centerX) / rect.width) * 15;
                const rotateXValue = ((centerY - mouseY) / rect.height) * 15;

                api.start({
                    scale: 1.05,
                    rotateY: rotateYValue,
                    rotateX: rotateXValue
                });
            }
        } else {
            api.start({
                scale: 1,
                rotateY: 0,
                rotateX: 0
            });
        }
    });

    return (
        <animated.div
            {...bind()}
            style={{
                scale,
                rotateY: rotateY.to(val => `${val}deg`),
                rotateX: rotateX.to(val => `${val}deg`)
            }}
            className="profile-image mb-6 lg:mb-0 flex-shrink-0 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 mx-auto transform-gpu"
        >
            <Image
                src={profileImg}
                alt="profile-image"
                width={300}
                height={300}
                className="w-full h-full object-contain object-center"
                priority
            />
        </animated.div>
    );
};

// Animated Text Cascade Component
const AnimatedTextCascade = ({ text, className = "" }: { text: string; className?: string }) => {
    const letters = text.split('');
    const [trail, api] = useTrail(letters.length, () => ({
        opacity: 0,
        y: 20,
        config: { mass: 1, tension: 200, friction: 20 }
    }));

    React.useEffect(() => {
        // Delay the animation slightly for better UX
        const timer = setTimeout(() => {
            api.start({ opacity: 1, y: 0 });
        }, 500);
        return () => clearTimeout(timer);
    }, [api]);

    return (
        <div className={`flex ${className}`}>
            {trail.map((props, index) => (
                <animated.span
                    key={index}
                    style={props}
                    className="inline-block"
                >
                    {letters[index]}
                </animated.span>
            ))}
        </div>
    );
};

const Hero = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        // Using <section> for semantics and applying Tailwind for basic layout.
        <section className="w-full h-full lg:-mt-10">
        <section id="hero" className="min-h-screen flex flex-col lg:flex-row justify-center items-center text-center lg:text-left py-14 px-4 lg:space-x-16 max-w-7xl mx-auto">
            {/* Animated profile image with physics-based hover effects */}
            <AnimatedProfileImage />

            <div className="home-text mt-6 lg:mt-0 max-w-xl lg:ml-8"> {/* Reduced margin and made responsive */}
                {/* Typewriter component now integrated */}
                <div className="text-3xl sm:text-4xl lg:text-5xl font-semibold my-3 lg:mb-4 text-foreground font-space-grotesk text-primary mb-2 h-10 sm:h-12 lg:h-14"> {/* More responsive sizing and height */}
                    <TypewriterEffect />
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold my-3 lg:mb-4 text-foreground font-space-grotesk">
                    <AnimatedTextCascade text="Developer" /> <span role="img" aria-label="waving hand">👋🏻</span>
                </h1>

                <p className="bio text-base sm:text-lg lg:text-xl text-muted-foreground max-w-md lg:max-w-none mx-auto lg:mx-0 mb-6 font-inter px-4 lg:px-0">
                Hi, I&apos;m Ben Hicks, a Software Developer from Adelaide. I specialise in building fast, reliable systems for <strong>full-stack web applications and mobile apps</strong>.{/* , with a growing focus on defence tech. */}
                </p>

                <div className="flex justify-center lg:justify-start items-center space-x-4 sm:space-x-6">
                    <div className="gitimg">
                        <a href="https://github.com/benhix" target="_blank" rel="noopener noreferrer" title="GitHub Profile">
                            <Image
                                src={gitImg} // Using the imported image
                                alt="GitHub Profile Link"
                                width={40}
                                height={40}
                                className="hover:opacity-80 transition-opacity"
                            />
                        </a>
                    </div>
                    <div className="stackimg">
                        {/* This image could represent your tech stack visually */}
                        <Image
                            src={stackImg} // Using the imported image
                            alt="Tech Stack"
                            width={180}
                            height={48}
                            className="max-w-full h-auto hover:opacity-80 transition-opacity"
                        />
                    </div>
                </div>
                <div className="flex justify-center lg:justify-start mt-6 items-center space-x-4 sm:space-x-6">
                    <Button 
                        variant="outline" 
                        className="bg-primary text-primary-foreground hover:bg-primary/90 md:text-lg"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Get in touch <ArrowRightIcon className="w-4 h-4 ml-2" />
                    </Button>
                    <GetInTouchModal open={isModalOpen} onOpenChange={setIsModalOpen} />
                </div>
            </div>
        </section>
        </section>
    );
}

export default Hero;