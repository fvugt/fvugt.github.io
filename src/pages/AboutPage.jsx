import React, { useState } from 'react'
import aboutData from '../data/about.json'

function AboutPage() {
    const [activeTab, setActiveTab] = useState('about')

    return (
        <div className="py-8">
            {/* Header with Profile Picture */}
            <div className="mb-8 flex flex-col sm:flex-row items-center gap-6">
                {/* Profile Picture */}
                <div className="flex-shrink-0">
                    <div className="relative">
                        <div className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] overflow-hidden rounded-full border-2 border-white/10">
                            <img 
                                src={`${import.meta.env.BASE_URL}${aboutData.profilePicture}`} 
                                alt="Profile" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Decorative element */}
                        <div className="absolute -bottom-2 -right-2 w-full h-full border-2 border-accentColor/50 rounded-full -z-10"></div>
                    </div>
                </div>
                
                {/* Title */}
                <div className="text-center sm:text-left">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-white">
                        {aboutData.name}
                    </h1>
                    <p className="text-lg text-gray-300">
                        {aboutData.title}
                    </p>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="mb-6 overflow-x-auto scrollbar-hide">
                <div className="flex space-x-1 border-b border-white/10 pb-1 min-w-max">
                    <button 
                        className={`px-3 sm:px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${
                            activeTab === 'about' 
                                ? 'bg-boxColorA text-white' 
                                : 'text-gray-400 hover:text-white'
                        }`}
                        onClick={() => setActiveTab('about')}
                    >
                        Overview
                    </button>
                    <button 
                        className={`px-3 sm:px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${
                            activeTab === 'experience' 
                                ? 'bg-boxColorA text-white' 
                                : 'text-gray-400 hover:text-white'
                        }`}
                        onClick={() => setActiveTab('experience')}
                    >
                        Experience
                    </button>
                    <button 
                        className={`px-3 sm:px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${
                            activeTab === 'education' 
                                ? 'bg-boxColorA text-white' 
                                : 'text-gray-400 hover:text-white'
                        }`}
                        onClick={() => setActiveTab('education')}
                    >
                        Education
                    </button>
                    <button 
                        className={`px-3 sm:px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${
                            activeTab === 'skills' 
                                ? 'bg-boxColorA text-white' 
                                : 'text-gray-400 hover:text-white'
                        }`}
                        onClick={() => setActiveTab('skills')}
                    >
                        Skills
                    </button>
                </div>
            </div>

            {/* Tab Content - Fixed width container to prevent jumping */}
            <div className="bg-gradient-to-b from-boxColorA to-boxColorA rounded-lg p-4 sm:p-6 ">
                {/* About Tab */}
                {activeTab === 'about' && (
                    <div className="w-full">
                        <div>
                            <h2 className="text-accentColor font-medium uppercase tracking-wider text-xs mb-4">
                                Introduction
                            </h2>
                            <p className="text-white/90 leading-relaxed">
                                {aboutData.introduction}
                            </p>
                            <p className="text-white/90 leading-relaxed mt-4">
                                {aboutData.shortBio}
                            </p>
                        </div>
                        
                        {/* Quick Overview */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                            <div>
                                <h3 className="text-accentColor font-medium uppercase tracking-wider text-xs mb-2">
                                    Current Position
                                </h3>
                                <p className="text-white font-medium">
                                    {aboutData.experience[0].position}
                                </p>
                                <p className="text-white/70 text-sm">
                                    {aboutData.experience[0].company}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-accentColor font-medium uppercase tracking-wider text-xs mb-2">
                                    Education
                                </h3>
                                <p className="text-white font-medium">
                                    {aboutData.education[0].degree.split(' - ')[0]}
                                </p>
                                <p className="text-white/70 text-sm">
                                    {aboutData.education[0].institution}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-accentColor font-medium uppercase tracking-wider text-xs mb-2">
                                    Expertise
                                </h3>
                                <div className="flex flex-wrap gap-1">
                                    {aboutData.skills.expertise.slice(0, aboutData.skills.expertise.length - 1).map((skill, index) => (
                                        <span key={index} className="text-xs bg-black/50 px-2 py-0.5 rounded-full text-white">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Experience Tab */}
                {activeTab === 'experience' && (
                    <div className="w-full">
                        <h2 className="text-accentColor font-medium uppercase tracking-wider text-xs mb-6">
                            Professional Experience
                        </h2>
                        <div className="space-y-6">
                            {aboutData.experience.map((exp, index) => (
                                <div key={index} className="border-l-2 border-accentColor/30 pl-4 py-1">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-2">
                                        <h3 className="text-white font-medium text-lg">{exp.position}</h3>
                                        <span className="text-white/60 text-sm bg-black/30 px-2 py-1 rounded whitespace-nowrap">
                                            {exp.period}
                                        </span>
                                    </div>
                                    <p className="text-white/70 text-sm mb-2">{exp.company}</p>
                                    <p className="text-white/80 text-sm">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {/* Education Tab */}
                {activeTab === 'education' && (
                    <div className="w-full">
                        <h2 className="text-accentColor font-medium uppercase tracking-wider text-xs mb-6">
                            Education
                        </h2>
                        <div className="space-y-6">
                            {aboutData.education.map((edu, index) => (
                                <div key={index} className="border-l-2 border-accentColor/30 pl-4 py-1">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-2">
                                        <h3 className="text-white font-medium">{edu.degree}</h3>
                                        <span className="text-white/60 text-sm bg-black/30 px-2 py-1 rounded whitespace-nowrap">
                                            {edu.year}
                                        </span>
                                    </div>
                                    <p className="text-white/70 text-sm">{edu.institution}</p>
                                    {edu.specialization && (
                                        <p className="text-white/80 text-sm mt-1 italic">{edu.specialization}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {/* Skills Tab */}
                {activeTab === 'skills' && (
                    <div className="w-full space-y-8">
                        {/* Expertise */}
                        <div>
                            <h2 className="text-accentColor font-medium uppercase tracking-wider text-xs mb-4">
                                Industry Knowledge
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {aboutData.skills.expertise.map((skill, index) => (
                                    <span key={index} className="text-xs bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white border border-white/20">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        
                        {/* Programming Languages */}
                        <div>
                            <h2 className="text-accentColor font-medium uppercase tracking-wider text-xs mb-4">
                                Programming Languages
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {aboutData.skills.programming.map((lang, index) => (
                                    <span key={index} className="text-xs bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white border border-white/20">
                                        {lang}
                                    </span>
                                ))}
                            </div>
                        </div>
                        
                        {/* Software */}
                        <div>
                            <h2 className="text-accentColor font-medium uppercase tracking-wider text-xs mb-4">
                                Software
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {aboutData.skills.software.map((software, index) => (
                                    <span key={index} className="text-xs bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white border border-white/20">
                                        {software}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AboutPage 