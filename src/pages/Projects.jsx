import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import projects from '../data/projects.json'
import aboutData from '../data/about.json'
import ProjectsGrid from '../components/ProjectsGrid'
import ProjectsList from '../components/ProjectsList'
import ProjectsMagazine from '../components/ProjectsMagazine'
import ProjectsOriginalPlus from '../components/ProjectsOriginalPlus'
import ProjectsMasonry from '../components/ProjectsMasonry'
import ProjectsMinimalCards from '../components/ProjectsMinimalCards'
import TagCloud from '../components/TagCloud'

function Projects() {
    const [activeView, setActiveView] = useState('grid')
    const [selectedTags, setSelectedTags] = useState([])
    const [isMobile, setIsMobile] = useState(false)
    
    // Check if the device is mobile
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 640) // sm breakpoint in Tailwind
        }
        
        // Initial check
        checkIfMobile()
        
        // Add event listener for window resize
        window.addEventListener('resize', checkIfMobile)
        
        // Cleanup
        return () => window.removeEventListener('resize', checkIfMobile)
    }, [])
    
    // Force grid view on mobile
    useEffect(() => {
        if (isMobile && activeView === 'list') {
            setActiveView('grid')
        }
    }, [isMobile, activeView])
    
    // Extract all unique tags from projects
    const allTags = useMemo(() => {
        return projects.reduce((tags, project) => {
            if (project.tags) {
                project.tags.forEach(tag => {
                    if (!tags.includes(tag)) {
                        tags.push(tag)
                    }
                })
            }
            return tags
        }, [])
    }, [])
    
    // Filter projects based on selected tags
    const filteredProjects = useMemo(() => {
        let filtered = selectedTags.length === 0 
            ? projects 
            : projects.filter(project => 
                selectedTags.every(tag => project.tags && project.tags.includes(tag))
            );
            
        // Sort projects by sortOrder field (or id if sortOrder doesn't exist)
        return filtered.sort((a, b) => {
            // Use sortOrder if available, otherwise fall back to id
            const aOrder = a.sortOrder !== undefined ? a.sortOrder : a.id;
            const bOrder = b.sortOrder !== undefined ? b.sortOrder : b.id;
            return aOrder - bOrder;
        });
    }, [selectedTags])
    
    // Handle tag selection/deselection
    const handleTagClick = (tag) => {
        if (tag === null) {
            // Clear all filters
            setSelectedTags([])
        } else if (selectedTags.includes(tag)) {
            // Remove tag if already selected
            setSelectedTags(selectedTags.filter(t => t !== tag))
        } else {
            // Add tag to selection
            setSelectedTags([...selectedTags, tag])
        }
    }

    return (
        <div className="py-8 sm:py-12">
            {/* Introduction Section - Now using data from about.json */}
            <div className="mb-12 text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white">
                    {aboutData.title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
                    {aboutData.introduction}
                </p>
            </div>
            
          
            
            {/* View Selector - Hidden on mobile */}
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <h2 className="text-2xl font-bold text-white">
                        {selectedTags.length > 0 
                            ? `Projects (${filteredProjects.length} results)` 
                            : 'Featured Projects'}
                    </h2>
                    
                    <div className="hidden sm:flex space-x-2 bg-card rounded-md p-1 self-start sm:self-auto">
                        <button 
                            className={`px-3 py-1 rounded-md transition-colors ${activeView === 'grid' ? 'bg-black text-white' : 'text-gray-400 hover:text-white'}`}
                            onClick={() => setActiveView('grid')}
                        >
                            Grid
                        </button>
                        <button 
                            className={`px-3 py-1 rounded-md transition-colors ${activeView === 'list' ? 'bg-black text-white' : 'text-gray-400 hover:text-white'}`}
                            onClick={() => setActiveView('list')}
                        >
                            List
                        </button>
                    </div>
                </div>
            </div>
              {/* Tag Cloud */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-4">Filter by Skills & Categories</h2>
                <div className="overflow-x-auto pb-2">
                    <TagCloud 
                        tags={allTags} 
                        selectedTags={selectedTags} 
                        onTagClick={handleTagClick}
                        projects={projects}
                    />
                </div>
            </div>
            {/* Projects Display */}
            <div>
                {filteredProjects.length === 0 ? (
                    <div className="text-center py-16">
                        <h3 className="text-xl text-gray-400">No projects match the selected filters</h3>
                        <button 
                            onClick={() => setSelectedTags([])}
                            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : activeView === 'grid' || isMobile ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {filteredProjects.map((project) => (
                            <Link 
                                key={project.id} 
                                to={`/projects/${project.slug}`} 
                                className="group bg-card hover:bg-card-hover rounded-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="relative aspect-video overflow-hidden">
                                    <img
                                        src={`${import.meta.env.BASE_URL}${project.imgSrc}`}
                                        alt={project.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-white mb-1">{project.title}</h3>
                                    <p className="text-sm text-gray-400 line-clamp-2">
                                        {project.description.replace(/<[^>]*>/g, '')}
                                    </p>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {project.tags && project.tags.slice(0, 3).map((tag, index) => (
                                            <span 
                                                key={index} 
                                                className={`text-xs px-2 py-1 rounded ${
                                                    selectedTags.includes(tag) 
                                                        ? 'bg-green-600 text-white' 
                                                        : 'bg-black text-gray-300'
                                                }`}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                        {project.tags && project.tags.length > 3 && (
                                            <span className="text-xs bg-black/50 px-2 py-1 rounded text-gray-400">
                                                +{project.tags.length - 3}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4 sm:space-y-6">
                        {filteredProjects.map((project) => (
                            <Link 
                                key={project.id} 
                                to={`/projects/${project.slug}`} 
                                className="group block bg-card hover:bg-card-hover rounded-lg overflow-hidden transition-all duration-300"
                            >
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-1/3 relative">
                                        <img
                                            src={`${import.meta.env.BASE_URL}${project.imgSrc}`}
                                            alt={project.title}
                                            className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-4 sm:p-6 md:w-2/3">
                                        <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                                        <p className="text-gray-400 mb-4 line-clamp-2">
                                            {project.description.replace(/<[^>]*>/g, '')}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags && project.tags.map((tag, index) => (
                                                <span 
                                                    key={index} 
                                                    className={`text-xs px-2 py-1 rounded ${
                                                        selectedTags.includes(tag) 
                                                            ? 'bg-green-600 text-white' 
                                                            : 'bg-black text-gray-300'
                                                    }`}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Projects