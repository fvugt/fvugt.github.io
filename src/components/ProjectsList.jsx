import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

function ProjectsList({ projects }) {
    return (
        <div className="space-y-6">
            {projects.map((project) => (
                <Link
                    key={project.id}
                    to={`/projects/${project.slug}`}
                    className="group block bg-backgroundBColor rounded-lg overflow-hidden hover:bg-gray-900/50 transition-colors"
                >
                    <div className="flex flex-row gap-4 p-4">
                        {/* Image - smaller and to the left on mobile */}
                        <div className="w-1/3 flex-shrink-0 h-24 sm:h-32 rounded-lg overflow-hidden">
                            <img
                                src={`${import.meta.env.BASE_URL}${project.imgSrc}`}
                                alt={project.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        {/* Content - to the right of the image */}
                        <div className="w-2/3 flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2 group-hover:text-green-500 transition-colors line-clamp-1">
                                    {project.title}
                                </h3>
                                <p className="text-white/80 text-sm line-clamp-2 mb-1 sm:mb-2 hidden sm:block">
                                    {project.description.replace(/<[^>]*>/g, '')}
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col sm:flex-row sm:gap-4">
                                    {project.details.slice(0, 2).map((detail, index) => {
                                        const [key, value] = Object.entries(detail)[0]
                                        return (
                                            <span key={index} className="text-xs sm:text-sm text-white/60">
                                                {value}
                                            </span>
                                        )
                                    })}
                                </div>
                                <div className="flex items-center gap-1 text-green-400 text-xs sm:text-sm">
                                    View <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default ProjectsList 