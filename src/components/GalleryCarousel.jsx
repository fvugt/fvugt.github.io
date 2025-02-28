import React, { useState, useEffect, useRef } from 'react'

function GalleryCarousel({ gallery }) {
    const [activeItem, setActiveItem] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [itemDimensions, setItemDimensions] = useState({})
    const videoRefs = useRef({})
    const [videosLoaded, setVideosLoaded] = useState({})
    const carouselRef = useRef(null)
    const [isTransitioning, setIsTransitioning] = useState(false)
    
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
    }

    const closeModal = () => {
        setActiveItem(null)
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

    const goToNext = () => {
        if (isTransitioning) return
        setIsTransitioning(true)
        setCurrentIndex((prevIndex) => (prevIndex + 1) % gallery.length)
        setTimeout(() => setIsTransitioning(false), 500)
    }

    const goToPrev = () => {
        if (isTransitioning) return
        setIsTransitioning(true)
        setCurrentIndex((prevIndex) => (prevIndex - 1 + gallery.length) % gallery.length)
        setTimeout(() => setIsTransitioning(false), 500)
    }

    // Auto-advance carousel
    useEffect(() => {
        const interval = setInterval(() => {
            if (!activeItem) {
                goToNext()
            }
        }, 5000)
        
        return () => clearInterval(interval)
    }, [activeItem])

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Project Gallery</h2>
            
            {/* Carousel Gallery Layout */}
            <div className="relative overflow-hidden rounded-lg" style={{ height: '500px' }} ref={carouselRef}>
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
                                            className="w-full h-full object-cover"
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
                                        className="w-full h-full object-cover"
                                    />
                                )}
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                    <p className="text-white text-lg font-semibold">
                                        {`Image ${index + 1} of ${gallery.length}`}
                                    </p>
                                </div>
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
                
                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
                    {gallery.map((_, index) => (
                        <button
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all ${
                                index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
                            }`}
                            onClick={(e) => {
                                e.stopPropagation()
                                setCurrentIndex(index)
                            }}
                        />
                    ))}
                </div>
            </div>
            
            {/* Thumbnails */}
            <div className="flex overflow-x-auto space-x-2 py-2 scrollbar-hide">
                {gallery.map((item, index) => (
                    <div 
                        key={index}
                        className={`flex-shrink-0 w-20 h-20 cursor-pointer rounded-md overflow-hidden border-2 transition-all ${
                            index === currentIndex ? 'border-white' : 'border-transparent'
                        }`}
                        onClick={() => setCurrentIndex(index)}
                    >
                        {item.type === 'video' ? (
                            <video 
                                src={`${import.meta.env.BASE_URL}${item.src}`}
                                className="w-full h-full object-cover"
                                muted
                            />
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
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90" onClick={closeModal}>
                    <div className="relative max-w-4xl max-h-[90vh] w-full" onClick={e => e.stopPropagation()}>
                        {gallery[activeItem].type === 'video' ? (
                            <video 
                                src={`${import.meta.env.BASE_URL}${gallery[activeItem].src}`}
                                controls
                                autoPlay
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <img 
                                src={`${import.meta.env.BASE_URL}${gallery[activeItem].src}`} 
                                alt={`Gallery item ${activeItem + 1}`}
                                className="w-full h-full object-contain"
                            />
                        )}
                        
                        {/* Navigation */}
                        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-4">
                            <button 
                                className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setActiveItem((activeItem - 1 + gallery.length) % gallery.length)
                                }}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button 
                                className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setActiveItem((activeItem + 1) % gallery.length)
                                }}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                        
                        {/* Close button */}
                        <button 
                            className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                            onClick={closeModal}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        
                        {/* Image counter */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                            {activeItem + 1} / {gallery.length}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default GalleryCarousel 