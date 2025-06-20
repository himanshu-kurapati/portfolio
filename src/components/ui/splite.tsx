import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
    scene: string
    className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
    const handleLoad = (app: any) => {
        if (app && app.setGlobalEvents) {
            app.setGlobalEvents(true); // Enables global mouse tracking
        }
    };

    return (
        <Suspense
            fallback={
                <div className="w-full h-full flex items-center justify-center">
                    <span className="loader"></span>
                </div>
            }
        >
            <Spline
                scene={scene}
                className={className}
                onLoad={handleLoad}
            />
        </Suspense>
    )
} 