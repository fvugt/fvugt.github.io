import React, { useMemo } from 'react'

function TagCloud({ tags, selectedTags, onTagClick, projects }) {
    // Calculate filtered projects based on selected tags
    const filteredProjects = useMemo(() => {
        if (selectedTags.length === 0) {
            return projects;
        }
        
        return projects.filter(project => 
            selectedTags.every(tag => project.tags && project.tags.includes(tag))
        );
    }, [projects, selectedTags]);
    
    // Calculate tag counts based on the current filtered projects
    const tagCounts = useMemo(() => {
        // If no tags are selected, show counts from all projects
        if (selectedTags.length === 0) {
            return projects.reduce((acc, project) => {
                if (project.tags) {
                    project.tags.forEach(tag => {
                        acc[tag] = (acc[tag] || 0) + 1;
                    });
                }
                return acc;
            }, {});
        }
        
        // If tags are selected, show how many projects would match if each additional tag was selected
        return tags.reduce((acc, tag) => {
            // Skip calculation for already selected tags
            if (selectedTags.includes(tag)) {
                // For selected tags, show the current number of filtered projects
                acc[tag] = filteredProjects.length;
            } else {
                // For unselected tags, calculate how many projects would match if this tag was added
                const count = filteredProjects.filter(project => 
                    project.tags && project.tags.includes(tag)
                ).length;
                acc[tag] = count;
            }
            return acc;
        }, {});
    }, [projects, filteredProjects, selectedTags, tags]);

    // Sort tags: selected tags first, then by count (highest to lowest)
    const sortedTags = useMemo(() => {
        return tags.sort((a, b) => {
            // Selected tags come first
            const aSelected = selectedTags.includes(a);
            const bSelected = selectedTags.includes(b);
            
            if (aSelected && !bSelected) return -1;
            if (!aSelected && bSelected) return 1;
            
            // Then sort by count (highest first)
            return tagCounts[b] - tagCounts[a];
        });
    }, [tags, selectedTags, tagCounts]);

    return (
        <div className="flex flex-wrap gap-2 mb-6">
            {sortedTags.map((tag) => {
                const count = tagCounts[tag] || 0;
                const isSelected = selectedTags.includes(tag);
                const isDisabled = !isSelected && count === 0;
                
                return (
                    <button
                        key={tag}
                        onClick={() => !isDisabled && onTagClick(tag)}
                        disabled={isDisabled}
                        className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                            isSelected
                                ? 'bg-accentColor text-white cursor-pointer'
                                : isDisabled
                                    ? 'bg-gray-700/30 text-gray-500 cursor-not-allowed'
                                    : 'bg-backgroundBColor text-gray-300 hover:bg-backgroundBColor/80 cursor-pointer'
                        }`}
                    >
                        <span>{tag}</span>
                        <span className="ml-1 text-xs opacity-70">({count})</span>
                    </button>
                );
            })}
            {selectedTags.length > 0 && (
                <button
                    onClick={() => onTagClick(null)}
                    className="px-3 py-1 rounded-full text-sm bg-red-600/80 text-white hover:bg-red-700 transition-colors cursor-pointer"
                >
                    Clear filters
                </button>
            )}
        </div>
    );
}

export default TagCloud; 