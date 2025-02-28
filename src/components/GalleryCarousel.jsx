import React, { useState, useEffect, useRef } from 'react'

function GalleryCarousel({ gallery }) {
    const [activeItem, setActiveItem] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [itemDimensions, setItemDimensions] = useState({})
    const videoRefs = useRef({})
    const [videosLoaded, setVideosLoaded] = useState({})
    const carouselRef = useRef(null)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const timerRef = useRef(null) // Reference to store the timer
    const modalVideoRef = useRef(null) // Reference for the video in the modal
    const [isZoomed, setIsZoomed] = useState(false) // State to track zoom level
    
    // Load and store image dimensions
    useEffect(() => {
        if (!gallery || gallery.length === 0) return
        
        const loadImageDimensions = async () => {
            const dimensions = {}
            
            const promises = gallery.map((item, index) => {
                return new Promise((resolve) => {
                    if (item.type === 'image') {
                        const img = new Image()
                        img.onload = () => {
                            dimensions[index] = {
                                width: img.width,
                                height: img.height,
                                aspectRatio: img.width / img.height
                            }
                            resolve()
                        }
                        img.onerror = () => {
                            dimensions[index] = { width: 16, height: 9, aspectRatio: 16/9 }
                            resolve()
                        }
                        img.src = `${import.meta.env.BASE_URL}${item.src}`
                    } else {
                        // Default aspect ratio for videos until loaded
                        dimensions[index] = { width: 16, height: 9, aspectRatio: 16/9 }
                        resolve()
                    }
                })
            })
            
            await Promise.all(promises)
            setItemDimensions(dimensions)
        }
        
        loadImageDimensions()
    }, [gallery])
    
    // Handle video loading and preview frames
    const handleVideoLoaded = (index) => {
        const videoRef = videoRefs.current[index]
        if (videoRef) {
            // Update dimensions with actual video dimensions
            setItemDimensions(prev => ({
                ...prev,
                [index]: {
                    width: videoRef.videoWidth,
                    height: videoRef.videoHeight,
                    aspectRatio: videoRef.videoWidth / videoRef.videoHeight
                }
            }))
            
            // Set to the specified preview time or a default time
            const previewTime = gallery[index].previewTime || 1.5
            videoRef.currentTime = previewTime
            
            // Mark this video as loaded with its preview frame set
            setVideosLoaded(prev => ({
                ...prev,
                [index]: true
            }))
        }
    }

    if (!gallery || gallery.length === 0) {
        return null
    }

    const handleItemClick = (index) => {
        setActiveItem(index)
        setIsZoomed(false) // Reset zoom state when opening a new item
    }

    const closeModal = () => {
        // Pause the video in the modal before closing
        if (modalVideoRef.current) {
            modalVideoRef.current.pause();
        }
        
        // Also pause any videos that might be playing in the carousel
        Object.values(videoRefs.current).forEach(videoRef => {
            if (videoRef) {
                videoRef.pause();
            }
        });
        
        setActiveItem(null);
        setIsZoomed(false); // Reset zoom state when closing modal
    }
    
    // Toggle zoom state when clicking on an image in fullscreen
    const toggleZoom = (e) => {
        e.stopPropagation(); // Prevent modal from closing
        setIsZoomed(!isZoomed);
    }
    
    const handleVideoHover = (index, isHovering) => {
        const videoRef = videoRefs.current[index]
        if (videoRef) {
            if (isHovering) {
                videoRef.play().catch(e => console.log('Auto-play prevented:', e))
            } else {
                videoRef.pause()
                // Reset to preview frame
                const previewTime = gallery[index].previewTime || 1.5
                videoRef.currentTime = previewTime
            }
        }
    }

    const resetCarouselTimer = () => {
        // Clear the existing timer
        if (timerRef.current) {
            clearInterval(timerRef.current)
        }
        
        // Set a new timer
        timerRef.current = setInterval(() => {
            if (!activeItem) {
                goToNext()
            }
        }, 5000)
    }

    const goToNext = () => {
        if (isTransitioning) return
        setIsTransitioning(true)
        setCurrentIndex((prevIndex) => (prevIndex + 1) % gallery.length)
        setTimeout(() => setIsTransitioning(false), 500)
        resetCarouselTimer() // Reset timer when manually going to next
    }

    const goToPrev = () => {
        if (isTransitioning) return
        setIsTransitioning(true)
        setCurrentIndex((prevIndex) => (prevIndex - 1 + gallery.length) % gallery.length)
        setTimeout(() => setIsTransitioning(false), 700)
        resetCarouselTimer() // Reset timer when manually going to previous
    }

    // Set up the initial timer
    useEffect(() => {
        resetCarouselTimer()
        
        // Clean up the timer when component unmounts
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        }
    }, [activeItem])

    return (
        <div className="space-y-8">
            
            {/* Horizontal divider line */}
            <h2 className="text-2xl font-bold text-white">Images & Videos</h2>
            
            {/* Carousel Gallery Layout */}
            <div 
                className="relative overflow-hidden rounded-lg" 
                style={{ height: '400px' }} 
                ref={carouselRef}
            >
                <div className="absolute inset-0 flex items-center justify-center">
                    {gallery.map((item, index) => (
                        <div 
                            key={index}
                            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                                index === currentIndex 
                                    ? 'opacity-100 z-10 transform scale-100' 
                                    : 'opacity-0 z-0 transform scale-95'
                            }`}
                            onClick={() => handleItemClick(index)}
                        >
                            <div 
                                className="relative w-full h-full cursor-pointer"
                                onMouseEnter={() => item.type === 'video' && handleVideoHover(index, true)}
                                onMouseLeave={() => item.type === 'video' && handleVideoHover(index, false)}
                            >
                                {item.type === 'video' ? (
                                    <>
                                        <video 
                                            ref={el => videoRefs.current[index] = el}
                                            src={`${import.meta.env.BASE_URL}${item.src}`}
                                            muted
                                            playsInline
                                            loop
                                            className="w-full h-full object-contain"
                                            onLoadedData={() => handleVideoLoaded(index)}
                                            style={{ opacity: videosLoaded[index] ? 1 : 0 }}
                                        />
                                        {!videosLoaded[index] && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-bg-secondary">
                                                <div className="w-6 h-6 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                                            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </>
                                ) : (
                                    <img 
                                        src={`${import.meta.env.BASE_URL}${item.src}`} 
                                        alt={`Gallery item ${index + 1}`}
                                        className="w-full h-full object-contain"
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Navigation buttons */}
                <button 
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                    onClick={(e) => {
                        e.stopPropagation()
                        goToPrev()
                    }}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button 
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                    onClick={(e) => {
                        e.stopPropagation()
                        goToNext()
                    }}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
            
            {/* Thumbnails */}
            <div className="flex justify-center overflow-x-auto space-x-2 py-2 w-full scrollbar-hide">
                {gallery.map((item, index) => (
                    <div 
                        key={index}
                        className={`flex-shrink-0 w-20 h-20 cursor-pointer rounded-md overflow-hidden border-2 transition-all relative ${
                            index === currentIndex ? 'border-white' : 'border-transparent'
                        }`}
                        onClick={() => {
                            setCurrentIndex(index)
                            resetCarouselTimer() // Reset timer when clicking on thumbnail
                        }}
                    >
                        {item.type === 'video' ? (
                            <>
                                <video 
                                    src={`${import.meta.env.BASE_URL}${item.src}`}
                                    className="w-full h-full object-cover"
                                    muted
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </>
                        ) : (
                            <img 
                                src={`${import.meta.env.BASE_URL}${item.src}`} 
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Modal */}
            {activeItem !== null && (
                <div className="fixed inset-0 z-50 bg-black/95" onClick={closeModal}>
                    {gallery[activeItem].type === 'video' ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <video 
                                ref={modalVideoRef}
                                src={`${import.meta.env.BASE_URL}${gallery[activeItem].src}`}
                                controls
                                autoPlay
                                className="w-auto h-auto max-w-screen max-h-screen"
                                style={{ maxWidth: "calc(100vw - 40px)", maxHeight: "calc(100vh - 80px)" }}
                                onEnded={() => {
                                    if (modalVideoRef.current) {
                                        modalVideoRef.current.pause();
                                    }
                                }}
                            />
                        </div>
                    ) : (
                        <div className={`absolute inset-0 flex items-center justify-center ${isZoomed ? 'overflow-auto cursor-zoom-out' : 'cursor-zoom-in'}`}>
                            <img 
                                src={`${import.meta.env.BASE_URL}${gallery[activeItem].src}`} 
                                alt={`Gallery item ${activeItem + 1}`}
                                className={isZoomed ? "w-auto h-auto" : "w-auto h-auto max-w-screen max-h-screen"}
                                style={isZoomed 
                                    ? { transform: "scale(1.5)", transformOrigin: "center", cursor: "zoom-out" } 
                                    : { maxWidth: "calc(100vw - 40px)", maxHeight: "calc(100vh - 80px)", cursor: "zoom-in" }
                                }
                                onClick={toggleZoom}
                            />
                        </div>
                    )}
                    
                    {/* Navigation */}
                    <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-4">
                        <button 
                            className="bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (modalVideoRef.current) {
                                    modalVideoRef.current.pause();
                                }
                                setActiveItem((activeItem - 1 + gallery.length) % gallery.length);
                                setIsZoomed(false); // Reset zoom when changing images
                            }}
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button 
                            className="bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (modalVideoRef.current) {
                                    modalVideoRef.current.pause();
                                }
                                setActiveItem((activeItem + 1) % gallery.length);
                                setIsZoomed(false); // Reset zoom when changing images
                            }}
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                    
                    {/* Close button */}
                    <button 
                        className="absolute top-4 right-4 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors z-10"
                        onClick={closeModal}
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    
                    {/* Image counter and zoom instructions */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-base z-10 flex flex-col items-center">
                        <div>{activeItem + 1} / {gallery.length}</div>
                        {gallery[activeItem].type === 'image' && (
                            <div className="text-sm mt-1 opacity-80">Click image to {isZoomed ? 'zoom out' : 'zoom in'}</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default GalleryCarousel 