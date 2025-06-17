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
        // The className "home" is from your example, assuming it's defined in front.css
        <section id="hero" className="home min-h-screen flex flex-col md:flex-row justify-center items-center text-center md:text-left py-10 px-4 md:space-x-16 max-w-7xl mx-auto">
            {/* This div will have the wobbly border via .profile-image class from globals.css */}
            <div className="profile-image mb-6 md:mb-0">
                {/*
                  Adjust width and height to the actual dimensions of your image
                  or the desired display dimensions.
                  The 'rounded-full' class from Tailwind will make it circular.
                */}
                <Image
                    src={profileImg}
                    alt="Ben Hicks - Profile"
                    width={300} // Adjusted to better fit a 30rem container, assuming 1rem = 16px. (30rem = 480px)
                    height={300} // Maintain aspect ratio for a square image
                    className="w-full h-auto object-cover object-center" // Corresponds to .profile-image img styles
                    priority // Add priority if this is your LCP image
                />
            </div>

            <div className="home-text mt-6 md:mt-0 max-w-xl ml-16"> {/* Adjusted margin for consistency and added max-width */}
                {/* Typewriter component now integrated */}
                <div className="text-3xl md:text-5xl font-semibold text-primary mb-2 h-12 md:h-14"> {/* Added height to prevent layout shift */}
                    <TypewriterEffect />
                </div>

                {/*
                  The "Developer 👋🏻" heading can be part of the typewriter,
                  or styled separately. If it's static, it can remain here.
                  Adjust styling as needed.
                */}
                <h1 className="text-4xl md:text-5xl font-semibold my-3 mb-8 text-foreground font-space-grotesk">
                    Developer <span role="img" aria-label="waving hand">👋🏻</span>
                </h1>

                <p className="bio text-lg md:text-xl text-muted-foreground max-w-md md:max-w-none mx-auto md:mx-0 mb-6 font-inter">
                Hi, I&apos;m Ben Hicks — a Software Engineer in Adelaide building fast, reliable systems across web, machine learning, and real-time applications, with a growing focus on defence tech.
                </p>

                <div className="flex justify-center md:justify-start items-center space-x-6">
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
    );
}

export default Hero;