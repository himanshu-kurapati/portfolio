import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
    scene: string
}

export function SplineScene({ scene }: SplineSceneProps) {
    const handleLoad = (app: any) => {
        if (app?.setGlobalEvents) {
            app.setGlobalEvents(false);
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
            <Spline scene={scene} onLoad={handleLoad} />
        </Suspense>
    )
} 