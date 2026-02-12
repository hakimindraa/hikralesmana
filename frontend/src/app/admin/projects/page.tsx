'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'

export default function AdminProjects() {
  const router = useRouter()
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    video_url: '',
    category: '',
    client: '',
    date: ''
  })
  const [uploading, setUploading] = useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size (max 5MB for free ImgBB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File too large! Max 5MB')
      return
    }

    setUploading(true)
    const uploadFormData = new FormData()
    uploadFormData.append('image', file)

    try {
      // Upload to ImgBB (free, no backend needed!)
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: 'POST',
          body: uploadFormData
        }
      )
      
      const data = await response.json()
      
      if (data.success) {
        setFormData(prev => ({ ...prev, image: data.data.url }))
        alert('Image uploaded successfully!')
      } else {
        throw new Error('Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload image. Please try again or paste image URL manually.')
    } finally {
      setUploading(false)
    }
  }

  useEffect(() => {
    const adminUser = localStorage.getItem('admin_user')
    if (!adminUser) {
      router.push('/admin/login')
      return
    }
    fetchProjects()
  }, [router])

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects`)
      setProjects(response.data)
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting form data:', formData) // Debug log
    try {
      if (editingId) {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin/projects/${editingId}`, formData)
        alert('Project updated successfully!')
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/projects`, formData)
        alert('Project created successfully!')
      }
      fetchProjects()
      resetForm()
    } catch (error: any) {
      console.error('Error saving project:', error)
      console.error('Error response:', error.response?.data) // Debug log
      const errorMsg = error.response?.data?.message || error.message || 'Failed to save project'
      alert(`Error: ${errorMsg}\n\nCheck console for details (F12)`)
    }
  }

  const handleEdit = (project: any) => {
    console.log('Editing project:', project) // Debug log
    setFormData(project)
    setEditingId(project.id)
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return
    
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/admin/projects/${id}`)
      fetchProjects()
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      video_url: '',
      category: '',
      client: '',
      date: ''
    })
    setEditingId(null)
    setShowForm(false)
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
                Manage Projects
              </h1>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-3 bg-neutral-900 text-white text-xs tracking-widest hover:bg-neutral-800 transition-all uppercase"
            >
              {showForm ? 'Cancel' : 'Add New Project'}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {showForm && (
          <div className="bg-white p-8 border border-neutral-200 mb-8">
            <h2 className="text-lg text-thin tracking-wider mb-6">
              {editingId ? 'Edit Project' : 'Add New Project'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
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
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wider text-neutral-700 mb-2 uppercase">
                    Category
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-wider text-neutral-700 mb-2 uppercase">
                  Description
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-800"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs tracking-wider text-neutral-700 mb-2 uppercase">
                    Image URL (Thumbnail)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-800"
                    placeholder="Or paste image URL"
                  />
                  <div className="mt-2">
                    <label className="block text-xs text-neutral-600 mb-1">Or upload image:</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="text-sm"
                    />
                    {uploading && <p className="text-xs text-neutral-600 mt-1">Uploading...</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-xs tracking-wider text-neutral-700 mb-2 uppercase">
                    Video URL (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.video_url}
                    onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-800"
                    placeholder="YouTube, Vimeo, or Instagram link"
                  />
                  <p className="text-xs text-neutral-500 mt-1">
                    Paste YouTube/Vimeo/Instagram video link. If provided, video will play in modal instead of image.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs tracking-wider text-neutral-700 mb-2 uppercase">
                    Client
                  </label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-wider text-neutral-700 mb-2 uppercase">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-800"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-8 py-3 bg-neutral-900 text-white text-xs tracking-widest hover:bg-neutral-800 transition-all uppercase"
                >
                  {editingId ? 'Update' : 'Create'} Project
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-8 py-3 border border-neutral-300 text-neutral-700 text-xs tracking-widest hover:border-neutral-800 transition-all uppercase"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white border border-neutral-200 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="text-xs text-neutral-500 mb-2 uppercase tracking-wider">
                  {project.category}
                </div>
                <h3 className="text-lg text-thin tracking-wider mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-neutral-600 text-light mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="flex-1 px-4 py-2 border border-neutral-300 text-xs tracking-wider hover:border-neutral-800 transition-all uppercase"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="flex-1 px-4 py-2 bg-red-600 text-white text-xs tracking-wider hover:bg-red-700 transition-all uppercase"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-600 text-light">No projects yet. Add your first project!</p>
          </div>
        )}
      </main>
    </div>
  )
}
