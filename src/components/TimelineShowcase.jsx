import React, { useState } from 'react'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { X } from 'lucide-react'

function TimelineShowcase({ snippets }) {
    const [activeSnippet, setActiveSnippet] = useState(0)
    const [showLightbox, setShowLightbox] = useState(false)

    return (
        <div className="flex gap-8">
            {/* Timeline Navigation */}
            <div className="w-64 relative">
                {/* Container that wraps all buttons */}
                <div className="relative flex flex-col gap-4">
                    {/* Timeline Line (Now Matches Button Height) */}
                    <div className="absolute left-[22px] top-0 bottom-0 h-full w-0.5 bg-gray-800" />

                    {snippets.map((snippet, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveSnippet(index)}
                            className={`relative pl-12 pr-4 py-3 min-h-12 w-full text-left rounded-lg transition-all
                                ${activeSnippet === index
                                    ? 'bg-green-500/10 text-green-500 font-semibold'
                                    : 'hover:bg-gray-800/50 text-gray-400 hover:text-gray-200'
                                }
                            `}
                            style={{ whiteSpace: 'nowrap' }} // Prevents text wrapping from affecting size
                        >
                            {/* Timeline Dot (Perfectly Aligned with the Line) */}
                            <div className={`absolute left-[18px] top-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-full border-2 
                                ${activeSnippet === index
                                    ? 'border-green-500 bg-green-500'
                                    : 'border-gray-600 bg-gray-900'
                                }
                            `} />
                            <span className="text-sm font-medium block">
                                {snippet.title}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-grow">
                <div className="space-y-6">
                    {/* Description Section */}
                    <div className="bg-gray-900/50 p-4 rounded-lg">
                        <h4 className="text-green-500 font-semibold mb-2 uppercase tracking-wider text-xs">
                            Description
                        </h4>
                        <p className="text-gray-300 leading-relaxed text-sm">
                            {snippets[activeSnippet].description}
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 ">
                        {/* Image Section */}
                        <div className="md:w-1/3 h-[300px] relative">
                            <img
                                src={`${import.meta.env.BASE_URL}${snippets[activeSnippet].image}`}
                                alt={snippets[activeSnippet].title}
                                className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                                onClick={() => setShowLightbox(true)}
                            />
                        </div>

                        {/* Code Section */}
                        <div className="md:w-2/3  relative">
                            <div className="absolute -top-2.5 left-3 bg-black px-2 py-0.5 text-xs uppercase tracking-wider text-green-500 font-semibold z-10">
                                {snippets[activeSnippet].language}
                            </div>
                            <div className="bg-gray-900/50  rounded-lg overflow-hidden">
                                <SyntaxHighlighter
                                    language={snippets[activeSnippet].language}
                                    style={atomOneDark}
                                    customStyle={{
                                        padding: '1.5rem',
                                        margin: 0,
                                        background: 'transparent',
                                        fontSize: '0.85em',
                                        maxHeight: '300px'
                                    }}
                                    wrapLines={true}
                                    showLineNumbers={true}
                                >
                                    {snippets[activeSnippet].code}
                                </SyntaxHighlighter>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            {showLightbox && (
                <div
                    className="fixed inset-0 bg-black/90 z-[200] flex items-center justify-center"
                    onClick={() => setShowLightbox(false)}
                >
                    <button
                        className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                        onClick={() => setShowLightbox(false)}
                    >
                        <X className="w-6 h-6 text-white/80" />
                    </button>
                    <div className="max-w-7xl max-h-[90vh] p-4">
                        <img
                            src={`${import.meta.env.BASE_URL}${snippets[activeSnippet].image}`}
                            alt={snippets[activeSnippet].title}
                            className="max-h-[80vh] mx-auto"
                            onClick={e => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default TimelineShowcase
