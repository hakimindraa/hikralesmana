'use client'

import { useEffect, useState } from 'react'

interface AboutData {
  subtitle: string
  title: string
  description_1: string
  description_2: string
  stat_experience: string
  stat_experience_label: string
  stat_projects: string
  stat_projects_label: string
  stat_clients: string
  stat_clients_label: string
}

export default function About() {
  const [data, setData] = useState<AboutData | null>(null)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/about-settings`)
      .then(res => {
        console.log('About API Response:', res)
        return res.json()
      })
      .then(data => {
        console.log('About Data:', data)
        setData(data)
      })
      .catch(err => {
        console.error('Error fetching about settings:', err)
        // Set default data if API fails
        setData({
          subtitle: 'ABOUT ME',
          title: 'Visual Artist',
          description_1: 'Loading...',
          description_2: 'Loading...',
          stat_experience: '5+',
          stat_experience_label: 'Years Experience',
          stat_projects: '200+',
          stat_projects_label: 'Projects Completed',
          stat_clients: '50+',
          stat_clients_label: 'Happy Clients'
        })
      })
  }, [])

  if (!data) {
    return (
      <section id="about" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center text-neutral-400">Loading...</div>
        </div>
      </section>
    )
  }

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="space-y-6 md:space-y-8">
            <div>
              <p className="text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] text-neutral-500 mb-3 md:mb-4 uppercase text-thin">
                {data.subtitle}
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-thin mb-6 md:mb-8 leading-tight">
                {data.title}
              </h2>
            </div>
            <div className="space-y-4 md:space-y-6 text-neutral-600 text-light leading-relaxed">
              <p className="text-base md:text-lg">
                {data.description_1}
              </p>
              <p className="text-base md:text-lg">
                {data.description_2}
              </p>
            </div>
          </div>
          
          <div className="space-y-6 md:space-y-8">
            <div className="border-l border-neutral-200 pl-6 md:pl-8 space-y-4 md:space-y-6">
              <div>
                <h3 className="text-xl md:text-2xl font-heading text-thin mb-2">{data.stat_experience_label}</h3>
                <p className="text-neutral-500 text-light text-sm md:text-base">{data.stat_experience}</p>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-heading text-thin mb-2">{data.stat_projects_label}</h3>
                <p className="text-neutral-500 text-light text-sm md:text-base">{data.stat_projects}</p>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-heading text-thin mb-2">{data.stat_clients_label}</h3>
                <p className="text-neutral-500 text-light text-sm md:text-base">{data.stat_clients}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
