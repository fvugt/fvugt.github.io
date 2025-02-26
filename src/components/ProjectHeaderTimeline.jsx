import React, { useRef, useState } from 'react'

function ProjectHeaderTimeline({ projectData }) {
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
            <div className="max-w-3xl mx-auto relative">
                {/* Vertical line */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-green-500/20" />
                
                {/* Title Section */}
                <div className="pl-8 pb-12 relative">
                    <div className="absolute left-0 top-3 w-2 h-2 bg-green-500 rounded-full -translate-x-[3px]" />
                    <h1 className="text-4xl font-bold text-white mb-4">
                        {title}
                    </h1>
                    {/* Details as timeline entries */}
                    <div className="flex flex-wrap gap-3">
                        {details.map((detail, index) => {
                            const [key, value] = Object.entries(detail)[0]
                            return (
                                <span key={index} className="text-sm">
                                    <span className="text-green-500">{key}</span>
                                    <span className="text-white/80"> {value}</span>
                                </span>
                            )
                        })}
                    </div>
                </div>
                
                {/* Media Section */}
                <div className="pl-8 pb-12 relative">
                    <div className="absolute left-0 top-3 w-2 h-2 bg-green-500 rounded-full -translate-x-[3px]" />
                    <div className="rounded-lg overflow-hidden">
                        {demoVideo ? (
                            <div className="relative">
                                <video
                                    ref={videoRef}
                                    src={`${import.meta.env.BASE_URL}${demoVideo}`}
                                    className="w-full aspect-video object-cover"
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
                                className="w-full aspect-video object-cover"
                            />
                        )}
                    </div>
                </div>
                
                {/* Description Section */}
                <div className="pl-8 relative">
                    <div className="absolute left-0 top-3 w-2 h-2 bg-green-500 rounded-full -translate-x-[3px]" />
                    <div className="text-white/90 leading-relaxed">
                        <div dangerouslySetInnerHTML={{ __html: description }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectHeaderTimeline 