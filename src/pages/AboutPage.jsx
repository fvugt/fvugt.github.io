import React from 'react'
import AboutMinimal from '../components/AboutMinimal'
import AboutCards from '../components/AboutCards'
import AboutMagazine from '../components/AboutMagazine'     
import AboutTimeline from '../components/AboutTimeline'
import AboutResume from '../components/AboutResume'
import AboutTimelineCompact from '../components/AboutTimelineCompact'

function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-16">
            <AboutMinimal />
            <AboutCards />
            <AboutMagazine />
            <AboutTimeline />
            <AboutResume />
            <AboutTimelineCompact />
            <div className="max-w-6xl mx-auto">
                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    {/* Image Column */}
                    <div className="relative">
                        <div className="aspect-square rounded-2xl overflow-hidden">
                            <img
                                src={`${import.meta.env.BASE_URL}assets/profile.jpg`}
                                alt="Frank's profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute -z-10 top-4 -left-4 w-full h-full bg-green-500/10 rounded-2xl"></div>
                        <div className="absolute -z-10 -top-4 left-4 w-full h-full bg-backgroundBColor rounded-2xl"></div>
                    </div>

                    {/* Text Column */}
                    <div className="space-y-6">
                        <h1 className="text-4xl lg:text-5xl font-bold text-white">
                            About me
                        </h1>
                        <p className="text-lg text-white/80 leading-relaxed">
                            Hi, I'm Frank. A 33 year old guy living in Utrecht. In my free time I like to play groupbased computer games, listen to music and bingewatch Netflix shows.
                        </p>
                    </div>
                </div>

                {/* Background Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Professional Background */}
                    <div className="bg-backgroundBColor p-8 rounded-2xl">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Professional Background
                        </h2>
                        <p className="text-white/80 leading-relaxed">
                            I am an experienced Game and Application Developer with a demonstrated history of working in the interactive media industry. Skilled in Unity3D for desktop and mobile applications. I have a solid background in Maya and After Effects.
                        </p>
                    </div>

                    {/* Education */}
                    <div className="bg-backgroundBColor p-8 rounded-2xl">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Education
                        </h2>
                        <p className="text-white/80 leading-relaxed">
                            Strong engineering professional with a Master of Arts (EMMA) European Media Master of Arts focused on Creative Design for Digital Cultures.
                        </p>
                    </div>
                </div>

                {/* Skills Grid */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-white mb-8">Core Skills</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[
                            'Unity3D',
                            'Mobile Development',
                            'Desktop Applications',
                            'Maya',
                            'After Effects',
                            'Game Development',
                            'Interactive Media',
                            'Creative Design'
                        ].map((skill, index) => (
                            <div 
                                key={index}
                                className="bg-backgroundBColor/50 border border-white/10 rounded-lg px-4 py-3 text-white/80 hover:text-green-500 hover:border-green-500/50 transition-colors"
                            >
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutPage 