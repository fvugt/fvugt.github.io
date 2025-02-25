// src/pages/Resume.jsx
import React from 'react'

function Resume() {
  return (
    <div className="">
      <h2 className="text-3xl font-bold mb-4">Resume</h2>
      <section>
        <h3 className="text-xl font-semibold">Experience</h3>
        <ul className="list-disc list-inside ml-4">
          <li>Interactive Game Development at ...</li>
          <li>Lead Programmer at ...</li>
        </ul>
      </section>
      <section className="mt-6">
        <h3 className="text-xl font-semibold">Education</h3>
        <ul className="list-disc list-inside ml-4">
          <li>Bachelor, HKU (Utrecht)</li>
          <li>Master of Arts (Aalto)</li>
        </ul>
      </section>
    </div>
  )
}

export default Resume
