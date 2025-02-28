import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Banner from '../components/Banner'
import ProjectDetails from '../components/ProjectDetails'
import MechanicAccordion from '../components/MechanicAccordion'
import NavigationButtons from '../components/NavigationButtons'
import projects from '../data/projects.json'
import TabsShowcase from '../components/TabsShowcase'
import TimelineShowcase from '../components/TimelineShowcase'
import CarouselShowcase from '../components/CarouselShowcase'
import GridShowcase from '../components/GridShowcase'
import ProjectHeader from '../components/ProjectHeader'
import ProjectHeaderMinimal from '../components/ProjectHeaderMinimal'
import ProjectHeaderCard from '../components/ProjectHeaderCard'
import ProjectHeaderHero from '../components/ProjectHeaderHero'
import GalleryGrid from '../components/GalleryGrid'
import GalleryFluid from '../components/GalleryFluid'
import GalleryOneRow from '../components/GalleryOneRow'
import GalleryCarousel from '../components/GalleryCarousel'

function ProjectPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [relatedProjects, setRelatedProjects] = useState([])

  const projectIndex = projects.findIndex((p) => p.slug === slug)
  const project = projects[projectIndex]

  useEffect(() => {
    if (project && project.tags && project.tags.length > 0) {
      const related = projects
        .filter(p => 
          p.id !== project.id &&
          p.tags && 
          p.tags.some(tag => project.tags.includes(tag))
        )
        .sort((a, b) => {
          const aMatches = a.tags.filter(tag => project.tags.includes(tag)).length
          const bMatches = b.tags.filter(tag => project.tags.includes(tag)).length
          return bMatches - aMatches
        })
        .slice(0, 3)
      
      setRelatedProjects(related)
    } else {
      setRelatedProjects([])
    }
  }, [project])

  const goToNextProject = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      const nextIndex = (projectIndex + 1) % projects.length
      navigate(`/projects/${projects[nextIndex].slug}`)
      window.scrollTo({ top: 0, behavior: 'instant' })
      setIsTransitioning(false)
    }, 300)
  }

  const goToPreviousProject = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      const prevIndex = (projectIndex - 1 + projects.length) % projects.length
      navigate(`/projects/${projects[prevIndex].slug}`)
      window.scrollTo({ top: 0, behavior: 'instant' })
      setIsTransitioning(false)
    }, 300)
  }

  if (!project) {
    return (
      <div className="min-h-screen p-4">
        <h1 className="text-3xl font-bold">Project Not Found</h1>
      </div>
    )
  }

  return (
    <div className="relative">
      <NavigationButtons
        onPrevious={goToPreviousProject}
        onNext={goToNextProject}
        style="side"
      />
      <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        
        <div className="min-h-screen bg-background text-text">
          <div className="max-w-7xl mx-auto px-4 space-y-8">
            <ProjectHeader projectData={project} />
            {/* <ProjectHeaderMinimal projectData={project} /> */}
            {/* <ProjectHeaderCard projectData={project} /> */}
            {/* <ProjectHeaderHero projectData={project} /> */}

            {project.codeSnippets && project.codeSnippets.length > 0 && (
              <div className="space-y-4 py-8">
                <MechanicAccordion snippets={project.codeSnippets} />
                <TabsShowcase snippets={project.codeSnippets} />
                <TimelineShowcase snippets={project.codeSnippets} />
                <CarouselShowcase snippets={project.codeSnippets} />
                <GridShowcase snippets={project.codeSnippets} />
              </div>
            )}
            <div className="w-full h-px bg-white/20 my-8"></div>

            {/* <GalleryOneRow media={project.gallery} style="grid" />
            <GalleryGrid gallery={project.gallery} />
            <GalleryFluid gallery={project.gallery} /> */}
            <GalleryCarousel gallery={project.gallery} />
            <div className="w-full h-px bg-white/20 my-8"></div>
            
            {relatedProjects.length > 0 && (
              <div className="">
                <h2 className="text-2xl font-bold text-white mb-6">Related Projects</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {relatedProjects.map(relatedProject => (
                    <Link 
                      key={relatedProject.id} 
                      to={`/projects/${relatedProject.slug}`}
                      className="group bg-gradient-to-b from-boxColorB to-boxColorA hover:bg-card-hover rounded-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={`${import.meta.env.BASE_URL}${relatedProject.imgSrc}`}
                          alt={relatedProject.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-white mb-1">{relatedProject.title}</h3>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {relatedProject.tags && 
                            relatedProject.tags
                              .filter(tag => project.tags.includes(tag))
                              .slice(0, 3)
                              .map((tag, index) => (
                                <span key={index} className="text-xs bg-green-600/80 px-2 py-1 rounded text-white">
                                  {tag}
                                </span>
                              ))
                          }
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectPage 