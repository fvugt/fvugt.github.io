import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

function ProjectsGrid({ projects }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
                <Link
                    key={project.id}
                    to={`/projects/${project.slug}`}
                    className="group relative bg-backgroundBColor rounded-lg overflow-hidden hover:ring-2 ring-green-500/50 transition-all"
                >
                    {/* Image */}
                    <div className="aspect-[16/9]">
                        <img
                            src={`${import.meta.env.BASE_URL}${project.imgSrc}`}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <h3 className="text-xl font-bold text-white mb-2">
                                {project.title}
                            </h3>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.details.slice(0, 2).map((detail, index) => {
                                    const [key, value] = Object.entries(detail)[0]
                                    return (
                                        <span key={index} className="text-sm text-white/80">
                                            {value}
                                        </span>
                                    )
                                })}
                            </div>
                            <div className="flex items-center gap-2 text-green-400 text-sm">
                                View Project <ArrowUpRight className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default ProjectsGrid 