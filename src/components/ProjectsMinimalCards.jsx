import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

function ProjectsMinimalCards({ projects }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {projects.map((project) => (
                <Link
                    key={project.id}
                    to={`/projects/${project.slug}`}
                    className="group flex flex-col bg-backgroundBColor/50 hover:bg-backgroundBColor border border-white/10 rounded-lg overflow-hidden transition-all"
                >
                    {/* Minimal Header */}
                    <div className="px-4 py-3 border-b border-white/10">
                        <h3 className="text-lg font-medium text-white group-hover:text-green-500 transition-colors">
                            {project.title}
                        </h3>
                    </div>

                    {/* Preview */}
                    <div className="relative aspect-video">
                        <img
                            src={`${import.meta.env.BASE_URL}${project.imgSrc}`}
                            alt={project.title}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                    </div>

                    {/* Footer */}
                    <div className="p-4 mt-auto">
                        <div className="flex flex-wrap gap-2 mb-3">
                            {project.details.slice(0, 2).map((detail, index) => {
                                const [key, value] = Object.entries(detail)[0]
                                return (
                                    <span 
                                        key={index}
                                        className="px-2 py-1 text-xs text-white/60 bg-white/5 rounded"
                                    >
                                        {value}
                                    </span>
                                )
                            })}
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-white/40">View Details</span>
                            <ArrowUpRight className="w-4 h-4 text-green-400 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default ProjectsMinimalCards 