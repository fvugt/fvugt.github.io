import React from 'react'
import aboutData from '../data/about.json'

function AboutResume() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-6xl mx-auto">
                {/* Hero Section */}
                <div className="relative mb-24">
                    <div className="bg-backgroundBColor rounded-3xl overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 p-12">
                            {/* Content */}
                            <div className="lg:col-span-8 space-y-6">
                                <div className="space-y-2">
                                    <h1 className="text-6xl font-bold text-white">
                                        {aboutData.intro.name}
                                    </h1>
                                    <p className="text-2xl text-green-400">
                                        {aboutData.intro.title}
                                    </p>
                                </div>
                                <p className="text-lg text-white/80 leading-relaxed">
                                    {aboutData.intro.bio}
                                </p>
                                
                                {/* Quick Stats */}
                                <div className="flex gap-8 pt-4">
                                    <div>
                                        <div className="text-4xl font-bold text-white">
                                            {aboutData.experience.length}
                                        </div>
                                        <div className="text-white/60">Positions</div>
                                    </div>
                                    <div>
                                        <div className="text-4xl font-bold text-white">
                                            {aboutData.education.length}
                                        </div>
                                        <div className="text-white/60">Degrees</div>
                                    </div>
                                    <div>
                                        <div className="text-4xl font-bold text-white">
                                            {Object.values(aboutData.skills).flat().length}
                                        </div>
                                        <div className="text-white/60">Skills</div>
                                    </div>
                                </div>
                            </div>

                            {/* Image */}
                            <div className="lg:col-span-4">
                                <div className="aspect-square rounded-2xl overflow-hidden">
                                    <img
                                        src={`${import.meta.env.BASE_URL}assets/profile.jpg`}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Experience Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-2xl font-bold text-white">Experience</h2>
                        <div className="space-y-4">
                            {aboutData.experience.map((exp, index) => (
                                <div 
                                    key={index}
                                    className="bg-backgroundBColor p-6 rounded-lg hover:ring-2 ring-green-500/20 transition-all"
                                >
                                    <div className="text-sm text-green-400 mb-2">{exp.period}</div>
                                    <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                                    <div className="text-white/60">{exp.company}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Skills Column */}
                    <div className="space-y-8">
                        {/* Education Section */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-6">Education</h2>
                            <div className="space-y-4">
                                {aboutData.education.map((edu, index) => (
                                    <div 
                                        key={index}
                                        className="bg-backgroundBColor p-6 rounded-lg"
                                    >
                                        <div className="text-sm text-green-400 mb-2">
                                            {edu.year || edu.period}
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-1">
                                            {edu.degree}
                                        </h3>
                                        <div className="text-white/60 text-sm">
                                            {edu.school}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Skills Sections */}
                        {Object.entries(aboutData.skills).map(([category, skills]) => (
                            <div key={category}>
                                <h2 className="text-xl font-bold text-white capitalize mb-4">
                                    {category}
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill, index) => (
                                        <span 
                                            key={index}
                                            className="px-3 py-1 bg-backgroundBColor rounded text-sm text-white/60 hover:text-green-400 transition-colors"
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

export default AboutResume 