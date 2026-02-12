'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function AdminLogin() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      console.log('Attempting login with:', formData.email)
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/login`, formData)
      
      console.log('Login response:', response.data)
      
      if (response.data.user) {
        localStorage.setItem('admin_user', JSON.stringify(response.data.user))
        router.push('/admin/dashboard')
      }
    } catch (err: any) {
      console.error('Login error:', err)
      const errorMessage = err.response?.data?.message || err.message || 'Login failed. Please check your credentials.'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="font-heading text-4xl text-thin tracking-widest uppercase mb-2">
            Admin Login
          </h1>
          <p className="text-neutral-600 text-light">
            Portfolio Management System
          </p>
        </div>

        <div className="bg-white p-8 border border-neutral-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs tracking-wider text-neutral-700 mb-2 uppercase text-thin">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-800 transition-colors text-light"
                placeholder="admin@visual.com"
              />
            </div>

            <div>
              <label className="block text-xs tracking-wider text-neutral-700 mb-2 uppercase text-thin">
                Password
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-800 transition-colors text-light"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm text-light">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-4 bg-neutral-900 text-white text-xs tracking-widest hover:bg-neutral-800 transition-all duration-300 uppercase text-light disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-xs text-neutral-600 hover:text-neutral-900 transition-colors text-light tracking-wide"
            >
              ← Back to Portfolio
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
