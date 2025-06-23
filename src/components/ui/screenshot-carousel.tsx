'use client'
import { useState, useEffect, useRef } from "react";

// Define the type for screenshot data
interface ScreenshotData {
    id: number;
    imgUrl: string;
    alt: string;
}

interface ScreenshotCarouselProps {
    screenshots: string[];
    projectName: string;
    showCarousel?: boolean;
    cardsPerView?: number;
}

const ScreenshotCarousel = ({
    screenshots,
    projectName,
    showCarousel = true,
    cardsPerView = 3
}: ScreenshotCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);

    // Convert screenshots array to CardData format
    const screenshotData: ScreenshotData[] = screenshots.map((screenshot, index) => ({
        id: index + 1,
        imgUrl: `${process.env.PUBLIC_URL}${screenshot}`,
        alt: `${projectName} screenshot ${index + 1}`
    }));

    // Responsive card width based on screen size
    const getCardWidth = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 640) return 300; // sm breakpoint
            if (window.innerWidth < 1024) return 350; // lg breakpoint
            return 400; // default for large screens
        }
        return 400;
    };

    const cardWidth = getCardWidth();

    // State to store actual image widths after they load
    const [imageWidths, setImageWidths] = useState<number[]>([]);

    // Calculate actual transform distance based on accumulated widths
    const getTransformDistance = (targetIndex: number) => {
        if (imageWidths.length === 0) return targetIndex * (cardWidth * 0.6); // Estimate for portrait

        let totalWidth = 0;
        for (let i = 0; i < targetIndex && i < imageWidths.length; i++) {
            totalWidth += imageWidths[i] + 16; // Add gap
        }

        return totalWidth;
    };

    // Handle image load to calculate actual widths
    const handleImageLoad = (index: number, imgElement: HTMLImageElement) => {
        const container = imgElement.parentElement?.parentElement;
        if (container) {
            setImageWidths(prev => {
                const newWidths = [...prev];
                newWidths[index] = container.offsetWidth;
                return newWidths;
            });
        }
    };

    // Calculate how many images are actually visible in the current viewport
    const [visibleImageCount, setVisibleImageCount] = useState(1);

    // Calculate visible images dynamically
    const calculateVisibleImages = () => {
        if (!sliderRef.current) return;

        const container = sliderRef.current.parentElement;
        if (!container) return;

        const containerWidth = container.offsetWidth - 96; // Account for padding
        const imageElements = sliderRef.current.querySelectorAll('img');

        let totalWidth = 0;
        let visibleCount = 0;

        // Count how many images fit in the container width
        for (let i = 0; i < imageElements.length; i++) {
            const imgContainer = imageElements[i].parentElement?.parentElement;
            if (imgContainer) {
                const imgWidth = imgContainer.offsetWidth + 16; // Include gap
                if (totalWidth + imgWidth <= containerWidth) {
                    totalWidth += imgWidth;
                    visibleCount++;
                } else {
                    break;
                }
            }
        }

        setVisibleImageCount(Math.max(1, visibleCount));
    };

    // Update visible count when images load or resize
    useEffect(() => {
        const timer = setTimeout(() => {
            calculateVisibleImages();
        }, 100); // Small delay to ensure images are rendered

        return () => clearTimeout(timer);
    }, [imageWidths, screenshotData.length]);

    // Calculate if we can go next/prev based on actual visible images
    const canGoNext = currentIndex < screenshotData.length - visibleImageCount;
    const canGoPrev = currentIndex > 0;

    const nextSlide = () => {
        if (isAnimating || !showCarousel || !canGoNext) return;

        setIsAnimating(true);
        setCurrentIndex(prev => prev + 1);

        setTimeout(() => {
            setIsAnimating(false);
        }, 700);
    };

    const prevSlide = () => {
        if (isAnimating || !showCarousel || !canGoPrev) return;

        setIsAnimating(true);
        setCurrentIndex(prev => prev - 1);

        setTimeout(() => {
            setIsAnimating(false);
        }, 700);
    };

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            // Reset to first screenshot on resize for consistency
            setCurrentIndex(0);
            // Reset image widths to recalculate
            setImageWidths([]);
            // Recalculate visible images after a short delay
            setTimeout(() => {
                calculateVisibleImages();
            }, 150);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [screenshotData.length]);

    if (!screenshotData || screenshotData.length === 0) {
        return <div className="text-gray-400">No screenshots available</div>;
    }

    return (
        <div className="w-full">
            <div className="relative w-full flex items-center justify-center py-8">
                {/* Carousel Controls - VS Code Style */}
                {showCarousel && screenshotData.length > 1 && (
                    <>
                        <button
                            onClick={prevSlide}
                            className={`absolute left-2 z-10 text-white p-3 rounded-full transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#007acc] ${canGoPrev
                                ? 'bg-[#007acc] hover:bg-[#005fa3] cursor-pointer'
                                : 'bg-gray-600 cursor-not-allowed opacity-50'
                                }`}
                            disabled={isAnimating || !canGoPrev}
                            aria-label="Previous screenshot"
                        >
                            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 1L1 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button
                            onClick={nextSlide}
                            className={`absolute right-2 z-10 text-white p-3 rounded-full transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#007acc] ${canGoNext
                                ? 'bg-[#007acc] hover:bg-[#005fa3] cursor-pointer'
                                : 'bg-gray-600 cursor-not-allowed opacity-50'
                                }`}
                            disabled={isAnimating || !canGoNext}
                            aria-label="Next screenshot"
                        >
                            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </>
                )}

                {/* Carousel Container */}
                <div className="w-full h-full mx-auto overflow-hidden px-12">
                    <div
                        ref={sliderRef}
                        className="h-full flex gap-4 items-center justify-start transition-transform ease-out duration-700"
                        style={{
                            transform: `translateX(-${getTransformDistance(currentIndex)}px)`
                        }}
                    >
                        {screenshotData.map((screenshot, index) => (
                            <div
                                key={`screenshot-${screenshot.id}-${index}`}
                                className="flex-shrink-0 relative"
                            >
                                <div className="relative overflow-hidden group h-full flex items-center justify-center">
                                    <img
                                        src={screenshot.imgUrl}
                                        alt={screenshot.alt}
                                        className="max-w-full max-h-[450px] object-contain rounded-lg transition-transform duration-300 group-hover:scale-105 shadow-lg"
                                        style={{
                                            maxWidth: `${cardWidth - 16}px`
                                        }}
                                        onLoad={(e) => handleImageLoad(index, e.target as HTMLImageElement)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Screenshot Counter */}
                {showCarousel && screenshotData.length > 1 && (
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                        <span className="text-gray-400 text-sm bg-[#2d2d30] px-3 py-1 rounded-full">
                            {currentIndex + 1} of {screenshotData.length}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScreenshotCarousel; 