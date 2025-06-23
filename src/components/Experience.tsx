import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experience } from '../data/resume';
import { fadeUp, stagger } from '../motion.config';
import { GitBranch, Calendar, Users, FileText, Copy, ExternalLink } from 'lucide-react';

const Experience: React.FC = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    // Function to calculate relative time from work period
    const calculateRelativeTime = (period: string) => {
        const endDateStr = period.split(' – ')[1] || period.split(' → ')[1];
        if (!endDateStr || endDateStr.toLowerCase().includes('present')) return 'Current position';

        // Parse different date formats
        let endDate: Date;
        if (endDateStr.includes('Dec 2023')) endDate = new Date('2023-12-31');
        else if (endDateStr.includes('Aug 2022')) endDate = new Date('2022-08-31');
        else if (endDateStr.includes('Dec 2023')) endDate = new Date('2023-12-31');
        else endDate = new Date(endDateStr);

        const now = new Date();
        const diffTime = Math.abs(now.getTime() - endDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const diffMonths = Math.floor(diffDays / 30);
        const diffYears = Math.floor(diffDays / 365);

        if (diffYears > 0) return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
        if (diffMonths > 0) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
        if (diffDays > 7) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    };

    // Generate GitHub-style commit hash
    const generateCommitHash = (index: number, company: string) => {
        const hashes = [
            '9ed4257', '7f694d8', '36f61ff', 'b6cd746', '4d3c6fb', 'd74d489'
        ];
        return hashes[index] || `${company.slice(0, 3).toLowerCase()}${Math.random().toString(16).slice(2, 5)}`;
    };

    // Enhanced experience data with GitHub-style commits
    const commitData = experience.map((exp, index) => ({
        ...exp,
        hash: generateCommitHash(index, exp.company),
        relativeTime: calculateRelativeTime(exp.period),
        commitMessage: `feat: ${exp.title} at ${exp.company}`,
        description: exp.bullets[0], // Use first bullet as main description
        files: exp.bullets.length,
        additions: Math.floor(Math.random() * 1000) + 500,
        deletions: Math.floor(Math.random() * 200) + 50,
        branch: exp.company.toLowerCase().replace(/\s+/g, '-')
    }));

    return (
        <section id="experience" className="py-32 px-4 bg-[#0d1117]" ref={ref}>
            <div className="max-w-6xl mx-auto">
                {/* GitHub-style header */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="mb-8"
                >
                    {/* Navigation tabs */}
                    <div className="border-b border-[#21262d] mb-6">
                        <nav className="flex space-x-8 text-sm">
                            <button className="py-3 px-1 border-b-2 border-[#fd7e14] text-white font-medium">
                                <FileText className="w-4 h-4 inline mr-2" />
                                Commits
                            </button>
                            <button className="py-3 px-1 text-[#8b949e] hover:text-white transition-colors">
                                <GitBranch className="w-4 h-4 inline mr-2" />
                                Branches
                            </button>
                            <button className="py-3 px-1 text-[#8b949e] hover:text-white transition-colors">
                                <Users className="w-4 h-4 inline mr-2" />
                                Contributors
                            </button>
                        </nav>
                    </div>

                    {/* Repository header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
                        <div>
                            <h2 className="text-2xl font-semibold text-white mb-2">
                                Professional Experience
                            </h2>
                            <div className="flex items-center space-x-4 text-sm text-[#8b949e]">
                                <div className="flex items-center">
                                    <GitBranch className="w-4 h-4 mr-1" />
                                    <span className="font-medium">main</span>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    <span>{commitData.length} commits</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                            <select className="bg-[#21262d] border border-[#30363d] rounded-md px-2 md:px-3 py-1.5 text-xs md:text-sm text-white w-full sm:w-auto">
                                <option>All users</option>
                                <option>himanshu-kurapati</option>
                            </select>
                            <select className="bg-[#21262d] border border-[#30363d] rounded-md px-2 md:px-3 py-1.5 text-xs md:text-sm text-white w-full sm:w-auto">
                                <option>All time</option>
                                <option>Last year</option>
                            </select>
                        </div>
                    </div>
                </motion.div>

                {/* Commits list */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={{ delay: 0.2 }}
                    className="space-y-0"
                >
                    {commitData.map((commit, index) => (
                        <motion.div
                            key={index}
                            variants={fadeUp}
                            className="group border border-[#21262d] border-t-0 first:border-t first:rounded-t-lg last:rounded-b-lg bg-[#0d1117] hover:bg-[#161b22] transition-colors duration-200"
                        >
                            <div className="p-4">
                                {/* Commit header */}
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-3">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-2 gap-1 sm:gap-0">
                                            <div className="flex items-center space-x-2">
                                                <img
                                                    src={`${process.env.PUBLIC_URL}/github_profile.png`}
                                                    alt="himanshu-kurapati"
                                                    className="w-5 h-5 rounded-full"
                                                />
                                                <span className="text-sm font-medium text-white">himanshu-kurapati</span>
                                                <span className="text-sm text-[#8b949e]">committed</span>
                                            </div>
                                            <span className="text-sm text-[#8b949e] sm:ml-0">{commit.relativeTime}</span>
                                        </div>

                                        <h3 className="text-lg font-medium text-[#58a6ff] hover:underline cursor-pointer mb-2 pr-4">
                                            {commit.commitMessage}
                                        </h3>

                                        <p className="text-[#8b949e] text-sm leading-relaxed mb-3">
                                            {commit.description}
                                        </p>

                                        {/* Achievement tags */}
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {commit.bullets.slice(1).map((achievement, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-2 py-1 bg-[#21262d] text-[#58a6ff] text-xs rounded-full border border-[#30363d] leading-tight"
                                                    title={achievement}
                                                >
                                                    {achievement}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Commit stats */}
                                        <div className="flex items-center space-x-4 text-sm text-[#8b949e]">
                                            <span className="flex items-center">
                                                <span className="w-3 h-3 bg-[#238636] rounded-sm mr-1"></span>
                                                +{commit.additions}
                                            </span>
                                            <span className="flex items-center">
                                                <span className="w-3 h-3 bg-[#da3633] rounded-sm mr-1"></span>
                                                -{commit.deletions}
                                            </span>
                                            <span>{commit.files} files changed</span>
                                        </div>
                                    </div>

                                    {/* Commit hash and actions */}
                                    <div className="flex items-center space-x-2 flex-shrink-0">
                                        <div className="flex items-center space-x-2">
                                            <code className="text-sm font-mono text-[#8b949e] bg-[#21262d] px-2 py-1 rounded">
                                                {commit.hash}
                                            </code>
                                            <button className="p-1.5 text-[#8b949e] hover:text-white hover:bg-[#21262d] rounded transition-colors">
                                                <Copy className="w-4 h-4" />
                                            </button>
                                            <button className="p-1.5 text-[#8b949e] hover:text-white hover:bg-[#21262d] rounded transition-colors">
                                                <ExternalLink className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Timeline period */}
                                <div className="text-xs text-[#8b949e] bg-[#21262d] inline-block px-2 py-1 rounded mt-2">
                                    📅 {commit.period}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Load more button */}
                <motion.div
                    className="text-center mt-8"
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={{ delay: 0.6 }}
                >
                    <button className="px-4 py-2 bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] rounded-md text-white text-sm transition-colors">
                        Load more commits...
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default Experience; 