import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const About = () => {
  const [aboutContent, setAboutContent] = useState({
    hero: {
      title: 'About Dr. KVGS Murthy',
      subtitle: 'A pioneering expert in combined Ayurvedic and herbal treatments with decades of experience'
    },
    professional: {
      title: 'Professional Background',
      image: '/images/doctor-profile.jpg',
      position: 'Principal Director, KALAGA Herbal Research Labs',
      background: [],
      qualifications: []
    },
    philosophy: {
      title: 'Healthcare Philosophy',
      description: '',
      approaches: []
    },
    achievements: {
      title: 'Achievements & Recognition',
      items: []
    },
    vision: {
      title: 'Vision for the Future',
      quote: ''
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const docRef = doc(db, 'settings', 'about');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setAboutContent(docSnap.data());
        }
      } catch (error) {
        console.error('Error fetching about content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutContent();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
       {/* Hero Section */}
       <section className="bg-[#2F5A3D] text-white py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">{aboutContent.hero.title}</h1>
            <p className="text-lg">
              {aboutContent.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Professional Background Section */}
      <section className="py-16 bg-[#f3f9f3]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold text-[#2F5A3D] mb-8 text-center">{aboutContent.professional.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="relative max-w-md mx-auto">
                <div className="aspect-ratio-1/1 overflow-hidden rounded-lg shadow-lg">
                  <img src={aboutContent.professional.image} alt="Dr kvgs murthy picture" className="w-full h-full object-cover" />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-semibold text-[#2F5A3D]">Dr. KVGS Murthy</h3>
                  <p className="text-[#4b6c4b]">{aboutContent.professional.position}</p>
                </div>
              </div>
              <div className="space-y-6">
                {aboutContent.professional.background.map((paragraph, index) => (
                  <p key={index} className="text-[#4b6c4b] leading-relaxed">
                    {paragraph}
                  </p>
                ))}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-[#2F5A3D] mb-4">Education & Qualifications</h3>
                  <ul className="space-y-3 text-[#4b6c4b]">
                    {aboutContent.professional.qualifications.map((qualification, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="text-[#2F5A3D]">•</span>
                        {qualification}
                      </li>
                    ))}
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
            <h2 className="text-3xl font-semibold text-[#2F5A3D] mb-6">{aboutContent.philosophy.title}</h2>
            <p className="text-[#4b6c4b] text-lg">
              {aboutContent.philosophy.description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {aboutContent.philosophy.approaches.map((approach, index) => (
              <div key={index} className="p-8 bg-[#f3f9f3] rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-[#2F5A3D] mb-4">{approach.title}</h3>
                <p className="text-[#4b6c4b] italic">
                  "{approach.quote}"
                </p>
                <p className="text-[#4b6c4b] text-right mt-2">- Dr. KVGS Murthy</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements & Recognition Section */}
      <section className="py-16 bg-[#f3f9f3]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold text-[#2F5A3D] text-center mb-12">{aboutContent.achievements.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {aboutContent.achievements.items.map((item, index) => (
                <div key={index} className="p-6 bg-white rounded-lg shadow-sm text-center">
                  <div className="text-[#2F5A3D] text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-[#2F5A3D] mb-4">{item.title}</h3>
                  <p className="text-[#4b6c4b]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision for the Future Section */}
      <section className="py-16 bg-gradient-to-br from-[#B8860B] to-[#2F5A3D] text-white">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-semibold mb-6">{aboutContent.vision.title}</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto italic">
            "{aboutContent.vision.quote}"
          </p>
          <p className="text-lg">- Dr. KVGS Murthy</p>
        </div>
      </section>
    </div>
  );
};

export default About;