import React from 'react'

function AboutCards() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-6xl mx-auto">
                {/* Profile Card */}
                <div className="bg-backgroundBColor rounded-2xl overflow-hidden mb-12">
                    <div className="aspect-[21/9] relative">
                        <img
                            src={`${import.meta.env.BASE_URL}assets/profile.jpg`}
                            alt="Frank's profile"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-backgroundBColor to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                            <h1 className="text-4xl font-bold text-white mb-2">Frank</h1>
                            <p className="text-xl text-white/60">Game & Application Developer</p>
                        </div>
                    </div>
                    <div className="p-8">
                        <p className="text-lg text-white/80 leading-relaxed">
                            Hi, I'm Frank. A 33 year old guy living in Utrecht. In my free time I like to play groupbased computer games, listen to music and bingewatch Netflix shows.
                        </p>
                    </div>
                </div>

                {/* Info Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Experience Card */}
                    <div className="bg-backgroundBColor rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">Experience</h2>
                        <p className="text-white/80 leading-relaxed mb-6">
                            I am an experienced Game and Application Developer with a demonstrated history of working in the interactive media industry.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {['Unity3D', 'Maya', 'After Effects'].map((skill, index) => (
                                <span 
                                    key={index}
                                    className="px-3 py-1 bg-white/5 rounded text-sm text-green-400"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Education Card */}
                    <div className="bg-backgroundBColor rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">Education</h2>
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-green-400">Master of Arts (EMMA)</h3>
                            <p className="text-white/80">
                                European Media Master of Arts focused on Creative Design for Digital Cultures.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutCards 