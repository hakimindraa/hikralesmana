'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

interface Skill {
  id: number
  name: string
  level: number
  category: string
}

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([])

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/skills`)
      .then(res => setSkills(res.data))
      .catch(() => {
        // Fallback data untuk photographer/videographer
        setSkills([
          { id: 1, name: 'Photography', level: 95, category: 'Visual' },
          { id: 2, name: 'Videography', level: 90, category: 'Visual' },
          { id: 3, name: 'Photo Editing', level: 95, category: 'Post-Production' },
          { id: 4, name: 'Video Editing', level: 90, category: 'Post-Production' },
          { id: 5, name: 'Color Grading', level: 85, category: 'Post-Production' },
          { id: 6, name: 'Adobe Lightroom', level: 95, category: 'Software' },
          { id: 7, name: 'Adobe Photoshop', level: 90, category: 'Software' },
          { id: 8, name: 'Adobe Premiere Pro', level: 90, category: 'Software' },
          { id: 9, name: 'DaVinci Resolve', level: 85, category: 'Software' },
        ])
      })
  }, [])

  const categories = Array.from(new Set(skills.map(s => s.category)))

  return (
    <section id="skills" className="section-padding bg-neutral-50">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-20">
          <p className="text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] text-neutral-500 mb-3 md:mb-4 uppercase text-thin">
            What I Do
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-thin">
            Services & Skills
          </h2>
        </div>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {categories.map(category => (
            <div key={category} className="space-y-6 md:space-y-8">
              <h3 className="text-xl md:text-2xl font-heading text-thin tracking-wide border-b border-neutral-200 pb-3 md:pb-4">
                {category}
              </h3>
              <div className="space-y-4 md:space-y-6">
                {skills.filter(s => s.category === category).map(skill => (
                  <div key={skill.id}>
                    <div className="flex justify-between mb-2 md:mb-3">
                      <span className="text-sm md:text-base text-light text-neutral-700">{skill.name}</span>
                      <span className="text-neutral-400 text-xs md:text-sm text-thin">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-neutral-200 h-px">
                      <div
                        className="bg-neutral-800 h-px transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
