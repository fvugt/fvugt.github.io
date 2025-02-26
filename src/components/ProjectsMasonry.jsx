import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

function ProjectsMasonry({ projects }) {
    return (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {projects.map((project, index) => (
                <Link
                    key={project.id}
                    to={`/projects/${project.slug}`}
                    className={`group block bg-backgroundBColor rounded-xl overflow-hidden hover:ring-2 ring-green-500/50 transition-all break-inside-avoid ${
                        index % 3 === 0 ? 'aspect-square' : 'aspect-[4/3]'
                    }`}
                >
                    <div className="relative h-full">
                        {/* Image */}
                        <img
                            src={`${import.meta.env.BASE_URL}${project.imgSrc}`}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <div className="absolute bottom-0 p-6 w-full">
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {project.details.slice(0, 3).map((detail, index) => {
                                        const [key, value] = Object.entries(detail)[0]
                                        return (
                                            <span 
                                                key={index}
                                                className="px-3 py-1 text-xs bg-white/10 backdrop-blur-sm text-white rounded-full"
                                            >
                                                {value}
                                            </span>
                                        )
                                    })}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    {project.title}
                                </h3>
                                <p className="text-sm text-white/80 line-clamp-2 mb-4">
                                    {project.description.replace(/<[^>]*>/g, '')}
                                </p>
                                <div className="flex items-center gap-2 text-green-400">
                                    View Project <ArrowUpRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default ProjectsMasonry 