import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function ForgotPassword() {
  const [step, setStep] = useState('email') // email → otp → reset → done
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [passwords, setPasswords] = useState({ password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const inputClass = (field) =>
    `w-full bg-zinc-900 border text-white text-xs px-4 py-4 tracking-wider placeholder-zinc-600 focus:outline-none transition-colors ${
      errors[field] ? 'border-red-500' : 'border-zinc-800 focus:border-red-500'
    }`

  // Step 1 — Submit email
  const handleEmailSubmit = () => {
    if (!email) { setErrors({ email: 'Required' }); return }
    if (!/\S+@\S+\.\S+/.test(email)) { setErrors({ email: 'Invalid email' }); return }
    setLoading(true)
    setTimeout(() => { setLoading(false); setStep('otp') }, 1500)
  }

  // Step 2 — OTP input
  const handleOtpChange = (value, index) => {
    const newOtp = [...otp]
    newOtp[index] = value.replace(/\D/, '')
    setOtp(newOtp)
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus()
    }
  }

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus()
    }
  }

  const handleOtpSubmit = () => {
    if (otp.join('').length < 6) { setErrors({ otp: 'Enter all 6 digits' }); return }
    setLoading(true)
    setTimeout(() => { setLoading(false); setStep('reset') }, 1500)
  }

  // Step 3 — New password
  const handleResetSubmit = () => {
    const newErrors = {}
    if (!passwords.password) newErrors.password = 'Required'
    if (passwords.password.length < 6) newErrors.password = 'Min 6 characters'
    if (!passwords.confirm) newErrors.confirm = 'Required'
    if (passwords.password !== passwords.confirm) newErrors.confirm = 'Passwords do not match'
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }
    setLoading(true)
    setTimeout(() => { setLoading(false); setStep('done') }, 1500)
  }

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative bg-zinc-950 border-b border-zinc-900 pt-24 pb-10 px-4 overflow-hidden">
        <div className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden">
          <p className="text-zinc-900 text-[5rem] md:text-[10rem] font-black uppercase tracking-widest opacity-40 whitespace-nowrap">
            PASSWORD
          </p>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <h1 className="text-white text-4xl sm:text-5xl md:text-7xl font-black uppercase leading-tight">
            Reset <span className="text-red-500">Password</span>
          </h1>
          <div className="flex items-center gap-2 mt-3">
            <Link to="/" className="text-red-500 text-xs tracking-widest uppercase hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-zinc-600 text-xs">»</span>
            <Link to="/login" className="text-red-500 text-xs tracking-widest uppercase hover:text-white transition-colors">
              Login
            </Link>
            <span className="text-zinc-600 text-xs">»</span>
            <span className="text-zinc-400 text-xs tracking-widest uppercase">Reset Password</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">

          {/* Step indicators */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {['email', 'otp', 'reset', 'done'].map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-6 h-6 flex items-center justify-center text-xs font-black transition-all duration-300 ${
                  step === s
                    ? 'bg-red-500 text-white'
                    : ['email', 'otp', 'reset', 'done'].indexOf(step) > i
                    ? 'bg-green-600 text-white'
                    : 'bg-zinc-800 text-zinc-600'
                }`}>
                  {['email', 'otp', 'reset', 'done'].indexOf(step) > i ? '✓' : i + 1}
                </div>
                {i < 3 && <div className={`w-8 h-px ${['email', 'otp', 'reset', 'done'].indexOf(step) > i ? 'bg-green-600' : 'bg-zinc-800'}`} />}
              </div>
            ))}
          </div>

          {/* Step 1 — Email */}
          {step === 'email' && (
            <div className="flex flex-col gap-4">
              <div className="text-center mb-4">
                <h2 className="text-white text-lg font-black uppercase tracking-wider mb-2">
                  Forgot Password?
                </h2>
                <p className="text-zinc-500 text-xs tracking-wider leading-relaxed">
                  Enter your email and we'll send you a reset code.
                </p>
              </div>
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors({}) }}
                  placeholder="Email Address *"
                  className={inputClass('email')}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <button
                onClick={handleEmailSubmit}
                disabled={loading}
                className={`w-full text-xs tracking-[0.3em] uppercase py-4 transition-all duration-300 ${
                  loading ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed' : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                {loading ? 'Sending Code...' : 'Send Reset Code'}
              </button>
              <Link to="/login" className="text-zinc-500 text-xs tracking-wider text-center hover:text-red-500 transition-colors">
                ← Back to Login
              </Link>
            </div>
          )}

          {/* Step 2 — OTP */}
          {step === 'otp' && (
            <div className="flex flex-col gap-4">
              <div className="text-center mb-4">
                <h2 className="text-white text-lg font-black uppercase tracking-wider mb-2">
                  Enter Code
                </h2>
                <p className="text-zinc-500 text-xs tracking-wider leading-relaxed">
                  We sent a 6-digit code to <span className="text-red-500">{email}</span>
                </p>
              </div>

              {/* OTP boxes */}
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    className={`w-10 h-12 sm:w-12 sm:h-14 text-center bg-zinc-900 border text-white text-lg font-black focus:outline-none transition-colors ${
                      digit ? 'border-red-500' : 'border-zinc-800 focus:border-red-500'
                    }`}
                  />
                ))}
              </div>
              {errors.otp && <p className="text-red-500 text-xs text-center">{errors.otp}</p>}

              <button
                onClick={handleOtpSubmit}
                disabled={loading}
                className={`w-full text-xs tracking-[0.3em] uppercase py-4 transition-all duration-300 ${
                  loading ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed' : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                {loading ? 'Verifying...' : 'Verify Code'}
              </button>

              <button
                onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 1000) }}
                className="text-zinc-500 text-xs tracking-wider text-center hover:text-red-500 transition-colors"
              >
                Didn't get the code? Resend
              </button>
            </div>
          )}

          {/* Step 3 — New Password */}
          {step === 'reset' && (
            <div className="flex flex-col gap-4">
              <div className="text-center mb-4">
                <h2 className="text-white text-lg font-black uppercase tracking-wider mb-2">
                  New Password
                </h2>
                <p className="text-zinc-500 text-xs tracking-wider">
                  Choose a strong password for your account.
                </p>
              </div>
              <div>
                <input
                  type="password"
                  placeholder="New Password *"
                  value={passwords.password}
                  onChange={(e) => { setPasswords({ ...passwords, password: e.target.value }); setErrors({}) }}
                  className={inputClass('password')}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Confirm Password *"
                  value={passwords.confirm}
                  onChange={(e) => { setPasswords({ ...passwords, confirm: e.target.value }); setErrors({}) }}
                  className={inputClass('confirm')}
                />
                {errors.confirm && <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>}
              </div>
              <button
                onClick={handleResetSubmit}
                disabled={loading}
                className={`w-full text-xs tracking-[0.3em] uppercase py-4 transition-all duration-300 ${
                  loading ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed' : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          )}

          {/* Step 4 — Done */}
          {step === 'done' && (
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="w-16 h-16 bg-green-600 flex items-center justify-center">
                <span className="text-white text-2xl">✓</span>
              </div>
              <div>
                <h2 className="text-white text-lg font-black uppercase tracking-wider mb-2">
                  Password Updated!
                </h2>
                <p className="text-zinc-500 text-xs tracking-wider leading-relaxed">
                  Your password has been reset successfully. You can now login with your new password.
                </p>
              </div>
              <Link
                to="/login"
                className="w-full bg-red-500 text-white text-xs tracking-[0.3em] uppercase py-4 text-center hover:bg-red-600 transition-all duration-300"
              >
                Back to Login
              </Link>
            </div>
          )}

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ForgotPassword