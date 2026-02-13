'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { ProjectSkeleton } from './SkeletonLoader'

interface Project {
  id: number
  title: string
  description: string
  image: string
  video_url?: string
  category: string
  client?: string
  date?: string
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // Convert video URL to embed format
  const getEmbedUrl = (url: string) => {
    if (!url) return null
    
    // YouTube
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.includes('youtu.be') 
        ? url.split('youtu.be/')[1]?.split('?')[0]
        : url.split('v=')[1]?.split('&')[0]
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null
    }
    
    // Vimeo
    if (url.includes('vimeo.com')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0]
      return videoId ? `https://player.vimeo.com/video/${videoId}` : null
    }
    
    // Instagram (basic support)
    if (url.includes('instagram.com')) {
      return `${url.replace('/p/', '/embed/p/')}`
    }
    
    return null
  }

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects`)
      .then(res => {
        // Only show first 6 projects on homepage
        setProjects(res.data.slice(0, 6))
        setLoading(false)
      })
      .catch(() => {
        // Fallback data untuk photographer
        setProjects([
          {
            id: 1,
            title: 'Wedding Photography',
            description: 'Intimate wedding moments captured beautifully',
            image: 'https://images.unsplash.com/photo-1519741497674-611481863552',
            category: 'Photography'
          },
          {
            id: 2,
            title: 'Product Photography',
            description: 'Commercial product shots for e-commerce',
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
            category: 'Photography'
          },
          {
            id: 3,
            title: 'Corporate Video',
            description: 'Professional corporate video production',
            image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4',
            category: 'Videography'
          },
          {
            id: 4,
            title: 'Portrait Session',
            description: 'Creative portrait photography',
            image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04',
            category: 'Photography'
          },
          {
            id: 5,
            title: 'Event Coverage',
            description: 'Full event documentation and highlights',
            image: 'https://images.unsplash.com/photo-1511578314322-379afb476865',
            category: 'Photography'
          },
          {
            id: 6,
            title: 'Music Video',
            description: 'Creative music video production',
            image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04',
            category: 'Videography'
          },
        ])
        setLoading(false)
      })
  }, [])

  const categories = ['All', 'Photography', 'Videography', 'Editing']

  return (
    <section id="projects" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-20">
          <p className="text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] text-neutral-500 mb-3 md:mb-4 uppercase text-thin">
            My Work
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-thin mb-8 md:mb-12">
            Portofolio
          </h2>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {[...Array(6)].map((_, i) => (
              <ProjectSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {projects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group block overflow-hidden fade-in-up cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-[4/5] bg-neutral-200 relative overflow-hidden mb-3 md:mb-4 photo-frame">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                {/* Video indicator */}
                {project.video_url && (
                  <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white p-2 rounded-full">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-white text-xs text-thin">Click to view</p>
                </div>
              </div>
              <div className="space-y-1 md:space-y-2">
                <div className="text-[10px] md:text-xs text-neutral-400 tracking-wider uppercase text-thin">
                  {project.category}
                </div>
                <h3 className="font-heading text-sm md:text-lg lg:text-xl text-thin tracking-wide group-hover:text-neutral-500 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-neutral-500 text-xs md:text-sm text-light leading-relaxed line-clamp-2">
                  {project.description}
                </p>
                {project.client && (
                  <p className="text-[10px] md:text-xs text-neutral-400 text-thin">
                    Client: {project.client}
                  </p>
                )}
              </div>
            </div>
          ))}
          </div>
        )}

        {projects.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-neutral-600 text-light">No projects yet. Add your first project!</p>
          </div>
        )}

        <div className="text-center mt-8 md:mt-12">
          <a
            href="/projects"
            className="inline-block px-8 md:px-10 py-3 md:py-4 border border-neutral-800 text-neutral-800 text-xs md:text-sm tracking-widest hover:bg-neutral-800 hover:text-white transition-all duration-300 uppercase text-light"
          >
            View All Projects
          </a>
        </div>

        {/* Lightbox Modal */}
        {selectedProject && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-95 z-50 overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <div className="min-h-screen flex items-start md:items-center justify-center p-4 py-8 md:py-4">
              <button
                onClick={() => setSelectedProject(null)}
                className="fixed top-4 right-4 text-white text-4xl hover:text-neutral-300 transition-colors z-10"
              >
                ×
              </button>
              <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
                <div className="grid md:grid-cols-2 gap-6 md:gap-8 bg-neutral-900 p-4 md:p-8">
                  {/* Image or Video */}
                  <div className="relative w-full">
                    {selectedProject.video_url && getEmbedUrl(selectedProject.video_url) ? (
                      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                        <iframe
                          src={getEmbedUrl(selectedProject.video_url) || ''}
                          className="absolute inset-0 w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-full h-auto object-contain"
                      />
                    )}
                  </div>
                  
                  {/* Info */}
                  <div className="flex flex-col justify-center text-white space-y-3 md:space-y-4">
                    <div className="text-xs tracking-widest uppercase text-neutral-400 text-thin">
                      {selectedProject.category}
                    </div>
                    <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-thin tracking-wide">
                      {selectedProject.title}
                    </h2>
                    <p className="text-sm md:text-base text-neutral-300 text-light leading-relaxed">
                      {selectedProject.description}
                    </p>
                    {selectedProject.client && (
                      <div className="pt-3 md:pt-4 border-t border-neutral-700">
                        <p className="text-xs text-neutral-400 uppercase tracking-wider text-thin mb-1">
                          Client
                        </p>
                        <p className="text-sm md:text-base text-neutral-200 text-light">
                          {selectedProject.client}
                        </p>
                      </div>
                    )}
                    {selectedProject.date && (
                      <div className="pt-3 md:pt-4 border-t border-neutral-700">
                        <p className="text-xs text-neutral-400 uppercase tracking-wider text-thin mb-1">
                          Date
                        </p>
                        <p className="text-sm md:text-base text-neutral-200 text-light">
                          {new Date(selectedProject.date).toLocaleDateString('id-ID', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
