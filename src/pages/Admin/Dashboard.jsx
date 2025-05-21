import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    services: 0,
    companies: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch services count
        const servicesDoc = await getDoc(doc(db, 'services_content', 'content'));
        const servicesData = servicesDoc.data();
        const servicesCount = Object.values(servicesData?.categories || {}).reduce(
          (total, category) => total + (category.services?.length || 0),
          0
        );

        // Fetch companies count
        const companiesDoc = await getDoc(doc(db, 'settings', 'companies'));
        const companiesData = companiesDoc.data();
        const companiesCount = companiesData?.companies?.length || 0;

        // Fetch products count
        const productsCollectionRef = collection(db, 'products');
        const productsSnapshot = await getDocs(productsCollectionRef);
        const productsCount = productsSnapshot.size;

        setStats({
          totalProducts: productsCount,
          services: servicesCount,
          companies: companiesCount
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold">Total Products</h3>
          <p className="text-4xl font-bold text-green-700">{stats.totalProducts}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold">Services</h3>
          <p className="text-4xl font-bold text-green-700">{stats.services}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold">Companies</h3>
          <p className="text-4xl font-bold text-green-700">{stats.companies}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/admin/products" className="flex flex-col items-center p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <span className="text-3xl mb-2">📦</span>
            <span className="font-semibold">Add New Product</span>
          </Link>
          <Link to="/admin/services" className="flex flex-col items-center p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <span className="text-3xl mb-2">🔧</span>
            <span className="font-semibold">Update Services</span>
          </Link>
          <Link to="/admin/companies" className="flex flex-col items-center p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <span className="text-3xl mb-2">🏢</span>
            <span className="font-semibold">Manage Companies</span>
          </Link>
          <Link to="/admin/social-services" className="flex flex-col items-center p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <span className="text-3xl mb-2">🤝</span>
            <span className="font-semibold">Social Services</span>
          </Link>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Welcome to CMS</h2>
        <p className="text-gray-600 mb-6">
          This dashboard provides quick access to manage your website content. Use the sidebar navigation to access different sections, or click on the quick action cards above to jump directly to specific tasks.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Getting Started</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Use the Products section to manage your product catalog</li>
            <li>• Update your services information in the Services section</li>
            <li>• Manage company information and affiliations</li>
            <li>• Update social services and initiatives</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;