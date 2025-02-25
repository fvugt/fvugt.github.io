// src/pages/About.jsx
import React from 'react'

function About() {
  return (
    <div className="py-8 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4">About Me</h2>
      <img
        src="/assets/profile.jpg"
        alt="Profile"
        className="w-32 h-32 object-cover rounded-full mb-4"
      />
      <p className="max-w-md text-center text-gray-400">
        Hi, I'm Frank, a 31-year-old designer and developer based in Utrecht.
      </p>
    </div>
  )
}

export default About
