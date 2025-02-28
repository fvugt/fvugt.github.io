import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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
import ProjectHeaderMagazine from '../components/ProjectHeaderMagazine'
import ProjectHeaderTimeline from '../components/ProjectHeaderTimeline'
import ProjectHeaderHero from '../components/ProjectHeaderHero'
import GalleryGrid from '../components/GalleryGrid'
import GalleryFluid from '../components/GalleryFluid'
import GalleryOneRow from '../components/GalleryOneRow'
import GalleryCarousel from '../components/GalleryCarousel'


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
          <div className="max-w-7xl mx-auto px-4 space-y-4">
            <ProjectHeader projectData={project} />
            {/* <ProjectHeaderMinimal projectData={project} />
            <ProjectHeaderCard projectData={project} />
            <ProjectHeaderMagazine projectData={project} />
            <ProjectHeaderTimeline projectData={project} />
            <ProjectHeaderHero projectData={project} /> */}

            {project.codeSnippets && project.codeSnippets.length > 0 && (
              <div className="space-y-4 py-8">
                <MechanicAccordion snippets={project.codeSnippets} />
                <TabsShowcase snippets={project.codeSnippets} />
                <TimelineShowcase snippets={project.codeSnippets} />
                <CarouselShowcase snippets={project.codeSnippets} />
                <GridShowcase snippets={project.codeSnippets} />
              </div>
            )}

            <GalleryOneRow media={project.gallery} style="grid" />
            <GalleryGrid gallery={project.gallery} />
            <GalleryFluid gallery={project.gallery} />
            <GalleryCarousel gallery={project.gallery} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectPage 