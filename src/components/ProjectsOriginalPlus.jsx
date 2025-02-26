import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Calendar, Code2, Globe } from 'lucide-react'

function ProjectsOriginalPlus({ projects }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
                <Link
                    key={project.id}
                    to={`/projects/${project.slug}`}
                    className="group flex flex-col bg-backgroundBColor rounded-xl overflow-hidden hover:ring-2 ring-green-500/50 transition-all"
                >
                    {/* Image Container */}
                    <div className="relative aspect-[16/9]">
                        <img
                            src={`${import.meta.env.BASE_URL}${project.imgSrc}`}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                        {/* Floating Tags */}
                        <div className="absolute top-4 right-4 flex gap-2">
                            {project.details.slice(0, 2).map((detail, index) => {
                                const [key, value] = Object.entries(detail)[0]
                                return (
                                    <span 
                                        key={index}
                                        className="px-3 py-1 text-xs font-medium bg-black/60 backdrop-blur-sm text-white rounded-full"
                                    >
                                        {value}
                                    </span>
                                )
                            })}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-500 transition-colors">
                            {project.title}
                        </h3>
                        <p className="text-white/70 text-sm line-clamp-3 mb-4">
                            {project.description.replace(/<[^>]*>/g, '')}
                        </p>
                        
                        {/* Project Details */}
                        <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-white/60">
                                {project.details.slice(2, 4).map((detail, index) => {
                                    const [key, value] = Object.entries(detail)[0]
                                    const icon = key === 'Year' ? Calendar : key === 'Tech' ? Code2 : Globe
                                    const Icon = icon
                                    return (
                                        <div key={index} className="flex items-center gap-1">
                                            <Icon className="w-4 h-4" />
                                            <span>{value}</span>
                                        </div>
                                    )
                                })}
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-green-400 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default ProjectsOriginalPlus 