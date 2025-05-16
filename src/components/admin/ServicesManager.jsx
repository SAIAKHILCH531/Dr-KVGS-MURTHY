import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import AdminLayout from './AdminLayout';

const ServicesManager = () => {
  const [servicesContent, setServicesContent] = useState({
    hero: {
      title: 'Our Services',
      subtitle: 'Comprehensive Healthcare Solutions'
    },
    categories: {
      wellness: {
        title: 'Wellness Services',
        services: [
          {
            title: 'Holistic Health Assessment',
            description: 'Comprehensive evaluation based on Ayurvedic principles to identify your unique body constitution (dosha) and potential imbalances.',
            benefits: [
              'Personalized health profile',
              'Identification of root causes',
              'Customized treatment recommendations',
              'Preventive health strategies'
            ]
          },
          // Add more wellness services
        ]
      },
      chronic: {
        title: 'Chronic Disease Management',
        services: [
          {
            title: 'Cardiovascular Health',
            description: 'Specialized herbal protocols to support heart health and improve circulation using research-based formulations like Cardorium Plus.',
            benefits: [
              'Improved circulation',
              'Support for heart function',
              'Management of cholesterol levels',
              'Enhanced vascular health'
            ]
          },
          // Add more chronic disease services
        ]
      },
      specialized: {
        title: 'Specialized Treatments',
        services: [
          {
            title: 'Respiratory Health',
            description: 'Targeted herbal treatments for respiratory conditions, including allergies, asthma, and chronic respiratory issues.',
            benefits: [
              'Improved breathing capacity',
              'Reduced respiratory inflammation',
              'Management of allergy symptoms',
              'Strengthened respiratory immunity'
            ]
          },
          // Add more specialized treatments
        ]
      }
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchServicesContent();
  }, []);

  const fetchServicesContent = async () => {
    try {
      const docRef = doc(db, 'settings', 'services');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setServicesContent(docSnap.data());
      }
    } catch (error) {
      console.error('Error fetching services content:', error);
      setMessage({ text: 'Error fetching services content', type: 'error' });
    }
  };

  const handleHeroChange = (e) => {
    const { name, value } = e.target;
    setServicesContent(prev => ({
      ...prev,
      hero: {
        ...prev.hero,
        [name]: value
      }
    }));
  };

  const handleServiceChange = (category, serviceIndex, field, value) => {
    setServicesContent(prev => {
      const newServices = [...prev.categories[category].services];
      if (field === 'benefits') {
        newServices[serviceIndex] = {
          ...newServices[serviceIndex],
          benefits: value.split('\n').map(benefit => benefit.trim()).filter(benefit => benefit)
        };
      } else {
        newServices[serviceIndex] = {
          ...newServices[serviceIndex],
          [field]: value
        };
      }
      return {
        ...prev,
        categories: {
          ...prev.categories,
          [category]: {
            ...prev.categories[category],
            services: newServices
          }
        }
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const docRef = doc(db, 'settings', 'services');
      await updateDoc(docRef, servicesContent);
      setMessage({ text: 'Services content updated successfully!', type: 'success' });
    } catch (error) {
      console.error('Error updating services content:', error);
      setMessage({ text: 'Error updating services content', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddService = (category) => {
    setServicesContent(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: {
          ...prev.categories[category],
          services: [
            ...prev.categories[category].services,
            {
              title: '',
              description: '',
              benefits: []
            }
          ]
        }
      }
    }));
  };

  const handleRemoveService = (category, index) => {
    setServicesContent(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: {
          ...prev.categories[category],
          services: prev.categories[category].services.filter((_, i) => i !== index)
        }
      }
    }));
  };

  return (
    <AdminLayout>
        <main className="flex-1 bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-semibold text-[#2F5A3D]">Services Management</h1>
        <br />
          {/* Hero Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={servicesContent.hero.title}
                onChange={handleHeroChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subtitle</label>
              <input
                type="text"
                name="subtitle"
                value={servicesContent.hero.subtitle}
                onChange={handleHeroChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
              />
            </div>
          </div>

          {/* Service Categories */}
          {Object.entries(servicesContent.categories).map(([category, categoryData]) => (
            <div key={category} className="space-y-4 mt-8">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">{categoryData.title}</h3>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleAddService(category)}
                    className="px-4 py-2 bg-[#2F5A3D] text-white rounded hover:bg-[#244730]"
                  >
                    Add New Service
                  </button>
                </div>
              </div>
              {categoryData.services.map((service, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <br />
                    <span className="font-medium">{service.title || 'New Service'}</span>
                    <button
                      onClick={() => handleRemoveService(category, index)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="p-4 border rounded-md space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Service Title</label>
                      <input
                        type="text"
                        value={service.title}
                        onChange={(e) => handleServiceChange(category, index, 'title', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        value={service.description}
                        onChange={(e) => handleServiceChange(category, index, 'description', e.target.value)}
                        rows="3"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Benefits (one per line)</label>
                      <textarea
                        value={service.benefits.join('\n')}
                        onChange={(e) => handleServiceChange(category, index, 'benefits', e.target.value)}
                        rows="4"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
                        placeholder="Enter benefits, one per line"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
          
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-4 py-2 bg-[#2F5A3D] text-white rounded hover:bg-[#244730] disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
        </main>
      </AdminLayout>
  );
};

export default ServicesManager;