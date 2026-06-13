import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

function PrivacyPolicy() {
  const sections = [
    {
      title: 'Information We Collect',
      content: 'We collect information you provide directly to us, such as when you create an account, place an order, or contact us. This includes your name, email address, phone number, shipping address, and payment information. We also collect information automatically when you use our website, including your IP address, browser type, and browsing behavior.'
    },
    {
      title: 'How We Use Your Information',
      content: 'We use the information we collect to process your orders, send order confirmations and shipping updates, respond to your inquiries, send marketing communications (with your consent), improve our website and services, and comply with legal obligations.'
    },
    {
      title: 'Information Sharing',
      content: 'We do not sell or rent your personal information to third parties. We may share your information with service providers who assist us in operating our website and conducting our business, such as payment processors and shipping companies. These parties are obligated to keep your information confidential.'
    },
    {
      title: 'Payment Security',
      content: 'All payment transactions are processed through Flutterwave, a secure payment gateway. We do not store your full card details on our servers. All transactions are encrypted using SSL technology.'
    },
    {
      title: 'Cookies',
      content: 'We use cookies to enhance your experience on our website. Cookies help us remember your preferences, understand how you use our site, and provide relevant content. You can control cookie settings through your browser preferences.'
    },
    {
      title: 'Your Rights',
      content: 'You have the right to access, update, or delete your personal information at any time. You can do this by logging into your account or contacting us directly. You also have the right to opt out of marketing communications at any time.'
    },
    {
      title: 'Data Retention',
      content: 'We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. Order information is retained for 7 years for accounting purposes.'
    },
    {
      title: 'Contact Us',
      content: 'If you have any questions about this Privacy Policy, please contact us at hotshotluxury@info.com or through our contact page.'
    },
  ]

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <SEO title="Privacy Policy" url="/privacy-policy" />
      <Navbar />

      <div className="relative bg-zinc-950 border-b border-zinc-900 pt-24 pb-10 px-4 sm:px-8 overflow-hidden">
        <div className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden">
          <p className="text-zinc-900 text-[4rem] sm:text-[8rem] font-black uppercase tracking-widest opacity-40 whitespace-nowrap">
            PRIVACY
          </p>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <h1 className="text-white text-4xl sm:text-6xl font-black uppercase">
            Privacy <span className="text-red-500">Policy</span>
          </h1>
          <div className="flex items-center gap-2 mt-4">
            <Link to="/" className="text-red-500 text-xs tracking-widest uppercase hover:text-white transition-colors">Home</Link>
            <span className="text-zinc-600 text-xs">»</span>
            <span className="text-zinc-400 text-xs tracking-widest uppercase">Privacy Policy</span>
          </div>
          <p className="text-zinc-500 text-xs tracking-wider mt-4">Last updated: June 2026</p>
        </div>
      </div>

      <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-8 py-16">
        <p className="text-zinc-400 text-sm tracking-wider leading-relaxed mb-12">
          At Hotshot Luxury, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website or make a purchase.
        </p>
        <div className="flex flex-col gap-10">
          {sections.map((section, i) => (
            <div key={i} className="border-b border-zinc-900 pb-10">
              <h2 className="text-white text-sm font-black uppercase tracking-wider mb-4">
                {i + 1}. {section.title}
              </h2>
              <p className="text-zinc-400 text-sm tracking-wider leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default PrivacyPolicy