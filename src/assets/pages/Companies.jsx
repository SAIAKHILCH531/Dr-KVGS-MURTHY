import React from 'react'
import { Section } from '../../components/layout/Section'

const Companies = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#2F5A3D] text-white py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Professional Affiliations</h1>
            <p className="text-lg">
              Dr. KVGS Murthy's leadership roles and contributions across healthcare organizations
            </p>
          </div>
        </div>
      </section>

      {/* Companies List Section */}
      <Section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-[#2F5A3D] mb-4">Alakananda</h3>
              <p className="text-gray-700 mb-2">Position: Managing Director</p>
              <p className="text-gray-600">Leading product manufacturing operations and strategic development initiatives.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-[#2F5A3D] mb-4">Kalaga Integrated Health Pvt Ltd</h3>
              <p className="text-gray-700 mb-2">Position: Marketing Head</p>
              <p className="text-gray-600">Overseeing marketing strategies for integrated healthcare and herbal manufacturing.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-[#2F5A3D] mb-4">Parathpara Integrated Healthcare</h3>
              <p className="text-gray-700 mb-2">Position: Director</p>
              <p className="text-gray-600">Managing operations of clinics & hospitals, providing integrated healthcare services.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-[#2F5A3D] mb-4">Temple Healthcare Services</h3>
              <p className="text-gray-700 mb-2">Affiliated Institutions:</p>
              <ul className="list-disc list-inside text-gray-600 ml-4 space-y-2">
                <li>Sri Srigiri Shankara Mutt</li>
                <li>Sambheswar Swami Temple</li>
              </ul>
              <p className="text-gray-600 mt-4">Providing healthcare services through temple-based initiatives.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-[#2F5A3D] mb-4">SKRS Oriental Colleges</h3>
              <p className="text-gray-700 mb-2">Period: 1972-74</p>
              <p className="text-gray-600">Contributed to Telugu education and student development.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-[#2F5A3D] mb-4">GENOME Foundation</h3>
              <p className="text-gray-700 mb-2">Position: Research Consultant</p>
              <p className="text-gray-600">Specializing in integrated medicines, lifestyle diseases & disorders research.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-[#2F5A3D] mb-4">Ayurveda One Plus Ltd</h3>
              <p className="text-gray-700 mb-2">Type: Wholesale Distributors (Ayur Central)</p>
              <p className="text-gray-600">Managing distribution of Ayurvedic products and medicines.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-[#2F5A3D] mb-4">Viswadharma Mandiram</h3>
              <p className="text-gray-700 mb-2">Type: NGO - Social and Spiritual Organization</p>
              <p className="text-gray-600">Active member contributing to social and spiritual welfare initiatives.</p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}

export default Companies