import React from 'react';
import { motion } from 'framer-motion';
import { experience } from '../data/resume';
import { fadeStagger, fadeInUp } from '../motion.config';

const Experience: React.FC = () => {
    return (
        <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
            <motion.div
                variants={fadeStagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="text-center mb-16"
            >
                <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold gradient-text mb-4">
                    Experience
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-gray-400 text-lg max-w-2xl mx-auto">
                    My professional journey building solutions that matter
                </motion.p>
            </motion.div>

            <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary"></div>

                <motion.div
                    variants={fadeStagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                    className="space-y-12"
                >
                    {experience.map((exp, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                }`}
                        >
                            {/* Timeline dot */}
                            <motion.div
                                className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-dark z-10"
                                whileHover={{ scale: 1.3 }}
                                transition={{ duration: 0.2 }}
                            />

                            {/* Content card */}
                            <div className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                                <motion.div
                                    className="glass-card p-6 hover-glow"
                                    whileHover={{ y: -6 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                                        <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                                        <span className="text-primary font-medium">{exp.period}</span>
                                    </div>

                                    <h4 className="text-secondary font-semibold mb-4">{exp.company}</h4>

                                    <ul className="space-y-2">
                                        {exp.bullets.map((bullet, bulletIndex) => (
                                            <li key={bulletIndex} className="text-gray-300 flex items-start">
                                                <span className="text-primary mr-2 mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                                                {bullet}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Experience; 