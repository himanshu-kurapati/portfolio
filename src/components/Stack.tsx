import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeUp } from '../motion.config';

type SkillsTableRow = {
    id: number;
    skill_name: string;
    category: string;
    experience_level: string;
};

type ProjectsTableRow = {
    id: number;
    project_name: string;
    technology: string;
    downloads: string;
    status: string;
};

type ExperienceTableRow = {
    id: number;
    company: string;
    achievement: string;
    duration: string;
    impact: string;
};

type QueryStatus = 'idle' | 'running' | 'completed';

type Tab = {
    id: string;
    name: string;
    tableName: string;
    query: string;
    description: string;
    status: QueryStatus;
    headers: string[];
    data: (string | number)[][];
};

const Stack: React.FC = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const [activeTabId, setActiveTabId] = useState('developer_skills');

    const skillsTable: SkillsTableRow[] = [
        { id: 1, skill_name: "React Native", category: "Mobile", experience_level: "Expert" },
        { id: 2, skill_name: "Unity", category: "GameDev", experience_level: "Expert" },
        { id: 3, skill_name: "TypeScript", category: "Web", experience_level: "Advanced" },
        { id: 4, skill_name: "Supabase", category: "Backend", experience_level: "Production" },
        { id: 5, skill_name: "Firebase", category: "Backend", experience_level: "Production" },
        { id: 6, skill_name: "C#", category: "GameDev", experience_level: "Advanced" },
        { id: 7, skill_name: "Expo", category: "Mobile", experience_level: "Expert" },
        { id: 8, skill_name: "Git", category: "Tools", experience_level: "Expert" }
    ];

    const projectsTable: ProjectsTableRow[] = [
        { id: 1, project_name: "Tesla Off-Road", technology: "Unity, C#", downloads: "100K+", status: "SHIPPED" },
        { id: 2, project_name: "X-Blade", technology: "Unity, C#", downloads: "1K+", status: "SHIPPED" },
        { id: 3, project_name: "Job Sculptor", technology: "React Native, Supabase", downloads: "Not yet", status: "SHIPPED" },
        { id: 4, project_name: "Portfolio Website", technology: "React, TypeScript", downloads: "N/A", status: "SHIPPED" }
    ];

    const experienceTable: ExperienceTableRow[] = [
        { id: 1, company: "Capgemini", achievement: "15% Downtime Reduction", duration: "1 Year", impact: "HIGH" },
        { id: 2, company: "Astro Gamers", achievement: "100K+ Game Downloads", duration: "2 Years", impact: "HIGH" },
        { id: 3, company: "Fiverr", achievement: "70+ Projects Completed", duration: "3 Years", impact: "MEDIUM" },
        { id: 4, company: "Personal", achievement: "AI Job Tracker App", duration: "6 Months", impact: "MEDIUM" }
    ];

    const [tabs, setTabs] = useState<Tab[]>([
        {
            id: 'developer_skills',
            name: 'developer_skills',
            tableName: 'developer_skills',
            query: "SELECT * FROM developer_skills WHERE experience_level >= 'Advanced';",
            description: "Fetching all advanced skills from the database",
            status: 'idle',
            headers: ["ID", "Skill Name", "Category", "Level"],
            data: []
        },
        {
            id: 'projects',
            name: 'projects',
            tableName: 'projects',
            query: "SELECT project_name, technology, downloads FROM projects WHERE status = 'SHIPPED';",
            description: "Querying successful project deployments",
            status: 'idle',
            headers: ["ID", "Project Name", "Technology", "Downloads", "Status"],
            data: []
        },
        {
            id: 'work_experience',
            name: 'work_experience',
            tableName: 'work_experience',
            query: "SELECT company, achievement, duration FROM work_experience ORDER BY impact DESC;",
            description: "Retrieving professional experience by impact",
            status: 'idle',
            headers: ["ID", "Company", "Achievement", "Duration", "Impact"],
            data: []
        }
    ]);

    const activeTab = tabs.find(tab => tab.id === activeTabId) || tabs[0];

    const runQuery = (tabId: string) => {
        setTabs(prevTabs =>
            prevTabs.map(tab =>
                tab.id === tabId
                    ? { ...tab, status: 'running' as QueryStatus }
                    : tab
            )
        );

        // Simulate query execution delay
        setTimeout(() => {
            let data: (string | number)[][] = [];

            switch (tabId) {
                case 'developer_skills':
                    data = skillsTable.map(row => [row.id, row.skill_name, row.category, row.experience_level]);
                    break;
                case 'projects':
                    data = projectsTable.map(row => [row.id, row.project_name, row.technology, row.downloads, row.status]);
                    break;
                case 'work_experience':
                    data = experienceTable.map(row => [row.id, row.company, row.achievement, row.duration, row.impact]);
                    break;
            }

            setTabs(prevTabs =>
                prevTabs.map(tab =>
                    tab.id === tabId
                        ? { ...tab, status: 'completed' as QueryStatus, data }
                        : tab
                )
            );
        }, 1500);
    };

    return (
        <section id="stack" className="py-32 relative" style={{ backgroundColor: '#010101' }} ref={ref}>
            {/* Database Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full">
                    {Array.from({ length: 15 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute text-blue-400 text-xs font-mono"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                opacity: [0, 0.3, 0],
                                scale: [0.8, 1, 0.8],
                            }}
                            transition={{
                                duration: 4 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 3,
                            }}
                        >
                            {['SELECT', 'FROM', 'WHERE', 'ORDER BY', 'GROUP BY'][Math.floor(Math.random() * 5)]}
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <motion.div
                    className="text-center mb-16"
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Tech Stack <span className="gradient-text">Database</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Querying my skills and experience from the developer database
                    </p>
                </motion.div>

                {/* SQL Query Interface */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-5xl mx-auto"
                >
                    {/* Database Console */}
                    <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden mb-8">
                        {/* Console Header with Tabs */}
                        <div className="bg-gray-800 border-b border-gray-700">
                            <div className="flex items-center justify-between px-6 py-3">
                                <div className="flex items-center space-x-4">
                                    <div className="flex space-x-2">
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    </div>
                                    <span className="text-white font-semibold">PostgreSQL Console - himanshu_dev_db</span>
                                </div>
                            </div>

                            {/* Chrome-style Tabs */}
                            <div className="flex">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTabId(tab.id)}
                                        className={`relative px-6 py-3 text-sm font-mono transition-all duration-200 ${activeTabId === tab.id
                                            ? 'bg-gray-900 text-white border-t-2 border-primary'
                                            : 'bg-gray-700 text-gray-300 hover:bg-gray-650 hover:text-white'
                                            }`}
                                        style={{
                                            clipPath: activeTabId === tab.id
                                                ? 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)'
                                                : 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)'
                                        }}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <span>{tab.name}</span>
                                            {tab.status === 'completed' && (
                                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                            )}
                                            {tab.status === 'running' && (
                                                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* SQL Query Input */}
                        <div className="p-6 bg-gray-900">
                            <div className="font-mono text-sm space-y-4">
                                <div className="text-gray-500">-- {activeTab.description}</div>
                                <div className="flex items-start space-x-2">
                                    <span className="text-green-400">postgres=#</span>
                                    <div className="flex-1">
                                        <div className="text-blue-400">
                                            {activeTab.query.split(' ').map((word, index) => (
                                                <span
                                                    key={index}
                                                    className={
                                                        ['SELECT', 'FROM', 'WHERE', 'ORDER', 'BY', 'GROUP'].includes(word.replace(/[^a-zA-Z]/g, ''))
                                                            ? 'text-purple-400 font-bold'
                                                            : word.includes("'")
                                                                ? 'text-green-400'
                                                                : 'text-blue-300'
                                                    }
                                                >
                                                    {word}{' '}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Run Query Button */}
                                <div className="flex justify-end">
                                    <motion.button
                                        onClick={() => runQuery(activeTab.id)}
                                        disabled={activeTab.status === 'running'}
                                        className={`px-4 py-2 rounded text-sm font-medium transition-all duration-200 ${activeTab.status === 'running'
                                            ? 'bg-yellow-500/20 text-yellow-400 cursor-not-allowed'
                                            : activeTab.status === 'completed'
                                                ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                                                : 'bg-primary/20 text-primary hover:bg-primary/30'
                                            }`}
                                        whileHover={{ scale: activeTab.status !== 'running' ? 1.05 : 1 }}
                                        whileTap={{ scale: activeTab.status !== 'running' ? 0.95 : 1 }}
                                    >
                                        {activeTab.status === 'running' && (
                                            <div className="flex items-center space-x-2">
                                                <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                                                <span>Running Query...</span>
                                            </div>
                                        )}
                                        {activeTab.status === 'completed' && 'Query Completed ✓'}
                                        {activeTab.status === 'idle' && 'Run Query'}
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Query Results Table */}
                    {activeTab.status === 'completed' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden"
                        >
                            {/* Table Header */}
                            <div className="bg-gray-800 px-6 py-3 border-b border-gray-700">
                                <div className="flex items-center justify-between">
                                    <span className="text-white font-semibold">Query Results</span>
                                    <span className="text-gray-400 text-sm">
                                        {activeTab.data.length} rows returned
                                    </span>
                                </div>
                            </div>

                            {/* Table Content */}
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-800/50">
                                        <tr>
                                            {activeTab.headers.map((header) => (
                                                <th key={header} className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider border-r border-gray-700 last:border-r-0">
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700">
                                        {activeTab.data.map((row, rowIndex) => (
                                            <motion.tr
                                                key={rowIndex}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: rowIndex * 0.1 }}
                                                className="hover:bg-gray-800/30 transition-colors"
                                            >
                                                {row.map((cell, cellIndex) => (
                                                    <motion.td
                                                        key={cellIndex}
                                                        className="px-4 py-3 text-sm border-r border-gray-700 last:border-r-0"
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: (rowIndex * 0.1) + (cellIndex * 0.05) }}
                                                    >
                                                        <span className={
                                                            cellIndex === 0 ? 'text-gray-500 font-mono' : // ID column
                                                                cellIndex === 1 ? 'text-white font-medium' : // Name column
                                                                    typeof cell === 'string' && cell.includes('Expert') ? 'text-green-400 font-medium' :
                                                                        typeof cell === 'string' && cell.includes('Advanced') ? 'text-blue-400 font-medium' :
                                                                            typeof cell === 'string' && cell.includes('Production') ? 'text-purple-400 font-medium' :
                                                                                typeof cell === 'string' && cell.includes('SHIPPED') ? 'text-green-400 font-medium' :
                                                                                    typeof cell === 'string' && cell.includes('HIGH') ? 'text-red-400 font-medium' :
                                                                                        typeof cell === 'string' && cell.includes('K+') ? 'text-yellow-400 font-medium' :
                                                                                            typeof cell === 'string' && cell.includes('Not yet') ? 'text-orange-400 font-medium' :
                                                                                                'text-gray-300'
                                                        }>
                                                            {cell}
                                                        </span>
                                                    </motion.td>
                                                ))}
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}

                    {/* Empty State */}
                    {activeTab.status === 'idle' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-gray-800/30 rounded-lg border border-gray-700 p-12 text-center"
                        >
                            <div className="text-gray-400 text-lg mb-2">Ready to execute query</div>
                            <div className="text-gray-500 text-sm">Click "Run Query" to see the results</div>
                        </motion.div>
                    )}

                    {/* Database Schema Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                            <h4 className="text-primary font-semibold mb-2">📊 developer_skills</h4>
                            <p className="text-gray-400 text-sm">Core technologies and expertise levels</p>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                            <h4 className="text-secondary font-semibold mb-2">🚀 projects</h4>
                            <p className="text-gray-400 text-sm">Shipped applications and their metrics</p>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                            <h4 className="text-accent font-semibold mb-2">💼 work_experience</h4>
                            <p className="text-gray-400 text-sm">Professional achievements and impact</p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Stack; 