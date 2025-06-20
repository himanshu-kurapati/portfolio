import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import { fadeUp, stagger } from '../motion.config';

const Contact: React.FC = () => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.1 });
    const [state, handleSubmit] = useForm("myzjdzry");

    const socialLinks = [
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/himanshukurapati/',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            )
        },
        {
            name: 'Twitter',
            url: 'https://x.com/himanshukurap',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            )
        },
        {
            name: 'Instagram',
            url: 'https://www.instagram.com/himanshu_kurapati',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            )
        }
    ];

    return (
        <section id="contact" className="py-32" style={{ backgroundColor: '#272625' }} ref={containerRef}>
            <div className="max-w-6xl mx-auto px-4">

                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Let's build something <span className="gradient-text">amazing together</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        I'm always open to new opportunities—whether you're hiring, collaborating, or just curious about my work.
                        Drop me a line, and I'll respond within one business day.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* Contact Form */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="rounded-3xl p-8" style={{ backgroundColor: '#1D1C1A' }}>
                            {state.succeeded ? (
                                // Success Message (replaces only the form content)
                                <div className="text-center py-8">
                                    <div className="text-6xl mb-4">✅</div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent Successfully!</h3>
                                    <p className="text-gray-400 mb-6">Thanks for reaching out! I'll respond within one business day.</p>
                                    <button
                                        onClick={() => window.location.reload()}
                                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300"
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                // Contact Form
                                <>
                                    <div className="flex items-center space-x-2 mb-6">
                                        <span className="text-2xl">📬</span>
                                        <h3 className="text-2xl font-bold text-white">Contact Form</h3>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                                    Name <span className="text-red-400">*</span>
                                                </label>
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    required
                                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all duration-300"
                                                    placeholder="Your name"
                                                />
                                                <ValidationError prefix="Name" field="name" errors={state.errors} />
                                            </div>

                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                                    Email <span className="text-red-400">*</span>
                                                </label>
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    required
                                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all duration-300"
                                                    placeholder="your@email.com"
                                                />
                                                <ValidationError prefix="Email" field="email" errors={state.errors} />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                                                Subject
                                            </label>
                                            <select
                                                id="subject"
                                                name="subject"
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all duration-300"
                                            >
                                                <option value="">Select a subject</option>
                                                <option value="hiring">Hiring</option>
                                                <option value="collaboration">Collaboration</option>
                                                <option value="question">Question</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                                Message <span className="text-red-400">*</span>
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                rows={5}
                                                required
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all duration-300 resize-none"
                                                placeholder="Tell me about your project or inquiry..."
                                            />
                                            <ValidationError prefix="Message" field="message" errors={state.errors} />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={state.submitting}
                                            className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium rounded-xl hover:from-purple-700 hover:to-purple-800 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {state.submitting ? 'Sending...' : 'Send Message'}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        transition={{ delay: 0.4 }}
                        className="space-y-8"
                    >

                        {/* Other Ways to Connect */}
                        <motion.div variants={fadeUp}>
                            <div className="flex items-center space-x-2 mb-6">
                                <span className="text-2xl">🖇</span>
                                <h3 className="text-2xl font-bold text-white">Other Ways to Connect</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">Email</p>
                                        <a href="mailto:contact@himanshukurapati.com" className="text-purple-400 hover:text-purple-300 transition-colors">
                                            contact@himanshukurapati.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* What to Expect */}
                        <motion.div variants={fadeUp}>
                            <div className="flex items-center space-x-2 mb-4">
                                <span className="text-2xl">🕒</span>
                                <h3 className="text-xl font-bold text-white">What to Expect</h3>
                            </div>
                            <p className="text-gray-400">Response within 24 hours | Monday–Friday</p>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div variants={fadeUp}>
                            <div className="flex items-center space-x-2 mb-4">
                                <span className="text-2xl">🔗</span>
                                <h3 className="text-xl font-bold text-white">Socials</h3>
                            </div>

                            <div className="flex space-x-4">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:scale-110 transition-all duration-300"
                                        title={social.name}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact; 