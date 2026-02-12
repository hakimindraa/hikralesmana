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
    { title: 'Hero Settings', href: '/admin/hero', icon: '🏠', description: 'Customize homepage hero section' },
    { title: 'About & Stats', href: '/admin/about', icon: '👤', description: 'Customize about section and statistics' },
    { title: 'Projects', href: '/admin/projects', icon: '📁', description: 'Manage portfolio projects' },
    { title: 'Gallery', href: '/admin/gallery', icon: '🖼️', description: 'Manage gallery images' },
    { title: 'Before/After', href: '/admin/before-after', icon: '🔄', description: 'Manage before/after comparisons' },
    { title: 'Skills', href: '/admin/skills', icon: '⚡', description: 'Manage skills and expertise' },
    { title: 'Testimonials', href: '/admin/testimonials', icon: '💬', description: 'Manage client testimonials' },
    { title: 'Contact Messages', href: '/admin/contacts', icon: '📧', description: 'View contact form submissions' }
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
              <div className="text-4xl mb-4">{item.icon}</div>
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
