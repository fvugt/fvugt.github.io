import React, { useRef, useState } from 'react'

function ProjectHeaderMagazine({ projectData }) {
    const {
        title,
        imgSrc,
        demoVideo,
        description,
        details
    } = projectData

    const videoRef = useRef(null)
    const [isFullscreen, setIsFullscreen] = useState(false)

    // Handle fullscreen changes
    const handleFullscreenChange = () => {
        setIsFullscreen(
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement
        )
    }

    // Toggle fullscreen with vendor prefix support
    const toggleFullscreen = async () => {
        if (!videoRef.current) return

        try {
            if (!isFullscreen) {
                if (videoRef.current.requestFullscreen) {
                    await videoRef.current.requestFullscreen()
                } else if (videoRef.current.webkitRequestFullscreen) {
                    await videoRef.current.webkitRequestFullscreen()
                } else if (videoRef.current.mozRequestFullScreen) {
                    await videoRef.current.mozRequestFullScreen()
                } else if (videoRef.current.msRequestFullscreen) {
                    await videoRef.current.msRequestFullscreen()
                }
            } else {
                if (document.exitFullscreen) {
                    await document.exitFullscreen()
                } else if (document.webkitExitFullscreen) {
                    await document.webkitExitFullscreen()
                } else if (document.mozCancelFullScreen) {
                    await document.mozCancelFullScreen()
                } else if (document.msExitFullscreen) {
                    await document.msExitFullscreen()
                }
            }
        } catch (error) {
            console.error('Fullscreen error:', error)
        }
    }

    // Add fullscreen event listeners with vendor prefixes
    React.useEffect(() => {
        const events = [
            'fullscreenchange',
            'webkitfullscreenchange',
            'mozfullscreenchange',
            'MSFullscreenChange'
        ]

        events.forEach(eventName => {
            document.addEventListener(eventName, handleFullscreenChange)
        })

        return () => {
            events.forEach(eventName => {
                document.removeEventListener(eventName, handleFullscreenChange)
            })
        }
    }, [])

    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-12 gap-8">
                {/* Title Column */}
                <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-8 lg:self-start">
                    <h1 className="text-5xl font-bold text-white leading-tight mb-6">
                        {title}
                    </h1>
                    <div className="space-y-3">
                        {details.map((detail, index) => {
                            const [key, value] = Object.entries(detail)[0]
                            return (
                                <div key={index} className="border-b border-white/10 pb-3">
                                    <span className="text-green-500 text-sm uppercase tracking-wider">{key}</span>
                                    <div className="text-white mt-1">{value}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                
                {/* Content Column */}
                <div className="col-span-12 lg:col-span-8">
                    <div className="aspect-video rounded-lg overflow-hidden mb-8">
                        {demoVideo ? (
                            <div className="relative h-full">
                                <video
                                    ref={videoRef}
                                    src={`${import.meta.env.BASE_URL}${demoVideo}`}
                                    className="w-full h-full object-cover"
                                    controls={isFullscreen}
                                    playsInline
                                    loop
                                    muted
                                    autoPlay
                                >
                                    <source src={`${import.meta.env.BASE_URL}${demoVideo}`} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                {!isFullscreen && (
                                    <button
                                        onClick={toggleFullscreen}
                                        className="absolute inset-0 w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20"
                                    >
                                        <div className="bg-black/60 rounded-full p-4 transform hover:scale-110 transition-transform">
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                                            </svg>
                                        </div>
                                    </button>
                                )}
                            </div>
                        ) : (
                            <img
                                src={`${import.meta.env.BASE_URL}${imgSrc}`}
                                alt={title}
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                    <div className="prose prose-invert max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: description }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectHeaderMagazine 