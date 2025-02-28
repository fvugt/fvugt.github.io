import React, { useState, useEffect, useRef } from 'react'

function ProjectGalleryFluid({ gallery }) {
    const [activeItem, setActiveItem] = useState(null)
    const [itemDimensions, setItemDimensions] = useState({})
    const videoRefs = useRef({})
    const [videosLoaded, setVideosLoaded] = useState({})
    const containerRef = useRef(null)
    
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
    
    // Calculate optimal row layout with taller images at the top
    const calculateLayout = () => {
        if (!gallery || gallery.length === 0 || Object.keys(itemDimensions).length === 0) {
            return []
        }
        
        const containerWidth = containerRef.current?.clientWidth || 1200
        const targetRowHeight = 220
        const spacing = 12
        const minItemsPerRow = 2 // Try to have at least 2 items per row
        
        // First, identify portrait vs landscape images
        const portraitImages = []
        const landscapeImages = []
        
        gallery.forEach((item, index) => {
            const aspectRatio = itemDimensions[index]?.aspectRatio || 16/9
            const scaledWidth = targetRowHeight * aspectRatio
            
            const itemData = {
                originalIndex: index,
                item,
                aspectRatio,
                scaledWidth,
                height: targetRowHeight
            }
            
            // Consider images with aspect ratio < 1 as portrait
            if (aspectRatio < 1) {
                portraitImages.push(itemData)
            } else {
                landscapeImages.push(itemData)
            }
        })
        
        // Sort portrait images by ascending aspect ratio (tallest first)
        portraitImages.sort((a, b) => a.aspectRatio - b.aspectRatio)
        
        // Sort landscape images by ascending aspect ratio (narrowest first)
        landscapeImages.sort((a, b) => a.aspectRatio - b.aspectRatio)
        
        // Combine arrays with portrait images first
        const sortedItems = [...portraitImages, ...landscapeImages]
        
        // Now create rows with the sorted items
        const rows = []
        let currentRow = []
        let currentRowWidth = 0
        
        for (let i = 0; i < sortedItems.length; i++) {
            const itemData = sortedItems[i]
            
            // If adding this item would exceed container width, finalize the row
            if (currentRowWidth + itemData.scaledWidth > containerWidth && currentRow.length >= minItemsPerRow) {
                rows.push([...currentRow])
                currentRow = []
                currentRowWidth = 0
            }
            
            currentRow.push(itemData)
            currentRowWidth += itemData.scaledWidth + spacing
            
            // Handle the last few items more carefully
            const remainingItems = sortedItems.length - (i + 1)
            
            // If we're at the last item or have only one item remaining, finalize the row
            if (remainingItems === 0) {
                // If we have a single item in the last row and it's wide, try to pull up an item from a previous row
                if (currentRow.length === 1 && currentRow[0].aspectRatio > 1.5 && rows.length > 0) {
                    // Find the last row with more than 2 items
                    for (let j = rows.length - 1; j >= 0; j--) {
                        if (rows[j].length > 2) {
                            // Pull the last item from that row
                            const itemToPull = rows[j].pop()
                            currentRow.unshift(itemToPull)
                            break
                        }
                    }
                }
                
                rows.push([...currentRow])
            }
        }
        
        // Adjust items in each row to fill the width
        return rows.map(row => {
            const totalSpacing = (row.length - 1) * spacing
            const totalScaledWidth = row.reduce((sum, item) => sum + item.scaledWidth, 0)
            const ratio = (containerWidth - totalSpacing) / totalScaledWidth
            
            return row.map(item => ({
                ...item,
                width: item.scaledWidth * ratio,
                height: item.height * ratio
            }))
        })
    }
    
    const rows = calculateLayout()

    if (!gallery || gallery.length === 0) {
        return null
    }

    const handleItemClick = (originalIndex) => {
        setActiveItem(originalIndex)
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
        <div className="space-y-4" ref={containerRef}>
            <h2 className="text-2xl font-bold text-white">Project Gallery</h2>
            
            {/* Fluid Gallery Layout */}
            <div className="space-y-3">
                {rows.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex gap-3">
                        {row.map(({ originalIndex, width, height, item }) => (
                            <div 
                                key={originalIndex}
                                className="relative rounded-md overflow-hidden cursor-pointer group"
                                style={{ 
                                    width: `${width}px`, 
                                    height: `${height}px`,
                                    flexShrink: 0
                                }}
                                onClick={() => handleItemClick(originalIndex)}
                                onMouseEnter={() => item.type === 'video' && handleVideoHover(originalIndex, true)}
                                onMouseLeave={() => item.type === 'video' && handleVideoHover(originalIndex, false)}
                            >
                                {item.type === 'video' ? (
                                    <>
                                        <video 
                                            ref={el => videoRefs.current[originalIndex] = el}
                                            src={`${import.meta.env.BASE_URL}${item.src}`}
                                            muted
                                            playsInline
                                            loop
                                            className="w-full h-full object-cover"
                                            onLoadedData={() => handleVideoLoaded(originalIndex)}
                                            style={{ opacity: videosLoaded[originalIndex] ? 1 : 0 }}
                                        />
                                        {!videosLoaded[originalIndex] && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-bg-secondary">
                                                <div className="w-6 h-6 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </>
                                ) : (
                                    <img 
                                        src={`${import.meta.env.BASE_URL}${item.src}`} 
                                        alt={`Gallery item ${originalIndex + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        ))}
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

export default ProjectGalleryFluid 