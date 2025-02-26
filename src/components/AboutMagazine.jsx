import React from 'react'

function AboutMagazine() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
                    <div className="lg:col-span-2">
                        <h1 className="text-7xl font-bold text-white mb-8">About<br />Frank</h1>
                        <div className="text-xl text-white/80 leading-relaxed">
                            Hi, I'm Frank. A 33 year old guy living in Utrecht. In my free time I like to play groupbased computer games, listen to music and bingewatch Netflix shows.
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-[3/4] rounded-lg overflow-hidden">
                            <img
                                src={`${import.meta.env.BASE_URL}assets/profile.jpg`}
                                alt="Frank's profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -z-10 inset-4 bg-green-500/20 rounded-lg"></div>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                    {/* Professional */}
                    <div>
                        <h2 className="text-2xl font-bold text-green-500 mb-6">Professional Background</h2>
                        <p className="text-white/80 leading-relaxed mb-8">
                            I am an experienced Game and Application Developer with a demonstrated history of working in the interactive media industry. Skilled in Unity3D for desktop and mobile applications. I have a solid background in Maya and After Effects.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            {['Unity3D', 'Maya', 'After Effects', 'Game Dev'].map((skill, index) => (
                                <div 
                                    key={index}
                                    className="border border-white/10 rounded px-4 py-3 text-white/60"
                                >
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Education */}
                    <div>
                        <h2 className="text-2xl font-bold text-green-500 mb-6">Education</h2>
                        <div className="bg-backgroundBColor p-8 rounded-lg">
                            <h3 className="text-xl font-bold text-white mb-4">Master of Arts (EMMA)</h3>
                            <p className="text-white/80 leading-relaxed">
                                European Media Master of Arts focused on Creative Design for Digital Cultures.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutMagazine 