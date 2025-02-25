import React from 'react'

function Banner({ image, style = 'default', title }) {
  const bannerStyles = {
    default: 'h-72 bg-cover bg-center rounded-lg',
    minimal: 'h-48 bg-cover bg-center rounded-md shadow-lg',
    full: 'h-screen bg-cover bg-center',
  }

  return (
    <div className="relative">
      <div
        className={`w-full ${bannerStyles[style]}`}
        style={{ backgroundImage: `url(${image})` }}
      />
      {title && (
        <div className="absolute bottom-6 left-6 pl-6 pr-8 py-3 bg-black/80 backdrop-blur-sm select-none rounded-r-lg border-l-4 border-accentColor shadow-xl">
          <h1 className="text-4xl font-bold tracking-wide">{title}</h1>
        </div>
      )}
    </div>
  )
}

export default Banner
