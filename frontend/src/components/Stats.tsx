'use client'

import { useEffect, useState } from 'react'

interface StatsData {
  stat_projects: string
  stat_projects_label: string
  stat_clients: string
  stat_clients_label: string
  stat_experience: string
  stat_experience_label: string
  stat_awards: string
  stat_awards_label: string
}

export default function Stats() {
  const [data, setData] = useState<StatsData | null>(null)
  const [counts, setCounts] = useState({
    projects: 0,
    clients: 0,
    experience: 0,
    awards: 0
  })

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/about-settings`)
      .then(res => {
        console.log('Stats API Response:', res)
        return res.json()
      })
      .then(data => {
        console.log('Stats Data:', data)
        setData(data)
        
        // Extract numbers from strings like "200+" or "5+"
        const extractNumber = (str: string) => {
          const match = str.match(/\d+/)
          return match ? parseInt(match[0]) : 0
        }
        
        // Animate counters
        const targets = {
          projects: extractNumber(data.stat_projects),
          clients: extractNumber(data.stat_clients),
          experience: extractNumber(data.stat_experience),
          awards: extractNumber(data.stat_awards)
        }

        const duration = 2000
        const steps = 60
        const interval = duration / steps

        let step = 0
        const timer = setInterval(() => {
          step++
          const progress = step / steps

          setCounts({
            projects: Math.floor(targets.projects * progress),
            clients: Math.floor(targets.clients * progress),
            experience: Math.floor(targets.experience * progress),
            awards: Math.floor(targets.awards * progress)
          })

          if (step >= steps) {
            clearInterval(timer)
            setCounts(targets)
          }
        }, interval)

        return () => clearInterval(timer)
      })
      .catch(err => console.error('Error fetching stats:', err))
  }, [])

  if (!data) {
    return (
      <section className="py-16 md:py-20 lg:py-24 px-6 md:px-16 bg-neutral-900 text-white">
        <div className="container-custom">
          <div className="text-center text-neutral-400">Loading...</div>
        </div>
      </section>
    )
  }

  // Get suffix from original string (e.g., "+" from "200+")
  const getSuffix = (str: string) => {
    return str.replace(/\d+/g, '')
  }

  const stats = [
    { label: data.stat_projects_label, value: counts.projects, suffix: getSuffix(data.stat_projects) },
    { label: data.stat_clients_label, value: counts.clients, suffix: getSuffix(data.stat_clients) },
    { label: data.stat_experience_label, value: counts.experience, suffix: getSuffix(data.stat_experience) },
    { label: data.stat_awards_label, value: counts.awards, suffix: getSuffix(data.stat_awards) }
  ]

  return (
    <section className="py-16 md:py-20 lg:py-24 px-6 md:px-16 bg-neutral-900 text-white">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-thin mb-2 md:mb-3">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm tracking-[0.15em] md:tracking-[0.2em] text-neutral-400 uppercase text-thin">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
