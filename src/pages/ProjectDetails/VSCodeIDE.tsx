import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import projectsData from '../../data/projects.json';
import ScreenshotCarousel from '../../components/ui/screenshot-carousel';

// Custom CSS for terminal cursor blinking
const terminalStyles = `
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
  .terminal-cursor {
    animation: blink 1s infinite;
  }
`;

interface Project {
    id: string;
    name: string;
    icon: string;
    subtitle: string;
    longDescription: string;
    version: string;
    category: string;
    technologies: string[];
    screenshots: string[];
    downloads: string;
    rating: number;
    reviews: number | string;
    playStoreUrl: string | null;
    appStoreUrl: string | null;
    websiteUrl: string | null;
    releaseDate: string;
    lastUpdated: string;
    fileSize?: string | null;
    minAndroidVersion?: string | null;
    minIOSVersion?: string | null;
    status: "active" | "inactive";
}

interface VSCodeIDEProps {
    selectedProjectId?: string;
    keepExplorerOpen?: boolean;
}

const VSCodeIDE: React.FC<VSCodeIDEProps> = ({ selectedProjectId, keepExplorerOpen = false }) => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [isMobileExplorerOpen, setIsMobileExplorerOpen] = useState(keepExplorerOpen);
    const [activeTerminalTab, setActiveTerminalTab] = useState('terminal');
    const [isProjectsFolderExpanded, setIsProjectsFolderExpanded] = useState(true);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [terminalCommand, setTerminalCommand] = useState('');
    const [showTerminalOutput, setShowTerminalOutput] = useState(false);
    const [isTerminalVisible, setIsTerminalVisible] = useState(false);
    const [commandExecuted, setCommandExecuted] = useState(false);
    const [showNewPrompt, setShowNewPrompt] = useState(false);
    const [showProcessingLine, setShowProcessingLine] = useState(false);
    const [hasShownMobileExplorer, setHasShownMobileExplorer] = useState(keepExplorerOpen);
    const [isMobile, setIsMobile] = useState(false);

    // Navigation function similar to Header component
    const handleNavClick = (sectionId: string) => {
        // Navigate to home page first, then scroll to section
        window.location.href = '/';
        // Use setTimeout to ensure page loads before scrolling
        setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        }, 100);
    };

    useEffect(() => {
        if (selectedProjectId) {
            // If a specific project ID is provided, select that project
            const project = projectsData.projects.find(p => p.id === selectedProjectId) as Project;
            if (project) {
                setSelectedProject(project);
            }
        } else {
            // Select first project by default
            if (projectsData.projects.length > 0) {
                setSelectedProject(projectsData.projects[0] as Project);
            }
        }
    }, [selectedProjectId]);

    // Detect mobile screen size
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Handle initial load animation
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsInitialLoad(false);
        }, 2000); // Show loading animation for 2 seconds

        return () => clearTimeout(timer);
    }, []);

    // Handle terminal animation
    useEffect(() => {
        if (!isInitialLoad && selectedProject) {
            // Show terminal after initial load (reduced by 1 second)
            const terminalTimer = setTimeout(() => {
                setIsTerminalVisible(true);

                // Start typing command after terminal is visible
                const typingTimer = setTimeout(() => {
                    const command = `app-analytics --project ${selectedProject.id}`;
                    let currentIndex = 0;

                    const typeCommand = () => {
                        if (currentIndex < command.length) {
                            setTerminalCommand(command.slice(0, currentIndex + 1));
                            currentIndex++;
                            setTimeout(typeCommand, 50); // 50ms per character
                        } else {
                            // Simulate pressing enter (move to next line)
                            setTimeout(() => {
                                setCommandExecuted(true);

                                // Show processing line with blinking cursor for 1 second
                                setTimeout(() => {
                                    setShowProcessingLine(true);

                                    // Show output after 1 second of blinking
                                    setTimeout(() => {
                                        setShowTerminalOutput(true);
                                        setShowNewPrompt(true); // Show new prompt immediately with output
                                    }, 1000); // 1 second of blinking
                                }, 100);
                            }, 500);
                        }
                    };

                    typeCommand();
                }, 800); // Start typing 800ms after terminal appears

                return () => clearTimeout(typingTimer);
            }, 2200); // Show terminal 2.2s after initial load (reduced from 3.2s)

            return () => clearTimeout(terminalTimer);
        }
    }, [isInitialLoad, selectedProject]);

    // Show mobile explorer initially to make users aware it exists
    useEffect(() => {
        if (!isInitialLoad && !hasShownMobileExplorer && isMobile) {
            // Show explorer after initial load
            setTimeout(() => {
                setIsMobileExplorerOpen(true);
                setHasShownMobileExplorer(true);

                // If keepExplorerOpen is true, don't auto-close
                if (!keepExplorerOpen) {
                    // Auto-close after 2.5 seconds with swipe animation
                    setTimeout(() => {
                        setIsMobileExplorerOpen(false);
                    }, 2500);
                }
            }, 1000);
        } else if (!isMobile) {
            setHasShownMobileExplorer(true);
        }
    }, [isInitialLoad, hasShownMobileExplorer, isMobile, keepExplorerOpen]);

    const handleProjectSelect = (project: Project) => {
        setIsLoading(true);
        setShowFullDescription(false);
        // Only close mobile explorer if keepExplorerOpen is false
        if (!keepExplorerOpen) {
            setIsMobileExplorerOpen(false);
        }
        setTimeout(() => {
            setSelectedProject(project);
            setIsLoading(false);
        }, 300);
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span
                key={i}
                className={`text-lg ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-600'}`}
            >
                ★
            </span>
        ));
    };

    const getTruncatedDescription = (description: string, maxLines: number = 3) => {
        const lines = description.split('\n');
        if (lines.length <= maxLines) {
            return description;
        }
        return lines.slice(0, maxLines).join('\n');
    };



    return (
        <motion.div
            className="h-screen bg-[#1e1e1e] text-white flex flex-col font-mono relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Add custom styles for terminal cursor */}
            <style dangerouslySetInnerHTML={{ __html: terminalStyles }} />

            {/* Loading Screen */}
            {isInitialLoad && (
                <motion.div
                    className="fixed inset-0 bg-[#1e1e1e] z-50 flex items-center justify-center"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-center">
                        <motion.div
                            className="text-4xl font-bold text-blue-400 mb-4"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Portfolio
                        </motion.div>
                        <motion.div
                            className="flex space-x-1 justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.8 }}
                        >
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    className="w-2 h-2 bg-blue-400 rounded-full"
                                    animate={{
                                        scale: [1, 1.5, 1],
                                        opacity: [0.5, 1, 0.5]
                                    }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        delay: i * 0.2
                                    }}
                                />
                            ))}
                        </motion.div>
                        <motion.div
                            className="text-gray-400 mt-4 text-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 1.2 }}
                        >
                            Loading workspace...
                        </motion.div>
                    </div>
                </motion.div>
            )}



            {/* VS Code Menu Bar */}
            <motion.div
                className="bg-[#2d2d30] h-7 flex items-center justify-between px-2 text-xs text-gray-300 border-b border-gray-700"
                initial={{ y: -28, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: isInitialLoad ? 2.4 : 0.2 }}
            >
                <div className="flex items-center space-x-4">
                    <a href="/" className="px-2 py-1 hover:bg-[#37373d] hover:text-white cursor-pointer transition-colors rounded">Home</a>
                </div>
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 text-gray-400">
                    {selectedProject?.name ? `${selectedProject.name} - Portfolio` : 'Portfolio'}
                </div>
                <div className="flex items-center space-x-1">
                    {/* Mobile Explorer Toggle Button */}
                    <button
                        onClick={() => setIsMobileExplorerOpen(!isMobileExplorerOpen)}
                        className="md:hidden flex items-center justify-center w-6 h-6 text-gray-400 hover:text-white hover:bg-[#37373d] transition-colors rounded mr-2"
                    >
                        <Menu className="w-3 h-3" />
                    </button>

                    <div className="w-5 h-5 hover:bg-gray-600 cursor-pointer flex items-center justify-center text-sm font-bold rounded">−</div>
                    <div className="w-5 h-5 hover:bg-gray-600 cursor-pointer flex items-center justify-center text-sm rounded">□</div>
                    <div className="w-5 h-5 hover:bg-red-600 cursor-pointer flex items-center justify-center text-sm rounded">×</div>
                </div>
            </motion.div>

            <motion.div
                className="flex flex-1 h-[calc(100vh-1.75rem)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: isInitialLoad ? 2.6 : 0.4 }}
            >

                {/* Left Sidebar - Explorer */}
                <motion.div
                    className={`bg-[#252526] w-64 flex flex-col border-r border-gray-700 fixed left-0 top-[1.75rem] h-[calc(100vh-1.75rem)] z-20`}
                    initial={{ x: -256, opacity: 0 }}
                    animate={{
                        x: (isMobile && !isMobileExplorerOpen) ? -256 : 0,
                        opacity: 1
                    }}
                    transition={{
                        duration: 0.3,
                        ease: isMobileExplorerOpen ? "easeOut" : "easeIn",
                        delay: isInitialLoad ? 2.4 : 0
                    }}
                >
                    <div className="bg-[#2d2d30] px-4 py-2 text-xs font-semibold text-gray-300 border-b border-gray-700">
                        EXPLORER
                    </div>

                    <div className="p-2">
                        <div
                            className="text-xs font-semibold text-gray-400 mb-2 flex items-center cursor-pointer hover:text-white transition-colors"
                            onClick={() => setIsProjectsFolderExpanded(!isProjectsFolderExpanded)}
                        >
                            <span className="mr-1 text-gray-500">
                                {isProjectsFolderExpanded ? '▼' : '▶'}
                            </span>
                            <span className="mr-1">📁</span>
                            PROJECTS
                        </div>

                        {isProjectsFolderExpanded && (
                            <div className="space-y-1">
                                {projectsData.projects.map((project) => (
                                    <motion.div
                                        key={project.id}
                                        onClick={() => handleProjectSelect(project as Project)}
                                        className={`flex items-center space-x-2 px-2 py-1 rounded cursor-pointer text-sm transition-colors ml-4 ${selectedProject?.id === project.id
                                            ? 'bg-[#37373d] text-white'
                                            : 'hover:bg-[#2a2d2e] text-gray-300'
                                            }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <img
                                            src={`${process.env.PUBLIC_URL}${project.icon}`}
                                            alt={project.name}
                                            className="w-4 h-4 object-contain"
                                        />
                                        <span className="truncate">{project.name}</span>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Overlay for mobile when explorer is open */}
                {isMobileExplorerOpen && (
                    <div
                        className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
                        onClick={() => setIsMobileExplorerOpen(false)}
                    />
                )}

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col overflow-hidden ml-0 md:ml-64">
                    {/* Tab Bar */}
                    <div className="bg-[#2d2d30] h-8 flex items-center border-b border-gray-700">
                        {selectedProject && (
                            <div className="flex items-center space-x-2 px-4 py-1 bg-[#1e1e1e] border-r border-gray-700 text-sm relative">
                                <div className="absolute top-0 left-0 right-0 h-0.5 bg-blue-500"></div>
                                <img
                                    src={`${process.env.PUBLIC_URL}${selectedProject.icon}`}
                                    alt={selectedProject.name}
                                    className="w-4 h-4 object-contain"
                                />
                                <span className="truncate">{selectedProject.name}.app</span>
                                <button className="text-gray-400 hover:text-white ml-2">×</button>
                            </div>
                        )}
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col overflow-hidden">
                        {/* App Details Area */}
                        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#1e1e1e] pb-52 md:pb-60">
                            {isLoading ? (
                                <div className="flex items-center justify-center h-full">
                                    <div className="text-blue-400">Loading project details...</div>
                                </div>
                            ) : selectedProject ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="max-w-4xl"
                                >
                                    {/* App Header */}
                                    <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
                                        <div className="w-24 h-24">
                                            <img
                                                src={`${process.env.PUBLIC_URL}${selectedProject.icon}`}
                                                alt={selectedProject.name}
                                                className="w-full h-full object-contain rounded-2xl"
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <h1 className="text-3xl font-bold text-white mb-2">
                                                {selectedProject.name}
                                            </h1>
                                            <p className="text-lg text-gray-300 mb-3">
                                                {selectedProject.subtitle}
                                            </p>
                                            <div className="flex items-center space-x-4 mb-4">
                                                <span className="px-3 py-1 bg-blue-600 text-xs rounded-full">
                                                    {selectedProject.category}
                                                </span>
                                                <span className="text-sm text-gray-400">
                                                    v{selectedProject.version}
                                                </span>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex flex-wrap gap-3 pt-4">
                                                {selectedProject.playStoreUrl && (
                                                    <a
                                                        href={selectedProject.playStoreUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="hover:scale-105 transition-transform"
                                                    >
                                                        <img
                                                            src={`${process.env.PUBLIC_URL}/images/playstore.png`}
                                                            alt="Get it on Google Play"
                                                            className="h-10 w-auto object-contain"
                                                        />
                                                    </a>
                                                )}
                                                {selectedProject.appStoreUrl && (
                                                    <a
                                                        href={selectedProject.appStoreUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="hover:scale-105 transition-transform"
                                                    >
                                                        <img
                                                            src={`${process.env.PUBLIC_URL}/images/appstore.svg`}
                                                            alt="Download on the App Store"
                                                            className="h-10 w-auto object-contain"
                                                        />
                                                    </a>
                                                )}
                                                {selectedProject.websiteUrl && (
                                                    <a
                                                        href={selectedProject.websiteUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors text-white"
                                                    >
                                                        Website
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* App Analytics Section */}
                                    <div className="mb-8">
                                        <h2 className="text-xl font-semibold text-white mb-4">App Analytics</h2>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                            <div className="bg-[#2d2d30] p-4 rounded-lg">
                                                <div className="text-2xl font-bold text-blue-400">{selectedProject.downloads}</div>
                                                <div className="text-sm text-gray-400">Downloads</div>
                                            </div>
                                            <div className="bg-[#2d2d30] p-4 rounded-lg">
                                                <div className="text-2xl font-bold text-yellow-400">{selectedProject.rating}/5.0</div>
                                                <div className="text-sm text-gray-400">Rating</div>
                                            </div>
                                            <div className="bg-[#2d2d30] p-4 rounded-lg">
                                                <div className="text-2xl font-bold text-green-400">{typeof selectedProject.reviews === 'number' ? selectedProject.reviews.toLocaleString() : selectedProject.reviews}</div>
                                                <div className="text-sm text-gray-400">Reviews</div>
                                            </div>
                                            <div className="bg-[#2d2d30] p-4 rounded-lg">
                                                <div className={`text-2xl font-bold ${selectedProject.status === 'active' ? 'text-green-400' : 'text-red-400'}`}>
                                                    {selectedProject.status === 'active' ? 'Active' : 'Inactive'}
                                                </div>
                                                <div className="text-sm text-gray-400">Status</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Screenshots Section */}
                                    <div className="mb-8">
                                        <h2 className="text-xl font-semibold text-white mb-4">Screenshots</h2>
                                        <ScreenshotCarousel
                                            screenshots={selectedProject.screenshots}
                                            projectName={selectedProject.name}
                                            cardsPerView={4}
                                        />
                                    </div>

                                    {/* Description */}
                                    <div className="mb-8">
                                        <h2 className="text-xl font-semibold text-white mb-4">About</h2>
                                        <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                                            {showFullDescription ?
                                                selectedProject.longDescription :
                                                getTruncatedDescription(selectedProject.longDescription, 3)
                                            }
                                        </div>
                                        {selectedProject.longDescription.split('\n').length > 3 && (
                                            <button
                                                onClick={() => setShowFullDescription(!showFullDescription)}
                                                className="mt-3 text-blue-400 hover:text-blue-300 text-sm underline transition-colors"
                                            >
                                                {showFullDescription ? 'View Less' : 'View More'}
                                            </button>
                                        )}
                                    </div>

                                    {/* Technologies */}
                                    <div className="mb-8">
                                        <h2 className="text-xl font-semibold text-white mb-4">Technologies Used</h2>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.technologies.map((tech, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-[#2d2d30] text-blue-400 rounded-full text-sm"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>


                                </motion.div>
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">
                                    Select a project from the explorer to view details
                                </div>
                            )}
                        </div>

                        {/* Terminal Panel - Sticky to bottom */}
                        <motion.div
                            className="bg-[#1e1e1e] border-t border-gray-700 h-44 md:h-52 flex flex-col flex-shrink-0 fixed bottom-0 left-0 md:left-64 right-0 z-20"
                            initial={{ y: 208 }}
                            animate={{ y: isTerminalVisible ? 0 : 208 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            {/* Terminal Tabs */}
                            <div className="bg-[#2d2d30] flex items-center border-b border-gray-700">
                                {[
                                    { id: 'problems', label: 'PROBLEMS', count: 0 },
                                    { id: 'output', label: 'OUTPUT' },
                                    { id: 'debug', label: 'DEBUG CONSOLE' },
                                    { id: 'terminal', label: 'TERMINAL' }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTerminalTab(tab.id)}
                                        className={`px-4 py-2 text-xs font-semibold transition-colors relative ${activeTerminalTab === tab.id
                                            ? 'text-white bg-[#1e1e1e]'
                                            : 'text-gray-400 hover:text-white hover:bg-[#37373d]'
                                            }`}
                                    >
                                        {activeTerminalTab === tab.id && (
                                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
                                        )}
                                        {tab.label}
                                        {tab.count !== undefined && (
                                            <span className="ml-1 px-1.5 py-0.5 bg-blue-600 text-white rounded-full text-xs">
                                                {tab.count}
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Terminal Content */}
                            <div className="flex-1 p-2 md:p-4 font-mono text-xs md:text-sm overflow-y-auto bg-[#1e1e1e]">
                                {activeTerminalTab === 'problems' && (
                                    <div className="text-gray-400">
                                        No problems detected in the workspace.
                                    </div>
                                )}

                                {activeTerminalTab === 'output' && (
                                    <div className="text-gray-300">
                                        <div className="text-blue-400">[Info] Output channel activated</div>
                                        <div className="text-gray-400">Build completed successfully</div>
                                    </div>
                                )}

                                {activeTerminalTab === 'debug' && (
                                    <div className="text-gray-400">
                                        Debug console ready. Start debugging to see output.
                                    </div>
                                )}

                                {activeTerminalTab === 'terminal' && (
                                    <div>
                                        {selectedProject ? (
                                            <div className="space-y-1">
                                                {/* Command line with typing animation */}
                                                <div className="text-green-400 flex items-center">
                                                    $ {terminalCommand}
                                                    {!commandExecuted && <span className="ml-1 terminal-cursor">█</span>}
                                                </div>

                                                {/* Processing line - cursor moves to next line and blinks */}
                                                {showProcessingLine && !showTerminalOutput && (
                                                    <div className="text-green-400 flex items-center">
                                                        <span className="ml-1 terminal-cursor">█</span>
                                                    </div>
                                                )}

                                                {/* Output section after processing */}
                                                {showTerminalOutput && (
                                                    <div className="space-y-1">
                                                        <div className="text-gray-300">
                                                            📱 Category: <span className="text-purple-400">{selectedProject.category}</span>
                                                        </div>
                                                        <div className="text-gray-300">
                                                            📅 Release Date: <span className="text-cyan-400">{selectedProject.releaseDate}</span>
                                                        </div>
                                                        <div className="text-gray-300">
                                                            🔄 Last Updated: <span className="text-cyan-400">{selectedProject.lastUpdated}</span>
                                                        </div>
                                                        <div className="text-gray-300">
                                                            🏷️ Version: <span className="text-green-400">v{selectedProject.version}</span>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* New prompt after output */}
                                                {showNewPrompt && (
                                                    <div className="text-green-400 flex items-center">
                                                        $ <span className="ml-1 terminal-cursor">█</span>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="text-gray-500 flex items-center">
                                                $ waiting for project selection...<span className="ml-1 terminal-cursor">█</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default VSCodeIDE; 