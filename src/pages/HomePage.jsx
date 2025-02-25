function HomePage() {
  return (
    <div className="min-h-screen bg-background text-text">
      <div className="max-w-7xl mx-auto px-4">
        <Banner 
          image="/banner.webp"
          style="home"
          title="Hi, I'm Maxime"
          subtitle="I create digital experiences"
        />
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
      </div>
    </div>
  )
} 