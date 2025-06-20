import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Link } from 'react-router-dom';

interface Project {
    name: string;
    slug: string;
    role: string;
    period?: string;
    brief: string;
    bullets?: string[];
    url?: string;
    tech?: string[];
    status?: string;
    achievements?: string[];
    big: boolean;
}

interface ProjectCardProps {
    project: Project;
    index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
    const shouldShowInline = !project.big ||
        (project.brief.length < 200 && (!project.bullets || project.bullets.length <= 3));

    const cardContent = (
        <motion.div
            className="glass-card p-6 h-full hover-glow group"
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            custom={index}
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                        {project.name}
                    </h3>
                    {project.status && (
                        <span className="inline-block px-2 py-1 bg-secondary/20 text-secondary text-xs rounded-full mt-1">
                            {project.status}
                        </span>
                    )}
                </div>
                {project.url && (
                    <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary hover:text-primary transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                )}
            </div>

            <div className="flex items-center justify-between mb-3">
                <p className="text-secondary font-medium">{project.role}</p>
                {project.period && (
                    <span className="text-gray-500 text-sm">{project.period}</span>
                )}
            </div>

            <p className="text-gray-300 mb-4 leading-relaxed">{project.brief}</p>

            {shouldShowInline && project.bullets && (
                <ul className="space-y-2 mb-4">
                    {project.bullets.map((bullet, bulletIndex) => (
                        <li key={bulletIndex} className="text-gray-400 text-sm flex items-start">
                            <span className="text-primary mr-2 mt-1.5 w-1 h-1 rounded-full bg-primary flex-shrink-0"></span>
                            {bullet}
                        </li>
                    ))}
                </ul>
            )}

            {project.tech && project.tech.length > 0 && (
                <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 4).map((tech, techIndex) => (
                            <span
                                key={techIndex}
                                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md border border-primary/20"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.tech.length > 4 && (
                            <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded-md">
                                +{project.tech.length - 4}
                            </span>
                        )}
                    </div>
                </div>
            )}

            {project.achievements && project.achievements.length > 0 && shouldShowInline && (
                <div className="mb-4">
                    <h4 className="text-secondary text-sm font-medium mb-2">Key Achievements:</h4>
                    <div className="flex flex-wrap gap-1">
                        {project.achievements.map((achievement, achIndex) => (
                            <span
                                key={achIndex}
                                className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-md"
                            >
                                {achievement}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {!shouldShowInline && (
                <Link
                    to={`/project/${project.slug}`}
                    className="inline-flex items-center text-primary hover:text-secondary transition-colors font-medium"
                >
                    More details
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            )}
        </motion.div>
    );

    return (
        <Tilt
            glareEnable={true}
            glareMaxOpacity={0.1}
            glareColor="#7f5af0"
            glarePosition="all"
            glareBorderRadius="12px"
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            scale={1.02}
            className="transform-gpu h-full"
        >
            {cardContent}
        </Tilt>
    );
};

export default ProjectCard; 