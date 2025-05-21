import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { auth } from '../../firebase/config';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';

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
        name: 'Kalaga Integrated Health Care',
        position: 'Director',
        description: 'Overseeing marketing and herbal manufacturing operations.'
      },
      {
        name: 'Parathpara Integrated Healthcare',
        position: 'Director',
        description: 'Managing chain of clinics & hospitals providing integrated healthcare services.'
      },
      {
        name: 'Temple Services',
        position: 'Healthcare Consultant',
        description: 'Providing healthcare services at Sri Sringeri Shankara Mutt and Sambheswara Swami Temple.',
        affiliates: ['Sri Sringeri Shankara Mutt', 'Sambheswara Swami Temple']
      },
      {
        name: 'SKRS Oriental College',
        position: 'Academic Contributor',
        period: '1972 to 1974',
        description: 'Supporting Telugu language students and contributing to academic development.'
      },
      {
        name: 'Genome Foundation',
        position: 'Consultant',
        description: 'Specialist consultant in integrated medicine, lifestyle diseases & disorders.'
      },
      {
        name: 'Ayurveda One Pvt Ltd',
        position: 'Wholesale Distributor',
        description: 'Distribution of Ayurvedic products through Ayurcentral platform.'
      },
      {
        name: 'Viswadharma Mandiram',
        type: 'NGO',
        position: 'Member',
        description: 'Contributing to social & spiritual organization focused on community service.'
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
      if (!auth.currentUser) {
        throw new Error('You must be logged in to access this content');
      }
      const docRef = doc(db, 'settings', 'companies');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setCompaniesContent(docSnap.data());
      } else {
        await setDoc(docRef, companiesContent);
      }
    } catch (error) {
      console.error('Error fetching companies content:', error);
      setMessage({ text: `Error fetching companies content: ${error.message}`, type: 'error' });
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

  const handleRemoveCompany = (index) => {
    setCompaniesContent(prev => ({
      ...prev,
      companies: prev.companies.filter((_, i) => i !== index)
    }));
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

  return (
    <main className="space-y-6 p-6">
      <h1 className="text-3xl font-semibold text-[#2F5A3D]">Companies Management</h1>
      
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
            <Input
              name="title"
              value={companiesContent.hero.title}
              onChange={handleHeroChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Subtitle</label>
            <TextArea
              name="subtitle"
              value={companiesContent.hero.subtitle}
              onChange={handleHeroChange}
              rows="2"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2F5A3D] focus:ring-[#2F5A3D]"
            />
          </div>
        </section>

        {/* Companies List */}
        <section className="space-y-4 bg-white p-6 rounded-lg shadow">
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

          <div className="space-y-6">
            {companiesContent.companies.map((company, index) => (
              <div key={index} className="p-6 border rounded-lg space-y-4 bg-gray-50">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-medium">{company.name || 'New Company'}</h4>
                  <button
                    type="button"
                    onClick={() => handleRemoveCompany(index)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  >
                    Remove
                  </button>
                </div>

                <Input
                  label="Company Name"
                  value={company.name}
                  onChange={(e) => handleCompanyChange(index, 'name', e.target.value)}
                />

                <Input
                  label="Position"
                  value={company.position}
                  onChange={(e) => handleCompanyChange(index, 'position', e.target.value)}
                />

                <Input
                  label="Type"
                  value={company.type || ''}
                  onChange={(e) => handleCompanyChange(index, 'type', e.target.value)}
                />

                <Input
                  label="Period"
                  value={company.period || ''}
                  onChange={(e) => handleCompanyChange(index, 'period', e.target.value)}
                />

                <TextArea
                  label="Description"
                  value={company.description}
                  onChange={(e) => handleCompanyChange(index, 'description', e.target.value)}
                  rows="3"
                />

                <TextArea
                  label="Affiliates (one per line)"
                  value={company.affiliates ? company.affiliates.join('\n') : ''}
                  onChange={(e) => handleCompanyChange(index, 'affiliates', e.target.value)}
                  rows="2"
                  placeholder="Enter affiliates, one per line"
                />
              </div>
            ))}
          </div>
        </section>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#2F5A3D] text-white px-6 py-2 rounded-md hover:bg-opacity-90 disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </main>
  );
};

export default CompaniesManager;