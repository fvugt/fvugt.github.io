import { useState } from 'react'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

function TabsShowcase({ snippets }) {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className='bg-black/20 rounded-lg p-6'>
      <div className='flex gap-2 mb-6 overflow-x-auto'>
        {snippets.map((snippet, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeTab === index 
                ? 'bg-green-500 text-black' 
                : 'bg-black/20 hover:bg-black/40'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {snippet.title}
          </button>
        ))}
      </div>

      <div className='grid md:grid-cols-2 gap-6'>
        <div>
          <img
            src={`${import.meta.env.BASE_URL}${snippets[activeTab].image}`}
            alt={snippets[activeTab].title}
            className='w-full rounded-lg'
          />
        </div>
        <div>
          <div className='bg-gray-900/50 p-3 rounded-lg mb-4'>
            <h4 className='text-green-500 font-semibold mb-2 uppercase tracking-wider text-xs'>Description</h4>
            <p className='text-gray-300 leading-relaxed text-sm'>
              {snippets[activeTab].description}
            </p>
          </div>

          <div className='relative'>
            <div className='absolute -top-2.5 left-3 bg-black px-2 py-0.5 text-xs uppercase tracking-wider text-green-500 font-semibold'>
              {snippets[activeTab].language}
            </div>
            <div className='bg-gray-900/50 rounded-lg overflow-hidden'>
              <SyntaxHighlighter
                language={snippets[activeTab].language}
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
                {snippets[activeTab].code}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TabsShowcase 