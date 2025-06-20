import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeUp, stagger } from '../motion.config';
import { Win98Button } from './ui/win-98-button';
import { Minus, Square, X, FolderOpen } from 'lucide-react';

// Import project banner images
import jobSculptorBanner from '../assets/images/projects/jobsculptor_banner.png';
import teslaBanner from '../assets/images/projects/tesla_banner.jpg';
import xbladeBanner from '../assets/images/projects/xblade_banner.jpg';

// Import cursor images
import mouseArrow from '../assets/images/icons/mouse_arrow.png';
import mouseHand from '../assets/images/icons/mouse_hand.png';

const Projects: React.FC = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const projectItems = [
        {
            title: "JobSculptor",
            subtitle: "AI-Powered Job-Application Manager",
            description: "An intuitive interface for effortless job application management while incorporating AI-driven assistance. Built with React Native Expo and powered by Supabase for seamless data management.",
            tags: ["Research", "AI Integration", "Full-Stack Development", "React Native"],
            image: jobSculptorBanner,
            link: "#",
            fileName: "jobsculptor.exe"
        },
        {
            title: "Tesla Off-Road",
            subtitle: "Mobile 4×4 EV Adventure",
            description: "An intuitive interface for effortless gaming experience while incorporating realistic physics and monetization. Achieved 100K+ downloads with engaging gameplay and smooth performance.",
            tags: ["Game Programming", "Unity", "Monetization", "Level Design"],
            image: teslaBanner,
            link: "#",
            fileName: "tesla_offroad.exe"
        },
        {
            title: "X-Blade",
            subtitle: "Arcade Action Shooter",
            description: "An intuitive interface for effortless arcade gaming while incorporating rewarded ads and leaderboards. Features stunning VFX and competitive gameplay mechanics.",
            tags: ["Lead Programming", "Unity", "VFX", "Game Center"],
            image: xbladeBanner,
            link: "#",
            fileName: "xblade_game.exe"
        }
    ];

    const handleWindowAction = (action: string, projectTitle: string) => {
        // No actual functionality, just for authentic feel
        console.log(`${action} clicked for ${projectTitle}`);
    };

    useEffect(() => {
        // Test if cursor images are accessible
        const testArrow = new Image();
        const testHand = new Image();

        testArrow.onload = () => console.log('Arrow cursor image loaded successfully');
        testArrow.onerror = () => console.error('Failed to load arrow cursor image');
        testArrow.src = '/mouse_arrow_24.png';

        testHand.onload = () => console.log('Hand cursor image loaded successfully');
        testHand.onerror = () => console.error('Failed to load hand cursor image');
        testHand.src = '/mouse_hand_24.png';
    }, []);

    return (
        <section
            id="projects"
            className="py-32 projects-section"
            style={{
                backgroundColor: '#c0c0c0',
                cursor: 'url(/mouse_arrow_24.png) 2 2, auto'
            }}
            ref={ref}
        >
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black font-mono">
                        Featured <span className="text-[#000080]">Projects</span>
                    </h2>
                    <p className="text-black text-lg max-w-2xl mx-auto font-mono">
                        A showcase of applications and games that have reached thousands of users worldwide
                    </p>
                </motion.div>

                {/* Windows 98 Style Project Windows */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={{ delay: 0.2 }}
                    className="space-y-12"
                >
                    {projectItems.map((project, i) => (
                        <motion.div
                            key={`project_${i}`}
                            variants={fadeUp}
                            className="w-full"
                        >
                            {/* Windows 98 Window */}
                            <div className="bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] shadow-lg">
                                {/* Title Bar */}
                                <div className="bg-gradient-to-r from-[#0054E3] to-[#0044D3] text-white px-2 py-1 flex justify-between items-center">
                                    <div className="flex items-center space-x-2">
                                        <FolderOpen className="w-4 h-4" />
                                        <span className="font-bold text-sm">{project.fileName}</span>
                                    </div>
                                    <div className="flex space-x-1">
                                        {/* Window Controls with Win98Button */}
                                        <Win98Button
                                            onClick={() => handleWindowAction('minimize', project.title)}
                                            className="!w-4 !h-4 !min-w-0 !p-0 win98-button"
                                            style={{ cursor: 'url(/mouse_hand_24.png) 2 2, pointer' }}
                                        >
                                            <Minus className="w-2 h-2 text-black" />
                                        </Win98Button>
                                        <Win98Button
                                            onClick={() => handleWindowAction('maximize', project.title)}
                                            className="!w-4 !h-4 !min-w-0 !p-0 win98-button"
                                            style={{ cursor: 'url(/mouse_hand_24.png) 2 2, pointer' }}
                                        >
                                            <Square className="w-2 h-2 text-black" />
                                        </Win98Button>
                                        <Win98Button
                                            onClick={() => handleWindowAction('close', project.title)}
                                            className="!w-4 !h-4 !min-w-0 !p-0 win98-button"
                                            style={{ cursor: 'url(/mouse_hand_24.png) 2 2, pointer' }}
                                        >
                                            <X className="w-2 h-2 text-black" />
                                        </Win98Button>
                                    </div>
                                </div>

                                {/* Window Content */}
                                <div className="p-6">
                                    <div className="grid lg:grid-cols-2 gap-8 items-start">
                                        {/* Left Content */}
                                        <div className="space-y-4">
                                            <div className="border border-[#808080] border-t-[#404040] border-l-[#404040] p-4 bg-white">
                                                <h3 className="text-2xl md:text-3xl font-bold text-black mb-2 font-mono">
                                                    {project.title}
                                                </h3>
                                                <h4 className="text-lg text-[#000080] font-semibold mb-3 font-mono">
                                                    {project.subtitle}
                                                </h4>
                                                <p className="text-black text-sm leading-relaxed font-mono">
                                                    {project.description}
                                                </p>
                                            </div>

                                            {/* Tags in Windows 98 style */}
                                            <div className="border border-[#808080] border-t-[#404040] border-l-[#404040] p-3 bg-[#f0f0f0]">
                                                <div className="text-xs font-bold text-black mb-2 font-mono">TECHNOLOGIES:</div>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.tags.map((tag, tagIndex) => (
                                                        <div
                                                            key={tagIndex}
                                                            className="px-2 py-1 text-xs font-mono text-black bg-white border border-[#808080] border-t-white border-l-white border-r-[#404040] border-b-[#404040]"
                                                        >
                                                            {tag}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* View Project Button */}
                                            <div className="flex items-center space-x-3">
                                                <Win98Button
                                                    onClick={() => window.open(project.link, '_blank')}
                                                    className="text-black win98-button"
                                                    style={{ cursor: 'url(/mouse_hand_24.png) 2 2, pointer' }}
                                                >
                                                    View Project
                                                </Win98Button>
                                                <a
                                                    href={project.link}
                                                    className="text-[#0000EE] underline text-sm font-mono hover:text-[#FF00FF] transition-colors"
                                                    style={{ cursor: 'url(/mouse_hand_24.png) 2 2, pointer' }}
                                                >
                                                    {project.link === "#" ? "https://example.com/project" : project.link}
                                                </a>
                                            </div>
                                        </div>

                                        {/* Right Image */}
                                        <div className="order-first lg:order-last">
                                            <div className="border-2 border-[#808080] border-t-[#404040] border-l-[#404040] p-1 bg-[#c0c0c0]">
                                                <div className="border border-[#000000] bg-white p-2">
                                                    <img
                                                        className="w-full h-auto object-cover"
                                                        src={project.image}
                                                        alt={project.title}
                                                        style={{ imageRendering: 'pixelated' }}
                                                    />
                                                </div>
                                                {/* Image Caption */}
                                                <div className="text-center mt-2">
                                                    <div className="text-xs font-mono text-black bg-white border border-[#808080] px-2 py-1 inline-block">
                                                        {project.title}_screenshot.bmp
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Status Bar */}
                                <div className="border-t border-[#808080] bg-[#c0c0c0] px-3 py-1 text-xs font-mono text-black flex justify-between">
                                    <span>Ready</span>
                                    <span>{new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Projects; 