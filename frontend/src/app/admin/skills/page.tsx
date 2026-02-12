'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'

export default function AdminSkills() {
  const router = useRouter()
  const [skills, setSkills] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    level: 80
  })

  useEffect(() => {
    const adminUser = localStorage.getItem('admin_user')
    if (!adminUser) {
      router.push('/admin/login')
      return
    }
    fetchSkills()
  }, [router])

  const fetchSkills = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/skills`)
      setSkills(response.data)
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
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin/skills/${editingId}`, formData)
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/skills`, formData)
      }
      fetchSkills()
      resetForm()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleEdit = (skill: any) => {
    setFormData(skill)
    setEditingId(skill.id)
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this skill?')) return
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/admin/skills/${id}`)
      fetchSkills()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const resetForm = () => {
    setFormData({ name: '', category: '', level: 80 })
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
              <h1 className="font-heading text-2xl text-thin tracking-widest uppercase">Manage Skills</h1>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-3 bg-neutral-900 text-white text-xs tracking-widest hover:bg-neutral-800 uppercase"
            >
              {showForm ? 'Cancel' : 'Add Skill'}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {showForm && (
          <div className="bg-white p-8 border border-neutral-200 mb-8">
            <h2 className="text-lg text-thin tracking-wider mb-6">
              {editingId ? 'Edit' : 'Add'} Skill
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
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
                  <label className="block text-xs tracking-wider text-neutral-700 mb-2 uppercase">Category</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-800"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wider text-neutral-700 mb-2 uppercase">
                    Level ({formData.level}%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
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

        <div className="bg-white border border-neutral-200">
          <table className="w-full">
            <thead className="border-b border-neutral-200">
              <tr>
                <th className="text-left px-6 py-4 text-xs tracking-wider uppercase">Name</th>
                <th className="text-left px-6 py-4 text-xs tracking-wider uppercase">Category</th>
                <th className="text-left px-6 py-4 text-xs tracking-wider uppercase">Level</th>
                <th className="text-right px-6 py-4 text-xs tracking-wider uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr key={skill.id} className="border-b border-neutral-100">
                  <td className="px-6 py-4 text-sm">{skill.name}</td>
                  <td className="px-6 py-4 text-sm text-neutral-600">{skill.category}</td>
                  <td className="px-6 py-4 text-sm">{skill.level}%</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleEdit(skill)} className="text-xs text-neutral-600 hover:text-neutral-900 mr-4">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(skill.id)} className="text-xs text-red-600 hover:text-red-800">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {skills.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-600">No skills yet.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
