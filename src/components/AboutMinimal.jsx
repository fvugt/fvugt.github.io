import React from 'react'
import aboutData from '../data/about.json'

function AboutMinimal() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto space-y-24">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-5xl font-bold text-white">{aboutData.intro.name}</h1>
                    <p className="text-xl text-white/60">{aboutData.intro.title}</p>
                </div>

                {/* Profile Image */}
                <div className="aspect-[21/9] rounded-xl overflow-hidden">
                    <img
                        src={`${import.meta.env.BASE_URL}assets/profile.jpg`}
                        alt="Frank's profile"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Intro */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg leading-relaxed">
                    <div className="text-white/80">
                        {aboutData.intro.bio}
                    </div>
                    <div className="text-white/80">
                        I am an experienced Game and Application Developer with a demonstrated history of working in the interactive media industry.
                    </div>
                </div>

                {/* Experience & Education Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Experience */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white">Experience</h2>
                        <div className="space-y-4">
                            {aboutData.experience.map((exp, index) => (
                                <div 
                                    key={index}
                                    className="group flex items-start gap-4 hover:bg-backgroundBColor p-3 rounded-lg transition-colors"
                                >
                                    {/* Date */}
                                    <div className="text-sm text-green-400 w-20 shrink-0 pt-0.5">
                                        {exp.period}
                                    </div>
                                    {/* Details */}
                                    <div className="min-w-0">
                                        <h3 className="text-white font-medium text-sm mb-0.5 truncate">
                                            {exp.role}
                                        </h3>
                                        <div className="text-white/60 text-sm truncate">
                                            {exp.company}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Education */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white">Education</h2>
                        <div className="space-y-4">
                            {aboutData.education.map((edu, index) => (
                                <div 
                                    key={index}
                                    className="group flex items-start gap-4 hover:bg-backgroundBColor p-3 rounded-lg transition-colors"
                                >
                                    {/* Date */}
                                    <div className="text-sm text-green-400 w-20 shrink-0 pt-0.5">
                                        {edu.year || edu.period}
                                    </div>
                                    {/* Details */}
                                    <div className="min-w-0">
                                        <h3 className="text-white font-medium text-sm mb-0.5 truncate">
                                            {edu.degree}
                                        </h3>
                                        <div className="text-white/60 text-sm truncate">
                                            {edu.school}
                                        </div>
                                        {edu.specialization && (
                                            <div className="text-white/40 text-xs mt-0.5 truncate">
                                                {edu.specialization}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Skills */}
                <div className="space-y-12">
                    <h2 className="text-2xl font-bold text-white text-center">Skills</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {Object.entries(aboutData.skills).map(([category, skills]) => (
                            <div key={category} className="space-y-4">
                                <h3 className="text-white/60 uppercase text-sm tracking-wider text-center">
                                    {category}
                                </h3>
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {skills.map((skill, index) => (
                                        <span 
                                            key={index}
                                            className="px-3 py-1 bg-backgroundBColor rounded-full text-sm text-white/80 hover:text-green-400 transition-colors"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutMinimal 