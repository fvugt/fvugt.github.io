import { Link } from 'react-router-dom'
import projects from '../data/projects.json'
import ProjectsGrid from '../components/ProjectsGrid'
import ProjectsList from '../components/ProjectsList'
import ProjectsMagazine from '../components/ProjectsMagazine'
import ProjectsOriginalPlus from '../components/ProjectsOriginalPlus'
import ProjectsMasonry from '../components/ProjectsMasonry'
import ProjectsMinimalCards from '../components/ProjectsMinimalCards'

function Projects() {

    return (
        <div className="py-8 space-y-8">
            <ProjectsGrid projects={projects} />
            <ProjectsList projects={projects} />
            <ProjectsMagazine projects={projects} />
            <ProjectsOriginalPlus projects={projects} />
            <ProjectsMasonry projects={projects} />
            <ProjectsMinimalCards projects={projects} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
                {projects.map((project) => (
                    <Link key={project.id} to={'/projects/' + project.slug} className="group relative overflow-hidden">
                        <img
                            src={`${import.meta.env.BASE_URL}${project.imgSrc}`}
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