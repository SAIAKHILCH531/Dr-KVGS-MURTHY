import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const ServicesManager = () => {
  const [servicesContent, setServicesContent] = useState({
    hero: {
      title: 'Our Services',
      subtitle: 'Comprehensive Ayurvedic and herbal treatments personalized for your unique health needs'
    },
    approach: {
      title: 'Our Treatment Approach',
      description: 'At KALAGA Herbal Research Labs, Dr. KVGS Murthy combines traditional Ayurvedic wisdom with modern scientific research to provide evidence-based herbal treatments that address the root cause of health issues, not just the symptoms.',
      cards: [
        {
          title: 'Comprehensive Assessment',
          description: 'Each treatment plan begins with a thorough evaluation of your health history, current condition, and unique bodily constitution according to Ayurvedic principles.'
        },
        {
          title: 'Personalized Formulation',
          description: 'Based on your assessment, Dr. Murthy creates customized herbal formulations specifically designed to address your health concerns and restore balance.'
        },
        {
          title: 'Holistic Healing',
          description: 'Our treatment programs integrate herbal medicines with lifestyle modifications, dietary recommendations, and therapeutic practices for comprehensive care.'
        }
      ]
    },
    categories: {
      wellness: {
        title: 'Wellness Treatments',
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
          {
            title: 'Rejuvenation Therapy',
            description: 'Specialized treatments to restore vitality, improve energy levels, and enhance overall wellbeing using herbal formulations.',
            benefits: [
              'Increased energy and vitality',
              'Improved sleep quality',
              'Enhanced mental clarity',
              'Strengthened immunity'
            ]
          },
          {
            title: 'Detoxification Programs',
            description: 'Systematic cleansing protocols using herbal preparations to eliminate toxins and restore balanced body function.',
            benefits: [
              'Removal of accumulated toxins',
              'Improved digestion and metabolism',
              'Enhanced nutrient absorption',
              'Restored natural balance'
            ]
          }
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
          {
            title: 'Metabolic Disorder Management',
            description: 'Comprehensive approach to managing conditions like diabetes, thyroid disorders, and metabolic syndrome through herbal interventions.',
            benefits: [
              'Blood sugar regulation',
              'Hormonal balance support',
              'Weight management',
              'Reduced inflammation'
            ]
          },
          {
            title: 'Joint and Musculoskeletal Care',
            description: 'Specialized treatments for arthritis, joint pain, and musculoskeletal disorders using herbal formulations and therapeutic approaches.',
            benefits: [
              'Pain reduction',
              'Improved joint mobility',
              'Reduced inflammation',
              'Support for tissue repair'
            ]
          }
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
          {
            title: 'Neurological Support',
            description: 'Herbal protocols designed to support brain health, cognitive function, and nervous system balance.',
            benefits: [
              'Enhanced cognitive function',
              'Stress reduction',
              'Improved sleep quality',
              'Neurological health support'
            ]
          },
          {
            title: 'Digestive Health',
            description: 'Comprehensive treatments for digestive disorders using specialized herbal formulations to restore gut health and function.',
            benefits: [
              'Improved digestion',
              'Relief from digestive discomfort',
              'Restored gut microbiome balance',
              'Enhanced nutrient absorption'
            ]
          }
        ]
      },
      preventive: {
        title: 'Preventive Care',
        services: [
          {
            title: 'Seasonal Health Programs',
            description: 'Tailored herbal protocols to strengthen immunity and prepare the body for seasonal changes and challenges.',
            benefits: [
              'Enhanced seasonal immunity',
              'Prevention of common illnesses',
              'Adaptability to climate changes',
              'Maintained health balance throughout the year'
            ]
          },
          {
            title: 'Lifestyle Optimization',
            description: 'Personalized guidance on diet, daily routines, and lifestyle practices based on Ayurvedic principles and your unique constitution.',
            benefits: [
              'Improved energy management',
              'Enhanced work-life balance',
              'Optimized daily routines',
              'Prevention of lifestyle disorders'
            ]
          },
          {
            title: 'Anti-Aging Protocols',
            description: 'Specialized herbal treatments designed to slow the aging process and maintain youthful vigor and appearance.',
            benefits: [
              'Cellular rejuvenation',
              'Reduced oxidative stress',
              'Improved skin health',
              'Enhanced longevity factors'
            ]
          }
        ]
      }
    }
  });

  // Add new handler for approach cards
  const handleApproachCardChange = (index, field, value) => {
    setServicesContent(prev => {
      const newCards = [...prev.approach.cards];
      newCards[index] = {
        ...newCards[index],
        [field]: value
      };
      return {
        ...prev,
        approach: {
          ...prev.approach,
          cards: newCards
        }
      };
    });
  };

  // Add new handler for approach section
  const handleApproachChange = (e) => {
    const { name, value } = e.target;
    setServicesContent(prev => ({
      ...prev,
      approach: {
        ...prev.approach,
        [name]: value
      }
    }));
  };

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
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        await updateDoc(docRef, servicesContent);
      } else {
        await setDoc(docRef, servicesContent);
      }
      
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

  // Add handler for call-to-action section
  const handleCallToActionChange = (e) => {
    const { name, value } = e.target;
    setServicesContent(prev => ({
      ...prev,
      callToAction: {
        ...prev.callToAction,
        [name]: value
      }
    }));
  };

  return (
    <main className="space-y-6 p-6">
      <h1 className="text-3xl font-semibold text-[#2F5A3D]">Services Management</h1>
      
      {message.text && (
        <div className={`p-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Hero Section */}
        <section className="space-y-4 bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold">Hero Section</h3>
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
            <textarea
              name="subtitle"
              value={servicesContent.hero.subtitle}
              onChange={handleHeroChange}
              rows="2"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
            />
          </div>
        </section>

        {/* Treatment Approach Section */}
        <section className="space-y-4 bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold">Treatment Approach</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={servicesContent.approach.title}
              onChange={handleApproachChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={servicesContent.approach.description}
              onChange={handleApproachChange}
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
            />
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Approach Cards</label>
            {servicesContent.approach.cards.map((card, index) => (
              <div key={index} className="p-4 border rounded-md space-y-2">
                <input
                  type="text"
                  value={card.title}
                  onChange={(e) => handleApproachCardChange(index, 'title', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
                  placeholder="Card Title"
                />
                <textarea
                  value={card.description}
                  onChange={(e) => handleApproachCardChange(index, 'description', e.target.value)}
                  rows="3"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
                  placeholder="Card Description"
                />
              </div>
            ))}
          </div>
        </section>

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

export default ServicesManager;
