import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Collection from '../components/Collection'
import ProductGrid from '../components/ProductGrid'
import CTA from '../components/CTA'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

function Home() {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <SEO
        title="Home"
        description="Where high-octane attitude meets timeless luxury. Shop limited drops and exclusive streetwear."
        url="/"
      />
      <Navbar />
      <Hero />
      <Collection />
      <ProductGrid />
      <CTA />
      <Footer />
    </div>
  )
}

export default Home

