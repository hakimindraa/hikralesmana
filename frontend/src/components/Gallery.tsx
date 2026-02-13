'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Lightbox from './Lightbox'
import { GallerySkeleton } from './SkeletonLoader'

export default function Gallery() {
  const [images, setImages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/gallery`)
      .then(res => {
        if (res.data.length > 0) {
          // Only show first 6 images on homepage
          setImages(res.data.slice(0, 6))
        } else {
          // Fallback images
          setImages([
            { id: 1, title: 'Portrait', image_url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04', category: 'Portrait' },
            { id: 2, title: 'Landscape', image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', category: 'Landscape' },
            { id: 3, title: 'Product', image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30', category: 'Product' },
            { id: 4, title: 'Wedding', image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552', category: 'Event' },
            { id: 5, title: 'Event', image_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865', category: 'Event' },
            { id: 6, title: 'Architecture', image_url: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625', category: 'Photography' }
          ])
        }
        setLoading(false)
      })
      .catch(() => {
        // Fallback images
        setImages([
          { id: 1, title: 'Portrait', image_url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04', category: 'Portrait' },
          { id: 2, title: 'Landscape', image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', category: 'Landscape' },
          { id: 3, title: 'Product', image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30', category: 'Product' },
          { id: 4, title: 'Wedding', image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552', category: 'Event' },
          { id: 5, title: 'Event', image_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865', category: 'Event' },
          { id: 6, title: 'Architecture', image_url: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625', category: 'Photography' }
        ])
        setLoading(false)
      })
  }, [])

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  // Custom masonry pattern for mobile: tall, 2 squares, tall, 2 squares...
  const getItemClass = (index: number) => {
    const pattern = index % 3
    if (pattern === 0) return 'row-span-2' // tall
    return '' // square
  }

  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] text-neutral-500 mb-3 md:mb-4 uppercase text-thin">
            Featured Work
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-thin">
            Gallery
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[250px]">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={getItemClass(i)}>
                <GallerySkeleton />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[250px]">
            {images.map((item, index) => (
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
                  <div className="text-center text-white">
                    <p className="text-xs md:text-sm text-thin tracking-widest uppercase">{item.category}</p>
                    <p className="text-sm md:text-base text-light mt-1">{item.title}</p>
                    <p className="text-xs text-thin mt-2">Click to view</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-8 md:mt-12">
          <a
            href="/gallery"
            className="inline-block px-8 md:px-10 py-3 md:py-4 border border-neutral-800 text-neutral-800 text-xs md:text-sm tracking-widest hover:bg-neutral-800 hover:text-white transition-all duration-300 uppercase text-light"
          >
            View Full Gallery
          </a>
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox
          images={images.map(img => ({ ...img, image_url: img.image_url || img.image }))}
          currentIndex={currentImageIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </section>
  )
}
