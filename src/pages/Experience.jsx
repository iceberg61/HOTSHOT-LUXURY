import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Experience() {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xs tracking-[0.4em] uppercase mb-4">Coming Soon</p>
          <h1 className="text-white text-6xl font-black uppercase">The Experience</h1>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Experience