import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import projects from '../data/projects.json'
import Banner from '../components/Banner'
import ProjectDetails from '../components/ProjectDetails'
import Gallery from '../components/Gallery'
import MechanicAccordion from '../components/MechanicAccordion'
import NavigationButtons from '../components/NavigationButtons'

function ProjectPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [isTransitioning, setIsTransitioning] = useState(false)

  const projectIndex = projects.findIndex((p) => p.slug === slug)
  const project = projects[projectIndex]

  const goToNextProject = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      const nextIndex = (projectIndex + 1) % projects.length
      navigate(`/projects/${projects[nextIndex].slug}`)
      setIsTransitioning(false)
    }, 300)
  }

  const goToPreviousProject = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      const prevIndex = (projectIndex - 1 + projects.length) % projects.length
      navigate(`/projects/${projects[prevIndex].slug}`)
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
          <div className="max-w-7xl mx-auto px-4">
            <Banner image={project.imgSrc} style="default" title={project.title} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-8">
              <div className="lg:col-span-2">
                <p className="text-lg mb-4" dangerouslySetInnerHTML={{ __html: project.description }} />
              </div>
              <ProjectDetails details={project.details} style="list" />
            </div>

            <div className="space-y-4 py-8">
              {project.codeSnippets.map((snippet, index) => (
                <MechanicAccordion
                  key={index}
                  title={snippet.title}
                  image={snippet.image}
                  description={snippet.description}
                  language={snippet.language}
                  code={snippet.code}
                  imagePosition={index % 2 === 0 ? 'left' : 'right'}
                />
              ))}
            </div>
            <Gallery media={project.gallery} style="grid" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectPage 