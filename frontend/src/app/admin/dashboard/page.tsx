'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const adminUser = localStorage.getItem('admin_user')
    if (!adminUser) {
      router.push('/admin/login')
    } else {
      setUser(JSON.parse(adminUser))
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('admin_user')
    router.push('/admin/login')
  }

  if (!user) return null

  const menuItems = [
    { 
      title: 'Hero Settings', 
      href: '/admin/hero', 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      description: 'Customize homepage hero section' 
    },
    { 
      title: 'About & Stats', 
      href: '/admin/about', 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      description: 'Customize about section and statistics' 
    },
    { 
      title: 'Projects', 
      href: '/admin/projects', 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      ),
      description: 'Manage portfolio projects' 
    },
    { 
      title: 'Gallery', 
      href: '/admin/gallery', 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      description: 'Manage gallery images' 
    },
    { 
      title: 'Before/After', 
      href: '/admin/before-after', 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      description: 'Manage before/after comparisons' 
    },
    { 
      title: 'Skills', 
      href: '/admin/skills', 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      description: 'Manage skills and expertise' 
    },
    { 
      title: 'Testimonials', 
      href: '/admin/testimonials', 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      description: 'Manage client testimonials' 
    },
    { 
      title: 'Contact Messages', 
      href: '/admin/contacts', 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      description: 'View contact form submissions' 
    }
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="font-heading text-2xl text-thin tracking-widest uppercase">
              Admin Dashboard
            </h1>
            <div className="flex items-center gap-6">
              <span className="text-sm text-neutral-600 text-light">
                Welcome, {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="text-xs text-neutral-600 hover:text-neutral-900 transition-colors text-light tracking-wide uppercase"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-xl text-thin tracking-wider mb-2">Content Management</h2>
          <p className="text-neutral-600 text-light">
            Manage your portfolio content from here
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="bg-white p-8 border border-neutral-200 hover:border-neutral-800 transition-all duration-300 group"
            >
              <div className="text-neutral-600 group-hover:text-neutral-900 transition-colors mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg text-thin tracking-wider mb-2 group-hover:text-neutral-900">
                {item.title}
              </h3>
              <p className="text-sm text-neutral-600 text-light">
                {item.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-12 p-6 bg-white border border-neutral-200">
          <h3 className="text-lg text-thin tracking-wider mb-4">Quick Links</h3>
          <div className="flex gap-4">
            <a
              href="/"
              target="_blank"
              className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors text-light"
            >
              View Portfolio →
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
