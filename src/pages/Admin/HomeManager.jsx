import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const HomeManager = () => {
  const [homeContent, setHomeContent] = useState({
    hero: {
      title: 'Dr. KVGS Murthy',
      subtitle: 'Expert in Allopathic Integrated of Ayurvedic and Herbal',
      description: 'Pioneering research-based herbal formulations through KALAGA Herbal Research Labs to enhance human health and wellbeing.'
    },
    welcome: {
      title: 'Welcome to Dr. KVGS Murthy\'s Official Portfolio',
      subtitle: 'Discover how Dr. Murthy\'s expertise in allopathic integrated of Ayurvedic and herbal medicine is transforming healthcare through research, innovation, and compassionate service.',
      features: [
        {
          icon: '💻',
          title: 'Expert in Ayurveda',
          description: 'Combining modern medical knowledge with traditional Ayurvedic principles for holistic healthcare.'
        },
        {
          icon: '📦',
          title: 'Cardorium Plus',
          description: 'Research-based poly-herbal formulation to improve circulation and daily health.'
        },
        {
          icon: '💚',
          title: 'Specialized Treatments',
          description: 'Personalized herbal treatments addressing various health concerns through KALAGA Herbal Research Labs.'
        },
        {
          icon: '🤝',
          title: 'Social Initiatives',
          description: 'Active involvement in community service through GENOME Foundation and temple charity programs.'
        }
      ]
    },
    cardorium: {
      title: 'Introducing Cardorium Plus',
      description: 'A groundbreaking research-based poly-herbal formulation developed by Dr. KVGS Murthy to improve circulation and support overall health. Backed by extensive research and clinical evidence.',
      benefits: [
        'Enhances circulation and heart health',
        'Natural herbal ingredients',
        'Evidence-based formulation',
        'Developed after years of research'
      ]
    },
    affiliations: {
      title: 'Affiliations & Initiatives',
      description: 'Dr. KVGS Murthy is associated with prestigious organizations and social initiatives dedicated to advancing healthcare and community wellbeing.',
      organizations: [
        {
          name: 'GENOME Foundation',
          description: 'Dr. Murthy is an active member of GENOME Foundation, contributing to healthcare initiatives and research for the betterment of society.'
        },
        {
          name: 'Temple Charity Services',
          description: 'Dedicated to serving the community through temple charity initiatives, providing healthcare services to those in need.'
        }
      ]
    },
    experience: {
      title: 'Experience Holistic Healthcare',
      description: 'Discover the benefits of Dr. KVGS Murthy\'s expertise in Allopathic Integrated in Ayurvedic and herbal medicine. Schedule a consultation today.'
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchHomeContent();
  }, []);

  const fetchHomeContent = async () => {
    try {
      const docRef = doc(db, 'settings', 'home');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setHomeContent(docSnap.data());
      }
    } catch (error) {
      console.error('Error fetching home content:', error);
      setMessage({ text: 'Error fetching home content', type: 'error' });
    }
  };

  const handleHeroChange = (e) => {
    const { name, value } = e.target;
    setHomeContent(prev => ({
      ...prev,
      hero: {
        ...prev.hero,
        [name]: value
      }
    }));
  };

  const handleWelcomeChange = (e) => {
    const { name, value } = e.target;
    setHomeContent(prev => ({
      ...prev,
      welcome: {
        ...prev.welcome,
        [name]: value
      }
    }));
  };

  const handleFeatureChange = (index, field, value) => {
    setHomeContent(prev => {
      const newFeatures = [...prev.welcome.features];
      newFeatures[index] = {
        ...newFeatures[index],
        [field]: value
      };
      return {
        ...prev,
        welcome: {
          ...prev.welcome,
          features: newFeatures
        }
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const docRef = doc(db, 'settings', 'home');
      await updateDoc(docRef, homeContent);
      setMessage({ text: 'Home content updated successfully!', type: 'success' });
    } catch (error) {
      console.error('Error updating home content:', error);
      setMessage({ text: 'Error updating home content', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddFeature = () => {
    setHomeContent(prev => ({
      ...prev,
      welcome: {
        ...prev.welcome,
        features: [
          ...prev.welcome.features,
          {
            icon: '✨',
            title: '',
            description: ''
          }
        ]
      }
    }));
  };

  const handleRemoveFeature = (index) => {
    setHomeContent(prev => ({
      ...prev,
      welcome: {
        ...prev.welcome,
        features: prev.welcome.features.filter((_, i) => i !== index)
      }
    }));
  };

  const handleAddAffiliation = () => {

    setHomeContent(prev => ({
      ...prev,
      affiliations: {
        ...prev.affiliations,
        organizations: [
          ...prev.affiliations.organizations,
          {
            name: '',
            description: ''
          }
        ]
      }
    }));
  };

  const handleRemoveAffiliation = (index) => {
    setHomeContent(prev => ({
      ...prev,
      affiliations: {
        ...prev.affiliations,
        organizations: prev.affiliations.organizations.filter((_, i) => i !== index)
      }
    }));
  };

  const handleAffiliationChange = (index, field, value) => {
    setHomeContent(prev => {
      const newOrganizations = [...prev.affiliations.organizations];
      newOrganizations[index] = {
        ...newOrganizations[index],
        [field]: value
      };
      return {
        ...prev,
        affiliations: {
          ...prev.affiliations,
          organizations: newOrganizations
        }
      };
    });
  };

  return (
    <main className="space-y-6 p-6">
      <h1 className="text-3xl font-semibold text-[#2F5A3D]">Home Management</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Hero Section */}
        <section className="space-y-4 bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold">Hero Section</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={homeContent.hero.title}
              onChange={handleHeroChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Subtitle</label>
            <input
              type="text"
              name="subtitle"
              value={homeContent.hero.subtitle}
              onChange={handleHeroChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={homeContent.hero.description}
              onChange={handleHeroChange}
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
            />
          </div>
        </section>

        {/* Welcome Section */}
        <section className="space-y-4 bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold">Welcome Section</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={homeContent.welcome.title}
              onChange={handleWelcomeChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Subtitle</label>
            <textarea
              name="subtitle"
              value={homeContent.welcome.subtitle}
              onChange={handleWelcomeChange}
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
            />
          </div>
          </section>

          {/* Features Section */}
          <section className="space-y-4 bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-medium">Features</h4>
              <button
                type="button"
                onClick={handleAddFeature}
                className="px-4 py-2 bg-[#2F5A3D] text-white rounded-md hover:bg-[#2F5A3D]/90"
              >
                Add Feature
              </button>
            </div>
            {homeContent.welcome.features.map((feature, index) => (
              <div key={index} className="space-y-2 p-4 border rounded-md relative">
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(index)}
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                >
                  ✕
                </button>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Icon</label>
                  <input
                    type="text"
                    value={feature.icon}
                    onChange={(e) => handleFeatureChange(index, 'icon', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={feature.title}
                    onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={feature.description}
                    onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                    rows="2"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
                  />
                </div>
              </div>
            ))}
          </section>

          {/* Cardorium Plus Section */}
          <section className="space-y-4 bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold">Cardorium Plus Section</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={homeContent.cardorium.title}
                onChange={(e) => handleSectionChange('cardorium', 'title', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={homeContent.cardorium.description}
                onChange={(e) => handleSectionChange('cardorium', 'description', e.target.value)}
                rows="4"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
              />
            </div>
            {/* Benefits List */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Benefits</label>
              {homeContent.cardorium.benefits.map((benefit, index) => (
                <input
                  key={index}
                  type="text"
                  value={benefit}
                  onChange={(e) => handleBenefitChange(index, e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
                />
              ))}
            </div>
          </section>

          {/* Affiliations Section */}
          <section className="space-y-4 bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Affiliations</h3>
              <button
                type="button"
                onClick={handleAddAffiliation}
                className="px-4 py-2 bg-[#2F5A3D] text-white rounded-md hover:bg-[#2F5A3D]/90"
              >
                Add Affiliation
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={homeContent.affiliations.title}
                onChange={(e) => handleSectionChange('affiliations', 'title', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={homeContent.affiliations.description}
                onChange={(e) => handleSectionChange('affiliations', 'description', e.target.value)}
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
              />
            </div>
            {/* Organizations */}
            {homeContent.affiliations.organizations.map((org, index) => (
              <div key={index} className="space-y-2 p-4 border rounded-md relative">
                <button
                  type="button"
                  onClick={() => handleRemoveAffiliation(index)}
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                >
                  ✕
                </button>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Organization Name</label>
                  <input
                    type="text"
                    value={org.name}
                    onChange={(e) => handleAffiliationChange(index, 'name', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Organization Description</label>
                  <textarea
                    value={org.description}
                    onChange={(e) => handleAffiliationChange(index, 'description', e.target.value)}
                    rows="3"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
                  />
                </div>
              </div>
            ))}
          </section>

          {/* Experience Section */}
          <section className="space-y-4 bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold">Experience Section</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={homeContent.experience.title}
                onChange={(e) => handleSectionChange('experience', 'title', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={homeContent.experience.description}
                onChange={(e) => handleSectionChange('experience', 'description', e.target.value)}
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
              />
            </div>
          </section>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-[#2F5A3D] text-white rounded-md hover:bg-[#244730] disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </main>
    );
};

export default HomeManager;

const handleSectionChange = (section, field, value) => {
  setHomeContent(prev => ({
    ...prev,
    [section]: {
      ...prev[section],
      [field]: value
    }
  }));
};

const handleBenefitChange = (index, value) => {
  setHomeContent(prev => {
    const newBenefits = [...prev.cardorium.benefits];
    newBenefits[index] = value;
    return {
      ...prev,
      cardorium: {
        ...prev.cardorium,
        benefits: newBenefits
      }
    };
  });
};