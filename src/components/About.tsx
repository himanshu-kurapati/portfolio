import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { stagger, fadeUp } from '../motion.config';
import { Typewriter } from './ui/typewriter';
import astroIcon from '../assets/images/icons/astro.png';
import teslaIcon from '../assets/images/icons/tesla.png';
import jobSculptorIcon from '../assets/images/icons/jobsculptor.png';
import xBladeIcon from '../assets/images/icons/x-blade.png';

const About: React.FC = () => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.1 });
    const [currentCard, setCurrentCard] = useState(0);

    const achievements = [
        {
            title: "Professional Experience",
            items: [
                { label: "Company", value: "Capgemini", color: "text-blue-400" },
                { label: "Impact", value: "15% Downtime Reduction", color: "text-green-400" },
                { label: "Focus", value: "Salesforce Lightning", color: "text-purple-400" }
            ]
        },
        {
            title: "Game Development",
            items: [
                { label: "Tesla Off-Road", value: "100K+ Downloads", color: "text-green-400" },
                { label: "X-Blade", value: "Market Success", color: "text-blue-400" },
                { label: "Platform", value: "Unity Engine", color: "text-purple-400" }
            ]
        },
        {
            title: "Freelance Success",
            items: [
                { label: "Completed", value: "70+ Gigs", color: "text-green-400" },
                { label: "Rating", value: "★★★★★ (5.0)", color: "text-yellow-400" },
                { label: "Platform", value: "Fiverr", color: "text-blue-400" }
            ]
        },
        {
            title: "Latest Project",
            items: [
                { label: "Job Sculptor", value: "AI Job Tracker", color: "text-primary" },
                { label: "Platform", value: "iOS & Android", color: "text-green-400" },
                { label: "Tech Stack", value: "React Native + Supabase", color: "text-blue-400" }
            ]
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentCard((prev) => (prev + 1) % achievements.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const handleDotClick = (index: number) => {
        setCurrentCard(index);
    };

    return (
        <section id="about" className="py-32 relative overflow-hidden" style={{ backgroundColor: '#010101' }} ref={containerRef}>
            {/* Subtle Matrix Background */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full">
                    {Array.from({ length: 30 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute text-green-400 text-xs font-mono"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                opacity: [0, 0.3, 0],
                                y: [0, 20, 0],
                            }}
                            transition={{
                                duration: 5 + Math.random() * 3,
                                repeat: Infinity,
                                delay: Math.random() * 5,
                            }}
                        >
                            {Math.random() > 0.5 ? '01' : '10'}
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Content Side - Clean Terminal Style */}
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="order-2 lg:order-1"
                    >
                        {/* Terminal Header */}
                        <motion.div variants={fadeUp} className="mb-8">
                            <div className="bg-gray-900 rounded-t-lg border border-gray-700">
                                <div className="flex items-center px-4 py-3 border-b border-gray-700">
                                    <div className="flex space-x-2">
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    </div>
                                    <div className="ml-4 text-gray-400 text-sm font-mono">
                                        ~/portfolio/about-me
                                    </div>
                                </div>
                            </div>

                            {/* Terminal Content */}
                            <div className="bg-black rounded-b-lg border-l border-r border-b border-gray-700 p-6">
                                <div className="text-green-400 mb-2 font-mono text-sm">
                                    <span className="text-blue-400">$</span> cat about.md
                                </div>
                                <div className="text-purple-400 mb-6 font-mono text-sm">
                                    <span className="text-gray-500"># </span>
                                    <Typewriter
                                        text={["ABOUT_HIMANSHU.MD", "DEVELOPER_PROFILE.JS", "STACK_OVERVIEW.TS"]}
                                        speed={100}
                                        waitTime={2500}
                                        className="text-purple-400"
                                        cursorChar="_"
                                    />
                                </div>

                                {/* Clear, readable content */}
                                <div className="space-y-6 text-gray-300 leading-relaxed">
                                    <div className="text-white">
                                        <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                                            Building the Future with
                                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Code & Design</span>
                                        </h2>
                                    </div>

                                    <p className="text-lg">
                                        I'm <strong className="text-white">Himanshu Kurapati</strong>—founder of
                                        <strong className="text-primary"> Astro Gamers</strong> and a developer who combines
                                        game-level polish with full-stack precision.
                                    </p>

                                    <div className="bg-gray-900/50 rounded-lg p-4 border-l-4 border-primary">
                                        <p className="text-gray-300">
                                            <strong className="text-secondary">Capgemini:</strong> Reduced Salesforce Lightning downtime by
                                            <strong className="text-green-400"> 15%</strong>, proving that careful engineering protects the bottom line.
                                        </p>
                                    </div>

                                    <div className="bg-gray-900/50 rounded-lg p-4 border-l-4 border-secondary">
                                        <p className="text-gray-300">
                                            <strong className="text-primary">Game Development:</strong> Shipped
                                            <strong className="text-white"> Tesla Off-Road</strong> (100K+ downloads) and
                                            <strong className="text-white"> X-Blade</strong>—turning side projects into market success.
                                        </p>
                                    </div>

                                    <div className="bg-gray-900/50 rounded-lg p-4 border-l-4 border-accent">
                                        <p className="text-gray-300">
                                            <strong className="text-accent">Freelance:</strong> Delivered
                                            <strong className="text-green-400"> 70+ Unity gigs</strong> on Fiverr
                                            with a perfect <strong className="text-yellow-400">★★★★★</strong> rating.
                                        </p>
                                    </div>

                                    <p className="text-lg">
                                        Latest project: <strong className="text-primary">Job Sculptor</strong>—an AI-powered
                                        job tracker built with <strong className="text-secondary">React Native Expo</strong>,
                                        <strong className="text-green-400"> Supabase</strong>, and <strong className="text-blue-400">n8n</strong>.
                                    </p>
                                </div>

                                <div className="mt-6 text-green-400 font-mono text-sm">
                                    <span className="text-blue-400">$</span>
                                    <motion.span
                                        animate={{ opacity: [1, 0, 1] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                        className="ml-1"
                                    >
                                        _
                                    </motion.span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Visual Side - Clean Achievement Cards */}
                    <motion.div
                        className="order-1 lg:order-2 relative"
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="relative">
                            {/* Main Achievement Card */}
                            <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden min-h-[400px]">
                                {/* Card Header */}
                                <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-white font-semibold text-lg">
                                            {achievements[currentCard].title}
                                        </h3>
                                        <div className="flex space-x-1">
                                            {achievements.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleDotClick(index)}
                                                    className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 focus:outline-none ${index === currentCard
                                                        ? 'bg-primary shadow-lg shadow-primary/30'
                                                        : 'bg-gray-600 hover:bg-gray-500'
                                                        }`}
                                                    aria-label={`View ${achievements[index].title}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="p-6">
                                    <motion.div
                                        key={currentCard}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="space-y-6"
                                    >
                                        {achievements[currentCard].items.map((item, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="flex justify-between items-center p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                                            >
                                                <span className="text-gray-400 font-medium">
                                                    {item.label}
                                                </span>
                                                <span className={`font-bold text-lg ${item.color}`}>
                                                    {item.value}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </div>
                            </div>

                            {/* Project Icons - Simplified */}
                            <div className="absolute -top-6 -right-6 flex space-x-2">
                                {[
                                    { icon: astroIcon, name: "Astro", delay: 0.3 },
                                    { icon: teslaIcon, name: "Tesla", delay: 0.5 },
                                    { icon: jobSculptorIcon, name: "JobSculptor", delay: 0.7 },
                                    { icon: xBladeIcon, name: "X-Blade", delay: 0.9 },
                                ].map((project, index) => (
                                    <motion.div
                                        key={index}
                                        className="w-10 h-10 bg-gray-800 rounded-lg border border-gray-600 p-2 backdrop-blur-sm"
                                        initial={{ opacity: 0, scale: 0, y: -20 }}
                                        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0, y: -20 }}
                                        transition={{ delay: project.delay, type: "spring" }}
                                        whileHover={{ scale: 1.1, y: -5 }}
                                    >
                                        <img
                                            src={project.icon}
                                            alt={project.name}
                                            className="w-full h-full object-contain"
                                        />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Subtle Tech Icons */}
                            <div className="absolute -bottom-4 -left-4 space-x-2 flex">
                                {['React', 'Unity', 'TS', 'JS'].map((tech, index) => (
                                    <motion.div
                                        key={tech}
                                        className="px-3 py-1 bg-gray-800/80 rounded-full border border-gray-600 text-xs font-mono text-gray-400"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                        transition={{ delay: 1 + index * 0.1 }}
                                        whileHover={{ scale: 1.05, color: '#7f5af0' }}
                                    >
                                        {tech}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Subtle Background Elements */}
                            <motion.div
                                className="absolute top-1/4 -left-8 w-4 h-4 bg-primary/20 rounded-full"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.2, 0.4, 0.2],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                            <motion.div
                                className="absolute bottom-1/4 -right-8 w-3 h-3 bg-secondary/20 rounded-full"
                                animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.3, 0.5, 0.3],
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 2,
                                }}
                            />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default About; 