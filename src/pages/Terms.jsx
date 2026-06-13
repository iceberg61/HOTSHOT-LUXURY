import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

function Terms() {
  const sections = [
    {
      title: 'Acceptance of Terms',
      content: 'By accessing and using the Hotshot Luxury website, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website.'
    },
    {
      title: 'Products and Pricing',
      content: 'All products are subject to availability. We reserve the right to discontinue any product at any time. Prices are listed in USD and are subject to change without notice. We reserve the right to refuse or cancel any order if the product is listed at an incorrect price.'
    },
    {
      title: 'Orders and Payment',
      content: 'By placing an order, you confirm that the information provided is accurate and complete. Payment must be received before your order is processed. We accept payment via card and bank transfer through Flutterwave. All transactions are secure and encrypted.'
    },
    {
      title: 'Shipping',
      content: 'We ship to addresses within Nigeria and select international destinations. Shipping times and costs vary by location and will be calculated at checkout. We are not responsible for delays caused by customs, weather, or other circumstances beyond our control.'
    },
    {
      title: 'Intellectual Property',
      content: 'All content on this website, including logos, images, text, and designs, is the property of Hotshot Luxury and is protected by intellectual property laws. You may not reproduce, distribute, or use our content without written permission.'
    },
    {
      title: 'Limitation of Liability',
      content: 'Hotshot Luxury shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website or products. Our liability is limited to the amount paid for the product in question.'
    },
    {
      title: 'Governing Law',
      content: 'These Terms and Conditions are governed by the laws of the Federal Republic of Nigeria. Any disputes arising from these terms shall be resolved in the courts of Nigeria.'
    },
    {
      title: 'Changes to Terms',
      content: 'We reserve the right to update these Terms and Conditions at any time. Changes will be posted on this page with an updated revision date. Your continued use of our website constitutes acceptance of the updated terms.'
    },
  ]

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <SEO title="Terms & Conditions" url="/terms" />
      <Navbar />

      <div className="relative bg-zinc-950 border-b border-zinc-900 pt-24 pb-10 px-4 sm:px-8 overflow-hidden">
        <div className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden">
          <p className="text-zinc-900 text-[4rem] sm:text-[8rem] font-black uppercase tracking-widest opacity-40 whitespace-nowrap">
            TERMS
          </p>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <h1 className="text-white text-4xl sm:text-6xl font-black uppercase">
            Terms & <span className="text-red-500">Conditions</span>
          </h1>
          <div className="flex items-center gap-2 mt-4">
            <Link to="/" className="text-red-500 text-xs tracking-widest uppercase hover:text-white transition-colors">Home</Link>
            <span className="text-zinc-600 text-xs">»</span>
            <span className="text-zinc-400 text-xs tracking-widest uppercase">Terms & Conditions</span>
          </div>
          <p className="text-zinc-500 text-xs tracking-wider mt-4">Last updated: June 2026</p>
        </div>
      </div>

      <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-8 py-16">
        <p className="text-zinc-400 text-sm tracking-wider leading-relaxed mb-12">
          Please read these Terms and Conditions carefully before using the Hotshot Luxury website. These terms govern your use of our website and purchase of our products.
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

export default Terms