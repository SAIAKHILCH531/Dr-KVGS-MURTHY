import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/config'

const Products = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('formulation')
  const [products, setProducts] = useState([])
  const [productContent, setProductContent] = useState({
    hero: {
      title: '',
      subtitle: ''
    },
    introduction: {
      title: '',
      description: [],
      image: ''
    },
    benefits: {
      title: '',
      subtitle: '',
      items: []
    },
    ingredients: {
      title: '',
      items: []
    },
    synergisticAction: {
      title: '',
      description: [],
      qualityAssurance: {
        title: '',
        description: ''
      }
    },
    usage: {
      title: '',
      dosage: {
        title: '',
        description: ''
      }
    }
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product content
        const docRef = doc(db, 'settings', 'product')
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
          setProductContent(docSnap.data())
        }

        // Fetch products list
        const productsCollectionRef = collection(db, 'products')
        const productsSnapshot = await getDocs(productsCollectionRef)
        const productsList = productsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setProducts(productsList)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      {/* Hero section */}
      <div className="bg-[#2F5A3D] text-white py-14 text-center">
        <h1 className="text-4xl font-bold mb-4">{productContent.hero.title}</h1>
        <p className="text-xl max-w-3xl mx-auto px-4">
          {productContent.hero.subtitle}
        </p>
      </div>

      {/* Products List Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#2F5A3D] mb-8 text-center">Our Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {product.image && (
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#2F5A3D] mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <button
                    onClick={() => navigate('/contact')}
                    className="bg-[#2F5A3D] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-all w-full"
                  >
                    Enquire Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Introduction */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="pl-0 md:pl-8 lg:pl-12">
              <h2 className="text-2xl font-bold text-[#2F5A3D] mb-4">{productContent.introduction.title}</h2>
              {productContent.introduction.description.map((paragraph, index) => (
                <p key={index} className="text-gray-600 mb-6">{paragraph}</p>
              ))}
              <div className="flex gap-4">
                <button
                  onClick={() => navigate('/contact')}
                  className="bg-[#2F5A3D] text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-all"
                >
                  Learn More
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="border border-[#2F5A3D] text-[#2F5A3D] px-6 py-2 rounded-md hover:bg-[#2F5A3D] hover:text-white transition-all"
                >
                  Contact for Purchase
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <img src={productContent.introduction.image} alt={productContent.hero.title} className="max-w-[300px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-12 bg-[#f8faf8]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#2F5A3D] text-center mb-4">{productContent.benefits.title}</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            {productContent.benefits.subtitle}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-none mx-auto px-4 sm:px-6 lg:px-8">
            {productContent.benefits.items.map((benefit, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm flex flex-col h-full justify-between">
                <div>
                  <div className="text-[#2F5A3D] text-3xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold text-[#2F5A3D] mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#2F5A3D] text-center mb-4">Product Details</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Learn more about Cardorium Plus and what makes it a revolutionary approach to cardiovascular health.
          </p>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('formulation')}
                className={`px-6 py-2 rounded-md transition-all ${activeTab === 'formulation' ? 'bg-white shadow-sm text-[#2F5A3D]' : 'text-gray-600'}`}
              >
                Formulation
              </button>
              <button
                onClick={() => setActiveTab('research')}
                className={`px-6 py-2 rounded-md transition-all ${activeTab === 'research' ? 'bg-white shadow-sm text-[#2F5A3D]' : 'text-gray-600'}`}
              >
                Research & Evidence
              </button>
              <button
                onClick={() => setActiveTab('usage')}
                className={`px-6 py-2 rounded-md transition-all ${activeTab === 'usage' ? 'bg-white shadow-sm text-[#2F5A3D]' : 'text-gray-600'}`}
              >
                Usage Guidelines
              </button>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            {activeTab === 'formulation' && (
              <div>
                <h3 className="text-2xl font-bold text-[#2F5A3D] mb-6">Key Ingredients</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-[#2F5A3D] mb-3">Arjuna Bark</h4>
                    <p className="text-gray-600">Strengthens heart muscles and supports cardiovascular function</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-[#2F5A3D] mb-3">Ashwagandha</h4>
                    <p className="text-gray-600">Reduces stress and supports heart health</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-[#2F5A3D] mb-3">Hawthorn Berry</h4>
                    <p className="text-gray-600">Improves blood flow and heart function</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-[#2F5A3D] mb-3">Saffron</h4>
                    <p className="text-gray-600">Antioxidant properties that protect heart tissue</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-[#2F5A3D] mb-3">Guduchi</h4>
                    <p className="text-gray-600">Boosts immunity and has anti-inflammatory properties</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-[#2F5A3D] mb-3">Other select herbs</h4>
                    <p className="text-gray-600">Combined to create a synergistic effect for optimal cardiovascular support</p>
                  </div>
                </div>

                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-[#2F5A3D] mb-6">Synergistic Action</h3>
                  <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                    <p className="text-gray-600 mb-4">
                      Cardorium Plus is formulated based on the principles of synergistic herb combining, where each ingredient enhances the effectiveness of others. This approach is deeply rooted in traditional Ayurvedic practices and validated through modern research.
                    </p>
                    <p className="text-gray-600">
                      The careful selection and precise proportions of each herb ensure maximum bioavailability and therapeutic effect, creating a formulation that's greater than the sum of its parts.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-[#2F5A3D] mb-3">Quality Assurance</h4>
                    <p className="text-gray-600">
                      All herbs in Cardorium Plus are sourced from sustainable, quality-controlled suppliers and undergo rigorous testing for purity and potency before formulation.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'research' && (
              <div>
                <h3 className="text-2xl font-bold text-[#2F5A3D] mb-6">Synergistic Action</h3>
                <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                  <p className="text-gray-600 mb-4">
                    Cardorium Plus is formulated based on the principles of synergistic herb combining, where each ingredient enhances the effectiveness of others. This approach is heavily rooted in traditional Ayurvedic principles and validated through modern research.
                  </p>
                  <p className="text-gray-600">
                    The combined effects are carefully proportioned to scale both direct physical effects and complementary biochemical effects, creating a formulation that is greater than the sum of its parts.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-[#2F5A3D] mb-3">Quality Assurance</h4>
                  <p className="text-gray-600">
                    All herbs in Cardorium Plus are sourced from reputable suppliers, strictly certified organic farms and undergo rigorous testing for purity and potency before processing.
                  </p>
                </div>
              </div>
            )}
            {activeTab === 'usage' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-[#2F5A3D] mb-6">Recommended Usage</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-[#2F5A3D] mb-2">Dosage</h4>
                        <p className="text-gray-600">1 capsule twice daily after meals, or as directed by your healthcare practitioner.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-[#2F5A3D] mb-2">Duration</h4>
                        <p className="text-gray-600">For optimal results, a minimum course of 3 months is recommended, with ongoing maintenance doses as needed.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-[#2F5A3D] mb-2">Best Practices</h4>
                        <p className="text-gray-600">Take with warm water. For enhanced benefits, maintain a heart-healthy diet and regular exercise routine during the course of treatment.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-[#2F5A3D] mb-2">Storage Instructions</h4>
                    <p className="text-gray-600">Store in a cool, dry place away from direct sunlight. Keep the container tightly closed when not in use to preserve potency.</p>
                  </div>
                </div>
                
                {/* Right Column */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-[#2F5A3D] mb-6">Important Information</h3>
                    
                    <div className="bg-[#fff3e0] border-l-4 border-[#B8860B] p-4 mb-6">
                      <h4 className="font-semibold text-[#B8860B] mb-2">Consult a Professional</h4>
                      <p className="text-gray-600">While Cardorium Plus is a natural herbal formulation, it's advisable to consult with a healthcare practitioner before starting any new supplement regimen, especially if you have existing health conditions or are taking medications.</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-[#2F5A3D] mb-4">Who Can Benefit</h4>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-2">
                          <span className="text-[#2F5A3D]">✓</span>
                          <span className="text-gray-600">Adults concerned about cardiovascular health</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-[#2F5A3D]">✓</span>
                          <span className="text-gray-600">Individuals seeking natural support for circulation</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-[#2F5A3D]">✓</span>
                          <span className="text-gray-600">Those looking to complement their heart-healthy lifestyle</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#2F5A3D] text-center mb-4">What People Are Saying</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Hear from those who have experienced the benefits of Cardorium Plus
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-none mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 rounded-lg flex flex-col h-full shadow-lg border border-gray-100">
              <blockquote className="text-gray-700 mb-6 flex-grow">
                "After using Cardorium Plus for three months, my circulation has improved significantly and my blood pressure readings are more stable."
              </blockquote>
              <div>
                <p className="text-[#B8860B] font-semibold mb-1">- Rajesh K.</p>
                <p className="text-gray-500">Hyderabad</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg flex flex-col h-full shadow-lg border border-gray-100">
              <blockquote className="text-gray-700 mb-6 flex-grow">
                "I've been using this formulation for over a year now, and my energy levels have improved significantly. I feel much more active throughout the day."
              </blockquote>
              <div>
                <p className="text-[#B8860B] font-semibold mb-1">- Priya S.</p>
                <p className="text-gray-500">Bangalore</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg flex flex-col h-full shadow-lg border border-gray-100">
              <blockquote className="text-gray-700 mb-6 flex-grow">
                "Dr. Murthy's Cardorium Plus has made a noticeable difference in my daily life. My heart health readings have improved, and I feel more energetic."
              </blockquote>
              <div>
                <p className="text-[#B8860B] font-semibold mb-1">- Mohan V.</p>
                <p className="text-gray-500">Chennai</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-[#B8860B] to-[#2F5A3D]">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Experience the Benefits of Cardorium Plus</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Take the first step toward improved cardiovascular health with this revolutionary herbal formulation developed by Dr. KVGS Murthy.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate('/contact')}
              className="bg-white text-[#2F5A3D] px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300"
            >
              Contact for Purchase
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#2F5A3D] transition-all duration-300"
            >
              Request More Information
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Products