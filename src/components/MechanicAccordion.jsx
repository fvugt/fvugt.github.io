import React, { useState, useRef } from 'react'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { X } from 'lucide-react'

function MechanicAccordion({ snippets }) {
    const [openIndex, setOpenIndex] = useState(0)
    const [showLightbox, setShowLightbox] = useState(null)
    const mechanicRefs = useRef([])

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index)
        if (openIndex !== index && mechanicRefs.current[index]) {
            setTimeout(() => {
                mechanicRefs.current[index].scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                })
            }, 100)
        }
    }

    const ImageSection = ({ image, title }) => (
        <div className="relative">
            <img
                src={`${import.meta.env.BASE_URL}${image}`}
                alt={title}
                className="w-full h-64 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setShowLightbox(image)}
            />
        </div>
    )

    const Lightbox = () => (
        <div 
            className="fixed inset-0 bg-black/90 z-[200] flex items-center justify-center pointer-events-auto"
            onClick={() => setShowLightbox(null)}
        >
            <button 
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                onClick={() => setShowLightbox(null)}
            >
                <X className="w-6 h-6 text-white/80" />
            </button>
            <div className="max-w-7xl max-h-[90vh] p-4" onClick={e => e.stopPropagation()}>
                <img 
                    src={`${import.meta.env.BASE_URL}${showLightbox}`} 
                    alt="Full size"
                    className="max-h-[80vh] mx-auto" 
                />
            </div>
        </div>
    )

    const ContentSection = ({ description, language, code }) => (
        <div className="h-full flex flex-col">
            <div className="bg-gray-900/50 p-3 rounded-lg flex-grow">
                <h4 className="text-green-500 font-semibold mb-2 uppercase tracking-wider text-xs">Description</h4>
                <p className="text-gray-300 leading-relaxed text-sm">
                    {description}
                </p>
            </div>

            <div className="relative mt-4">
                <div className="absolute -top-2.5 left-3 bg-black px-2 py-0.5 text-xs uppercase tracking-wider text-green-500 font-semibold">
                    {language}
                </div>
                <div className="bg-gray-900/50 rounded-lg overflow-hidden">
                    <SyntaxHighlighter
                        language={language}
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
                        {code}
                    </SyntaxHighlighter>
                </div>
            </div>
        </div>
    )

    return (
        <>
            <div className="space-y-4">
                {snippets.map((snippet, index) => (
                    <div
                        key={index}
                        ref={el => mechanicRefs.current[index] = el}
                        className="bg-backgroundColor rounded-lg shadow-lg overflow-hidden border border-gray-800/50 pointer-events-auto"
                    >
                        <button
                            onClick={() => handleToggle(index)}
                            className={`w-full text-left p-4 bg-backgroundBColor hover:bg-gray-900 transition-all duration-200 flex justify-between items-center group pointer-events-auto ${
                                openIndex === index ? 'bg-backgroundBColor' : 'bg-backgroundBColor'
                            }`}
                        >
                            <div className="flex items-center space-x-3">
                                <span className={`text-green-500 transition-transform duration-200 ${
                                    openIndex === index ? 'rotate-90' : ''
                                }`}>
                                    ▶
                                </span>
                                <h3 className={`text-lg font-bold text-green-500/90 group-hover:text-green-400 transition-colors duration-200 ${
                                    openIndex === index ? 'text-green-400' : ''
                                }`}>
                                    {snippet.title}
                                </h3>
                            </div>
                            <span className="text-xs uppercase tracking-wider text-gray-500 group-hover:text-gray-400 transition-colors duration-200">
                                Click to {openIndex === index ? 'hide' : 'show'}
                            </span>
                        </button>

                        {openIndex === index && (
                            <div className="p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {index % 2 === 0 ? (
                                        <>
                                            <ImageSection {...snippet} />
                                            <ContentSection {...snippet} />
                                        </>
                                    ) : (
                                        <>
                                            <ContentSection {...snippet} />
                                            <ImageSection {...snippet} />
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {showLightbox && <Lightbox />}
        </>
    )
}

export default MechanicAccordion