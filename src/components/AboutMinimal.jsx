import React from 'react'

function AboutMinimal({ aboutData }) {
    return (
        <div className="bg-backgroundBColor rounded-lg p-8">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-white mb-6">{aboutData.title}</h2>
                
                <div className="space-y-8">
                    {/* Bio Section */}
                    <div>
                        <h3 className="text-xl font-semibold text-green-500 mb-4">About Me</h3>
                        <p className="text-white/90 leading-relaxed">
                            {aboutData.shortBio}
                        </p>
                    </div>
                    
                    {/* Skills Section */}
                    <div>
                        <h3 className="text-xl font-semibold text-green-500 mb-4">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {aboutData.skills.map((skill, index) => (
                                <span key={index} className="bg-black/30 text-white px-3 py-1 rounded-full text-sm">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                    
                    {/* Experience Section */}
                    <div>
                        <h3 className="text-xl font-semibold text-green-500 mb-4">Experience</h3>
                        <div className="space-y-4">
                            {aboutData.experience.map((exp, index) => (
                                <div key={index} className="border-l-2 border-green-500/30 pl-4">
                                    <h4 className="text-white font-medium">{exp.position}</h4>
                                    <p className="text-white/70 text-sm">{exp.company} | {exp.period}</p>
                                    <p className="text-white/80 mt-2">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Education Section */}
                    <div>
                        <h3 className="text-xl font-semibold text-green-500 mb-4">Education</h3>
                        <div className="space-y-4">
                            {aboutData.education.map((edu, index) => (
                                <div key={index} className="border-l-2 border-green-500/30 pl-4">
                                    <h4 className="text-white font-medium">{edu.degree}</h4>
                                    <p className="text-white/70 text-sm">{edu.institution} | {edu.year}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Interests Section */}
                    <div>
                        <h3 className="text-xl font-semibold text-green-500 mb-4">Interests</h3>
                        <div className="flex flex-wrap gap-2">
                            {aboutData.interests.map((interest, index) => (
                                <span key={index} className="bg-black/30 text-white px-3 py-1 rounded-full text-sm">
                                    {interest}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutMinimal 