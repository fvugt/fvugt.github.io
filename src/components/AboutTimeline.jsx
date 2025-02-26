import React from 'react'
import aboutData from '../data/about.json'

function TimelineSection({ title, items, type = "experience" }) {
    return (
        <div className="relative">
            <h2 className="text-2xl font-bold text-white mb-8">{title}</h2>
            <div className="relative border-l-2 border-green-500/20 pl-8 ml-4 space-y-8">
                {items.map((item, index) => (
                    <div 
                        key={index} 
                        className="relative"
                    >
                        {/* Timeline dot */}
                        <div className="absolute -left-[41px] w-4 h-4 bg-green-500 rounded-full border-4 border-backgroundAColor"></div>
                        
                        {/* Content */}
                        <div className="bg-backgroundBColor p-6 rounded-lg">
                            <div className="text-green-400 text-sm mb-2">
                                {type === "experience" ? item.period : item.year || item.period}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-1">
                                {type === "experience" ? item.role : item.degree}
                            </h3>
                            <div className="text-white/60">
                                {type === "experience" ? item.company : item.school}
                            </div>
                            {item.specialization && (
                                <div className="text-white/60 mt-2 text-sm">
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

function AboutTimeline() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
                    <div className="lg:col-span-2 space-y-6">
                        <h1 className="text-5xl font-bold text-white">
                            {aboutData.intro.name}
                        </h1>
                        <p className="text-2xl text-green-400">
                            {aboutData.intro.title}
                        </p>
                        <p className="text-lg text-white/80 leading-relaxed">
                            {aboutData.intro.bio}
                        </p>
                    </div>
                    <div className="relative">
                        <div className="aspect-square rounded-2xl overflow-hidden">
                            <img
                                src={`${import.meta.env.BASE_URL}assets/profile.jpg`}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Timeline Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
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

                {/* Skills Section */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {Object.entries(aboutData.skills).map(([category, skills]) => (
                        <div key={category} className="bg-backgroundBColor p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-white capitalize mb-4">
                                {category}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, index) => (
                                    <span 
                                        key={index}
                                        className="px-3 py-1 bg-white/5 rounded text-sm text-green-400"
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
    )
}

export default AboutTimeline 