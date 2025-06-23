import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { fadeUp, stagger } from '../motion.config';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'About', href: 'about', type: 'scroll' },
        { name: 'Skills', href: 'stack', type: 'scroll' },
        { name: 'Projects', href: '/projects', type: 'link' },
        { name: 'Experience', href: 'experience', type: 'scroll' },
        { name: 'Contact', href: 'contact', type: 'scroll' },
    ];

    const handleNavClick = (item: { name: string; href: string; type: string }) => {
        if (item.type === 'link') {
            navigate(item.href);
        } else {
            const element = document.getElementById(item.href);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        }
        setIsOpen(false);
    };

    return (
        <>
            <motion.header
                className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'pt-4' : 'pt-6 mb-8'
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.div
                    className={`transition-all duration-500 ${scrolled
                        ? 'max-w-4xl mx-auto px-6 bg-zinc-900/95 backdrop-blur-xl shadow-2xl border border-white/10 rounded-full'
                        : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-transparent'
                        }`}
                    layout
                >
                    <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? 'h-14' : 'h-16'
                        }`}>
                        {/* Logo */}
                        <motion.button
                            className="flex items-center space-x-3"
                            onClick={() => navigate('/')}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className={`bg-white rounded-lg flex items-center justify-center font-bold text-black text-sm shadow-lg transition-all duration-500 ${scrolled ? 'w-7 h-7' : 'w-8 h-8'
                                }`}>
                                N
                            </div>
                            <span className={`font-bold text-white tracking-tight transition-all duration-500 ${scrolled ? 'text-lg' : 'text-xl'
                                }`}>
                                Himanshu Kurapati
                            </span>
                        </motion.button>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-6">
                            {navItems.map((item, index) => (
                                <motion.button
                                    key={item.name}
                                    onClick={() => handleNavClick(item)}
                                    className={`text-gray-400 hover:text-white font-medium relative group transition-all duration-300 ${scrolled ? 'text-sm' : 'text-base'
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
                                </motion.button>
                            ))}
                        </nav>

                        {/* Desktop CTA Button */}
                        <motion.div
                            className="hidden md:flex items-center"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            <motion.button
                                onClick={() => navigate('/resume')}
                                className={`bg-white text-black hover:bg-gray-100 shadow-lg font-medium rounded-full transition-all duration-300 ${scrolled ? 'px-4 py-2 text-sm' : 'px-6 py-2.5'
                                    }`}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {scrolled ? 'Resume' : 'View Resume'}
                            </motion.button>
                        </motion.div>

                        {/* Mobile Menu Button */}
                        <motion.button
                            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
                            onClick={() => setIsOpen(!isOpen)}
                            whileTap={{ scale: 0.95 }}
                        >
                            <svg className={`fill-none stroke-current viewBox="0 0 24 24" transition-all duration-300 ${scrolled ? 'w-5 h-5' : 'w-6 h-6'
                                }`}>
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </motion.button>
                    </div>
                </motion.div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-[90] md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Menu Content */}
                        <motion.div
                            className={`absolute left-4 right-4 bg-zinc-900/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl ${scrolled ? 'top-20' : 'top-16'
                                }`}
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <motion.nav
                                className="p-6 space-y-4"
                                variants={stagger}
                                initial="hidden"
                                animate="visible"
                            >
                                {navItems.map((item, index) => (
                                    <motion.button
                                        key={item.name}
                                        onClick={() => handleNavClick(item)}
                                        className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 font-medium"
                                        variants={fadeUp}
                                        whileHover={{ x: 8 }}
                                    >
                                        {item.name}
                                    </motion.button>
                                ))}

                                <motion.div
                                    className="pt-4 border-t border-white/10"
                                    variants={fadeUp}
                                >
                                    <button
                                        onClick={() => {
                                            navigate('/resume');
                                            setIsOpen(false);
                                        }}
                                        className="block w-full text-center px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors"
                                    >
                                        View Resume
                                    </button>
                                </motion.div>
                            </motion.nav>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header; 