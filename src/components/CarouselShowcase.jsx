import { useState } from 'react'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function CarouselShowcase({ snippets }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % snippets.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + snippets.length) % snippets.length)
  }

  return (
    <div className='bg-black/20 rounded-lg p-6'>
      <div className='relative'>
        {/* Navigation Arrows */}
        <button 
          onClick={prev}
          className='absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors'
        >
          <ChevronLeft className='w-6 h-6' />
        </button>
        <button 
          onClick={next}
          className='absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors'
        >
          <ChevronRight className='w-6 h-6' />
        </button>

        {/* Content */}
        <div className='max-w-4xl mx-auto px-12'>
          <div className='text-center mb-8'>
            <h3 className='text-2xl font-bold mb-4'>{snippets[currentIndex].title}</h3>
            <div className='bg-gray-900/50 p-4 rounded-lg inline-block'>
              <p className='text-gray-300'>{snippets[currentIndex].description}</p>
            </div>
          </div>

          <div className='grid md:grid-cols-2 gap-6'>
            <img
              src={`${import.meta.env.BASE_URL}${snippets[currentIndex].image}`}
              alt={snippets[currentIndex].title}
              className='w-full rounded-lg'
            />
            <div className='relative'>
              <div className='absolute -top-2.5 left-3 bg-black px-2 py-0.5 text-xs uppercase tracking-wider text-green-500 font-semibold'>
                {snippets[currentIndex].language}
              </div>
              <div className='bg-gray-900/50 rounded-lg overflow-hidden'>
                <SyntaxHighlighter
                  language={snippets[currentIndex].language}
                  style={atomOneDark}
                  customStyle={{ 
                    padding: '1.5rem',
                    margin: 0,
                    background: 'transparent',
                    fontSize: '0.85em',
                    maxHeight: '200px'
                  }}
                  wrapLines={true}
                  showLineNumbers={true}
                >
                  {snippets[currentIndex].code}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>

          {/* Dots Navigation */}
          <div className='flex justify-center gap-2 mt-6'>
            {snippets.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-green-500 w-4' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarouselShowcase 