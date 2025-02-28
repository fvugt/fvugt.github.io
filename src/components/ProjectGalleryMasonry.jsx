import React, { useState, useEffect } from 'react'

function ProjectGalleryMasonry({ gallery }) {
    const [activeItem, setActiveItem] = useState(null)
    const [columns, setColumns] = useState([])
    
    useEffect(() => {
        if (!gallery || gallery.length === 0) return
        
        const handleResize = () => {
            const width = window.innerWidth
            let numColumns = 1
            
            if (width >= 1280) numColumns = 4
            else if (width >= 768) numColumns = 3
            else if (width >= 640) numColumns = 2
            
            // Distribute items among columns
            const newColumns = Array.from({ length: numColumns }, () => [])
            
            gallery.forEach((item, index) => {
                // Add to shortest column
                const shortestColumnIndex = newColumns
                    .map((column, i) => ({ 
                        height: column.reduce((sum, item) => sum + (item.aspectRatio || 1.5), 0),
                        index: i 
                    }))
                    .sort((a, b) => a.height - b.height)[0].index
                
                newColumns[shortestColumnIndex].push({
                    ...item,
                    aspectRatio: item.aspectRatio || (Math.random() * 0.5 + 1) // Random aspect ratio between 1 and 1.5 if not provided
                })
            })
            
            setColumns(newColumns)
        }
        
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [gallery])
    
    if (!gallery || gallery.length === 0) {
        return null
    }
    
    const handleItemClick = (columnIndex, itemIndex) => {
        // Find the actual index in the original gallery array
        let actualIndex = 0
        let found = false
        
        for (let c = 0; c < columns.length; c++) {
            for (let i = 0; i < columns[c].length; i++) {
                if (c === columnIndex && i === itemIndex) {
                    found = true
                    break
                }
                actualIndex++
            }
            if (found) break
        }
        
        setActiveItem(actualIndex)
    }
    
    const closeModal = () => {
        setActiveItem(null)
    }
    
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Project Gallery</h2>
            
            {/* Masonry Gallery */}
            <div className="flex gap-4">
                {columns.map((column, columnIndex) => (
                    <div key={columnIndex} className="flex-1 space-y-4">
                        {column.map((item, itemIndex) => (
                            <div 
                                key={itemIndex}
                                className="relative rounded-lg overflow-hidden cursor-pointer group"
                                style={{ 
                                    paddingBottom: `${(1 / item.aspectRatio) * 100}%`,
                                    height: 0,
                                    position: 'relative'
                                }}
                                onClick={() => handleItemClick(columnIndex, itemIndex)}
                            >
                                <div className="absolute inset-0">
                                    {item.type === 'video' ? (
                                        <>
                                            <img 
                                                src={`${import.meta.env.BASE_URL}${item.poster}`} 
                                                alt={`Gallery item ${columnIndex}-${itemIndex}`}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </>
                                    ) : (
                                        <img 
                                            src={`${import.meta.env.BASE_URL}${item.src}`} 
                                            alt={`Gallery item ${columnIndex}-${itemIndex}`}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    )}
                                    
                                    {/* Hover overlay with gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
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
                                poster={`${import.meta.env.BASE_URL}${gallery[activeItem].poster}`}
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
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProjectGalleryMasonry 