'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'

export default function AdminBeforeAfter() {
  const router = useRouter()
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    before_image: '',
    after_image: '',
    category: 'Portrait',
    order: 0
  })
  const [uploadingBefore, setUploadingBefore] = useState(false)
  const [uploadingAfter, setUploadingAfter] = useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'before' | 'after') => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      alert('File too large! Max 5MB')
      return
    }

    type === 'before' ? setUploadingBefore(true) : setUploadingAfter(true)
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
        if (type === 'before') {
          setFormData(prev => ({ ...prev, before_image: data.data.url }))
        } else {
          setFormData(prev => ({ ...prev, after_image: data.data.url }))
        }
        alert(`${type === 'before' ? 'Before' : 'After'} image uploaded!`)
      } else {
        throw new Error('Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload image')
    } finally {
      type === 'before' ? setUploadingBefore(false) : setUploadingAfter(false)
    }
  }

  useEffect(() => {
    const adminUser = localStorage.getItem('admin_user')
    if (!adminUser) {
      router.push('/admin/login')
      return
    }
    fetchItems()
  }, [router])

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/before-after`)
      setItems(response.data)
    } catch (error) {
      console.error('Error fetching:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingId) {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin/before-after/${editingId}`, formData)
        alert('Updated!')
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/before-after`, formData)
        alert('Created!')
      }
      fetchItems()
      resetForm()
    } catch (error: any) {
      console.error('Error:', error)
      alert(`Error: ${error.response?.data?.message || error.message}`)
    }
  }

  const handleEdit = (item: any) => {
    setFormData(item)
    setEditingId(item.id)
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this comparison?')) return
    
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/admin/before-after/${id}`)
      fetchItems()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      before_image: '',
      after_image: '',
      category: 'Portrait',
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
                Manage Before/After
              </h1>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-3 bg-neutral-900 text-white text-xs tracking-widest hover:bg-neutral-800 transition-all uppercase"
            >
              {showForm ? 'Cancel' : 'Add New'}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {showForm && (
          <div className="bg-white p-8 border border-neutral-200 mb-8">
            <h2 className="text-lg text-thin tracking-wider mb-6">
              {editingId ? 'Edit' : 'Add New'} Comparison
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
                    <option value="Portrait">Portrait</option>
                    <option value="Landscape">Landscape</option>
                    <option value="Product">Product</option>
                    <option value="Event">Event</option>
                    <option value="Architecture">Architecture</option>
                  </select>
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
                  placeholder="Describe the editing process..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Before Image */}
                <div>
                  <label className="block text-xs tracking-wider text-neutral-700 mb-2 uppercase">
                    Before Image URL
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.before_image}
                    onChange={(e) => setFormData({ ...formData, before_image: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-800"
                    placeholder="Or paste URL"
                  />
                  <div className="mt-2">
                    <label className="block text-xs text-neutral-600 mb-1">Or upload:</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'before')}
                      disabled={uploadingBefore}
                      className="text-sm"
                    />
                    {uploadingBefore && <p className="text-xs text-neutral-600 mt-1">Uploading...</p>}
                  </div>
                  {formData.before_image && (
                    <img src={formData.before_image} alt="Before" className="mt-2 w-full h-32 object-cover border" />
                  )}
                </div>

                {/* After Image */}
                <div>
                  <label className="block text-xs tracking-wider text-neutral-700 mb-2 uppercase">
                    After Image URL
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.after_image}
                    onChange={(e) => setFormData({ ...formData, after_image: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-800"
                    placeholder="Or paste URL"
                  />
                  <div className="mt-2">
                    <label className="block text-xs text-neutral-600 mb-1">Or upload:</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'after')}
                      disabled={uploadingAfter}
                      className="text-sm"
                    />
                    {uploadingAfter && <p className="text-xs text-neutral-600 mt-1">Uploading...</p>}
                  </div>
                  {formData.after_image && (
                    <img src={formData.after_image} alt="After" className="mt-2 w-full h-32 object-cover border" />
                  )}
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

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white border border-neutral-200 overflow-hidden">
              <div className="grid grid-cols-2 gap-2 p-4">
                <div>
                  <p className="text-xs text-neutral-500 mb-1">BEFORE</p>
                  <img src={item.before_image} alt="Before" className="w-full h-32 object-cover" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500 mb-1">AFTER</p>
                  <img src={item.after_image} alt="After" className="w-full h-32 object-cover" />
                </div>
              </div>
              <div className="p-4 border-t">
                <div className="text-xs text-neutral-500 mb-1 uppercase tracking-wider">
                  {item.category}
                </div>
                <h3 className="text-base text-thin tracking-wider mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-600 text-light mb-4 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 px-4 py-2 border border-neutral-300 text-xs tracking-wider hover:border-neutral-800 transition-all uppercase"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex-1 px-4 py-2 bg-red-600 text-white text-xs tracking-wider hover:bg-red-700 transition-all uppercase"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-600 text-light">No comparisons yet. Add your first one!</p>
          </div>
        )}
      </main>
    </div>
  )
}
