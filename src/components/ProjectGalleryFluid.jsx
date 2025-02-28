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
    
    // Calculate optimal row layout with max width constraint
    const calculateLayout = () => {
        if (!gallery || gallery.length === 0 || Object.keys(itemDimensions).length === 0) {
            return []
        }
        
        const containerWidth = containerRef.current?.clientWidth || 1200
        const targetRowHeight = 220
        const spacing = 12
        const maxItemWidth = containerWidth * 0.66 // Max width is 2/3 of container
        
        // Create a fixed layout based on the number of items
        const items = gallery.map((item, index) => {
            const aspectRatio = itemDimensions[index]?.aspectRatio || 16/9
            return {
                originalIndex: index,
                item,
                aspectRatio,
                scaledWidth: targetRowHeight * aspectRatio,
                height: targetRowHeight
            }
        })
        
        // For single item, center it and limit width
        if (items.length === 1) {
            const item = items[0]
            const width = Math.min(maxItemWidth, item.scaledWidth * 1.5)
            const height = width / item.aspectRatio
            
            // Return a centered item
            return [[{
                ...item,
                width,
                height,
                centered: true // Flag for centering
            }]]
        }
        
        // For 2-5 items, use predefined layouts with width constraints
        if (items.length <= 5) {
            switch (items.length) {
                case 2:
                    // Two items side by side, each limited to max width
                    const totalWidth2 = items.reduce((sum, item) => sum + item.scaledWidth, 0)
                    const ratio2 = (containerWidth - spacing) / totalWidth2
                    
                    return [[
                        { 
                            ...items[0], 
                            width: Math.min(maxItemWidth, items[0].scaledWidth * ratio2), 
                            height: targetRowHeight * ratio2 
                        },
                        { 
                            ...items[1], 
                            width: Math.min(maxItemWidth, items[1].scaledWidth * ratio2), 
                            height: targetRowHeight * ratio2 
                        }
                    ]]
                
                case 3:
                    // First row: First item gets 60% width, second gets 40% (both limited)
                    // Second row: Third item centered and limited
                    const firstRowWidth = containerWidth - spacing
                    const firstItemWidth = Math.min(maxItemWidth, firstRowWidth * 0.6)
                    const secondItemWidth = Math.min(maxItemWidth, firstRowWidth * 0.4)
                    
                    const thirdItemWidth = Math.min(maxItemWidth, containerWidth * 0.6)
                    const thirdItemHeight = thirdItemWidth / items[2].aspectRatio
                    
                    return [
                        [
                            { 
                                ...items[0], 
                                width: firstItemWidth, 
                                height: targetRowHeight * 1.2
                            },
                            { 
                                ...items[1], 
                                width: secondItemWidth, 
                                height: targetRowHeight * 1.2
                            }
                        ],
                        [{ 
                            ...items[2], 
                            width: thirdItemWidth, 
                            height: thirdItemHeight,
                            centered: true
                        }]
                    ]
                
                case 4:
                    // First row: First item gets 60% width, second gets 40% (both limited)
                    // Second row: Last two side by side (limited)
                    const firstRowWidth4 = containerWidth - spacing
                    const firstItemWidth4 = Math.min(maxItemWidth, firstRowWidth4 * 0.6)
                    const secondItemWidth4 = Math.min(maxItemWidth, firstRowWidth4 * 0.4)
                    
                    const totalWidth4 = items[2].scaledWidth + items[3].scaledWidth
                    const ratio4 = (containerWidth - spacing) / totalWidth4
                    
                    return [
                        [
                            { 
                                ...items[0], 
                                width: firstItemWidth4, 
                                height: targetRowHeight * 1.2
                            },
                            { 
                                ...items[1], 
                                width: secondItemWidth4, 
                                height: targetRowHeight * 1.2
                            }
                        ],
                        [
                            { 
                                ...items[2], 
                                width: Math.min(maxItemWidth, items[2].scaledWidth * ratio4), 
                                height: targetRowHeight * ratio4 
                            },
                            { 
                                ...items[3], 
                                width: Math.min(maxItemWidth, items[3].scaledWidth * ratio4), 
                                height: targetRowHeight * ratio4 
                            }
                        ]
                    ]
                
                case 5:
                    // First row: First item gets 60% width, second gets 40% (both limited)
                    // Second row: Three items side by side (limited)
                    const firstRowWidth5 = containerWidth - spacing
                    const firstItemWidth5 = Math.min(maxItemWidth, firstRowWidth5 * 0.6)
                    const secondItemWidth5 = Math.min(maxItemWidth, firstRowWidth5 * 0.4)
                    
                    const totalWidth5Row2 = items[2].scaledWidth + items[3].scaledWidth + items[4].scaledWidth
                    const ratio5Row2 = (containerWidth - spacing * 2) / totalWidth5Row2
                    
                    return [
                        [
                            { 
                                ...items[0], 
                                width: firstItemWidth5, 
                                height: targetRowHeight * 1.2
                            },
                            { 
                                ...items[1], 
                                width: secondItemWidth5, 
                                height: targetRowHeight * 1.2
                            }
                        ],
                        [
                            { 
                                ...items[2], 
                                width: Math.min(maxItemWidth, items[2].scaledWidth * ratio5Row2), 
                                height: targetRowHeight * ratio5Row2 
                            },
                            { 
                                ...items[3], 
                                width: Math.min(maxItemWidth, items[3].scaledWidth * ratio5Row2), 
                                height: targetRowHeight * ratio5Row2 
                            },
                            { 
                                ...items[4], 
                                width: Math.min(maxItemWidth, items[4].scaledWidth * ratio5Row2), 
                                height: targetRowHeight * ratio5Row2 
                            }
                        ]
                    ]
            }
        }
        
        // For more than 5 items, use a more dynamic approach
        const rows = []
        
        // First row: First item gets 60% width, second gets 40% (both limited)
        if (items.length > 1) {
            const firstRowWidth = containerWidth - spacing
            const firstItemWidth = Math.min(maxItemWidth, firstRowWidth * 0.6)
            const secondItemWidth = Math.min(maxItemWidth, firstRowWidth * 0.4)
            
            rows.push([
                { 
                    ...items[0], 
                    width: firstItemWidth, 
                    height: targetRowHeight * 1.2
                },
                { 
                    ...items[1], 
                    width: secondItemWidth, 
                    height: targetRowHeight * 1.2
                }
            ])
        }
        
        // Remaining items are laid out in rows of 2-3 items
        let currentRow = []
        let currentRowWidth = 0
        
        for (let i = 2; i < items.length; i++) {
            const item = items[i]
            
            // If adding this item would exceed container width or we already have 3 items, finalize the row
            if (currentRowWidth + item.scaledWidth > containerWidth || currentRow.length >= 3) {
                if (currentRow.length > 0) {
                    const totalSpacing = (currentRow.length - 1) * spacing
                    const totalScaledWidth = currentRow.reduce((sum, item) => sum + item.scaledWidth, 0)
                    const ratio = (containerWidth - totalSpacing) / totalScaledWidth
                    
                    rows.push(currentRow.map(item => ({
                        ...item,
                        width: Math.min(maxItemWidth, item.scaledWidth * ratio),
                        height: item.height * ratio
                    })))
                    
                    currentRow = []
                    currentRowWidth = 0
                }
            }
            
            currentRow.push(item)
            currentRowWidth += item.scaledWidth + spacing
        }
        
        // Add the last row if it has items
        if (currentRow.length > 0) {
            const totalSpacing = (currentRow.length - 1) * spacing
            const totalScaledWidth = currentRow.reduce((sum, item) => sum + item.scaledWidth, 0)
            const ratio = (containerWidth - totalSpacing) / totalScaledWidth
            
            rows.push(currentRow.map(item => ({
                ...item,
                width: Math.min(maxItemWidth, item.scaledWidth * ratio),
                height: item.height * ratio
            })))
        }
        
        return rows
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
                    <div key={rowIndex} className="flex gap-3 justify-center">
                        {row.map(({ originalIndex, width, height, item, centered }) => (
                            <div 
                                key={originalIndex}
                                className="relative rounded-md overflow-hidden cursor-pointer group"
                                style={{ 
                                    width: `${width}px`, 
                                    height: `${height}px`,
                                    flexShrink: 0,
                                    margin: centered ? '0 auto' : undefined
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