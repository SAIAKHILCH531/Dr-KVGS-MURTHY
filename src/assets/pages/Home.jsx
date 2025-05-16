import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../../components/ui/button"


const HeroSection = () => {
  return (
    <div className="min-h-screen bg-[#f3f9f3]">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center relative overflow-hidden perspective">
        {/* Background Parallax Layers */}
        <div className="absolute inset-0 w-full h-full">
          <div 
            className="absolute inset-0 w-full h-full bg-[url('/images/homepagebg.jpg')] bg-cover bg-center bg-no-repeat transform translate-y-[-10%]"
            style={{ transform: 'translateZ(-10px) scale(2)' }}
          />
          <div 
            className="absolute inset-0 w-full h-full bg-[url('/images/homepagebg2.jpeg')] bg-cover bg-center bg-no-repeat transform translate-y-[-5%]"
            style={{ transform: 'translateZ(-5px) scale(1.5)' }}
          />
          <div 
            className="absolute inset-0 w-full h-full bg-[url('/images/homepagebg1.webp')] bg-cover bg-center bg-no-repeat"
            style={{ transform: 'translateZ(0) scale(1)' }}
          />
        </div>
        
        {/* Gradient Overlay with adjusted opacity */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2F5A3D]/50 to-[#6B4D3D]/50 z-10" />
        
        {/* Sliding Background Images */}
        <div className="absolute inset-0 animate-slideshow">
          <div className="absolute inset-0 bg-[url('/images/homepagebg.jpg')] bg-cover bg-center bg-no-repeat transition-opacity duration-1000 opacity-100" />
          <div className="absolute inset-0 bg-[url('/images/homepagebg2.jpeg')] bg-cover bg-center bg-no-repeat transition-opacity duration-1000 opacity-0" />
          <div className="absolute inset-0 bg-[url('/images/homepagebg1.webp')] bg-cover bg-center bg-no-repeat transition-opacity duration-1000 opacity-0" />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2F5A3D]/60 to-[#6B4D3D]/60 z-10" />
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl ml-8 md:ml-16 lg:ml-24">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-lg">
              Dr. KVGS Murthy
            </h1>
            <p className="text-xl md:text-2xl text-white mb-6 drop-shadow-md">
              Expert in Allopathic Integrated of Ayurvedic and Herbal 
            </p>
            <p className="text-lg text-white/90 mb-8 max-w-2xl drop-shadow-sm">
              Pioneering research-based herbal formulations through KALAGA Herbal Research Labs to enhance human health and wellbeing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-transparent text-gray border-white hover:bg-white/10 px-6 py-3 rounded-md shadow-lg hover:shadow-xl transition-all"
              >
                <Link to="/about" className="inline-flex items-center">
                  Learn More About Dr. Murthy
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="bg-white text-green border-white hover:bg-white px-6 py-3 rounded-md shadow-lg hover:shadow-xl transition-all"
              >
                <Link to="/contact">
                  Book Appointment
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 bg-[#f3f9f3]">
        <div className="container mx-auto px-4 w-full">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-[#2F5A3D]">Welcome to Dr. KVGS Murthy's </span>
              <span className="text-[#B8860B]">Official Portfolio</span>
            </h2>
            <p className="text-[#4b6c4b] text-lg mb-12">
              Discover how Dr. Murthy's expertise in allopathic integrated of Ayurvedic and herbal medicine is transforming healthcare through research, innovation, and compassionate service.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
              <div className="p-6 bg-white rounded-lg shadow-sm text-center">
                <div className="text-[#2F5A3D] text-3xl mb-4">💻</div>
                <h3 className="text-xl font-semibold text-[#2F5A3D] mb-2">Expert in Ayurveda</h3>
                <p className="text-[#4b6c4b] text-sm">
                  Combining modern medical knowledge with traditional Ayurvedic principles for holistic healthcare.
                </p>
                <Link to="/about" className="text-[#2F5A3D] hover:text-[#4a8a5e] mt-4 inline-flex items-center">
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm text-center">
                <div className="text-[#B8860B] text-3xl mb-4">📦</div>
                <h3 className="text-xl font-semibold text-[#2F5A3D] mb-2">Cardorium Plus</h3>
                <p className="text-[#4b6c4b] text-sm">
                  Research-based poly-herbal formulation to improve circulation and daily health.
                </p>
                <Link to="/products" className="text-[#2F5A3D] hover:text-[#4a8a5e] mt-4 inline-flex items-center">
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm text-center">
                <div className="text-[#2F5A3D] text-3xl mb-4">💚</div>
                <h3 className="text-xl font-semibold text-[#2F5A3D] mb-2">Specialized Treatments</h3>
                <p className="text-[#4b6c4b] text-sm">
                  Personalized herbal treatments addressing various health concerns through KALAGA Herbal Research Labs.
                </p>
                <Link to="/services" className="text-[#2F5A3D] hover:text-[#4a8a5e] mt-4 inline-flex items-center">
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm text-center">
                <div className="text-[#B8860B] text-3xl mb-4">🤝</div>
                <h3 className="text-xl font-semibold text-[#2F5A3D] mb-2">Social Initiatives</h3>
                <p className="text-[#4b6c4b] text-sm">
                  Active involvement in community service through GENOME Foundation and temple charity programs.
                </p>
                <Link to="/social-services" className="text-[#2F5A3D] hover:text-[#4a8a5e] mt-4 inline-flex items-center">
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cardorium Plus Section */}
      <section className="py-16 bg-[#2F5A3D] text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold mb-4">Introducing Cardorium Plus</h2>
              <p className="text-lg">
                A groundbreaking research-based poly-herbal formulation developed by Dr. KVGS Murthy to improve circulation and support overall health. Backed by extensive research and clinical evidence.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="text-[#B8860B]">•</span>
                  Enhances circulation and heart health
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#B8860B]">•</span>
                  Natural herbal ingredients
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#B8860B]">•</span>
                  Evidence-based formulation
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#B8860B]">•</span>
                  Developed after years of research
                </li>
              </ul>
              <Button 
                asChild 
                className="bg-[#B8860B] hover:bg-[#B8860B]/90 text-white mt-4 inline-flex items-center"
              >
                <Link to="/products" className="inline-flex items-center">
                  Discover Cardorium Plus
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="bg-[#FFEB3B] p-6 rounded-lg shadow-lg max-w-md mx-auto">
                <img 
                  src="/images/cardomax.jpg.png" 
                  alt="Cardorium Plus Product with KALAGA Herbal Research Labs Logo" 
                  className="w-full h-auto rounded max-w-[80%] mx-auto" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Affiliations Section */}
      <section className="py-16 bg-[#f3f9f3]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-semibold text-[#2F5A3D] mb-4">Affiliations & Initiatives</h2>
            <p className="text-[#4b6c4b] text-lg mb-12">
              Dr. KVGS Murthy is associated with prestigious organizations and social initiatives dedicated to advancing healthcare and community wellbeing.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-white rounded-lg shadow-sm">
                <div className="flex items-center justify-center mb-6">
                  <img 
                    src="/images/genome-foundation.png.png" 
                    alt="GENOME Foundation" 
                    className="h-24 w-auto object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-[#2F5A3D] mb-4">GENOME Foundation</h3>
                <p className="text-[#4b6c4b] mb-4">
                  Dr. Murthy is an active member of GENOME Foundation, contributing to healthcare initiatives and research for the betterment of society.
                </p>
                <Link to="/social-services" className="text-[#2F5A3D] hover:text-[#4a8a5e] inline-flex items-center">
                  Learn About His Contributions <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              <div className="p-8 bg-white rounded-lg shadow-sm">
                <div className="flex items-center justify-center mb-6">
                  <div className="h-16 w-16 bg-[#2F5A3D]/10 rounded-full flex items-center justify-center">
                    <span className="text-4xl text-[#2F5A3D]">🕉️</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-[#2F5A3D] mb-4">Temple Charity Services</h3>
                <p className="text-[#4b6c4b] mb-4">
                  Dedicated to serving the community through temple charity initiatives, providing healthcare services to those in need.
                </p>
                <Link to="/social-services" className="text-[#2F5A3D] hover:text-[#4a8a5e] inline-flex items-center animate-pulse hover:animate-none">
                  Explore Charitable Work <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 bg-gradient-to-br from-[#2F5A3D] to-[#6B4D3D] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-6">Experience Holistic Healthcare</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Discover the benefits of Dr. KVGS Murthy's expertise in Allopathic Integrated in Ayurvedic and herbal medicine. Schedule a consultation today.
          </p>
          <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="bg-white text-green border-white hover:bg-white px-6 py-3 rounded-md shadow-lg hover:shadow-xl transition-all"
              >
                <Link to="/contact">
                  Contact Dr Murthy
                </Link>
              </Button>
        </div>
      </section>
    </div>
  )
}

export default HeroSection