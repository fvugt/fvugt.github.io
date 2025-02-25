import { Link } from 'react-router-dom'
import projects from '../data/projects.json'

function Projects() {
    return (
        <div className="py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
                {projects.map((project) => (
                    <Link key={project.id} to={'/projects/' + project.slug} className="group relative overflow-hidden">
                        <img
                            src={project.imgSrc}
                            alt={project.title}
                            className="w-50 h-50 object-cover transform group-hover:scale-110 transition duration-300"
                        />
                        <div className="absolute bottom-3 pl-1 pr-1 bg-black/70 uppercase font-semibold text-white text-sm">
                            {project.title}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Projects