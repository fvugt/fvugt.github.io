import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

function ProjectsList({ projects }) {
    return (
        <div className="space-y-8">
            {projects.map((project) => (
                <Link
                    key={project.id}
                    to={`/projects/${project.slug}`}
                    className="group block bg-backgroundBColor rounded-lg overflow-hidden hover:bg-gray-900/50 transition-colors"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                        {/* Image */}
                        <div className="aspect-[16/9] rounded-lg overflow-hidden">
                            <img
                                src={`${import.meta.env.BASE_URL}${project.imgSrc}`}
                                alt={project.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        {/* Content */}
                        <div className="md:col-span-2 flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-green-500 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-white/80 line-clamp-2 mb-4">
                                    {project.description.replace(/<[^>]*>/g, '')}
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex gap-4">
                                    {project.details.slice(0, 2).map((detail, index) => {
                                        const [key, value] = Object.entries(detail)[0]
                                        return (
                                            <span key={index} className="text-sm text-white/60">
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
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default ProjectsList 