import React from 'react';

const CompanyCard = ({ company }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <h3 className="text-2xl font-bold text-[#2F5A3D] mb-4">{company.name}</h3>
      {company.position && (
        <p className="text-gray-700 mb-2">Position: {company.position}</p>
      )}
      {company.type && (
        <p className="text-gray-700 mb-2">Type: {company.type}</p>
      )}
      {company.period && (
        <p className="text-gray-700 mb-2">Period: {company.period}</p>
      )}
      {company.affiliates && company.affiliates.length > 0 && (
        <div className="mb-2">
          <p className="text-gray-700">Affiliated Institutions:</p>
          <ul className="list-disc list-inside pl-4">
            {company.affiliates.map((affiliate, index) => (
              <li key={index} className="text-gray-600">{affiliate}</li>
            ))}
          </ul>
        </div>
      )}
      <p className="text-gray-600">{company.description}</p>
    </div>
  );
};

export default CompanyCard;