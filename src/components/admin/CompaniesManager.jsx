import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import AdminLayout from './AdminLayout';

const CompaniesManager = () => {
  const [companiesContent, setCompaniesContent] = useState({
    hero: {
      title: 'Professional Affiliations',
      subtitle: "Dr. KVGS Murthy's leadership roles and contributions across healthcare organizations"
    },
    companies: [
      {
        name: 'Alakananda',
        position: 'Managing Director',
        description: 'Leading product manufacturing operations and strategic development initiatives.'
      },
      {
        name: 'Kalaga Integrated Health Pvt Ltd',
        position: 'Marketing Head',
        description: 'Overseeing marketing strategies for integrated healthcare and herbal manufacturing.'
      },
      {
        name: 'Parathpara Integrated Healthcare',
        position: 'Director',
        description: 'Managing operations of clinics & hospitals, providing integrated healthcare services.'
      },
      {
        name: 'Temple Healthcare Services',
        position: 'Affiliated Institutions',
        affiliates: [
          'Sri Sringeri Shankara Mutt',
          'Sambheswar Swami Temple'
        ],
        description: 'Providing healthcare services through temple-based initiatives.'
      },
      {
        name: 'SKRS Oriental Colleges',
        period: '1972-74',
        description: 'Contributed to Telugu education and student development.'
      },
      {
        name: 'GENOME Foundation',
        position: 'Research Consultant',
        description: 'Specializing in integrated medicines, lifestyle diseases & disorders research.'
      },
      {
        name: 'Ayurveda One Plus Ltd',
        type: 'Wholesale Distributors (Ayur Central)',
        description: 'Managing distribution of Ayurvedic products and medicines.'
      },
      {
        name: 'Viswadharma Mandiram',
        type: 'NGO - Social and Spiritual Organization',
        description: 'Active member contributing to social and spiritual welfare initiatives.'
      }
    ]
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchCompaniesContent();
  }, []);

  const fetchCompaniesContent = async () => {
    try {
      const docRef = doc(db, 'settings', 'companies');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setCompaniesContent(docSnap.data());
      }
    } catch (error) {
      console.error('Error fetching companies content:', error);
      setMessage({ text: 'Error fetching companies content', type: 'error' });
    }
  };

  const handleHeroChange = (e) => {
    const { name, value } = e.target;
    setCompaniesContent(prev => ({
      ...prev,
      hero: {
        ...prev.hero,
        [name]: value
      }
    }));
  };

  const handleCompanyChange = (index, field, value) => {
    setCompaniesContent(prev => {
      const newCompanies = [...prev.companies];
      if (field === 'affiliates') {
        newCompanies[index] = {
          ...newCompanies[index],
          affiliates: value.split('\n').map(affiliate => affiliate.trim()).filter(affiliate => affiliate)
        };
      } else {
        newCompanies[index] = {
          ...newCompanies[index],
          [field]: value
        };
      }
      return {
        ...prev,
        companies: newCompanies
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const docRef = doc(db, 'settings', 'companies');
      await updateDoc(docRef, companiesContent);
      setMessage({ text: 'Companies content updated successfully!', type: 'success' });
    } catch (error) {
      console.error('Error updating companies content:', error);
      setMessage({ text: 'Error updating companies content', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCompany = () => {
    setCompaniesContent(prev => ({
      ...prev,
      companies: [
        ...prev.companies,
        {
          name: '',
          position: '',
          description: '',
          type: '',
          period: '',
          affiliates: []
        }
      ]
    }));
  };

  return (
    <AdminLayout>
      {/* Your existing JSX content here */}
      <main className="flex-1 bg-white rounded-lg shadow p-6">
      <h1 className="text-3xl font-semibold text-[#2F5A3D]">Company Management</h1>
      <br />

        {message.text && (
          <div className={`p-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message.text}
          </div>
        )}
      <div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Hero Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Hero Section</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <div>
              <input
                type="text"
                name="title"
                value={companiesContent.hero.title}
                onChange={handleHeroChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subtitle</label>
              <input
                type="text"
                name="subtitle"
                value={companiesContent.hero.subtitle}
                onChange={handleHeroChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
              />
            </div>
          </div>

          {/* Companies List */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Companies</h3>
              <button
                type="button"
                onClick={handleAddCompany}
                className="px-4 py-2 bg-[#2F5A3D] text-white rounded hover:bg-[#244730]"
              >
                Add New Company
              </button>
            </div>
            {companiesContent.companies.map((company, index) => (
              <div key={index} className="p-4 border rounded-md space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company Name</label>
                  <input
                    type="text"
                    value={company.name}
                    onChange={(e) => handleCompanyChange(index, 'name', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
                  />
                </div>
                
                {company.position && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Position</label>
                    <input
                      type="text"
                      value={company.position}
                      onChange={(e) => handleCompanyChange(index, 'position', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
                    />
                  </div>
                )}

                {company.type && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <input
                      type="text"
                      value={company.type}
                      onChange={(e) => handleCompanyChange(index, 'type', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
                    />
                  </div>
                )}

                {company.period && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Period</label>
                    <input
                      type="text"
                      value={company.period}
                      onChange={(e) => handleCompanyChange(index, 'period', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
                    />
                  </div>
                )}

                {company.affiliates && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Affiliated Institutions (one per line)</label>
                    <textarea
                      value={company.affiliates.join('\n')}
                      onChange={(e) => handleCompanyChange(index, 'affiliates', e.target.value)}
                      rows="3"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={company.description}
                    onChange={(e) => handleCompanyChange(index, 'description', e.target.value)}
                    rows="3"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className=" px-4 py-2 bg-[#2F5A3D] text-white rounded hover:bg-[#244730] disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
          </div>
        </form>
        </div>
      </main>
    </AdminLayout>
    
  );
};

export default CompaniesManager;