import { useState } from 'react'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { X } from 'lucide-react'

function GridShowcase({ snippets }) {
  const [selectedSnippet, setSelectedSnippet] = useState(null)

  return (
    <div className='bg-black/20 rounded-lg p-6'>
      {/* Grid of Cards */}
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {snippets.map((snippet, index) => (
          <div 
            key={index}
            className='bg-gray-900/30 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-900/50 transition-colors'
            onClick={() => setSelectedSnippet(snippet)}
          >
            <img
              src={`${import.meta.env.BASE_URL}${snippet.image}`}
              alt={snippet.title}
              className='w-full h-48 object-cover'
            />
            <div className='p-4'>
              <h3 className='font-bold mb-2'>{snippet.title}</h3>
              <p className='text-sm text-gray-400 line-clamp-2'>{snippet.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedSnippet && (
        <div className='fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4'>
          <div className='bg-backgroundColor rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto'>
            <div className='p-6'>
              <div className='flex justify-between items-start mb-6'>
                <h2 className='text-2xl font-bold'>{selectedSnippet.title}</h2>
                <button 
                  onClick={() => setSelectedSnippet(null)}
                  className='p-1 hover:bg-gray-800 rounded'
                >
                  <X className='w-6 h-6' />
                </button>
              </div>

              <div className='grid md:grid-cols-2 gap-6'>
                <div>
                  <img
                    src={`${import.meta.env.BASE_URL}${selectedSnippet.image}`}
                    alt={selectedSnippet.title}
                    className='w-full rounded-lg'
                  />
                  <div className='bg-gray-900/50 p-4 rounded-lg mt-4'>
                    <p className='text-gray-300'>{selectedSnippet.description}</p>
                  </div>
                </div>

                <div className='relative'>
                  <div className='absolute -top-2.5 left-3 bg-black px-2 py-0.5 text-xs uppercase tracking-wider text-green-500 font-semibold'>
                    {selectedSnippet.language}
                  </div>
                  <div className='bg-gray-900/50 rounded-lg overflow-hidden'>
                    <SyntaxHighlighter
                      language={selectedSnippet.language}
                      style={atomOneDark}
                      customStyle={{ 
                        padding: '1.5rem',
                        margin: 0,
                        background: 'transparent',
                        fontSize: '0.85em',
                        maxHeight: '400px'
                      }}
                      wrapLines={true}
                      showLineNumbers={true}
                    >
                      {selectedSnippet.code}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GridShowcase 