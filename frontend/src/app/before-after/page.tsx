'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// Before/After Slider Component
function BeforeAfterSlider({ beforeImage, afterImage, title }: { beforeImage: string, afterImage: string, title: string }) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100))
    setSliderPosition(percent)
  }

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const rect = e.currentTarget.getBoundingClientRect()
    handleMove(e.clientX, rect)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const rect = e.currentTarget.getBoundingClientRect()
    handleMove(e.touches[0].clientX, rect)
  }

  return (
    <div
      className="relative w-full aspect-[4/3] overflow-hidden select-none cursor-ew-resize"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      {/* After Image (Background) */}
      <img
        src={afterImage}
        alt={`${title} - After`}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Before Image (Foreground with clip) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt={`${title} - Before`}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* Slider Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-neutral-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 text-xs tracking-wider uppercase">
        Before
      </div>
      <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 text-xs tracking-wider uppercase">
        After
      </div>
    </div>
  )
}

export default function BeforeAfterPage() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/before-after`)
      .then(res => {
        if (res.data.length > 0) {
          setItems(res.data)
        } else {
          // Fallback data
          setItems([
            {
              id: 1,
              title: 'Portrait Retouching',
              description: 'Professional skin retouching and color grading',
              before_image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04',
              after_image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
              category: 'Portrait'
            }
          ])
        }
      })
      .catch(() => {
        setItems([
          {
            id: 1,
            title: 'Portrait Retouching',
            description: 'Professional skin retouching and color grading',
            before_image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04',
            after_image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
            category: 'Portrait'
          }
        ])
      })
      .finally(() => setLoading(false))
  }, [])

  const categories = ['All', ...Array.from(new Set(items.map(item => item.category)))]
  const filteredItems = activeCategory === 'All' 
    ? items 
    : items.filter(item => item.category === activeCategory)

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
                Editing Showcase
              </p>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-thin mb-6 md:mb-8">
                Before & After
              </h1>
              <p className="text-neutral-600 text-light max-w-2xl mx-auto text-sm md:text-base">
                Drag the slider to see the transformation
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

            {/* Loading */}
            {loading && (
              <div className="text-center py-12">
                <p className="text-neutral-600 text-light">Loading...</p>
              </div>
            )}

            {/* Grid */}
            {!loading && (
              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                {filteredItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <BeforeAfterSlider
                      beforeImage={item.before_image}
                      afterImage={item.after_image}
                      title={item.title}
                    />
                    <div className="mt-4 md:mt-6">
                      <div className="text-xs text-neutral-400 tracking-wider uppercase text-thin mb-2">
                        {item.category}
                      </div>
                      <h3 className="text-xl md:text-2xl text-thin tracking-wide mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-base text-neutral-600 text-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && filteredItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-neutral-600 text-light">No comparisons found in this category.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
