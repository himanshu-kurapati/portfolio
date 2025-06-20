import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useParams, Link, Navigate } from 'react-router-dom';
import { projects } from '../../data/resume';
import { containerVariants, itemVariants } from '../../motion.config';

const ProjectDetails: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { scrollYProgress } = useScroll();
    const progressBarWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    const project = projects.find(p => p.slug === slug);

    if (!project) {
        return <Navigate to="/" replace />;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-dark text-gray-200"
        >
            {/* Progress bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary z-50"
                style={{ scaleX: progressBarWidth, transformOrigin: '0%' }}
            />

            <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                {/* Back button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <Link
                        to="/"
                        className="inline-flex items-center text-primary hover:text-secondary transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Portfolio
                    </Link>
                </motion.div>

                {/* Project header */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="mb-12"
                >
                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl md:text-5xl font-bold gradient-text mb-4"
                    >
                        {project.name}
                    </motion.h1>

                    <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-6">
                        <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                            {project.role}
                        </span>
                        {project.url && (
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm font-medium hover:bg-secondary/30 transition-colors inline-flex items-center"
                            >
                                Live Project
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        )}
                    </motion.div>

                    <motion.p
                        variants={itemVariants}
                        className="text-xl text-gray-300 leading-relaxed"
                    >
                        {project.brief}
                    </motion.p>
                </motion.div>

                {/* Project details */}
                {project.bullets && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="glass-card p-8 mb-12"
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-2xl font-bold text-white mb-6"
                        >
                            Key Features & Achievements
                        </motion.h2>

                        <motion.ul variants={containerVariants} className="space-y-4">
                            {project.bullets.map((bullet, index) => (
                                <motion.li
                                    key={index}
                                    variants={itemVariants}
                                    className="flex items-start text-gray-300"
                                >
                                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-4 flex-shrink-0" />
                                    <span className="leading-relaxed">{bullet}</span>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                )}

                {/* Technical details placeholder */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid md:grid-cols-2 gap-8 mb-12"
                >
                    <motion.div variants={itemVariants} className="glass-card p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Technologies Used</h3>
                        <div className="flex flex-wrap gap-2">
                            {getProjectTechnologies(project.slug).map((tech, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-gray-700 text-gray-200 rounded-full text-sm"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="glass-card p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Project Timeline</h3>
                        <p className="text-gray-300">
                            {getProjectTimeline(project.slug)}
                        </p>
                    </motion.div>
                </motion.div>

                {/* Call to action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="text-center"
                >
                    <h3 className="text-2xl font-bold text-white mb-4">
                        Interested in similar work?
                    </h3>
                    <Link
                        to="/#contact"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                    >
                        Get in touch
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </motion.div>
            </div>
        </motion.div>
    );
};

// Helper functions for project-specific data
const getProjectTechnologies = (slug: string): string[] => {
    const project = projects.find(p => p.slug === slug);
    return project?.tech || ['React', 'TypeScript', 'Node.js'];
};

const getProjectTimeline = (slug: string): string => {
    const project = projects.find(p => p.slug === slug);
    if (project?.period) {
        return `Development period: ${project.period}`;
    }
    if (project?.status) {
        return `Status: ${project.status}`;
    }
    return '3-6 months development cycle';
};

export default ProjectDetails; 