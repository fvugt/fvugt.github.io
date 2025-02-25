import React from 'react';
import { Link } from 'react-router-dom';

function ProjectCard({ title, description, imgSrc, slug }) {
  return (
    <Link to={`/projects/${slug}`}>
      <div className="group">
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <img
            src={imgSrc}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background opacity-50" />
        </div>
        <div className="mt-4">
          <h3 className="text-text text-xl font-semibold">{title}</h3>
          <p className="text-accent-muted mt-2">{description}</p>
        </div>
      </div>
    </Link>
  )
}

export default ProjectCard; 