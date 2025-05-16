import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import AdminLayout from './AdminLayout';

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
        // Add more features as needed
      ]
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

  return (
    <AdminLayout>
      <main className="flex-1 bg-white rounded-lg shadow p-6">
      <h1 className="text-3xl font-semibold text-[#2F5A3D]">Home Management</h1>
      <br />
          <form onSubmit={handleSubmit}>
            {/* Hero Section */}
            <div className="space-y-4">
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
            </div>

            {/* Welcome Section */}
            <div className="space-y-4">
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

              {/* Features */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium">Features</h4>
                {homeContent.welcome.features.map((feature, index) => (
                  <div key={index} className="space-y-2 p-4 border rounded-md">
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
              </div>
            </div>

            {/* Submit Button */} 
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-[#2F5A3D] text-white  rounded-md hover:bg-[#244730] disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </main>
      </AdminLayout>
  );
};

export default HomeManager;