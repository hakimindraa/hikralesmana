'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'

export default function AdminTestimonials() {
  const router = useRouter()
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    company: '',
    message: '',
    image: '',
    rating: 5
  })

  useEffect(() => {
    const adminUser = localStorage.getItem('admin_user')
    if (!adminUser) {
      router.push('/admin/login')
      return
    }
    fetchTestimonials()
  }, [router])

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/testimonials`)
      setTestimonials(response.data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingId) {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin/testimonials/${editingId}`, formData)
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/testimonials`, formData)
      }
      fetchTestimonials()
      resetForm()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleEdit = (testimonial: any) => {
    setFormData(testimonial)
    setEditingId(testimonial.id)
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this testimonial?')) return
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/admin/testimonials/${id}`)
      fetchTestimonials()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const resetForm = () => {
    setFormData({ name: '', position: '', company: '', message: '', image: '', rating: 5 })
    setEditingId(null)
    setShowForm(false)
  }

  if (loading) return <div className="min-h-screen bg-neutral-50 flex items-center justify-center">Loading...</div>

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/admin/dashboard" className="text-sm text-neutral-600 hover:text-neutral-900 mb-2 inline-block">
                ← Back
              </Link>
              <h1 className="font-heading text-2xl text-thin tracking-widest uppercase">Manage Testimonials</h1>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-3 bg-neutral-900 text-white text-xs tracking-widest hover:bg-neutral-800 uppercase"
            >
              {showForm ? 'Cancel' : 'Add Testimonial'}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {showForm && (
          <div className="bg-white p-8 border border-neutral-200 mb-8">
            <h2 className="text-lg text-thin tracking-wider mb-6">
              {editingId ? 'Edit' : 'Add'} Testimonial
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs tracking-wider text-neutral-700 mb-2 uppercase">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-800"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wider text-neutral-700 mb-2 uppercase">Position</label>
                  <input
                    type="text"
                    required
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-800"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs tracking-wider text-neutral-700 mb-2 uppercase">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-800"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wider text-neutral-700 mb-2 uppercase">Image URL</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-800"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs tracking-wider text-neutral-700 mb-2 uppercase">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-800"
                />
              </div>
              <div>
                <label className="block text-xs tracking-wider text-neutral-700 mb-2 uppercase">
                  Rating ({formData.rating}/5)
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
              <div className="flex gap-4">
                <button type="submit" className="px-8 py-3 bg-neutral-900 text-white text-xs tracking-widest hover:bg-neutral-800 uppercase">
                  {editingId ? 'Update' : 'Create'}
                </button>
                <button type="button" onClick={resetForm} className="px-8 py-3 border border-neutral-300 text-xs tracking-widest hover:border-neutral-800 uppercase">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 border border-neutral-200">
              <div className="flex items-start gap-4 mb-4">
                {testimonial.image && (
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                )}
                <div className="flex-1">
                  <h3 className="text-sm font-medium">{testimonial.name}</h3>
                  <p className="text-xs text-neutral-600">{testimonial.position}</p>
                  {testimonial.company && <p className="text-xs text-neutral-500">{testimonial.company}</p>}
                </div>
                <div className="text-yellow-500">{'★'.repeat(testimonial.rating)}</div>
              </div>
              <p className="text-sm text-neutral-600 mb-4">{testimonial.message}</p>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(testimonial)} className="flex-1 px-4 py-2 border border-neutral-300 text-xs hover:border-neutral-800 uppercase">
                  Edit
                </button>
                <button onClick={() => handleDelete(testimonial.id)} className="flex-1 px-4 py-2 bg-red-600 text-white text-xs hover:bg-red-700 uppercase">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {testimonials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-600">No testimonials yet.</p>
          </div>
        )}
      </main>
    </div>
  )
}
