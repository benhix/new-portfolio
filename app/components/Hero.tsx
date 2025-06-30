// components/Hero.tsx
'use client'

import React from 'react';
import Image from "next/image";
import TypewriterEffect from "../../components/Typewriter"; // Corrected import name to match your file
// Assuming images are directly in the /public folder
// Replace with actual paths if they are in subdirectories e.g. /images/square.png
import profileImg from "@/public/square.png";
import gitImg from "@/public/github.png";
import stackImg from "@/public/techstack.png";


const Hero = () => {
    return (
        // Using <section> for semantics and applying Tailwind for basic layout.
        <section className="w-full h-full lg:-mt-10">
        <section id="hero" className="min-h-screen flex flex-col lg:flex-row justify-center items-center text-center lg:text-left py-14 px-4 lg:space-x-16 max-w-7xl mx-auto">
            {/* This div will have the wobbly border via .profile-image class from globals.css */}
            <div className="profile-image mb-6 lg:mb-0 flex-shrink-0 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 mx-auto">
                <Image
                    src={profileImg}
                    alt="profile-image"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover object-center"
                    priority // Add priority if this is your LCP image
                />
            </div>

            <div className="home-text mt-6 lg:mt-0 max-w-xl lg:ml-8"> {/* Reduced margin and made responsive */}
                {/* Typewriter component now integrated */}
                <div className="text-3xl sm:text-4xl lg:text-5xl font-semibold my-3 lg:mb-8 text-foreground font-space-grotesk text-primary mb-2 h-10 sm:h-12 lg:h-14"> {/* More responsive sizing and height */}
                    <TypewriterEffect />
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold my-3 mb-6 lg:mb-8 text-foreground font-space-grotesk">
                    Developer <span role="img" aria-label="waving hand">👋🏻</span>
                </h1>

                <p className="bio text-base sm:text-lg lg:text-xl text-muted-foreground max-w-md lg:max-w-none mx-auto lg:mx-0 mb-6 font-inter px-4 lg:px-0">
                Hi, I&apos;m Ben Hicks, a Software Engineer from Adelaide. I specialise in building fast, reliable systems for <strong>full-stack web applications, machine learning pipelines, and real-time embedded systems</strong>.{/* , with a growing focus on defence tech. */}
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
            </div>
        </section>
        </section>
    );
}

export default Hero;