'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

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
        if (res.data.length > 0) {
          setProjects(res.data)
        } else {
          // Fallback data
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
            }
          ])
        }
      })
      .catch(() => {
        setProjects([
          {
            id: 1,
            title: 'Wedding Photography',
            description: 'Intimate wedding moments captured beautifully',
            image: 'https://images.unsplash.com/photo-1519741497674-611481863552',
            category: 'Photography'
          }
        ])
      })
      .finally(() => setLoading(false))
  }, [])

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category.trim().toLowerCase())))]
    .map(cat => cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1))
  
  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category.trim().toLowerCase() === activeCategory.toLowerCase())

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-20 md:pt-24">
        {/* Hero Section */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <div className="text-center mb-12 md:mb-16">
              <Link 
                href="/"
                className="inline-block text-xs md:text-sm text-neutral-600 hover:text-neutral-900 mb-4 md:mb-6 uppercase tracking-wider text-thin"
              >
                ← Back to Home
              </Link>
              <p className="text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] text-neutral-500 mb-3 md:mb-4 uppercase text-thin">
                My Work
              </p>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-thin mb-6 md:mb-8">
                Portofolio
              </h1>
            </div>

            {/* Category Filter */}
            <div className="flex justify-center gap-4 md:gap-8 flex-wrap mb-12 md:mb-16">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs md:text-sm tracking-widest uppercase text-light transition-all duration-300 pb-1 ${
                    activeCategory === cat
                      ? 'text-neutral-800 border-b-2 border-neutral-800'
                      : 'text-neutral-400 hover:text-neutral-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Loading */}
            {loading && (
              <div className="text-center py-12">
                <p className="text-neutral-600 text-light">Loading...</p>
              </div>
            )}

            {/* Grid */}
            {!loading && (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                {filteredProjects.map((project, index) => (
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
                      />
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
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-neutral-600 text-light">No projects found in this category.</p>
              </div>
            )}
          </div>
        </section>
      </main>

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

      <Footer />
    </div>
  )
}
