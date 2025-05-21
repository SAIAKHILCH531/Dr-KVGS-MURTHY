import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const AboutManager = () => {
  const [aboutContent, setAboutContent] = useState({
    hero: {
      title: 'About Dr. KVGS Murthy',
      subtitle: 'A pioneering expert in combined Ayurvedic and herbal treatments with decades of experience'
    },
    professional: {
      title: 'Professional Background',
      image: '/images/doctor-profile.jpg',
      position: 'Principal Director, KALAGA Herbal Research Labs',
      background: [
        'Dr. KVGS Murthy has dedicated his career to the advancement of Ayurvedic medicine and herbal treatments. With an MBBS qualification (Registration No. 13365, Andhra) and extensive experience in both modern medicine and traditional healing systems, he has established himself as a leading authority in integrated healthcare.',
        'As the Principal Director of KALAGA Herbal Research Integrated Pvt. Limited, Dr. Murthy leads groundbreaking research in developing evidence-based herbal formulations that address a variety of health concerns. His holistic approach to healthcare combines the wisdom of ancient Ayurvedic principles with modern scientific methodologies.'
      ],
      qualifications: [
        'MBBS - Registration No. 13365 (Andhra)',
        'Specialized training in Ayurvedic medicine and herbal treatments',
        'Recognized expert in integrated healthcare approaches'
      ]
    },
    philosophy: {
      title: 'Healthcare Philosophy',
      description: 'Dr. Murthy\'s approach to healthcare is rooted in the belief that the integration of traditional wisdom and modern science creates the most effective healing systems.',
      approaches: [
        {
          title: 'Holistic Treatment Approach',
          quote: 'I believe in addressing not just the symptoms, but the root causes of health issues. By understanding the body as an integrated system, we can develop more effective and lasting treatments that support natural healing processes.'
        },
        {
          title: 'Evidence-Based Herbal Medicine',
          quote: 'While traditional herbal treatments have centuries of empirical evidence, I am committed to validating and enhancing these approaches through modern research methodologies. This ensures our treatments meet the highest standards of safety and efficacy.'
        }
      ]
    },
    achievements: {
      title: 'Achievements & Recognition',
      items: [
        {
          icon: '📄',
          title: 'Research Publications',
          description: 'Numerous research papers on herbal medicine and treatment methodologies published in respected medical journals.'
        },
        {
          icon: '🏅',
          title: 'Professional Recognition',
          description: 'Recognized for contributions to Ayurvedic medicine and integrated healthcare approaches by professional organizations.'
        },
        {
          icon: '📚',
          title: 'Educational Initiatives',
          description: 'Conducted workshops and training programs to share knowledge of herbal treatments and Ayurvedic principles.'
        }
      ]
    },
    vision: {
      title: 'Vision for the Future',
      quote: 'My vision is to continue bridging the gap between traditional healing wisdom and modern medical science, creating accessible and effective healthcare solutions that enhance quality of life for all.'
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchAboutContent();
  }, []);

  const fetchAboutContent = async () => {
    try {
      const docRef = doc(db, 'settings', 'about');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setAboutContent(docSnap.data());
      }
    } catch (error) {
      console.error('Error fetching about content:', error);
      setMessage({ text: 'Error fetching about content', type: 'error' });
    }
  };

  const handleHeroChange = (e) => {
    const { name, value } = e.target;
    setAboutContent(prev => ({
      ...prev,
      hero: {
        ...prev.hero,
        [name]: value
      }
    }));
  };

  const handleProfessionalChange = (e) => {
    const { name, value } = e.target;
    setAboutContent(prev => ({
      ...prev,
      professional: {
        ...prev.professional,
        [name]: value
      }
    }));
  };

  const handleBackgroundChange = (index, value) => {
    setAboutContent(prev => {
      const newBackground = [...prev.professional.background];
      newBackground[index] = value;
      return {
        ...prev,
        professional: {
          ...prev.professional,
          background: newBackground
        }
      };
    });
  };

  const handleQualificationChange = (index, value) => {
    setAboutContent(prev => {
      const newQualifications = [...prev.professional.qualifications];
      newQualifications[index] = value;
      return {
        ...prev,
        professional: {
          ...prev.professional,
          qualifications: newQualifications
        }
      };
    });
  };

  const handlePhilosophyChange = (e) => {
    const { name, value } = e.target;
    setAboutContent(prev => ({
      ...prev,
      philosophy: {
        ...prev.philosophy,
        [name]: value
      }
    }));
  };

  const handleApproachChange = (index, field, value) => {
    setAboutContent(prev => {
      const newApproaches = [...prev.philosophy.approaches];
      newApproaches[index] = {
        ...newApproaches[index],
        [field]: value
      };
      return {
        ...prev,
        philosophy: {
          ...prev.philosophy,
          approaches: newApproaches
        }
      };
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const docRef = doc(db, 'settings', 'about');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        await updateDoc(docRef, aboutContent);
      } else {
        await setDoc(docRef, aboutContent);
      }
      setMessage({ text: 'About content updated successfully!', type: 'success' });
    } catch (error) {
      console.error('Error updating about content:', error);
      setMessage({ text: 'Error updating about content', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddBackground = () => {
    setAboutContent(prev => ({
      ...prev,
      professional: {
        ...prev.professional,
        background: [...prev.professional.background, '']
      }
    }));
  };

  const handleRemoveBackground = (index) => {
    setAboutContent(prev => {
      const newBackground = [...prev.professional.background];
      newBackground.splice(index, 1);
      return {
        ...prev,
        professional: {
          ...prev.professional,
          background: newBackground
        }
      };
    });
  };

  const handleAddQualification = () => {
    setAboutContent(prev => ({
      ...prev,
      professional: {
        ...prev.professional,
        qualifications: [...prev.professional.qualifications, '']
      }
    }));
  };

  const handleRemoveQualification = (index) => {
    setAboutContent(prev => {
      const newQualifications = [...prev.professional.qualifications];
      newQualifications.splice(index, 1);
      return {
        ...prev,
        professional: {
          ...prev.professional,
          qualifications: newQualifications
        }
      };
    });
  };

  const handleAddApproach = () => {
    setAboutContent(prev => ({
      ...prev,
      philosophy: {
        ...prev.philosophy,
        approaches: [...prev.philosophy.approaches, { title: '', quote: '' }]
      }
    }));
  };

  const handleRemoveApproach = (index) => {
    setAboutContent(prev => {
      const newApproaches = [...prev.philosophy.approaches];
      newApproaches.splice(index, 1);
      return {
        ...prev,
        philosophy: {
          ...prev.philosophy,
          approaches: newApproaches
        }
      };
    });
  };

  const handleAddAchievement = () => {
    setAboutContent(prev => ({
      ...prev,
      achievements: {
        ...prev.achievements,
        items: [...prev.achievements.items, { icon: '', title: '', description: '' }]
      }
    }));
  };

  const handleRemoveAchievement = (index) => {
    setAboutContent(prev => {
      const newItems = [...prev.achievements.items];
      newItems.splice(index, 1);
      return {
        ...prev,
        achievements: {
          ...prev.achievements,
          items: newItems
        }
      };
    });
  };

  const handleAchievementChange = (index, field, value) => {
    setAboutContent(prev => {
      const newItems = [...prev.achievements.items];
      newItems[index] = {
        ...newItems[index],
        [field]: value
      };
      return {
        ...prev,
        achievements: {
          ...prev.achievements,
          items: newItems
        }
      };
    });
  };

  const handleVisionChange = (e) => {
    const { name, value } = e.target;
    setAboutContent(prev => ({
      ...prev,
      vision: {
        ...prev.vision,
        [name]: value
      }
    }));
  };

  return (
    <main className="space-y-6 p-6">
      <h1 className="text-3xl font-semibold text-[#2F5A3D]">About Management</h1>
      
      <br />
      {message.text && (
        <div className={`p-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </div>
      )}


      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hero Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Hero Section</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={aboutContent.hero.title}
              onChange={handleHeroChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Subtitle</label>
            <input
              type="text"
              name="subtitle"
              value={aboutContent.hero.subtitle}
              onChange={handleHeroChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
            />
          </div>
        </div>

        {/* Professional Background Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Professional Background</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={aboutContent.professional.title}
              onChange={handleProfessionalChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Position</label>
            <input
              type="text"
              name="position"
              value={aboutContent.professional.position}
              onChange={handleProfessionalChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Background Paragraphs</label>
            {aboutContent.professional.background.map((paragraph, index) => (
              <textarea
                key={index}
                value={paragraph}
                onChange={(e) => handleBackgroundChange(index, e.target.value)}
                rows="4"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D] mb-2"
              />
            ))}
            <button
              type="button"
              onClick={handleAddBackground}
              className="mt-2 px-4 py-2 bg-[#2F5A3D] text-white rounded-md hover:bg-[#2F5A3D]/90"
            >
              Add Background Paragraph
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Qualifications</label>
            {aboutContent.professional.qualifications.map((qualification, index) => (
              <input
                key={index}
                type="text"
                value={qualification}
                onChange={(e) => handleQualificationChange(index, e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D] mb-2"
              />
            ))}
            <button
              type="button"
              onClick={handleAddQualification}
              className="mt-2 px-4 py-2 bg-[#2F5A3D] text-white rounded-md hover:bg-[#2F5A3D]/90"
            >
              Add Qualification
            </button>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Healthcare Philosophy</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={aboutContent.philosophy.title}
              onChange={handlePhilosophyChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={aboutContent.philosophy.description}
              onChange={handlePhilosophyChange}
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
            />
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Approaches</label>
            {aboutContent.philosophy.approaches.map((approach, index) => (
              <div key={index} className="p-4 border rounded-md space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={approach.title}
                      onChange={(e) => handleApproachChange(index, 'title', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
                      placeholder="Approach Title"
                    />
                    <textarea
                      value={approach.quote}
                      onChange={(e) => handleApproachChange(index, 'quote', e.target.value)}
                      rows="3"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
                      placeholder="Quote"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveApproach(index)}
                    className="px-2 py-1 text-red-600 hover:bg-red-100 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddApproach}
              className="mt-2 px-4 py-2 bg-[#2F5A3D] text-white rounded-md hover:bg-[#2F5A3D]/90"
            >
              Add Approach
            </button>
          </div>
        </div>
                {/*save button*/
                }
        {/* Achievements Section */}
        <section className="space-y-4 bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold">Achievements & Recognition</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">Section Title</label>
            <input
              type="text"
              name="title"
              value={aboutContent.achievements.title}
              onChange={(e) => handleSectionChange('achievements', 'title', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
            />
          </div>
          
          <div className="space-y-4">
            {aboutContent.achievements.items.map((item, index) => (
              <div key={index} className="p-4 border rounded-md space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 space-y-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Icon</label>
                      <input
                        type="text"
                        value={item.icon}
                        onChange={(e) => handleAchievementChange(index, 'icon', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Title</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleAchievementChange(index, 'title', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        value={item.description}
                        onChange={(e) => handleAchievementChange(index, 'description', e.target.value)}
                        rows="3"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveAchievement(index)}
                    className="px-2 py-1 text-red-600 hover:bg-red-100 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddAchievement}
              className="mt-2 px-4 py-2 bg-[#2F5A3D] text-white rounded-md hover:bg-[#2F5A3D]/90"
            >
              Add Achievement
            </button>
          </div>
        </section>

        {/* Vision Section */}
        <section className="space-y-4 bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold">Vision for the Future</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={aboutContent.vision.title}
              onChange={handleVisionChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Vision Quote</label>
            <textarea
              name="quote"
              value={aboutContent.vision.quote}
              onChange={handleVisionChange}
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
            />
          </div>
        </section>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#2F5A3D] text-white py-2 px-4 rounded-md hover:bg-[#2F5A3D]/90 focus:outline-none focus:ring-2 focus:ring-[#2F5A3D] focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </main>
  );
};

export default AboutManager;
    
       