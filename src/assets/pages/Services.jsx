import React, { useState } from 'react'
import { Section } from '../../components/layout/Section'
import { Card } from '../../components/ui/Card'
import { useNavigate } from 'react-router-dom'

const Services = () => {
  const [activeTab, setActiveTab] = useState('wellness')
  const navigate = useNavigate()

  const serviceData = {
    wellness: [
      {
        title: "Holistic Health Assessment",
        description: "Comprehensive evaluation based on Ayurvedic principles to identify your unique body constitution (dosha) and potential imbalances.",
        benefits: [
          "Personalized health profile",
          "Identification of root causes",
          "Customized treatment recommendations",
          "Preventive health strategies"
        ]
      },
      {
        title: "Rejuvenation Therapy",
        description: "Specialized treatments to restore vitality, improve energy levels, and enhance overall wellbeing using herbal formulations.",
        benefits: [
          "Increased energy and vitality",
          "Improved sleep quality",
          "Enhanced mental clarity",
          "Strengthened immunity"
        ]
      },
      {
        title: "Detoxification Programs",
        description: "Systematic cleansing protocols using herbal preparations to eliminate toxins and restore balanced body function.",
        benefits: [
          "Removal of accumulated toxins",
          "Improved digestion and metabolism",
          "Enhanced nutrient absorption",
          "Restored natural balance"
        ]
      }
    ],
    chronic: [
      {
        title: "Cardiovascular Health",
        description: "Specialized herbal protocols to support heart health and improve circulation using research-based formulations like Cardorium Plus.",
        benefits: [
          "Improved circulation",
          "Support for heart function",
          "Management of cholesterol levels",
          "Enhanced vascular health"
        ]
      },
      {
        title: "Metabolic Disorder Management",
        description: "Comprehensive approach to managing conditions like diabetes, thyroid disorders, and metabolic syndrome through herbal interventions.",
        benefits: [
          "Blood sugar regulation",
          "Hormonal balance support",
          "Weight management",
          "Reduced inflammation"
        ]
      },
      {
        title: "Joint and Musculoskeletal Care",
        description: "Specialized treatments for arthritis, joint pain, and musculoskeletal disorders using herbal formulations and therapeutic approaches.",
        benefits: [
          "Pain reduction",
          "Improved joint mobility",
          "Reduced inflammation",
          "Support for tissue repair"
        ]
      }
    ],
    specialized: [
      {
        title: "Respiratory Health",
        description: "Targeted herbal treatments for respiratory conditions, including allergies, asthma, and chronic respiratory issues.",
        benefits: [
          "Improved breathing capacity",
          "Reduced respiratory inflammation",
          "Management of allergy symptoms",
          "Strengthened respiratory immunity"
        ]
      },
      {
        title: "Neurological Support",
        description: "Herbal protocols designed to support brain health, cognitive function, and nervous system balance.",
        benefits: [
          "Enhanced cognitive function",
          "Stress reduction",
          "Improved sleep quality",
          "Neurological health support"
        ]
      },
      {
        title: "Digestive Health",
        description: "Comprehensive treatments for digestive disorders using specialized herbal formulations to restore gut health and function.",
        benefits: [
          "Improved digestion",
          "Relief from digestive discomfort",
          "Restored gut microbiome balance",
          "Enhanced nutrient absorption"
        ]
      }
    ],
    preventive: [
      {
        title: "Seasonal Health Programs",
        description: "Tailored herbal protocols to strengthen immunity and prepare the body for seasonal changes and challenges.",
        benefits: [
          "Enhanced seasonal immunity",
          "Prevention of common illnesses",
          "Adaptability to climate changes",
          "Maintained health balance throughout the year"
        ]
      },
      {
        title: "Lifestyle Optimization",
        description: "Personalized guidance on diet, daily routines, and lifestyle practices based on Ayurvedic principles and your unique constitution.",
        benefits: [
          "Improved energy management",
          "Enhanced work-life balance",
          "Optimized daily routines",
          "Prevention of lifestyle disorders"
        ]
      },
      {
        title: "Anti-Aging Protocols",
        description: "Specialized herbal treatments designed to slow the aging process and maintain youthful vigor and appearance.",
        benefits: [
          "Cellular rejuvenation",
          "Reduced oxidative stress",
          "Improved skin health",
          "Enhanced longevity factors"
        ]
      }
    ]
  }

  const scrollToContact = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-[#2F5A3D] text-white py-10.5 text-center">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-xl max-w-3xl mx-auto px-4">
          Comprehensive Ayurvedic and herbal treatments personalized for your unique health needs
        </p>
      </div>

      {/* Treatment Approach Section */}
      <Section className="py-16 bg-[#f8faf8]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#2F5A3D] text-center mb-4">Our Treatment Approach</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            At KALAGA Herbal Research Labs, Dr. KVGS Murthy combines traditional Ayurvedic wisdom with modern scientific research to provide evidence-based herbal treatments that address the root cause of health issues, not just the symptoms.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card
              title="Comprehensive Assessment"
              description="Each treatment plan begins with a thorough evaluation of your health history, current condition, and unique bodily constitution according to Ayurvedic principles."
              className="p-6 text-center"
            />
            <Card
              title="Personalized Formulation"
              description="Based on your assessment, Dr. Murthy creates customized herbal formulations specifically designed to address your health concerns and restore balance."
              className="p-6 text-center"
            />
            <Card
              title="Holistic Healing"
              description="Our treatment programs integrate herbal medicines with lifestyle modifications, dietary recommendations, and therapeutic practices for comprehensive care."
              className="p-6 text-center"
            />
          </div>
        </div>
      </Section>

      {/* Specialized Services Section */}
      <Section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#2F5A3D] text-center mb-4">Our Specialized Services</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Explore our range of treatments and therapies designed to address various health concerns through the power of traditional herbs and Ayurvedic principles.
          </p>
          
          {/* Service Categories Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12 bg-gray-100 p-2 rounded-lg">
            <button 
              onClick={() => setActiveTab('wellness')}
              className={`px-6 py-3 rounded-lg text-[#2F5A3D] transition-all duration-300 flex items-center gap-2 ${activeTab === 'wellness' ? 'bg-white shadow-md' : 'hover:bg-white/50'}`}
            >
              <span className="text-xl">❤</span> Wellness Treatments
            </button>
            <button 
              onClick={() => setActiveTab('chronic')}
              className={`px-6 py-3 rounded-lg text-[#2F5A3D] transition-all duration-300 flex items-center gap-2 ${activeTab === 'chronic' ? 'bg-white shadow-md' : 'hover:bg-white/50'}`}
            >
              <span className="text-xl">📊</span> Chronic Condition Management
            </button>
            <button 
              onClick={() => setActiveTab('specialized')}
              className={`px-6 py-3 rounded-lg text-[#2F5A3D] transition-all duration-300 flex items-center gap-2 ${activeTab === 'specialized' ? 'bg-white shadow-md' : 'hover:bg-white/50'}`}
            >
              <span className="text-xl">⚕</span> Specialized Therapies
            </button>
            <button 
              onClick={() => setActiveTab('preventive')}
              className={`px-6 py-3 rounded-lg text-[#2F5A3D] transition-all duration-300 flex items-center gap-2 ${activeTab === 'preventive' ? 'bg-white shadow-md' : 'hover:bg-white/50'}`}
            >
              <span className="text-xl">🛡</span> Preventive Care
            </button>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceData[activeTab].map((service, index) => (
              <Card
                key={index}
                title={service.title}
                description={service.description}
                className="p-6 border border-green-100 hover:border-green-200 transition-all duration-300"
              >
                <div className="mt-4">
                  <p className="text-[#2F5A3D] font-semibold mb-2">BENEFITS:</p>
                  <ul className="space-y-2">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">✓ {benefit}</li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Treatment Process Section */}
      <Section className="py-12 bg-[#f8faf8]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#2F5A3D] text-center mb-4">Our Treatment Process</h2>
          <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
            Experience a structured and effective healing journey with Dr. KVGS Murthy and KALAGA Herbal Research Labs.
          </p>
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#2F5A3D] opacity-20"></div>
            
            {/* Step 1 */}
            <div className="flex items-center mb-16">
              <div className="w-1/2 pr-12 text-right">
                <h3 className="font-semibold text-[#2F5A3D] text-xl mb-2">Initial Consultation</h3>
                <p className="text-gray-600">A comprehensive assessment of your health history, current conditions, and goals. Dr. Murthy evaluates your unique constitution according to Ayurvedic principles.</p>
              </div>
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-[#2F5A3D] text-white text-xl font-bold flex items-center justify-center z-10 relative">1</div>
              </div>
              <div className="w-1/2 pl-12"></div>
            </div>

            {/* Step 2 */}
            <div className="flex items-center mb-16">
              <div className="w-1/2 pr-12"></div>
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-[#2F5A3D] text-white text-xl font-bold flex items-center justify-center z-10 relative">2</div>
              </div>
              <div className="w-1/2 pl-12">
                <h3 className="font-semibold text-[#2F5A3D] text-xl mb-2">Personalized Treatment Plan</h3>
                <p className="text-gray-600">Based on your assessment, Dr. Murthy develops a customized treatment protocol including herbal formulations, dietary recommendations, and lifestyle adjustments.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center mb-16">
              <div className="w-1/2 pr-12 text-right">
                <h3 className="font-semibold text-[#2F5A3D] text-xl mb-2">Treatment Implementation</h3>
                <p className="text-gray-600">Begin your healing journey with specialized herbal formulations provided by KALAGA Herbal Research Labs, alongside guided lifestyle modifications.</p>
              </div>
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-[#2F5A3D] text-white text-xl font-bold flex items-center justify-center z-10 relative">3</div>
              </div>
              <div className="w-1/2 pl-12"></div>
            </div>

            {/* Step 4 */}
            <div className="flex items-center mb-16">
              <div className="w-1/2 pr-12"></div>
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-[#2F5A3D] text-white text-xl font-bold flex items-center justify-center z-10 relative">4</div>
              </div>
              <div className="w-1/2 pl-12">
                <h3 className="font-semibold text-[#2F5A3D] text-xl mb-2">Progress Monitoring</h3>
                <p className="text-gray-600">Regular follow-up consultations to assess your progress, adjust treatments as needed, and ensure optimal results on your path to wellness.</p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex items-center">
              <div className="w-1/2 pr-12 text-right">
                <h3 className="font-semibold text-[#2F5A3D] text-xl mb-2">Maintenance & Prevention</h3>
                <p className="text-gray-600">Once primary health goals are achieved, Dr. Murthy provides ongoing support with preventive care strategies to maintain optimal health and prevent recurrence.</p>
              </div>
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-[#2F5A3D] text-white text-xl font-bold flex items-center justify-center z-10 relative">5</div>
              </div>
              <div className="w-1/2 pl-12"></div>
            </div>
          </div>
        </div>
      </Section>

      {/* Begin Your Healing Journey Section */}
      <Section className="py-16 bg-gradient-to-br from-[#B8860B]  to-[#2F5A3D]">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Begin Your Healing Journey Today</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Experience the transformative power of Ayurvedic and herbal treatments personalized for your unique health needs by Dr. KVGS Murthy.
          </p>
         
         
        </div>
      </Section>
    </div>
  )
}

export default Services