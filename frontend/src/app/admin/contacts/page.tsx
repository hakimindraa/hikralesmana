'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'

export default function AdminContacts() {
  const router = useRouter()
  const [contacts, setContacts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState<any>(null)

  // Convert phone to WhatsApp format
  const formatPhoneForWhatsApp = (phone: string) => {
    if (!phone) return ''
    
    // Remove all non-digit characters
    let cleaned = phone.replace(/\D/g, '')
    
    // Convert 08xxx to 628xxx (Indonesia)
    if (cleaned.startsWith('08')) {
      cleaned = '62' + cleaned.substring(1)
    }
    // Add 62 if starts with 8 (missing leading 0)
    else if (cleaned.startsWith('8') && !cleaned.startsWith('62')) {
      cleaned = '62' + cleaned
    }
    // If already has +62, remove the +
    else if (cleaned.startsWith('62')) {
      // Already correct format
    }
    
    return cleaned
  }

  useEffect(() => {
    const adminUser = localStorage.getItem('admin_user')
    if (!adminUser) {
      router.push('/admin/login')
      return
    }
    fetchContacts()
  }, [router])

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/contacts`)
      setContacts(response.data)
    } catch (error) {
      console.error('Error fetching contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this message?')) return
    
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/admin/contacts/${id}`)
      fetchContacts()
      setSelectedContact(null)
    } catch (error) {
      console.error('Error deleting contact:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
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
                Contact Messages
              </h1>
            </div>
            <div className="text-sm text-neutral-600">
              {contacts.length} message{contacts.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {contacts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-600 text-light">No messages yet.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Messages List */}
            <div className="lg:col-span-1 space-y-4">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`bg-white p-4 border cursor-pointer transition-all ${
                    selectedContact?.id === contact.id
                      ? 'border-neutral-800 shadow-sm'
                      : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-medium text-neutral-900 truncate">
                      {contact.name}
                    </h3>
                    <span className="text-xs text-neutral-500">
                      {new Date(contact.created_at).toLocaleDateString('id-ID', { 
                        day: 'numeric',
                        month: 'short'
                      })}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 mb-1 truncate">
                    {contact.email}
                  </p>
                  <p className="text-xs text-neutral-500 line-clamp-2">
                    {contact.message}
                  </p>
                </div>
              ))}
            </div>

            {/* Message Detail */}
            <div className="lg:col-span-2">
              {selectedContact ? (
                <div className="bg-white p-8 border border-neutral-200">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-xl text-thin tracking-wider mb-2">
                        {selectedContact.name}
                      </h2>
                      <p className="text-sm text-neutral-600 mb-1">
                        {selectedContact.email}
                      </p>
                      {selectedContact.phone && (
                        <p className="text-sm text-neutral-600">
                          {selectedContact.phone}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDelete(selectedContact.id)}
                      className="px-4 py-2 bg-red-600 text-white text-xs tracking-wider hover:bg-red-700 transition-all uppercase"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="border-t border-neutral-200 pt-6">
                    <p className="text-xs text-neutral-500 mb-2 uppercase tracking-wider">
                      Message
                    </p>
                    <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-wrap">
                      {selectedContact.message}
                    </p>
                  </div>

                  <div className="border-t border-neutral-200 mt-6 pt-6">
                    <p className="text-xs text-neutral-500">
                      Received: {formatDate(selectedContact.created_at)}
                    </p>
                  </div>

                  {/* Quick Actions */}
                  <div className="border-t border-neutral-200 mt-6 pt-6">
                    <div className="flex flex-wrap gap-4">
                      {/* Gmail Web (Desktop) */}
                      <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(selectedContact.email)}&su=${encodeURIComponent(`Re: Your message from Hikra Portfolio`)}&body=${encodeURIComponent(`Hi ${selectedContact.name},\n\nThank you for reaching out to Hikra Portfolio. I received your message:\n\n"${selectedContact.message}"\n\nBest regards,\nHikra`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 border border-neutral-800 text-neutral-800 text-xs tracking-widest hover:bg-neutral-800 hover:text-white transition-all uppercase"
                      >
                        Reply via Gmail
                      </a>
                      
                      {/* Email App (Mobile) */}
                      <a
                        href={`mailto:${selectedContact.email}?subject=${encodeURIComponent(`Re: Your message from Hikra Portfolio`)}&body=${encodeURIComponent(`Hi ${selectedContact.name},\n\nThank you for reaching out to Hikra Portfolio. I received your message:\n\n"${selectedContact.message}"\n\nBest regards,\nHikra`)}`}
                        className="px-6 py-3 border border-neutral-800 text-neutral-800 text-xs tracking-widest hover:bg-neutral-800 hover:text-white transition-all uppercase"
                      >
                        Open Email App
                      </a>
                      
                      {/* WhatsApp */}
                      {selectedContact.phone && (
                        <a
                          href={`https://wa.me/${formatPhoneForWhatsApp(selectedContact.phone)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 border border-neutral-800 text-neutral-800 text-xs tracking-widest hover:bg-neutral-800 hover:text-white transition-all uppercase"
                        >
                          WhatsApp
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-8 border border-neutral-200 flex items-center justify-center h-full">
                  <p className="text-neutral-500 text-light">
                    Select a message to view details
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
