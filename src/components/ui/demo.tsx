import { SplineScene } from "./splite";
import { Card } from "./card"
import { Spotlight } from "./spotlight"
import { useState, useEffect } from "react";

export function SplineSceneBasic() {
    return (
        <Card className="w-full h-[500px] bg-black/[0.96] relative overflow-hidden">
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="white"
            />

            <div className="flex h-full">
                {/* Left content */}
                <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                        Interactive 3D
                    </h1>
                    <p className="mt-4 text-neutral-300 max-w-lg">
                        Bring your UI to life with beautiful 3D scenes. Create immersive experiences
                        that capture attention and enhance your design.
                    </p>
                </div>

                {/* Right content */}
                <div className="relative w-full h-screen overflow-hidden bg-red-500">
                    <SplineScene
                        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 pointer-events-none mask-x-from-5% mask-x-to-95% bg-black" />
                </div>
            </div>
        </Card>
    )
}

// Simple robot component for Hero section with mouse-following spotlight
export function SplineRobot() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const container = document.getElementById('robot-container');
            if (container) {
                const rect = container.getBoundingClientRect();
                setMousePosition({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                });
            }
        };

        const container = document.getElementById('robot-container');
        if (container) {
            container.addEventListener('mousemove', handleMouseMove);
            return () => container.removeEventListener('mousemove', handleMouseMove);
        }
    }, []);

    return (
        <Card
            id="robot-container"
            className="w-full h-full bg-black/[0.96] relative overflow-visible spline-robot-container border-0"
        >
            {/* Dynamic spotlight that follows mouse */}
            <div
                className="absolute pointer-events-none z-10"
                style={{
                    left: mousePosition.x - 150,
                    top: mousePosition.y - 150,
                    width: 300,
                    height: 300,
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 30%, transparent 70%)',
                    borderRadius: '50%',
                    transition: 'all 0.1s ease-out',
                    filter: 'blur(40px)'
                }}
            />

            {/* Robot container */}
            <div className="w-full h-full relative">
                <SplineScene
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full"
                />
            </div>
        </Card>
    )
}

// Robot component without spotlight for use with page-wide spotlight
export function SplineRobotNoSpotlight() {
    return (
        <div className="w-full h-full relative overflow-hidden spline-robot-container">
            <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
            />
            <div className="absolute inset-0 pointer-events-none mask-alpha mask-x-from-[5%] mask-x-to-[95%]" />
        </div>
    );
}  