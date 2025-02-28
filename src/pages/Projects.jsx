import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import projects from '../data/projects.json'
import ProjectsGrid from '../components/ProjectsGrid'
import ProjectsList from '../components/ProjectsList'
import ProjectsMagazine from '../components/ProjectsMagazine'
import ProjectsOriginalPlus from '../components/ProjectsOriginalPlus'
import ProjectsMasonry from '../components/ProjectsMasonry'
import ProjectsMinimalCards from '../components/ProjectsMinimalCards'

function Projects() {
    const [activeView, setActiveView] = useState('grid')

    return (
        <div className="py-12">
            {/* Introduction Section */}
            <div className="max-w-4xl mx-auto mb-16 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                    Software Developer & Teacher
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                    Welcome to my portfolio of creative interactive experiences, with a focus on gamification and ...
                </p>
            </div>
            
            {/* View Selector */}
            <div className="max-w-7xl mx-auto px-4 mb-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white">Featured Projects</h2>
                    <div className="flex space-x-2 bg-card rounded-md p-1">
                        <button 
                            className={`px-3 py-1 rounded-md transition-colors ${activeView === 'grid' ? 'bg-black text-white' : 'text-gray-400 hover:text-white'}`}
                            onClick={() => setActiveView('grid')}
                        >
                            Grid
                        </button>
                        <button 
                            className={`px-3 py-1 rounded-md transition-colors ${activeView === 'list' ? 'bg-black text-white' : 'text-gray-400 hover:text-white'}`}
                            onClick={() => setActiveView('list')}
                        >
                            List
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Projects Display */}
            <div className="max-w-7xl mx-auto px-4">
                {activeView === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {projects.map((project) => (
                            <Link 
                                key={project.id} 
                                to={`/projects/${project.slug}`} 
                                className="group bg-card hover:bg-card-hover rounded-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="relative aspect-video overflow-hidden">
                                    <img
                                        src={`${import.meta.env.BASE_URL}${project.imgSrc}`}
                                        alt={project.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-white mb-1">{project.title}</h3>
                                    <p className="text-sm text-gray-400 line-clamp-2">
                                        {project.description.replace(/<[^>]*>/g, '')}
                                    </p>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {project.tags && project.tags.slice(0, 3).map((tag, index) => (
                                            <span key={index} className="text-xs bg-black px-2 py-1 rounded text-gray-300">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-6">
                        {projects.map((project) => (
                            <Link 
                                key={project.id} 
                                to={`/projects/${project.slug}`} 
                                className="group block bg-card hover:bg-card-hover rounded-lg overflow-hidden transition-all duration-300"
                            >
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-1/3 relative">
                                        <img
                                            src={`${import.meta.env.BASE_URL}${project.imgSrc}`}
                                            alt={project.title}
                                            className="w-full h-full object-cover md:h-48 transform group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-6 md:w-2/3">
                                        <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                                        <p className="text-gray-400 mb-4 line-clamp-2">
                                            {project.description.replace(/<[^>]*>/g, '')}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags && project.tags.map((tag, index) => (
                                                <span key={index} className="text-xs bg-black px-2 py-1 rounded text-gray-300">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Projects