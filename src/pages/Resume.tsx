import React from 'react';
import { motion } from 'framer-motion';

const Resume: React.FC = () => {
    const resumePath = '/resume.pdf'; // PDF should be placed in public folder

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = resumePath;
        link.download = 'Himanshu_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-black text-white pt-32 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4">My Resume</h1>
                    <p className="text-gray-400 text-lg mb-6">
                        View my professional experience and skills
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.button
                            onClick={handleDownload}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 inline-flex items-center space-x-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>Download PDF</span>
                        </motion.button>

                        <motion.button
                            onClick={() => window.history.back()}
                            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-all duration-300 inline-flex items-center space-x-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span>Go Back</span>
                        </motion.button>
                    </div>
                </motion.div>

                {/* PDF Viewer */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-white rounded-lg overflow-hidden shadow-2xl"
                    style={{ minHeight: '80vh' }}
                >
                    <iframe
                        src={resumePath}
                        className="w-full"
                        style={{ height: '80vh' }}
                        title="Resume PDF"
                        onError={() => {
                            console.error('PDF could not be loaded. Make sure resume.pdf is in the public folder.');
                        }}
                    >
                        <p className="p-8 text-center text-gray-600">
                            Your browser doesn't support PDF viewing.
                            <br />
                            <button
                                onClick={handleDownload}
                                className="text-blue-600 hover:text-blue-800 underline mt-2 inline-block"
                            >
                                Click here to download the PDF instead
                            </button>
                        </p>
                    </iframe>
                </motion.div>

                {/* Mobile-friendly message */}
                <div className="mt-6 text-center text-gray-400 text-sm lg:hidden">
                    <p>For the best viewing experience, download the PDF or view on a larger screen.</p>
                </div>
            </div>
        </div>
    );
};

export default Resume; 