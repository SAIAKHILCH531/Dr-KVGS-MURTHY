import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import AdminLayout from './AdminLayout';

const ContactManager = () => {
  const [contactInfo, setContactInfo] = useState({
    address: '',
    phone: '',
    email: '',
    workingHours: '',
    heroTitle: 'Contact Us',
    heroSubtitle: 'Get in touch with Dr. KVGS Murthy and KALAGA Herbal Research Labs',
    research: {
      title: 'Research & Evidence',
      description: 'Our commitment to evidence-based herbal medicine',
      keyFindings: [],
      publications: [],
      certifications: []
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const docRef = doc(db, 'settings', 'contact');
      const maxRetries = 3;
      let retryCount = 0;
      
      while (retryCount < maxRetries) {
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setContactInfo(docSnap.data());
            return;
          }
          break;
        } catch (error) {
          retryCount++;
          if (retryCount === maxRetries) {
            throw error;
          }
          // Wait for 2 seconds before retrying
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
    } catch (error) {
      console.error('Error fetching contact info:', error);
      if (error.code === 'failed-precondition' || error.message.includes('offline')) {
        setMessage({ 
          text: 'Unable to connect to the server. Please check your internet connection and try again.', 
          type: 'error' 
        });
      } else {
        setMessage({ 
          text: 'Error fetching contact information', 
          type: 'error' 
        });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const docRef = doc(db, 'settings', 'contact');
      await updateDoc(docRef, contactInfo);
      setMessage({ text: 'Contact information updated successfully!', type: 'success' });
    } catch (error) {
      console.error('Error updating contact info:', error);
      setMessage({ text: 'Error updating contact information', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout >
        <main className="flex-1 bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-semibold text-[#2F5A3D]">Contact Management</h1>
        <br />
          
          {message.text && (
            <div className={`p-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Hero Section</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="heroTitle"
                  value={contactInfo.heroTitle}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                <input
                  type="text"
                  name="heroSubtitle"
                  value={contactInfo.heroSubtitle}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Contact Information</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <textarea
                  name="address"
                  value={contactInfo.address}
                  onChange={handleChange}
                  rows="3"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={contactInfo.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={contactInfo.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Working Hours</label>
                <input
                  type="text"
                  name="workingHours"
                  value={contactInfo.workingHours}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#2F5A3D] text-white py-2 px-4 rounded-md hover:bg-[#2F5A3D]/90 focus:outline-none focus:ring-2 focus:ring-[#2F5A3D] focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
          <div className="space-y-4 mt-8">
            <h3 className="text-xl font-semibold">Research & Evidence</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Section Title</label>
              <input
                type="text"
                name="research.title"
                value={contactInfo.research.title}
                onChange={(e) => setContactInfo(prev => ({
                  ...prev,
                  research: { ...prev.research, title: e.target.value }
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="research.description"
                value={contactInfo.research.description}
                onChange={(e) => setContactInfo(prev => ({
                  ...prev,
                  research: { ...prev.research, description: e.target.value }
                }))}
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
              />
            </div>

            {/* Key Findings Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Key Findings</label>
              <div className="space-y-2">
                {contactInfo.research.keyFindings.map((finding, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={finding}
                      onChange={(e) => {
                        const newFindings = [...contactInfo.research.keyFindings];
                        newFindings[index] = e.target.value;
                        setContactInfo(prev => ({
                          ...prev,
                          research: { ...prev.research, keyFindings: newFindings }
                        }));
                      }}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newFindings = contactInfo.research.keyFindings.filter((_, i) => i !== index);
                        setContactInfo(prev => ({
                          ...prev,
                          research: { ...prev.research, keyFindings: newFindings }
                        }));
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setContactInfo(prev => ({
                    ...prev,
                    research: {
                      ...prev.research,
                      keyFindings: [...prev.research.keyFindings, '']
                    }
                  }))}
                  className="text-[#2F5A3D] hover:text-[#2F5A3D]/80 text-sm"
                >
                  + Add Finding
                </button>
              </div>
            </div>

            {/* Publications Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Publications</label>
              <div className="space-y-2">
                {contactInfo.research.publications.map((publication, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={publication}
                      onChange={(e) => {
                        const newPublications = [...contactInfo.research.publications];
                        newPublications[index] = e.target.value;
                        setContactInfo(prev => ({
                          ...prev,
                          research: { ...prev.research, publications: newPublications }
                        }));
                      }}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newPublications = contactInfo.research.publications.filter((_, i) => i !== index);
                        setContactInfo(prev => ({
                          ...prev,
                          research: { ...prev.research, publications: newPublications }
                        }));
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setContactInfo(prev => ({
                    ...prev,
                    research: {
                      ...prev.research,
                      publications: [...prev.research.publications, '']
                    }
                  }))}
                  className="text-[#2F5A3D] hover:text-[#2F5A3D]/80 text-sm"
                >
                  + Add Publication
                </button>
              </div>
            </div>

            {/* Certifications Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Certifications</label>
              <div className="space-y-2">
                {contactInfo.research.certifications.map((certification, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={certification}
                      onChange={(e) => {
                        const newCertifications = [...contactInfo.research.certifications];
                        newCertifications[index] = e.target.value;
                        setContactInfo(prev => ({
                          ...prev,
                          research: { ...prev.research, certifications: newCertifications }
                        }));
                      }}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newCertifications = contactInfo.research.certifications.filter((_, i) => i !== index);
                        setContactInfo(prev => ({
                          ...prev,
                          research: { ...prev.research, certifications: newCertifications }
                        }));
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setContactInfo(prev => ({
                    ...prev,
                    research: {
                      ...prev.research,
                      certifications: [...prev.research.certifications, '']
                    }
                  }))}
                  className="text-[#2F5A3D] hover:text-[#2F5A3D]/80 text-sm"
                >
                  + Add Certification
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-[#2F5A3D] text-white rounded hover:bg-[#244730] disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </main>
      </AdminLayout>
  );
};

export default ContactManager;