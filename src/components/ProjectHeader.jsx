import React, { useRef, useState } from 'react'

function ProjectHeader({ projectData }) {
    const {
        title,
        imgSrc,
        demoVideo,
        description,
        details
    } = projectData

    const videoRef = useRef(null)
    const containerRef = useRef(null)
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
        const element = videoRef.current
        if (!element) return

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
        <div className="space-y-6">
            {/* Banner - Video or Image */}
            <div className="w-full h-[400px] relative rounded-lg overflow-hidden" ref={containerRef}>
                {demoVideo ? (
                    <>
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                        <div className="absolute bottom-0 left-0 p-6 pointer-events-none">
                            <h1 className="text-3xl font-bold text-white max-w-[900px]">
                                {title}
                            </h1>
                        </div>
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
                    </>
                ) : (
                    <>
                        <img
                            src={`${import.meta.env.BASE_URL}${imgSrc}`}
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-6">
                            <h1 className="text-3xl font-bold text-white max-w-[900px]">
                                {title}
                            </h1>
                        </div>
                    </>
                )}
            </div>

            {/* Content Container */}
            <div className="bg-backgroundBColor rounded-lg p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative">
                    {/* Vertical Divider */}
                    <div className="hidden lg:block absolute right-[25%] top-0 bottom-0 w-px bg-white/10" />
                    
                    {/* Description */}
                    <div className="lg:col-span-3">
                        <div className="space-y-4 max-w-[900px]">
                            <h2 className="text-green-500 font-medium uppercase tracking-wider text-xs">
                                Project Overview
                            </h2>
                            <div 
                                className="text-white/90 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: description }}
                            />
                        </div>
                    </div>

                    {/* Project Details */}
                    <div>
                        <div className="space-y-4">
                            <h2 className="text-green-500 font-medium uppercase tracking-wider text-xs">
                                Project Details
                            </h2>
                            <div className="space-y-2">
                                {details.map((detail, index) => {
                                    const [key, value] = Object.entries(detail)[0]
                                    return (
                                        <div key={index} className="flex items-center justify-between gap-4 text-sm">
                                            <span className="text-white/60">{key}</span>
                                            <span className="text-white">{value}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectHeader 