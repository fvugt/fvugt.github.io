import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

function ProjectsMagazine({ projects }) {
    return (
        <div className="grid grid-cols-1 gap-12">
            {projects.map((project, index) => (
                <Link
                    key={project.id}
                    to={`/projects/${project.slug}`}
                    className="group grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                >
                    {/* Image */}
                    <div className={`aspect-[4/3] rounded-lg overflow-hidden ${
                        index % 2 === 0 ? 'md:order-1' : 'md:order-2'
                    }`}>
                        <img
                            src={`${import.meta.env.BASE_URL}${project.imgSrc}`}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    {/* Content */}
                    <div className={index % 2 === 0 ? 'md:order-2' : 'md:order-1'}>
                        <div className="space-y-4">
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
                            <h3 className="text-3xl font-bold text-white group-hover:text-green-500 transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-white/80">
                                {project.description.replace(/<[^>]*>/g, '')}
                            </p>
                            <div className="inline-flex items-center gap-2 text-green-400 text-sm">
                                View Project <ArrowUpRight className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default ProjectsMagazine 