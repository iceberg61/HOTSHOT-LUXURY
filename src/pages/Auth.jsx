import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Auth() {
  const [mode, setMode] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const validate = () => {
    const newErrors = {}
    if (mode === 'register') {
      if (!form.firstName) newErrors.firstName = 'Required'
      if (!form.lastName) newErrors.lastName = 'Required'
      if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    }
    if (!form.email) newErrors.email = 'Required'
    if (!form.password) newErrors.password = 'Required'
    if (form.password && form.password.length < 6) newErrors.password = 'Min 6 characters'
    return newErrors
  }

  const handleSubmit = () => {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/')
    }, 1500)
  }

  const inputClass = (field) =>
    `w-full bg-zinc-900 border text-white text-xs px-4 py-3 tracking-wider placeholder-zinc-600 focus:outline-none transition-colors ${
      errors[field] ? 'border-red-500' : 'border-zinc-800 focus:border-red-500'
    }`

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative bg-zinc-950 border-b border-zinc-900 pt-24 pb-10 px-4 overflow-hidden">
        <div className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden">
          <p className="text-zinc-900 text-[5rem] md:text-[10rem] font-black uppercase tracking-widest opacity-40 whitespace-nowrap">
            {mode === 'login' ? 'LOGIN' : 'REGISTER'}
          </p>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <h1 className="text-white text-4xl sm:text-5xl md:text-7xl font-black uppercase leading-tight">
            {mode === 'login' ? (
              <>Welcome <span className="text-red-500">Back</span></>
            ) : (
              <>Create <span className="text-red-500">Account</span></>
            )}
          </h1>
          <div className="flex items-center gap-2 mt-3">
            <Link to="/" className="text-red-500 text-xs tracking-widest uppercase hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-zinc-600 text-xs">»</span>
            <span className="text-zinc-400 text-xs tracking-widest uppercase">
              {mode === 'login' ? 'Login' : 'Register'}
            </span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-md">

          {/* Toggle */}
          <div className="flex mb-6 border border-zinc-800">
            <button
              onClick={() => { setMode('login'); setErrors({}) }}
              className={`flex-1 py-3 text-xs tracking-widest uppercase transition-all duration-300 ${
                mode === 'login' ? 'bg-red-500 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => { setMode('register'); setErrors({}) }}
              className={`flex-1 py-3 text-xs tracking-widest uppercase transition-all duration-300 ${
                mode === 'register' ? 'bg-red-500 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-3">

            {/* Register only — name fields — stacked on mobile */}
            {mode === 'register' && (
              <>
                <div>
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="First Name *"
                    className={inputClass('firstName')}
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Last Name *"
                    className={inputClass('lastName')}
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address *"
                className={inputClass('email')}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                placeholder="Password *"
                className={inputClass('password')}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            {mode === 'register' && (
              <div className="relative">
                <input
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password *"
                  className={inputClass('confirmPassword')}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            {/* Forgot Password */}
            {mode === 'login' && (
              <div className="text-right">
                <Link to="/forgot-password" className="text-zinc-500 text-xs tracking-wider hover:text-red-500 transition-colors">
                    Forgot Password?
                </Link>
              </div>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full text-xs tracking-[0.3em] uppercase py-4 transition-all duration-300 mt-1 ${
                loading
                  ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              {loading
                ? 'Please wait...'
                : mode === 'login' ? 'Login' : 'Create Account'
              }
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px bg-zinc-800" />
              <span className="text-zinc-600 text-xs tracking-widest uppercase">or</span>
              <div className="flex-1 h-px bg-zinc-800" />
            </div>

            {/* Switch mode */}
            <p className="text-zinc-500 text-xs tracking-wider text-center">
              {mode === 'login' ? (
                <>Don't have an account?{' '}
                  <button
                    onClick={() => { setMode('register'); setErrors({}) }}
                    className="text-red-500 hover:text-white transition-colors"
                  >
                    Register here
                  </button>
                </>
              ) : (
                <>Already have an account?{' '}
                  <button
                    onClick={() => { setMode('login'); setErrors({}) }}
                    className="text-red-500 hover:text-white transition-colors"
                  >
                    Login here
                  </button>
                </>
              )}
            </p>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Auth