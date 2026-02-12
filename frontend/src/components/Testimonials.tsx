'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [testimonials, setTestimonials] = useState<any[]>([])

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        console.log('Fetching testimonials from:', `${process.env.NEXT_PUBLIC_API_URL}/testimonials`)
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/testimonials`)
        console.log('Testimonials response:', response.data)
        
        if (response.data.length > 0) {
          setTestimonials(response.data)
        } else {
          console.log('No testimonials found, using fallback')
          // Fallback data if no testimonials in database
          setTestimonials([
            {
              name: 'Sarah Johnson',
              position: 'Wedding Client',
              message: 'Absolutely stunning work! Every photo captured the emotion and beauty of our special day perfectly.',
              rating: 5
            }
          ])
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error)
        // Fallback data
        setTestimonials([
          {
            name: 'Sarah Johnson',
            position: 'Wedding Client',
            message: 'Absolutely stunning work! Every photo captured the emotion and beauty of our special day perfectly.',
            rating: 5
          }
        ])
      }
    }
    fetchTestimonials()
  }, [])

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] text-neutral-500 mb-3 md:mb-4 uppercase text-thin">
            Testimonials
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-thin">
            Client Stories
          </h2>
        </div>

        <div className="max-w-3xl mx-auto px-4">
          <div className="relative min-h-[250px] sm:min-h-[280px] md:min-h-[300px] flex items-center justify-center">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-500 ${
                  index === activeIndex
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8 pointer-events-none'
                }`}
              >
                <div className="text-center space-y-4 md:space-y-6">
                  <div className="flex justify-center gap-1 mb-4 md:mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 md:w-5 md:h-5 text-neutral-800"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-neutral-700 text-light leading-relaxed italic px-4">
                    "{testimonial.message}"
                  </p>
                  <div className="pt-4 md:pt-6">
                    <div className="font-heading text-base md:text-lg text-thin tracking-wide">
                      {testimonial.name}
                    </div>
                    <div className="text-xs md:text-sm text-neutral-500 text-thin tracking-wider">
                      {testimonial.position}
                      {testimonial.company && ` • ${testimonial.company}`}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 md:gap-3 mt-8 md:mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-neutral-800 w-6 md:w-8'
                    : 'bg-neutral-300 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
