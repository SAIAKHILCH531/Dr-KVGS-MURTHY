import React, { useState } from 'react'
import { Section } from '../../components/layout/Section'
import { useNavigate } from 'react-router-dom'

const Products = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('formulation')

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-[#2F5A3D] text-white py-14 text-center">
        <h1 className="text-4xl font-bold mb-4">Cardorium Plus</h1>
        <p className="text-xl max-w-3xl mx-auto px-4">
          Research-based poly-herbal formulation for improved circulation and heart health
        </p>
      </div>

      {/* Product Introduction */}
      <Section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-[#2F5A3D] mb-4">Advanced Herbal Formula for Cardiovascular Health</h2>
              <p className="text-gray-600 mb-6">
                Cardorium Plus is a scientifically formulated poly-herbal supplement developed by Dr. KVGS Murthy after years of research and clinical experience. This revolutionary product combines ancient Ayurvedic wisdom with modern scientific validation to create a comprehensive solution for cardiovascular function.
              </p>
              <p className="text-gray-600 mb-6">
                Unlike conventional supplements, Cardorium Plus addresses the root causes of circulatory issues through a synergistic blend of premium herbs that work together to strengthen the cardiovascular system and promote overall wellness.
              </p>
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
              <img src="/images/cardomax.jpg.png" alt="Cardorium Plus" className="max-w-[300px]" />
            </div>
          </div>
        </div>
      </Section>

      {/* Key Benefits */}
      <Section className="py-12 bg-[#f8faf8]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#2F5A3D] text-center mb-4">Key Benefits</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Cardorium Plus offers a comprehensive approach to cardiovascular health through its unique formulation of traditional herbs backed by scientific research.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-none mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm flex flex-col h-full justify-between">
              <div>
                <div className="text-[#2F5A3D] text-3xl mb-4">❤️</div>
                <h3 className="text-xl font-semibold text-[#2F5A3D] mb-3">Heart Health Support</h3>
                <p className="text-gray-600">Contains specialized herbs that help maintain healthy heart function and support overall cardiovascular health.</p>
              </div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm flex flex-col h-full justify-between">
              <div>
                <div className="text-[#2F5A3D] text-3xl mb-4">🔄</div>
                <h3 className="text-xl font-semibold text-[#2F5A3D] mb-3">Improved Circulation</h3>
                <p className="text-gray-600">Promotes blood flow throughout the body, helping to maintain healthy circulation while supporting the removal of waste products.</p>
              </div>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm flex flex-col h-full justify-between">
              <div>
                <div className="text-[#2F5A3D] text-3xl mb-4">🛡️</div>
                <h3 className="text-xl font-semibold text-[#2F5A3D] mb-3">Antioxidant Protection</h3>
                <p className="text-gray-600">Rich in natural antioxidants that help neutralize free radicals and support cellular health in the cardiovascular system.</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Product Details */}
      <Section className="py-12">
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
      </Section>

      {/* Testimonials */}
      <Section className="py-16 bg-white">
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
      </Section>

      {/* Call to Action */}
      <Section className="py-16 bg-gradient-to-br from-[#B8860B] to-[#2F5A3D]">
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
      </Section>
    </div>
  )
}

export default Products