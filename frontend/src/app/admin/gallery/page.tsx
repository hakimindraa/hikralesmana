'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'

export default function AdminGallery() {
  const router = useRouter()
  const [gallery, setGallery] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    category: 'Photography',
    order: 0
  })
  const [uploading, setUploading] = useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      alert('File too large! Max 5MB')
      return
    }

    setUploading(true)
    const uploadFormData = new FormData()
    uploadFormData.append('image', file)

    try {
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
      alert('Failed to upload image')
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
    fetchGallery()
  }, [router])

  const fetchGallery = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/gallery`)
      setGallery(response.data)
    } catch (error) {
      console.error('Error fetching gallery:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingId) {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin/gallery/${editingId}`, formData)
        alert('Gallery item updated!')
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/gallery`, formData)
        alert('Gallery item created!')
      }
      fetchGallery()
      resetForm()
    } catch (error: any) {
      console.error('Error saving gallery:', error)
      alert(`Error: ${error.response?.data?.message || error.message}`)
    }
  }

  const handleEdit = (item: any) => {
    setFormData(item)
    setEditingId(item.id)
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this image?')) return
    
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/admin/gallery/${id}`)
      fetchGallery()
    } catch (error) {
      console.error('Error deleting:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      image: '',
      category: 'Photography',
      order: 0
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
                Manage Gallery
              </h1>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-3 bg-neutral-900 text-white text-xs tracking-widest hover:bg-neutral-800 transition-all uppercase"
            >
              {showForm ? 'Cancel' : 'Add Image'}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {showForm && (
          <div className="bg-white p-8 border border-neutral-200 mb-8">
            <h2 className="text-lg text-thin tracking-wider mb-6">
              {editingId ? 'Edit Image' : 'Add New Image'}
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
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-800"
                  >
                    <option value="Photography">Photography</option>
                    <option value="Portrait">Portrait</option>
                    <option value="Landscape">Landscape</option>
                    <option value="Product">Product</option>
                    <option value="Event">Event</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-wider text-neutral-700 mb-2 uppercase">
                  Image URL
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
                  Order (for sorting)
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-800"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-8 py-3 bg-neutral-900 text-white text-xs tracking-widest hover:bg-neutral-800 transition-all uppercase"
                >
                  {editingId ? 'Update' : 'Create'}
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.map((item) => (
            <div key={item.id} className="bg-white border border-neutral-200 overflow-hidden group">
              <div className="aspect-square relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="px-4 py-2 bg-white text-neutral-900 text-xs tracking-wider hover:bg-neutral-100 uppercase"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-4 py-2 bg-red-600 text-white text-xs tracking-wider hover:bg-red-700 uppercase"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">
                  {item.category}
                </p>
                <p className="text-sm text-thin tracking-wide truncate">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {gallery.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-600 text-light">No images yet. Add your first image!</p>
          </div>
        )}
      </main>
    </div>
  )
}
