function ProjectContent({ project }) {
  return (
    <div className="min-h-screen bg-background text-text relative">
      <div className="max-w-7xl mx-auto px-4 pb-32">
        <div className="space-y-8 py-8">
          {project.codeSnippets.map((snippet, index) => (
            <MechanicAccordion
              key={index}
              {...snippet}
              imagePosition={index % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </div>
        
        <Gallery media={project.gallery} style="grid" />
      </div>
    </div>
  )
} 