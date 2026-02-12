'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

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

export default function BeforeAfter() {
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/before-after`)
      .then(res => {
        if (res.data.length > 0) {
          // Show only first 3 items on homepage
          setItems(res.data.slice(0, 3))
        }
      })
      .catch(() => {
        // No fallback - just don't show the section if API fails
      })
  }, [])

  // Don't render section if no items
  if (items.length === 0) return null

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] text-neutral-500 mb-3 md:mb-4 uppercase text-thin">
            Editing Showcase
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-thin">
            Before & After
          </h2>
          <p className="text-neutral-600 text-light max-w-2xl mx-auto text-sm md:text-base mt-4 md:mt-6">
            Drag the slider to see the transformation
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {items.map((item, index) => (
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
            </div>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <a
            href="/before-after"
            className="inline-block px-8 md:px-10 py-3 md:py-4 border border-neutral-800 text-neutral-800 text-xs md:text-sm tracking-widest hover:bg-neutral-800 hover:text-white transition-all duration-300 uppercase text-light"
          >
            View All Comparisons
          </a>
        </div>
      </div>
    </section>
  )
}
