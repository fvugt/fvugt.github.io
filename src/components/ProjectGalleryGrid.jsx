import React, { useState, useEffect, useRef } from 'react'

function ProjectGalleryGrid({ gallery }) {
    const [activeItem, setActiveItem] = useState(null)
    const [layout, setLayout] = useState([])
    const videoRefs = useRef({})
    const [videosLoaded, setVideosLoaded] = useState({})
    
    useEffect(() => {
        if (!gallery || gallery.length === 0) return
        
        // Create a dynamic layout based on the number of items
        const generateLayout = () => {
            const itemCount = gallery.length
            
            // For 1 item: full width
            if (itemCount === 1) {
                return [{ span: 'col-span-12', items: [0] }]
            }
            
            // For 2 items: two equal columns
            if (itemCount === 2) {
                return [{ span: 'col-span-6', items: [0] }, { span: 'col-span-6', items: [1] }]
            }
            
            // For 3 items: one large, two small
            if (itemCount === 3) {
                return [
                    { span: 'col-span-12 md:col-span-8', items: [0] },
                    { span: 'col-span-6 md:col-span-4', items: [1] },
                    { span: 'col-span-6 md:col-span-4', items: [2] }
                ]
            }
            
            // For 4 items: 2x2 grid
            if (itemCount === 4) {
                return [
                    { span: 'col-span-6', items: [0] },
                    { span: 'col-span-6', items: [1] },
                    { span: 'col-span-6', items: [2] },
                    { span: 'col-span-6', items: [3] }
                ]
            }
            
            // For 5 items: feature + 2x2 grid
            if (itemCount === 5) {
                return [
                    { span: 'col-span-12', items: [0] },
                    { span: 'col-span-6 md:col-span-3', items: [1] },
                    { span: 'col-span-6 md:col-span-3', items: [2] },
                    { span: 'col-span-6 md:col-span-3', items: [3] },
                    { span: 'col-span-6 md:col-span-3', items: [4] }
                ]
            }
            
            // For 6+ items: create a dynamic grid with varying column spans
            const result = []
            
            // First row: feature item + one regular
            result.push({ span: 'col-span-12 md:col-span-8', items: [0] })
            result.push({ span: 'col-span-12 md:col-span-4', items: [1] })
            
            // Remaining items in a 3-column grid (on desktop)
            const remaining = itemCount - 2
            for (let i = 0; i < remaining; i++) {
                // Alternate between different column spans for visual interest
                let span = 'col-span-6 md:col-span-4'
                if (i % 5 === 0) span = 'col-span-12 md:col-span-6' // Occasional wider item
                if (i % 7 === 0) span = 'col-span-12' // Occasional full-width item
                
                result.push({ span, items: [i + 2] })
            }
            
            return result
        }
        
        setLayout(generateLayout())
        
        // Initialize video refs
        gallery.forEach((item, index) => {
            if (item.type === 'video') {
                videoRefs.current[index] = videoRefs.current[index] || React.createRef()
            }
        })
    }, [gallery])

    // Set preview frame when video is loaded
    const handleVideoLoaded = (index) => {
        const videoRef = videoRefs.current[index]
        if (videoRef) {
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

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Project Gallery</h2>
            
            {/* Gallery Grid */}
            <div className="grid grid-cols-12 gap-4">
                {layout.map((section, sectionIndex) => (
                    <div 
                        key={sectionIndex}
                        className={`${section.span} relative rounded-lg overflow-hidden`}
                    >
                        {section.items.map(itemIndex => {
                            const item = gallery[itemIndex]
                            return (
                                <div 
                                    key={itemIndex}
                                    className="relative aspect-[16/9] rounded-lg overflow-hidden cursor-pointer group h-full"
                                    onClick={() => handleItemClick(itemIndex)}
                                    onMouseEnter={() => item.type === 'video' && handleVideoHover(itemIndex, true)}
                                    onMouseLeave={() => item.type === 'video' && handleVideoHover(itemIndex, false)}
                                >
                                    {item.type === 'video' ? (
                                        <>
                                            <video 
                                                ref={el => videoRefs.current[itemIndex] = el}
                                                src={`${import.meta.env.BASE_URL}${item.src}`}
                                                muted
                                                playsInline
                                                loop
                                                className="w-full h-full object-cover"
                                                onLoadedData={() => handleVideoLoaded(itemIndex)}
                                                style={{ opacity: videosLoaded[itemIndex] ? 1 : 0 }}
                                            />
                                            {!videosLoaded[itemIndex] && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-bg-secondary">
                                                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </>
                                    ) : (
                                        <img 
                                            src={`${import.meta.env.BASE_URL}${item.src}`} 
                                            alt={`Gallery item ${itemIndex + 1}`}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            )
                        })}
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

export default ProjectGalleryGrid 