import React, { useState } from 'react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'

function Gallery({ media }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(null)

  const displayedMedia = Array.from({ length: 3 }, (_, i) => {
    const index = (currentIndex + i) % media.length
    return { ...media[index], index: (currentIndex + i) % media.length }
  })

  const navigate = (direction) => {
    setCurrentIndex(prev => {
      if (direction === 'next') {
        return (prev + 1) % media.length
      }
      return (prev - 1 + media.length) % media.length
    })
  }

  const navigateLightbox = (direction) => {
    setSelectedIndex(prev => {
      if (direction === 'next') {
        return (prev + 1) % media.length
      }
      return (prev - 1 + media.length) % media.length
    })
  }

  const isYouTubeUrl = (url) => {
    return url.includes('youtube.com/embed/')
  }

  const getYouTubeUrl = (url) => {
    return `${url}?rel=0&modestbranding=1&showinfo=0&color=white`
  }

  const MediaItem = ({ item, onClick }) => {
    if (item.type === 'video') {
      if (isYouTubeUrl(item.src)) {
        return (
          <div className="relative cursor-pointer h-64" onClick={onClick}>
            <iframe
              src={getYouTubeUrl(item.src)}
              className="absolute inset-0 w-full h-full"
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
              allowFullScreen
            />
            <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-xs uppercase">
              Video
            </div>
          </div>
        )
      }
      return (
        <div className="relative cursor-pointer" onClick={onClick}>
          <video 
            src={`${import.meta.env.BASE_URL}${item.src}`} 
            controls 
            className="h-64 w-full object-cover"
            poster={`${import.meta.env.BASE_URL}${item.poster}`}
          />
          <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-xs uppercase">
            Video
          </div>
        </div>
      )
    }

    return (
      <img 
        src={`${import.meta.env.BASE_URL}${item.src}`} 
        alt="Gallery item" 
        className="w-full h-64 object-cover cursor-pointer hover:opacity-90 transition-opacity" 
        onClick={onClick}
      />
    )
  }

  const Lightbox = ({ index, onClose }) => {
    const item = media[index]
    
    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center pointer-events-auto" onClick={onClose}>
        <button 
          className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors pointer-events-auto"
          onClick={onClose}
        >
          <X className="w-6 h-6 text-white/80" />
        </button>

        <button 
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors pointer-events-auto"
          onClick={(e) => {
            e.stopPropagation()
            navigateLightbox('prev')
          }}
        >
          <ArrowLeft className="w-6 h-6 text-white/80" />
        </button>

        <div className="max-w-7xl max-h-[90vh] p-4" onClick={e => e.stopPropagation()}>
          {item.type === 'video' ? (
            isYouTubeUrl(item.src) ? (
              <div className="w-[80vw] max-w-4xl">
                <div className="relative pt-[56.25%]">
                  <iframe
                    src={getYouTubeUrl(item.src)}
                    className="absolute inset-0 w-full h-full"
                    title="YouTube video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                    allowFullScreen
                  />
                </div>
              </div>
            ) : (
              <video 
                src={`${import.meta.env.BASE_URL}${item.src}`} 
                controls 
                className="max-h-[80vh] mx-auto"
                poster={`${import.meta.env.BASE_URL}${item.poster}`}
              />
            )
          ) : (
            <img 
              src={`${import.meta.env.BASE_URL}${item.src}`} 
              alt="Gallery item" 
              className="max-h-[80vh] mx-auto" 
            />
          )}
        </div>

        <button 
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors pointer-events-auto"
          onClick={(e) => {
            e.stopPropagation()
            navigateLightbox('next')
          }}
        >
          <ArrowRight className="w-6 h-6 text-white/80" />
        </button>
      </div>
    )
  }

  return (
    <div className="bg-black p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Gallery</h2>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
          {displayedMedia.map((item) => (
            <div key={item.index} className="relative rounded-lg overflow-hidden">
              <MediaItem 
                item={item} 
                onClick={() => setSelectedIndex(item.index)}
              />
            </div>
          ))}
        </div>

        {media.length > 3 && (
          <div className="flex justify-center gap-4 mt-6">
            <button 
              onClick={() => navigate('prev')}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors z-10"
            >
              <ArrowLeft className="w-5 h-5 text-white/80" />
            </button>
            <button 
              onClick={() => navigate('next')}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors z-10"
            >
              <ArrowRight className="w-5 h-5 text-white/80" />
            </button>
          </div>
        )}
      </div>

      {selectedIndex !== null && (
        <Lightbox 
          index={selectedIndex}
          onClose={() => setSelectedIndex(null)} 
        />
      )}
    </div>
  )
}

export default Gallery
