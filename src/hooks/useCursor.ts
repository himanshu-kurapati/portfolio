import { useState, useEffect } from 'react';
import { useMotionValue } from 'framer-motion';

export interface CursorState {
    isHovering: boolean;
    label: string;
}

export const useCursor = () => {
    const [cursorState, setCursorState] = useState<CursorState>({
        isHovering: false,
        label: '',
    });

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseEnter = (e: Event) => {
            const target = e.target as HTMLElement;
            if (target.hasAttribute('data-hover')) {
                setCursorState({
                    isHovering: true,
                    label: target.getAttribute('data-hover') || '',
                });
            }
        };

        const handleMouseLeave = (e: Event) => {
            const target = e.target as HTMLElement;
            if (target.hasAttribute('data-hover')) {
                setCursorState({
                    isHovering: false,
                    label: '',
                });
            }
        };

        window.addEventListener('mousemove', updateMousePosition);

        // Add event listeners to all elements with data-hover attribute
        const hoverElements = document.querySelectorAll('[data-hover]');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', handleMouseEnter);
            element.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            hoverElements.forEach(element => {
                element.removeEventListener('mouseenter', handleMouseEnter);
                element.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, [mouseX, mouseY]);

    return {
        cursorState,
        mouseX,
        mouseY,
    };
}; 