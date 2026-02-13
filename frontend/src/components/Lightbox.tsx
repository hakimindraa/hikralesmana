'use client'

import { useEffect } from 'react'

interface LightboxProps {
  images: { id: number; image_url: string; title: string; category?: string }[]
  currentIndex: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export default function Lightbox({ images, currentIndex, onClose, onNext, onPrev }: LightboxProps) {
  const currentImage = images[currentIndex]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [onClose, onNext, onPrev])

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all z-10 group"
        aria-label="Close"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Previous Button */}
      {images.length > 1 && (
        <button
          onClick={onPrev}
          className="absolute left-6 w-12 h-12 border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all z-10"
          aria-label="Previous"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Next Button */}
      {images.length > 1 && (
        <button
          onClick={onNext}
          className="absolute right-6 w-12 h-12 border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all z-10"
          aria-label="Next"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Image Container */}
      <div className="max-w-7xl max-h-[90vh] w-full px-20 flex flex-col items-center">
        <img
          src={currentImage.image_url}
          alt={currentImage.title}
          className="max-w-full max-h-[80vh] object-contain"
          loading="eager"
        />
        
        {/* Image Info */}
        <div className="mt-6 text-center">
          <h3 className="text-white text-lg tracking-wider mb-1">{currentImage.title}</h3>
          {currentImage.category && (
            <p className="text-white/60 text-sm tracking-wider uppercase">{currentImage.category}</p>
          )}
          <p className="text-white/40 text-xs mt-2">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      </div>

      {/* Click outside to close */}
      <div 
        className="absolute inset-0 -z-10" 
        onClick={onClose}
      />
    </div>
  )
}
