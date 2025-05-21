import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import CompanyCard from '../../components/CompanyCard';

const Companies = () => {
  const [companiesData, setCompaniesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompaniesContent = async () => {
      try {
        const docRef = doc(db, 'settings', 'companies');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setCompaniesData(docSnap.data());
        } else {
          setError('No companies data found');
        }
      } catch (error) {
        console.error('Error fetching companies content:', error);
        setError('Error loading companies data');
      } finally {
        setLoading(false);
      }
    };

    fetchCompaniesContent();
  }, []);

  if (loading) {
    return <div className="container mx-auto px-4 py-16 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-16 text-center text-red-600">{error}</div>;
  }

  return (
    <div>
      {/* Hero section */}
      <div className="bg-[#2F5A3D] text-white py-14">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{companiesData.hero.title}</h1>
          <p className="text-xl max-w-3xl mx-auto">
            {companiesData.hero.subtitle}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {companiesData.companies.map((company, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold text-[#2F5A3D] mb-2">{company.name}</h3>
              <div className="inline-block bg-[#2F5A3D]/10 text-[#2F5A3D] font-semibold px-3 py-1 rounded-full text-sm mb-3">
                {company.position}
              </div>
              {company.period && (
                <div className="text-sm text-gray-500 mb-2">{company.period}</div>
              )}
              <p className="text-gray-600">{company.description}</p>
              {company.affiliates && (
                <div className="mt-3 text-sm text-gray-500">
                  <span className="font-medium">Affiliates:</span>
                  <ul className="list-disc list-inside mt-1">
                    {company.affiliates.map((affiliate, idx) => (
                      <li key={idx}>{affiliate}</li>
                    ))}                    
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Companies;