import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import API_URL from '../api/config'
import SEO from '../components/SEO'

function Contact() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async () => {
    if (!form.firstName || !form.lastName || !form.email || !form.message) {
      setError('Please fill all required fields')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      setSuccess(data.message)
      setForm({ firstName: '', lastName: '', email: '', phone: '', message: '' })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <SEO
        title="Contact Us"
        description="Get in touch with Hotshot Luxury. We'd love to hear from you."
        url="/contact"
      />
      <Navbar />

      {/* Hero Banner */}
      <div className="relative bg-zinc-950 border-b border-zinc-900 pt-24 pb-10 px-4 overflow-hidden">
        <div className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden">
          <p className="text-zinc-900 text-[5rem] md:text-[10rem] font-black uppercase tracking-widest opacity-40 whitespace-nowrap">
            CONTACT
          </p>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <h1 className="text-white text-4xl sm:text-5xl md:text-7xl font-black uppercase leading-tight">
            Contact <span className="text-red-500">Us</span>
          </h1>
          <div className="flex items-center gap-2 mt-3">
            <Link to="/" className="text-red-500 text-xs tracking-widest uppercase hover:text-white transition-colors">Home</Link>
            <span className="text-zinc-600 text-xs">»</span>
            <span className="text-zinc-400 text-xs tracking-widest uppercase">Contact Us</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left — Info */}
          <div>
            <p className="text-red-500 text-xs tracking-[0.4em] uppercase mb-3">Contact Info</p>
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-6 leading-tight">
              Get In Touch
            </h2>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-16 h-px bg-zinc-700" />
              <div className="w-2 h-2 border border-red-500 rotate-45" />
              <div className="w-16 h-px bg-zinc-700" />
            </div>
            <div className="border-b border-dashed border-zinc-800 pb-5 mb-5">
              <p className="text-zinc-400 text-xs tracking-wider"><span className="text-white font-bold">ADDRESS: </span>Abuja, Nigeria</p>
            </div>
            <div className="border-b border-dashed border-zinc-800 pb-5 mb-5 flex items-center gap-4">
              <div className="border border-zinc-700 p-3 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-red-500" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </div>
              <div>
                <p className="text-white text-xs font-bold tracking-widest uppercase mb-1">Customer Service</p>
                <p className="text-zinc-400 text-xs tracking-wider">+234 000 000 0000</p>
              </div>
            </div>
            <div className="border-b border-dashed border-zinc-800 pb-5 mb-8 flex items-center gap-4">
              <div className="border border-zinc-700 p-3 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-red-500" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <div>
                <p className="text-white text-xs font-bold tracking-widest uppercase mb-1">Email Us</p>
                <p className="text-zinc-400 text-xs tracking-wider break-all">hotshotluxury@info.com</p>
              </div>
            </div>
            <div>
              <p className="text-white text-xs font-bold tracking-[0.3em] uppercase mb-4">Follow</p>
              <div className="flex items-center gap-3 flex-wrap">
                <a href="#" className="bg-zinc-900 border border-zinc-700 hover:border-red-500 hover:text-red-500 text-zinc-400 p-3 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="bg-zinc-900 border border-zinc-700 hover:border-red-500 hover:text-red-500 text-zinc-400 p-3 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="#" className="bg-zinc-900 border border-zinc-700 hover:border-red-500 hover:text-red-500 text-zinc-400 p-3 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
                </a>
                <a href="#" className="bg-zinc-900 border border-zinc-700 hover:border-red-500 hover:text-red-500 text-zinc-400 p-3 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="flex flex-col gap-4">

            {success && (
              <div className="bg-green-500/10 border border-green-500 px-4 py-3">
                <p className="text-green-500 text-xs tracking-wider">{success}</p>
              </div>
            )}

            {error && (
              <div className="bg-red-500/10 border border-red-500 px-4 py-3">
                <p className="text-red-500 text-xs tracking-wider">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input name="firstName" value={form.firstName} onChange={handleChange} type="text" placeholder="Your Name *" className="w-full bg-zinc-900 border border-zinc-800 text-white text-xs px-4 py-4 tracking-wider placeholder-zinc-600 focus:outline-none focus:border-red-500 transition-colors" />
              <input name="lastName" value={form.lastName} onChange={handleChange} type="text" placeholder="Last Name *" className="w-full bg-zinc-900 border border-zinc-800 text-white text-xs px-4 py-4 tracking-wider placeholder-zinc-600 focus:outline-none focus:border-red-500 transition-colors" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email Address *" className="w-full bg-zinc-900 border border-zinc-800 text-white text-xs px-4 py-4 tracking-wider placeholder-zinc-600 focus:outline-none focus:border-red-500 transition-colors" />
              <input name="phone" value={form.phone} onChange={handleChange} type="tel" placeholder="Phone" className="w-full bg-zinc-900 border border-zinc-800 text-white text-xs px-4 py-4 tracking-wider placeholder-zinc-600 focus:outline-none focus:border-red-500 transition-colors" />
            </div>
            <textarea name="message" value={form.message} onChange={handleChange} placeholder="Type Your Message *" rows={7} className="w-full bg-zinc-900 border border-zinc-800 text-white text-xs px-4 py-4 tracking-wider placeholder-zinc-600 focus:outline-none focus:border-red-500 transition-colors resize-none" />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full sm:w-auto text-xs tracking-[0.3em] uppercase px-12 py-4 transition-all duration-300 ${
                loading ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed' : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              {loading ? 'Sending...' : 'SUBMIT NOW'}
            </button>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Contact