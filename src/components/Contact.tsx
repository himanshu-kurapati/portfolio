import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import { fadeUp, stagger } from '../motion.config';
import { Send, User, Bot, CheckCircle2, Clock, Plus, Gift, Smile, Mic } from 'lucide-react';

interface ChatMessage {
    id: string;
    type: 'bot' | 'user';
    content: string;
    timestamp: Date;
    isTyping?: boolean;
}

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const Contact: React.FC = () => {
    const containerRef = useRef(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.1 });
    const [state, handleSubmit] = useForm("myzjdzry");

    // Start with empty messages - only load when user scrolls to section
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [hasInitialized, setHasInitialized] = useState(false);

    const [currentStep, setCurrentStep] = useState<'name' | 'email' | 'subject' | 'message' | 'complete'>('name');
    const [formData, setFormData] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showTyping, setShowTyping] = useState(false);
    const [emailError, setEmailError] = useState('');

    // Auto scroll to bottom only within chat container (not page)
    useEffect(() => {
        if (showTyping && chatContainerRef.current) {
            setTimeout(() => {
                if (chatContainerRef.current) {
                    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
                }
            }, 100);
        }
    }, [showTyping]);

    useEffect(() => {
        if (messages.length > 0 && chatContainerRef.current) {
            const lastMessage = messages[messages.length - 1];
            if (lastMessage.type === 'bot') {
                setTimeout(() => {
                    if (chatContainerRef.current) {
                        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
                    }
                }, 100);
            }
        }
    }, [messages]);

    // Initialize chat only when user scrolls to contact section
    useEffect(() => {
        if (isInView && !hasInitialized) {
            setHasInitialized(true);
            // Add initial message
            setMessages([{
                id: '1',
                type: 'bot',
                content: "👋 Hello! I'm here to help you get in touch with Himanshu. Whether you're interested in collaboration, have questions about his work, or want to discuss opportunities, I'm here to assist.",
                timestamp: new Date()
            }]);

            // Add follow-up message after delay
            setTimeout(() => {
                addBotMessage("What's your name?");
            }, 1500);
        }
    }, [isInView, hasInitialized]);

    // Email validation function
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const addBotMessage = (content: string, delay = 2000) => {
        setShowTyping(true);
        setTimeout(() => {
            setShowTyping(false);
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                type: 'bot',
                content,
                timestamp: new Date()
            }]);
        }, delay);
    };

    const addUserMessage = (content: string) => {
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            type: 'user',
            content,
            timestamp: new Date()
        }]);
    };

    const handleInputSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const value = inputValue.trim();
        const inputElement = e.currentTarget.querySelector('textarea');

        addUserMessage(value);
        setInputValue('');

        // Keep focus on input field
        if (inputElement) {
            setTimeout(() => {
                inputElement.focus();
            }, 50);
        }

        // Email validation step
        if (currentStep === 'email') {
            if (!validateEmail(value)) {
                setEmailError('Please enter a valid email address');
                addBotMessage("That doesn't appear to be a valid email format. Could you please check and try again?", 1500);
                return;
            }
            setEmailError('');
        }

        // Update form data based on current step
        const newFormData = { ...formData };
        if (currentStep === 'name') {
            newFormData.name = value;
            setFormData(newFormData);
            addBotMessage(`Nice to meet you, ${value}! What's your email address?`);
            setCurrentStep('email');
        } else if (currentStep === 'email') {
            newFormData.email = value;
            setFormData(newFormData);
            addBotMessage("Great! What would you like to discuss?");
            setCurrentStep('subject');
        } else if (currentStep === 'subject') {
            newFormData.subject = value;
            setFormData(newFormData);
            addBotMessage(`Perfect! ${getSubjectResponse(value)} Please share more details about your ${value.toLowerCase()}:`, 1800);
            setCurrentStep('message');
        } else if (currentStep === 'message') {
            newFormData.message = value;
            setFormData(newFormData);
            addBotMessage("Thank you! I'm forwarding your message to Himanshu now...", 1000);

            // Submit form using Formspree
            setTimeout(async () => {
                try {
                    const response = await fetch('https://formspree.io/f/myzjdzry', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: newFormData.name,
                            email: newFormData.email,
                            subject: newFormData.subject,
                            message: newFormData.message,
                        }),
                    });

                    if (response.ok) {
                        addBotMessage("✅ Your message has been successfully sent! Himanshu will review it and get back to you within 24-48 hours. Thank you for reaching out!", 2000);
                        setCurrentStep('complete');
                    } else {
                        addBotMessage("❌ There was an issue sending your message. Please try again or reach out directly at contact@himanshukurapati.com", 2000);
                    }
                } catch (error) {
                    addBotMessage("❌ I encountered an issue sending your message. Please try again or reach out directly at contact@himanshukurapati.com", 2000);
                }
            }, 2000);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const form = e.currentTarget.closest('form');
            if (form && inputValue.trim()) {
                const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
                form.dispatchEvent(submitEvent);
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);

        // Auto-resize textarea
        const textarea = e.target;
        textarea.style.height = 'auto';
        const scrollHeight = textarea.scrollHeight;
        const maxHeight = 120; // max-h-[120px]
        textarea.style.height = Math.min(scrollHeight, maxHeight) + 'px';
    };

    const getSubjectResponse = (subject: string) => {
        switch (subject.toLowerCase()) {
            case 'hiring': return "Excellent! Himanshu is always interested in new opportunities.";
            case 'collaboration': return "Wonderful! He enjoys working on innovative projects.";
            case 'question': return "Happy to help with any questions you might have.";
            default: return "That sounds interesting!";
        }
    };

    const handleQuickReply = (value: string) => {
        // Directly add user message and proceed with conversation
        addUserMessage(value);

        // Update form data and continue conversation flow
        const newFormData = { ...formData };
        newFormData.subject = value;
        setFormData(newFormData);

        // Bot response
        addBotMessage(`Perfect! ${getSubjectResponse(value)} Please share more details about your ${value.toLowerCase()}:`, 1800);
        setCurrentStep('message');
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

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
        <section id="contact" className="py-32 bg-[#313338]" ref={containerRef}>
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <motion.div
                    className="text-center mb-8"
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Get in <span className="text-[#5865f2]">Touch</span>
                    </h2>
                    <p className="text-[#b9bbbe] text-lg">
                        Have a project in mind or want to collaborate? Let's start a conversation.
                    </p>
                </motion.div>

                <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 items-center lg:items-stretch">
                    {/* Chat Interface - Left Side (2/3 width) */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2 w-full max-w-2xl lg:max-w-none"
                    >
                        <div className="bg-[#36393f] rounded-lg shadow-xl overflow-hidden">
                            {/* Discord-style Chat Header */}
                            <div className="bg-[#2f3136] border-b border-[#202225] p-4">
                                <div className="flex items-center space-x-3">
                                    <div className="text-[#72767d]">#</div>
                                    <h3 className="text-white font-semibold">contact-himanshu</h3>
                                    <div className="flex-1"></div>
                                    <div className="text-[#b9bbbe] text-sm">Contact Assistant</div>
                                </div>
                            </div>

                            {/* Chat Messages */}
                            <div className="h-96 overflow-y-auto p-4 space-y-4 bg-[#36393f]" ref={chatContainerRef}>
                                <AnimatePresence>
                                    {messages.map((message) => (
                                        <motion.div
                                            key={message.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="flex items-start space-x-3"
                                        >
                                            <div className="w-8 h-8 rounded-full flex-shrink-0 mt-1">
                                                {message.type === 'bot' ? (
                                                    <div className="w-8 h-8 bg-[#5865f2] rounded-full flex items-center justify-center">
                                                        <Bot className="w-4 h-4 text-white" />
                                                    </div>
                                                ) : (
                                                    <div className="w-8 h-8 bg-[#57f287] rounded-full flex items-center justify-center">
                                                        <User className="w-4 h-4 text-white" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-baseline space-x-2 mb-1">
                                                    <span className="text-white font-medium text-sm">
                                                        {message.type === 'bot' ? 'Contact Bot' : 'You'}
                                                    </span>
                                                    <span className="text-[#72767d] text-xs">
                                                        Today at {formatTime(message.timestamp)}
                                                    </span>
                                                </div>
                                                <div className="text-[#dcddde] text-sm leading-relaxed">
                                                    {message.content}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                {/* Typing indicator */}
                                <AnimatePresence>
                                    {showTyping && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="flex items-start space-x-3"
                                        >
                                            <div className="w-8 h-8 bg-[#5865f2] rounded-full flex items-center justify-center">
                                                <Bot className="w-4 h-4 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-baseline space-x-2 mb-1">
                                                    <span className="text-white font-medium text-sm">Contact Bot</span>
                                                    <span className="text-[#72767d] text-xs">is typing...</span>
                                                </div>
                                                <div className="flex space-x-1">
                                                    <div className="w-2 h-2 bg-[#72767d] rounded-full animate-bounce"></div>
                                                    <div className="w-2 h-2 bg-[#72767d] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                    <div className="w-2 h-2 bg-[#72767d] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Quick reply buttons for subject selection */}
                                {currentStep === 'subject' && !showTyping && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex flex-wrap gap-2"
                                    >
                                        {['Hiring', 'Collaboration', 'Question'].map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => handleQuickReply(option)}
                                                className="px-3 py-1.5 bg-[#5865f2] hover:bg-[#4752c4] text-white rounded text-sm transition-colors"
                                            >
                                                {option === 'Hiring' && '💼'}
                                                {option === 'Collaboration' && '🤝'}
                                                {option === 'Question' && '❓'}
                                                {' '}{option}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}

                                <div ref={chatEndRef} />
                            </div>

                            {/* Chat Input */}
                            {currentStep !== 'complete' && (
                                <div className="bg-[#40444b] p-4">
                                    <div className="bg-[#40444b] rounded-lg border border-[#72767d]/20">
                                        <form onSubmit={handleInputSubmit} className="flex items-center">
                                            {/* Plus button */}
                                            <button
                                                type="button"
                                                className="p-3 text-[#b9bbbe] hover:text-white transition-colors flex items-center justify-center"
                                                onClick={() => { }} // No functionality
                                            >
                                                <Plus className="w-5 h-5" />
                                            </button>

                                            <textarea
                                                value={inputValue}
                                                onChange={handleInputChange}
                                                onKeyDown={handleKeyDown}
                                                placeholder={
                                                    currentStep === 'name' ? 'Your name...' :
                                                        currentStep === 'email' ? 'Your email...' :
                                                            currentStep === 'subject' ? 'What to discuss?' :
                                                                'Share details...'
                                                }
                                                className="flex-1 bg-transparent px-2 py-3 text-[#dcddde] placeholder-[#72767d] focus:outline-none resize-none min-h-[48px] max-h-[120px] overflow-y-auto"
                                                disabled={showTyping}
                                                rows={2}
                                                style={{
                                                    lineHeight: '1.5',
                                                    scrollbarWidth: 'thin',
                                                    scrollbarColor: '#72767d #40444b'
                                                }}
                                            />

                                            {/* Right side buttons */}
                                            <div className="flex items-center space-x-2 px-3">
                                                <button
                                                    type="button"
                                                    className="p-1 text-[#b9bbbe] hover:text-white transition-colors flex items-center justify-center"
                                                    onClick={() => { }} // No functionality
                                                >
                                                    <Gift className="w-5 h-5" />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="p-1 text-[#b9bbbe] hover:text-white transition-colors flex items-center justify-center"
                                                    onClick={() => { }} // No functionality
                                                >
                                                    <Smile className="w-5 h-5" />
                                                </button>
                                                {inputValue.trim() ? (
                                                    <button
                                                        type="submit"
                                                        disabled={showTyping}
                                                        className="bg-[#5865f2] hover:bg-[#4752c4] disabled:bg-[#4f545c] disabled:cursor-not-allowed text-white rounded-full p-2 transition-colors flex items-center justify-center"
                                                    >
                                                        <Send className="w-4 h-4" />
                                                    </button>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        className="p-2 text-[#b9bbbe] hover:text-white transition-colors flex items-center justify-center"
                                                        onClick={() => { }} // No functionality
                                                    >
                                                        <Mic className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Social Links & Info - Right Side (1/3 width) */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        transition={{ delay: 0.4 }}
                        className="space-y-6 w-full max-w-md lg:max-w-none"
                    >
                        {/* Direct Contact */}
                        <div className="bg-[#2f3136] rounded-lg p-6">
                            <div className="flex items-center space-x-2 mb-4">
                                <span className="text-2xl">📧</span>
                                <h3 className="text-xl font-bold text-white">Direct Contact</h3>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-[#b9bbbe] text-sm">Email</p>
                                    <a href="mailto:contact@himanshukurapati.com" className="text-[#5865f2] hover:underline">
                                        contact@himanshukurapati.com
                                    </a>
                                </div>
                                <div>
                                    <p className="text-[#b9bbbe] text-sm">Response Time</p>
                                    <p className="text-white">24-48 hours</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="bg-[#2f3136] rounded-lg p-6">
                            <div className="flex items-center space-x-2 mb-4">
                                <span className="text-2xl">🔗</span>
                                <h3 className="text-xl font-bold text-white">Connect on Social</h3>
                            </div>
                            <div className="space-y-3">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center space-x-3 p-3 bg-[#36393f] hover:bg-[#40444b] rounded-lg transition-colors group"
                                    >
                                        <div className="text-[#b9bbbe] group-hover:text-white transition-colors">
                                            {social.icon}
                                        </div>
                                        <span className="text-[#dcddde] group-hover:text-white transition-colors">
                                            {social.name}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* About This Contact */}
                        <div className="bg-[#2f3136] rounded-lg p-6">
                            <div className="flex items-center space-x-2 mb-4">
                                <span className="text-2xl">💡</span>
                                <h3 className="text-xl font-bold text-white">About This Contact</h3>
                            </div>
                            <p className="text-[#b9bbbe] text-sm leading-relaxed">
                                This contact form is for professional inquiries, collaboration opportunities,
                                project discussions, or general questions about Himanshu's work and experience.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact; 