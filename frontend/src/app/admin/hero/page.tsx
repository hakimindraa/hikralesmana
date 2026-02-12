'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'

export default function AdminHero() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    subtitle: '',
    title_line1: '',
    title_line2: '',
    description: '',
    button1_text: '',
    button1_link: '',
    button2_text: '',
    button2_link: ''
  })

  useEffect(() => {
    const adminUser = localStorage.getItem('admin_user')
    if (!adminUser) {
      router.push('/admin/login')
      return
    }
    fetchHeroSettings()
  }, [router])

  const fetchHeroSettings = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/hero-settings`)
      setFormData(response.data)
    } catch (error) {
      console.error('Error fetching hero settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin/hero-settings`, formData)
      alert('Hero settings updated successfully!')
    } catch (error: any) {
      console.error('Error saving hero settings:', error)
      const errorMsg = error.response?.data?.message || error.message || 'Failed to save hero settings'
      alert(`Error: ${errorMsg}`)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
      <p className="text-neutral-600">Loading...</p>
    </div>
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/admin/dashboard" className="text-sm text-neutral-600 hover:text-neutral-900 mb-2 inline-block">
                ← Back to Dashboard
              </Link>
              <h1 className="font-heading text-2xl text-thin tracking-widest uppercase">
                Hero Settings
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-8 border border-neutral-200">
            <p className="text-sm text-neutral-600 mb-6">
              Customize the hero section on your homepage. Changes will be reflected immediately.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs tracking-wider text-neutral-700 mb-2 uppercase">
                  Subtitle
                </label>
                <input
                  type="text"
                  required
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-800"
                  placeholder="e.g., VISUAL STORYTELLER"
                />
                <p className="text-xs text-neutral-500 mt-1">Small text above the main title</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs tracking-wider text-neutral-700 mb-2 uppercase">
                    Title Line 1
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title_line1}
                    onChange={(e) => setFormData({ ...formData, title_line1: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-800"
                    placeholder="e.g., Photography"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wider text-neutral-700 mb-2 uppercase">
                    Title Line 2
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title_line2}
                    onChange={(e) => setFormData({ ...formData, title_line2: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-800"
                    placeholder="e.g., & Videography"
                  />
                  <p className="text-xs text-neutral-500 mt-1">Will be displayed in lighter color</p>
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-wider text-neutral-700 mb-2 uppercase">
                  Description
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-800"
                  placeholder="e.g., Capturing moments, crafting stories through the lens"
                  maxLength={500}
                />
                <p className="text-xs text-neutral-500 mt-1">
                  {formData.description.length}/500 characters
                </p>
              </div>

              <div className="border-t border-neutral-200 pt-6">
                <h3 className="text-sm tracking-wider text-neutral-700 mb-4 uppercase">Button 1 (Primary)</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs tracking-wider text-neutral-700 mb-2 uppercase">
                      Button Text
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.button1_text}
                      onChange={(e) => setFormData({ ...formData, button1_text: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-800"
                      placeholder="e.g., VIEW WORK"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-wider text-neutral-700 mb-2 uppercase">
                      Button Link
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.button1_link}
                      onChange={(e) => setFormData({ ...formData, button1_link: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-800"
                      placeholder="e.g., /#projects or /projects"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-6">
                <h3 className="text-sm tracking-wider text-neutral-700 mb-4 uppercase">Button 2 (Secondary)</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs tracking-wider text-neutral-700 mb-2 uppercase">
                      Button Text
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.button2_text}
                      onChange={(e) => setFormData({ ...formData, button2_text: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-800"
                      placeholder="e.g., GET IN TOUCH"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-wider text-neutral-700 mb-2 uppercase">
                      Button Link
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.button2_link}
                      onChange={(e) => setFormData({ ...formData, button2_link: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-800"
                      placeholder="e.g., /#contact"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-8 py-3 bg-neutral-900 text-white text-xs tracking-widest hover:bg-neutral-800 transition-all uppercase disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <Link
                  href="/admin/dashboard"
                  className="px-8 py-3 border border-neutral-300 text-neutral-700 text-xs tracking-widest hover:border-neutral-800 transition-all uppercase inline-block text-center"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>

          {/* Preview */}
          <div className="mt-8 bg-white p-8 border border-neutral-200">
            <h3 className="text-sm tracking-wider text-neutral-700 mb-4 uppercase">Preview</h3>
            <div className="text-center py-12 bg-gradient-to-b from-neutral-100 to-neutral-50">
              <p className="text-xs tracking-[0.3em] text-neutral-500 mb-4 uppercase text-thin">
                {formData.subtitle}
              </p>
              <h1 className="font-heading text-4xl md:text-5xl mb-6 leading-tight text-thin tracking-tight">
                {formData.title_line1}
                <br />
                <span className="text-neutral-400">{formData.title_line2}</span>
              </h1>
              <p className="text-base text-neutral-600 mb-8 text-light max-w-2xl mx-auto">
                {formData.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 border border-neutral-800 text-neutral-800 text-xs tracking-widest uppercase text-light">
                  {formData.button1_text}
                </button>
                <button className="px-8 py-3 text-neutral-600 text-xs tracking-widest uppercase text-light">
                  {formData.button2_text}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
