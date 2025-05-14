import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
       {/* Hero Section */}
       <section className="bg-[#2F5A3D] text-white py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">About Dr. KVGS Murthy</h1>
            <p className="text-lg">
              A pioneering expert in combined Ayurvedic and herbal treatments with decades of experience
            </p>
          </div>
        </div>
      </section>

      {/* Professional Background Section */}
      <section className="py-16 bg-[#f3f9f3]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold text-[#2F5A3D] mb-8 text-center">Professional Background</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="relative max-w-md mx-auto">
                <div className="aspect-ratio-1/1 overflow-hidden rounded-lg shadow-lg">
                  <img src="/images/doctor-profile.jpg" alt="Dr kvgs murthy picture" className="w-full h-full object-cover" />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-semibold text-[#2F5A3D]">Dr. KVGS Murthy</h3>
                  <p className="text-[#4b6c4b]">Principal Director, KALAGA Herbal Research Labs</p>
                </div>
              </div>
              <div className="space-y-6">
                <p className="text-[#4b6c4b] leading-relaxed">
                  Dr. KVGS Murthy has dedicated his career to the advancement of Ayurvedic medicine and herbal treatments. With an MBBS qualification (Registration No. 13365, Andhra) and extensive experience in both modern medicine and traditional healing systems, he has established himself as a leading authority in integrated healthcare.
                </p>
                <p className="text-[#4b6c4b] leading-relaxed">
                  As the Principal Director of KALAGA Herbal Research Integrated Pvt. Limited, Dr. Murthy leads groundbreaking research in developing evidence-based herbal formulations that address a variety of health concerns. His holistic approach to healthcare combines the wisdom of ancient Ayurvedic principles with modern scientific methodologies.
                </p>
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-[#2F5A3D] mb-4">Education & Qualifications</h3>
                  <ul className="space-y-3 text-[#4b6c4b]">
                    <li className="flex items-center gap-2">
                      <span className="text-[#2F5A3D]">•</span>
                      MBBS - Registration No. 13365 (Andhra)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#2F5A3D]">•</span>
                      Specialized training in Ayurvedic medicine and herbal treatments
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#2F5A3D]">•</span>
                      Recognized expert in integrated healthcare approaches
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Healthcare Philosophy Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-semibold text-[#2F5A3D] mb-6">Healthcare Philosophy</h2>
            <p className="text-[#4b6c4b] text-lg">
              Dr. Murthy's approach to healthcare is rooted in the belief that the integration of traditional wisdom and modern science creates the most effective healing systems.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="p-8 bg-[#f3f9f3] rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-[#2F5A3D] mb-4">Holistic Treatment Approach</h3>
              <p className="text-[#4b6c4b] italic">
                "I believe in addressing not just the symptoms, but the root causes of health issues. By understanding the body as an integrated system, we can develop more effective and lasting treatments that support natural healing processes."
              </p>
              <p className="text-[#4b6c4b] text-right mt-2">- Dr. KVGS Murthy</p>
            </div>
            <div className="p-8 bg-[#f3f9f3] rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-[#2F5A3D] mb-4">Evidence-Based Herbal Medicine</h3>
              <p className="text-[#4b6c4b] italic">
                "While traditional herbal treatments have centuries of empirical evidence, I am committed to validating and enhancing these approaches through modern research methodologies. This ensures our treatments meet the highest standards of safety and efficacy."
              </p>
              <p className="text-[#4b6c4b] text-right mt-2">- Dr. KVGS Murthy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements & Recognition Section */}
      <section className="py-16 bg-[#f3f9f3]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold text-[#2F5A3D] text-center mb-12">Achievements & Recognition</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-lg shadow-sm text-center">
                <div className="text-[#2F5A3D] text-4xl mb-4">📄</div>
                <h3 className="text-xl font-semibold text-[#2F5A3D] mb-4">Research Publications</h3>
                <p className="text-[#4b6c4b]">
                  Numerous research papers on herbal medicine and treatment methodologies published in respected medical journals.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm text-center">
                <div className="text-[#2F5A3D] text-4xl mb-4">🏅</div>
                <h3 className="text-xl font-semibold text-[#2F5A3D] mb-4">Professional Recognition</h3>
                <p className="text-[#4b6c4b]">
                  Recognized for contributions to Ayurvedic medicine and integrated healthcare approaches by professional organizations.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm text-center">
                <div className="text-[#2F5A3D] text-4xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-[#2F5A3D] mb-4">Educational Initiatives</h3>
                <p className="text-[#4b6c4b]">
                  Conducted workshops and training programs to share knowledge of herbal treatments and Ayurvedic principles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision for the Future Section */}
      <section className="py-16 bg-gradient-to-br from-[#B8860B]  to-[#2F5A3D] text-white">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-semibold mb-6">Vision for the Future</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto italic">
            "My vision is to continue bridging the gap between traditional healing wisdom and modern medical science, creating accessible and effective healthcare solutions that enhance quality of life for all."
          </p>
          <p className="text-lg">- Dr. KVGS Murthy</p>
        </div>
      </section>
    </div>
  );
};

export default About;