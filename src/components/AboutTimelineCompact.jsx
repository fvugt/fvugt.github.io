import React from 'react'
import aboutData from '../data/about.json'

function TimelineSection({ title, items, type = "experience" }) {
    return (
        <div className="relative">
            <h3 className="text-xl font-bold text-white mb-6">{title}</h3>
            <div className="relative border-l border-green-500/20 pl-6 ml-2 space-y-4">
                {items.map((item, index) => (
                    <div 
                        key={index} 
                        className="relative group"
                    >
                        {/* Timeline dot */}
                        <div className="absolute -left-[11px] w-4 h-4">
                            <div className="w-2 h-2 bg-green-500 rounded-full group-hover:scale-150 transition-transform"></div>
                        </div>
                        
                        {/* Content */}
                        <div className="bg-backgroundBColor/50 group-hover:bg-backgroundBColor p-4 rounded-lg transition-colors">
                            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-1">
                                <h4 className="text-white font-medium">
                                    {type === "experience" ? item.role : item.degree}
                                </h4>
                                <div className="text-green-400 text-sm">
                                    {type === "experience" ? item.period : item.year || item.period}
                                </div>
                            </div>
                            <div className="text-white/60 text-sm">
                                {type === "experience" ? item.company : item.school}
                            </div>
                            {item.specialization && (
                                <div className="text-white/40 text-sm mt-1">
                                    {item.specialization}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function AboutTimelineCompact() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-6xl mx-auto">
                {/* Header with Image */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
                    {/* Profile Image */}
                    <div className="relative">
                        <div className="aspect-square rounded-2xl overflow-hidden">
                            <img
                                src={`${import.meta.env.BASE_URL}assets/profile.jpg`}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Intro Text */}
                    <div className="lg:col-span-3 space-y-6">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2">
                                {aboutData.intro.name}
                            </h1>
                            <p className="text-xl text-green-400">
                                {aboutData.intro.title}
                            </p>
                        </div>
                        <p className="text-lg text-white/80 leading-relaxed">
                            {aboutData.intro.bio}
                        </p>
                        <p className="text-lg text-white/80 leading-relaxed">
                            I am an experienced Game and Application Developer with a demonstrated history of working in the interactive media industry. Skilled in Unity3D for desktop and mobile applications. I have a solid background in Maya and After Effects.
                        </p>
                    </div>
                </div>

                {/* Skills Grid */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-8">Skills & Expertise</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {Object.entries(aboutData.skills).map(([category, skills]) => (
                            <div 
                                key={category} 
                                className="bg-backgroundBColor p-6 rounded-lg"
                            >
                                <h3 className="text-lg font-medium text-white capitalize mb-4">
                                    {category}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill, index) => (
                                        <span 
                                            key={index}
                                            className="px-2.5 py-1 bg-white/5 rounded text-sm text-white/80 hover:text-green-400 transition-colors"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Timeline Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <TimelineSection 
                        title="Experience" 
                        items={aboutData.experience}
                        type="experience"
                    />
                    <TimelineSection 
                        title="Education" 
                        items={aboutData.education}
                        type="education"
                    />
                </div>
            </div>
        </div>
    )
}

export default AboutTimelineCompact 