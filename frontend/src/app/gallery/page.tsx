'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Lightbox from '@/components/Lightbox'
import { GallerySkeleton } from '@/components/SkeletonLoader'

export default function FullGalleryPage() {
  const [images, setImages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/gallery`)
      .then(res => {
        if (res.data.length > 0) {
          setImages(res.data)
        } else {
          // Fallback images
          setImages([
            { id: 1, title: 'Portrait 1', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04', category: 'Portrait' },
            { id: 2, title: 'Landscape 1', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', category: 'Landscape' },
            { id: 3, title: 'Product 1', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30', category: 'Product' },
            { id: 4, title: 'Wedding 1', image: 'https://images.unsplash.com/photo-1519741497674-611481863552', category: 'Event' },
            { id: 5, title: 'Event 1', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865', category: 'Event' },
            { id: 6, title: 'Architecture 1', image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625', category: 'Photography' },
            { id: 7, title: 'Portrait 2', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2', category: 'Portrait' },
            { id: 8, title: 'Landscape 2', image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e', category: 'Landscape' }
          ])
        }
      })
      .catch(() => {
        setImages([
          { id: 1, title: 'Portrait 1', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04', category: 'Portrait' },
          { id: 2, title: 'Landscape 1', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', category: 'Landscape' },
          { id: 3, title: 'Product 1', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30', category: 'Product' },
          { id: 4, title: 'Wedding 1', image: 'https://images.unsplash.com/photo-1519741497674-611481863552', category: 'Event' },
          { id: 5, title: 'Event 1', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865', category: 'Event' },
          { id: 6, title: 'Architecture 1', image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625', category: 'Photography' },
          { id: 7, title: 'Portrait 2', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2', category: 'Portrait' },
          { id: 8, title: 'Landscape 2', image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e', category: 'Landscape' }
        ])
      })
      .finally(() => setLoading(false))
  }, [])

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(images.map(img => img.category)))]

  // Filter images by category
  const filteredImages = activeCategory === 'All' 
    ? images 
    : images.filter(img => img.category === activeCategory)

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length)
  }

  // Custom masonry pattern
  const getItemClass = (index: number) => {
    const pattern = index % 3
    if (pattern === 0) return 'row-span-2' // tall
    return '' // square
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-20 md:pt-24">
        {/* Hero Section */}
        <section className="section-padding bg-neutral-50">
          <div className="container-custom">
            <div className="text-center mb-12 md:mb-16">
              <Link 
                href="/#gallery"
                className="inline-block text-xs md:text-sm text-neutral-600 hover:text-neutral-900 mb-4 md:mb-6 uppercase tracking-wider text-thin"
              >
                ← Back to Home
              </Link>
              <p className="text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] text-neutral-500 mb-3 md:mb-4 uppercase text-thin">
                Complete Collection
              </p>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-thin mb-6 md:mb-8">
                Full Gallery
              </h1>
              <p className="text-neutral-600 text-light max-w-2xl mx-auto text-sm md:text-base">
                Explore all my photography work
              </p>
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

            {/* Loading State */}
            {loading && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[250px]">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className={getItemClass(i)}>
                    <GallerySkeleton />
                  </div>
                ))}
              </div>
            )}

            {/* Gallery Grid */}
            {!loading && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[250px]">
                {filteredImages.map((item, index) => (
                  <div
                    key={item.id}
                    onClick={() => openLightbox(index)}
                    className={`group relative overflow-hidden photo-frame fade-in-up cursor-pointer ${getItemClass(index)}`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <img 
                      src={item.image_url || item.image} 
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="text-center text-white px-4">
                        <p className="text-xs md:text-sm text-thin tracking-widest uppercase">{item.category}</p>
                        <p className="text-sm md:text-base text-light mt-1">{item.title}</p>
                        <p className="text-xs text-thin mt-2">Click to view</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && filteredImages.length === 0 && (
              <div className="text-center py-12">
                <p className="text-neutral-600 text-light">No images found in this category.</p>
              </div>
            )}

            {/* Stats */}
            {!loading && filteredImages.length > 0 && (
              <div className="text-center mt-12 md:mt-16">
                <p className="text-sm text-neutral-500 text-thin tracking-wider">
                  Showing {filteredImages.length} {filteredImages.length === 1 ? 'image' : 'images'}
                  {activeCategory !== 'All' && ` in ${activeCategory}`}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Lightbox */}
        {lightboxOpen && (
          <Lightbox
            images={filteredImages.map(img => ({ 
              ...img, 
              image_url: img.image_url || img.image 
            }))}
            currentIndex={currentImageIndex}
            onClose={closeLightbox}
            onNext={nextImage}
            onPrev={prevImage}
          />
        )}
      </main>

      <Footer />
    </div>
  )
}
