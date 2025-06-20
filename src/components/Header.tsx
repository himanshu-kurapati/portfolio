import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { fadeUp } from '../motion.config';
import { AnimatePresence } from 'framer-motion';
import { stagger } from '../motion.config';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 100;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#stack' },
        { name: 'Projects', href: '#projects' },
        { name: 'Experience', href: '#experience' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <motion.header
            className={`fixed top-0 z-50 transition-all duration-500 ${scrolled
                ? 'left-0 right-0 w-full flex justify-center'
                : 'left-0 right-0 w-full'
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className={`transition-all duration-500 ease-in-out ${scrolled
                ? 'mt-4'
                : 'w-full'
                }`}>
                <div className={`transition-all duration-500 ease-in-out ${scrolled
                    ? 'bg-zinc-900/95 backdrop-blur-xl rounded-full px-6 py-3 shadow-2xl border border-white/10'
                    : 'bg-transparent px-4 py-0 max-w-7xl mx-auto w-full'
                    }`}>
                    <div className={`flex items-center transition-all duration-500 ${scrolled ? 'justify-center gap-6 h-12' : 'justify-between h-20'
                        }`}>

                        {/* Logo */}
                        {!scrolled && (
                            <motion.div
                                className="flex items-center space-x-3"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-bold text-black text-sm shadow-lg">
                                    N
                                </div>
                                <span className="text-xl font-bold text-white tracking-tight">
                                    Himanshu Kurapati
                                </span>
                            </motion.div>
                        )}

                        {/* Desktop Navigation */}
                        <nav className={`hidden md:flex items-center transition-all duration-500 ${scrolled ? 'space-x-6' : 'space-x-8'
                            }`}>
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    className={`transition-all duration-300 font-medium relative group ${scrolled
                                        ? 'text-gray-300 hover:text-white text-sm'
                                        : 'text-gray-400 hover:text-white text-base'
                                        }`}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 + 0.5 }}
                                    whileHover={{ y: -2 }}
                                >
                                    {item.name}
                                    <motion.div
                                        className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"
                                    />
                                </motion.a>
                            ))}
                        </nav>

                        {/* CTA Button */}
                        {!scrolled && (
                            <motion.div
                                className="hidden md:flex items-center space-x-4"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8 }}
                            >
                                <motion.a
                                    href="/resume.pdf"
                                    download="Himanshu_Kurapati_Resume.pdf"
                                    className="px-6 py-2.5 bg-white text-black hover:bg-gray-100 shadow-lg font-medium rounded-full transition-all duration-300"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Download Resume
                                </motion.a>
                            </motion.div>
                        )}

                        {/* Mobile Menu Button */}
                        <motion.button
                            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
                            onClick={() => setIsOpen(!isOpen)}
                            whileTap={{ scale: 0.95 }}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </motion.button>
                    </div>

                    {/* Mobile Menu */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                className="md:hidden border-t border-white/10 mt-4"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.nav
                                    className="py-6 space-y-4"
                                    variants={stagger}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {navItems.map((item, index) => (
                                        <motion.a
                                            key={item.name}
                                            href={item.href}
                                            className="block px-4 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300"
                                            variants={fadeUp}
                                            onClick={() => setIsOpen(false)}
                                            whileHover={{ x: 10 }}
                                        >
                                            {item.name}
                                        </motion.a>
                                    ))}

                                    <motion.div
                                        className="px-4"
                                        variants={fadeUp}
                                    >
                                        <a
                                            href="/resume.pdf"
                                            download="Himanshu_Kurapati_Resume.pdf"
                                            className="block w-full text-center px-6 py-3 bg-white text-black font-medium rounded-full"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Download Resume
                                        </a>
                                    </motion.div>
                                </motion.nav>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.header>
    );
};

export default Header; 