import React, { useState, useEffect } from 'react'

function GalleryGrid({ gallery }) {
    const [activeItem, setActiveItem] = useState(null)
    const [loadedVideos, setLoadedVideos] = useState({})
    const baseUrl = import.meta.env.BASE_URL || ''

    // Function to get the correct path for images and videos
    const getImagePath = (path) => {
        if (path.startsWith('http') || path.startsWith('/')) {
            return path
        }
        return `${baseUrl}${path}`
    }

    // Handle video loading
    const handleVideoLoad = (index) => {
        setLoadedVideos(prev => ({
            ...prev,
            [index]: true
        }))
    }

    // Handle item click
    const handleItemClick = (item) => {
        setActiveItem(item)
        document.body.style.overflow = 'hidden'
    }

    // Close modal
    const closeModal = () => {
        setActiveItem(null)
        document.body.style.overflow = 'auto'
    }

    // Close modal when Escape key is pressed
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') closeModal()
        }
        window.addEventListener('keydown', handleEsc)
        return () => {
            window.removeEventListener('keydown', handleEsc)
            document.body.style.overflow = 'auto'
        }
    }, [])

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {gallery.map((item, index) => (
                    <div 
                        key={index} 
                        className="relative group cursor-pointer overflow-hidden rounded-lg bg-backgroundBColor"
                        onClick={() => handleItemClick(item)}
                    >
                        {item.type === 'video' ? (
                            <div className="aspect-video relative">
                                <video
                                    src={getImagePath(item.src)}
                                    className="w-full h-full object-cover"
                                    muted
                                    loop
                                    playsInline
                                    onLoadedData={() => handleVideoLoad(index)}
                                    onMouseEnter={(e) => e.target.play()}
                                    onMouseLeave={(e) => e.target.pause()}
                                />
                                {!loadedVideos[index] && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                        <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="aspect-video relative">
                                <img
                                    src={getImagePath(item.src)}
                                    alt={item.caption || `Gallery item ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                        )}
                        
                        {/* Caption Overlay */}
                        {item.caption && (
                            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                                <p className="text-white text-center">{item.caption}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Modal */}
            {activeItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90" onClick={closeModal}>
                    <div className="relative max-w-4xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
                        <button 
                            className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition-colors"
                            onClick={closeModal}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        
                        <div className="bg-backgroundBColor rounded-lg overflow-hidden">
                            {activeItem.type === 'video' ? (
                                <video
                                    src={getImagePath(activeItem.src)}
                                    className="w-full h-auto"
                                    controls
                                    autoPlay
                                />
                            ) : (
                                <img
                                    src={getImagePath(activeItem.src)}
                                    alt={activeItem.caption || 'Gallery item'}
                                    className="w-full h-auto"
                                />
                            )}
                            
                            {activeItem.caption && (
                                <div className="p-4">
                                    <p className="text-white">{activeItem.caption}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default GalleryGrid 