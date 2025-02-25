import React from 'react'

function ProjectDetails({ details, style = 'list' }) {
  return (
    <div className="bg-accentColor p-4 rounded-lg">
      <h2 className="text-2xl font-semibold mb-2">Project Details</h2>
      <ul className={`space-y-2 ${style === 'grid' ? 'grid grid-cols-2 gap-4' : ''}`}>
        {details.map((detail, index) => {
          const [key, value] = Object.entries(detail)[0]
          return (
            <li
              key={index}
              className={`flex justify-between ${
                style === 'underline' ? 'border-b border-gray-800 pb-1' : ''
              }`}
            >
              <span className="font-medium">{key}</span>
              <span className="text-gray-400">{value}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ProjectDetails
