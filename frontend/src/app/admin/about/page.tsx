'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'

export default function AdminAbout() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    subtitle: '',
    title: '',
    description_1: '',
    description_2: '',
    stat_projects: '',
    stat_projects_label: '',
    stat_clients: '',
    stat_clients_label: '',
    stat_experience: '',
    stat_experience_label: '',
    stat_awards: '',
    stat_awards_label: ''
  })

  useEffect(() => {
    const adminUser = localStorage.getItem('admin_user')
    if (!adminUser) {
      router.push('/admin/login')
      return
    }
    fetchAboutSettings()
  }, [router])

  const fetchAboutSettings = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/about-settings`)
      setFormData(response.data)
    } catch (error) {
      console.error('Error fetching about settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin/about-settings`, formData)
      alert('About & Stats settings updated successfully!')
    } catch (error: any) {
      console.error('Error saving about settings:', error)
      const errorMsg = error.response?.data?.message || error.message || 'Failed to save settings'
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
                About & Stats Settings
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 border border-neutral-200">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* About Section */}
              <div>
                <h3 className="text-lg tracking-wider text-neutral-700 mb-6 uppercase text-thin border-b pb-2">
                  About Section
                </h3>
                
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
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
                        placeholder="e.g., ABOUT ME"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-wider text-neutral-700 mb-2 uppercase">
                        Title
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-800"
                        placeholder="e.g., Visual Artist"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs tracking-wider text-neutral-700 mb-2 uppercase">
                      Description Paragraph 1
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.description_1}
                      onChange={(e) => setFormData({ ...formData, description_1: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-800"
                      maxLength={1000}
                    />
                    <p className="text-xs text-neutral-500 mt-1">
                      {formData.description_1.length}/1000 characters
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs tracking-wider text-neutral-700 mb-2 uppercase">
                      Description Paragraph 2
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.description_2}
                      onChange={(e) => setFormData({ ...formData, description_2: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-800"
                      maxLength={1000}
                    />
                    <p className="text-xs text-neutral-500 mt-1">
                      {formData.description_2.length}/1000 characters
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats Section */}
              <div className="border-t border-neutral-200 pt-8">
                <h3 className="text-lg tracking-wider text-neutral-700 mb-6 uppercase text-thin border-b pb-2">
                  Stats Section
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Projects */}
                  <div className="space-y-4 p-4 border border-neutral-200">
                    <h4 className="text-sm tracking-wider text-neutral-600 uppercase text-thin">
                      Stat 1: Projects
                    </h4>
                    <div>
                      <label className="block text-xs tracking-wider text-neutral-700 mb-2 uppercase">
                        Number
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.stat_projects}
                        onChange={(e) => setFormData({ ...formData, stat_projects: e.target.value })}
                        className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-800"
                        placeholder="e.g., 200+"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-wider text-neutral-700 mb-2 uppercase">
                        Label
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.stat_projects_label}
                        onChange={(e) => setFormData({ ...formData, stat_projects_label: e.target.value })}
                        className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-800"
                        placeholder="e.g., Projects Completed"
                      />
                    </div>
                  </div>

                  {/* Clients */}
                  <div className="space-y-4 p-4 border border-neutral-200">
                    <h4 className="text-sm tracking-wider text-neutral-600 uppercase text-thin">
                      Stat 2: Clients
                    </h4>
                    <div>
                      <label className="block text-xs tracking-wider text-neutral-700 mb-2 uppercase">
                        Number
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.stat_clients}
                        onChange={(e) => setFormData({ ...formData, stat_clients: e.target.value })}
                        className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-800"
                        placeholder="e.g., 50+"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-wider text-neutral-700 mb-2 uppercase">
                        Label
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.stat_clients_label}
                        onChange={(e) => setFormData({ ...formData, stat_clients_label: e.target.value })}
                        className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-800"
                        placeholder="e.g., Happy Clients"
                      />
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="space-y-4 p-4 border border-neutral-200">
                    <h4 className="text-sm tracking-wider text-neutral-600 uppercase text-thin">
                      Stat 3: Experience
                    </h4>
                    <div>
                      <label className="block text-xs tracking-wider text-neutral-700 mb-2 uppercase">
                        Number
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.stat_experience}
                        onChange={(e) => setFormData({ ...formData, stat_experience: e.target.value })}
                        className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-800"
                        placeholder="e.g., 5+"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-wider text-neutral-700 mb-2 uppercase">
                        Label
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.stat_experience_label}
                        onChange={(e) => setFormData({ ...formData, stat_experience_label: e.target.value })}
                        className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-800"
                        placeholder="e.g., Years Experience"
                      />
                    </div>
                  </div>

                  {/* Awards */}
                  <div className="space-y-4 p-4 border border-neutral-200">
                    <h4 className="text-sm tracking-wider text-neutral-600 uppercase text-thin">
                      Stat 4: Awards
                    </h4>
                    <div>
                      <label className="block text-xs tracking-wider text-neutral-700 mb-2 uppercase">
                        Number
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.stat_awards}
                        onChange={(e) => setFormData({ ...formData, stat_awards: e.target.value })}
                        className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-800"
                        placeholder="e.g., 12"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-wider text-neutral-700 mb-2 uppercase">
                        Label
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.stat_awards_label}
                        onChange={(e) => setFormData({ ...formData, stat_awards_label: e.target.value })}
                        className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-800"
                        placeholder="e.g., Awards Won"
                      />
                    </div>
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
        </div>
      </main>
    </div>
  )
}
