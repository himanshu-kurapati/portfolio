import React from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../hooks/useCursor';
import { springConfig } from '../motion.config';

const CustomCursor: React.FC = () => {
    const { cursorState, mouseX, mouseY } = useCursor();

    return (
        <motion.div
            className="fixed top-0 left-0 w-3 h-3 bg-primary rounded-full mix-blend-difference pointer-events-none z-50"
            style={{
                x: mouseX,
                y: mouseY,
            }}
            animate={{
                scale: cursorState.isHovering ? 2 : 1,
            }}
            transition={springConfig}
            aria-label="Custom cursor"
        >
            {cursorState.isHovering && cursorState.label && (
                <motion.div
                    className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-dark/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded whitespace-nowrap"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                >
                    {cursorState.label}
                </motion.div>
            )}
        </motion.div>
    );
};

export default CustomCursor; 