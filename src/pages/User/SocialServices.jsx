import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'

const SocialServices = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('genome')
  const [content, setContent] = useState({
    hero: {
      title: 'Social Services',
      subtitle: 'Making a Difference in Our Community'
    },
    intro: {
      title: 'Our Social Initiatives',
      description: 'Dedicated to community welfare and healthcare accessibility'
    },
    genome: {
      title: 'GENOME Foundation',
      description: 'Advancing healthcare through research and community service',
      about: 'Committed to healthcare innovation and accessibility',
      contribution: 'Making healthcare accessible to all',
      activities: [
        { title: 'Healthcare Outreach', description: 'Community health programs', impact: 'Improved healthcare access' },
        { title: 'Health Education', description: 'Public health awareness', impact: 'Enhanced health literacy' },
        { title: 'Research Collaboration', description: 'Medical research partnerships', impact: 'Advanced treatment options' }
      ]
    },
    temple: {
      title: 'Temple Charity Services',
      description: 'Serving the community through traditional healing',
      quote: 'Healing through tradition, serving with compassion',
      initiatives: [
        { title: 'Free Ayurvedic Clinics', description: 'Free healthcare services', impact: 'Community wellness' },
        { title: 'Elderly Care Program', description: 'Supporting senior citizens', impact: 'Enhanced elderly care' },
        { title: 'Community Wellness Initiatives', description: 'Holistic health programs', impact: 'Improved community health' }
      ]
    },
    events: [
      { title: 'Health Camp', date: 'Upcoming', location: 'Local Community Center', description: 'Free health checkups' },
      { title: 'Wellness Workshop', date: 'Monthly', location: 'Temple Premises', description: 'Health education' },
      { title: 'Community Service', date: 'Weekly', location: 'Various Locations', description: 'Outreach programs' }
    ]
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const docRef = doc(db, 'social_services', 'content')
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        setContent(docSnap.data())
      }
    } catch (error) {
      console.error('Error fetching content:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>
  }

  return (
    <div>
      {/* Hero section */}
      <div className="bg-[#2F5A3D] text-white py-14 text-center">
        <h1 className="text-4xl font-bold mb-4">{content.hero.title}</h1>
        <p className="text-xl max-w-3xl mx-auto px-4">
          {content.hero.subtitle}
        </p>
      </div>

      {/* Social Services section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#2F5A3D] text-center mb-4">{content.intro.title}</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            {content.intro.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🏥</span>
                <h3 className="text-xl font-semibold text-[#2F5A3D]">GENOME Foundation</h3>
              </div>
              <p className="text-gray-600 mb-4">
                As an active member of the GENOME Foundation, Dr. Murthy contributes his integrated medical expertise, combining allopathic knowledge with traditional healing practices. His approach focuses on developing comprehensive healthcare solutions that bridge modern and traditional medicine for underprivileged communities.
              </p>
              <div className="text-center">
                <img src="/images/genome-foundation.png.png" alt="GENOME Foundation" className="h-12 mx-auto" />
              </div>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🕉</span>
                <h3 className="text-xl font-semibold text-[#2F5A3D]">Temple Charity Services</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Through temple-based charity initiatives, Dr. Murthy provides integrated healthcare services, combining modern medical consultations with traditional healing practices. His unique approach ensures comprehensive care, particularly benefiting elderly patients and economically disadvantaged individuals.
              </p>
              <div className="text-center italic text-gray-700 mt-4">
                <p>"By integrating modern medical knowledge with traditional healing wisdom, we can provide more comprehensive and effective healthcare solutions to those in need."</p>
                <p className="text-right mt-2">- Dr. KVGS Murthy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Initiatives section */}
      <section className="py-12 bg-[#f8faf8]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#2F5A3D] text-center mb-8">Social Initiatives</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Explore the various social and humanitarian initiatives led by Dr. KVGS Murthy through his affiliations with GENOME Foundation and temple charity programs.
          </p>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('genome')}
                className={`px-6 py-2 rounded-md transition-all ${activeTab === 'genome' ? 'bg-white shadow-sm text-[#2F5A3D]' : 'text-gray-600'}`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg">🏥</span> GENOME Foundation
                </span>
              </button>
              <button
                onClick={() => setActiveTab('temple')}
                className={`px-6 py-2 rounded-md transition-all ${activeTab === 'temple' ? 'bg-white shadow-sm text-[#2F5A3D]' : 'text-gray-600'}`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg">🕉</span> Temple Charity
                </span>
              </button>
              <button
                onClick={() => setActiveTab('events')}
                className={`px-6 py-2 rounded-md transition-all ${activeTab === 'events' ? 'bg-white shadow-sm text-[#2F5A3D]' : 'text-gray-600'}`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg">📅</span> Upcoming Events
                </span>
              </button>
            </div>
          </div>

          {/* GENOME Foundation Content */}
          {activeTab === 'genome' && content.genome && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <img src="/images/genome-foundation.png.png" alt="GENOME Foundation" className="h-16 mx-auto mb-6" />
              </div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#2F5A3D] mb-4">About GENOME Foundation</h3>
                <p className="text-gray-600 mb-4">
                  GENOME Foundation is a non-profit organization dedicated to advancing healthcare access and research for underprivileged communities. The foundation focuses on combining modern medical approaches with traditional healing systems to create sustainable and accessible healthcare solutions.
                </p>
                <p className="text-gray-600">
                  As an active member and medical advisor, Dr. KVGS Murthy contributes his expertise in Ayurvedic and herbal medicine to various foundation initiatives, helping to develop integrative approaches to common health challenges.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#2F5A3D] mb-6">Key Activities & Impact</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-[#2F5A3D] mb-3">Healthcare Outreach</h4>
                    <p className="text-gray-600 mb-3">Providing medical services to underserved communities through regular health camps and mobile clinics.</p>
                    <p className="text-[#2F5A3D] text-sm">Impact: Improved access to healthcare in rural areas</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-[#2F5A3D] mb-3">Health Education</h4>
                    <p className="text-gray-600 mb-3">Conducting workshops and awareness programs on preventive healthcare and hygiene practices.</p>
                    <p className="text-[#2F5A3D] text-sm">Impact: Enhanced health literacy in communities</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-[#2F5A3D] mb-3">Research Collaboration</h4>
                    <p className="text-gray-600 mb-3">Contributing to research initiatives focused on developing affordable healthcare solutions.</p>
                    <p className="text-[#2F5A3D] text-sm">Impact: Development of innovative treatment protocols</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Temple Charity Content */}
          {activeTab === 'temple' && content.temple && (
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-[#2F5A3D] mb-6">{content.temple.title}</h3>
              <p className="text-gray-600 mb-6">
                Dr. KVGS Murthy's temple charity initiatives represent his deep commitment to serving the community through healthcare. Working in collaboration with local temples, he has established several programs that bridge the gap between traditional healing and modern medical needs.
              </p>
              <div className="bg-white p-8 rounded-lg shadow-sm text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <span className="text-3xl text-[#B8860B]">🕉</span>
                </div>
                <blockquote className="text-xl italic text-gray-700 mb-4">
                  "Temples have traditionally been centers not just for spiritual growth but also for community welfare. By integrating healthcare services with temple activities, we're able to reach many who would otherwise not seek medical help due to financial or logistical constraints."
                </blockquote>
                <p className="font-semibold text-[#2F5A3D]">- Dr. KVGS Murthy</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#2F5A3D] mb-6">Key Initiatives & Impact</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-[#2F5A3D] mb-3">Free Ayurvedic Clinics</h4>
                    <p className="text-gray-600 mb-3">Regular free clinics offering Ayurvedic consultations and medicines to economically disadvantaged individuals.</p>
                    <p className="text-[#2F5A3D] text-sm">Impact: Providing essential healthcare to those in need</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-[#2F5A3D] mb-3">Elderly Care Program</h4>
                    <p className="text-gray-600 mb-3">Special care and support for elderly patients focusing on chronic condition management and preventive care.</p>
                    <p className="text-[#2F5A3D] text-sm">Impact: Enhanced quality of life for elderly</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-[#2F5A3D] mb-3">Community Wellness Initiatives</h4>
                    <p className="text-gray-600 mb-3">Regular health awareness and wellness programs conducted at local temples.</p>
                    <p className="text-[#2F5A3D] text-sm">Impact: Improved health awareness and prevention</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="font-semibold text-[#2F5A3D] mb-4">Volunteer Opportunities</h4>
                <p className="text-gray-600">
                  Dr. Murthy's temple charity initiatives welcome volunteers from medical and non-medical backgrounds who wish to contribute their time and skills to serving the community. Interested individuals can contact Dr. Murthy's office for more information on how to get involved.
                </p>
              </div>
            </div>
          )}

          {/* Upcoming Events Content */}
          {activeTab === 'events' && content.events && (
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-[#2F5A3D] mb-6">Upcoming Social Service Events</h3>
              <p className="text-gray-600 mb-8">
                Dr. KVGS Murthy regularly organizes and participates in various community service events throughout the year. These events provide opportunities for free healthcare services, education, and community engagement.
              </p>
              {content.events.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  {content.events.map((event, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="text-[#2F5A3D] text-2xl mb-4">📅</div>
                      <h4 className="font-semibold text-[#2F5A3D] mb-2">{event.title}</h4>
                      <p className="text-sm text-[#B8860B] mb-2">{event.date}</p>
                      <p className="text-sm font-semibold mb-1">{event.location}</p>
                      <p className="text-gray-600 text-sm">{event.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-white rounded-lg shadow-sm mb-12">
                  <div className="text-[#2F5A3D] text-4xl mb-4">📅</div>
                  <h4 className="text-xl font-semibold text-[#2F5A3D] mb-2">No Upcoming Events</h4>
                  <p className="text-gray-600">New events will be announced shortly. Please check back later.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Community Impact section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#2F5A3D] text-center mb-4">Community Impact</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Through his various social initiatives, Dr. KVGS Murthy has made a significant positive impact on the health and wellbeing of thousands of individuals across Andhra Pradesh.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#2F5A3D] mb-2">5,000+</div>
              <h4 className="font-semibold mb-2">Free Consultations</h4>
              <p className="text-gray-600">Provided annually through temple charity clinics and community health camps.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#2F5A3D] mb-2">25+</div>
              <h4 className="font-semibold mb-2">Rural Villages</h4>
              <p className="text-gray-600">Benefited from regular medical outreach programs and health education.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#2F5A3D] mb-2">12</div>
              <h4 className="font-semibold mb-2">Health Initiatives</h4>
              <p className="text-gray-600">Launched in collaboration with GENOME Foundation and local organizations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Support section */}
      <section className="py-16 bg-gradient-to-br from-[#B8860B]  to-[#2F5A3D]">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Support Our Initiatives</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Your contributions can help us extend our reach and provide healthcare services to more individuals in need across communities.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="bg-white text-[#2F5A3D] px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300"
          >
            Get Involved
          </button>
        </div>
      </section>
    </div>
  )
}

export default SocialServices