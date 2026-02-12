'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Hero() {
  const [hero, setHero] = useState({
    subtitle: 'VISUAL STORYTELLER',
    title_line1: 'Photography',
    title_line2: '& Videography',
    description: 'Capturing moments, crafting stories through the lens',
    button1_text: 'VIEW WORK',
    button1_link: '/#projects',
    button2_text: 'GET IN TOUCH',
    button2_link: '/#contact'
  })

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/hero-settings`)
      .then(res => setHero(res.data))
      .catch(err => console.error('Error fetching hero settings:', err))
  }, [])

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative bg-gradient-to-b from-neutral-100 to-neutral-50 px-4">
      <div className="container-custom w-full text-center">
        <div className="max-w-4xl mx-auto fade-in">
          <p className="text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] text-neutral-500 mb-4 md:mb-6 uppercase text-thin">
            {hero.subtitle}
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl mb-6 md:mb-8 leading-tight text-thin tracking-tight px-4">
            {hero.title_line1}
            <br />
            <span className="text-neutral-400">{hero.title_line2}</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-neutral-600 mb-8 md:mb-12 leading-relaxed text-light max-w-2xl mx-auto px-4">
            {hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
            <a
              href={hero.button1_link}
              className="px-8 md:px-10 py-3 md:py-4 border border-neutral-800 text-neutral-800 text-xs md:text-sm tracking-widest hover:bg-neutral-800 hover:text-white transition-all duration-300 uppercase text-light"
            >
              {hero.button1_text}
            </a>
            <a
              href={hero.button2_link}
              className="px-8 md:px-10 py-3 md:py-4 text-neutral-600 text-xs md:text-sm tracking-widest hover:text-neutral-800 transition-colors uppercase text-light"
            >
              {hero.button2_text}
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-5 h-5 md:w-6 md:h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
