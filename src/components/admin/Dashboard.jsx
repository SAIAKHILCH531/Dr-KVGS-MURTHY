import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    services: 0,
    companies: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const productsSnapshot = await getDocs(collection(db, 'products'));
      const servicesSnapshot = await getDocs(collection(db, 'settings'));
      const companiesSnapshot = await getDocs(collection(db, 'settings'));

      setStats({
        products: productsSnapshot.size,
        services: servicesSnapshot.size,
        companies: companiesSnapshot.size
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const quickLinks = [
    { title: 'Add New Product', path: '/admin/products', icon: '📦' },
    { title: 'Update Services', path: '/admin/services', icon: '🔧' },
    { title: 'Manage Companies', path: '/admin/companies', icon: '🏢' },
    { title: 'Social Services', path: '/admin/social-services', icon: '🤝' }
  ];

  return (
    <AdminLayout>
        <main className="flex-1 space-y-6">
        <h1 className="text-3xl font-semibold text-[#2F5A3D]">Dashboard Management</h1>
        <br />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold">Total Products</h3>
              <p className="text-3xl font-bold text-[#2F5A3D]">{stats.products}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold">Services</h3>
              <p className="text-3xl font-bold text-[#2F5A3D]">{stats.services}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold">Companies</h3>
              <p className="text-3xl font-bold text-[#2F5A3D]">{stats.companies}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors flex flex-col items-center text-center"
                >
                  <span className="text-2xl mb-2">{link.icon}</span>
                  <span className="font-medium">{link.title}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Welcome to CMS</h2>
            <p className="text-gray-600">
              This dashboard provides quick access to manage your website content. Use the sidebar
              navigation to access different sections, or click on the quick action cards above to
              jump directly to specific tasks.
            </p>
            <div className="mt-4 p-4 bg-[#f3f9f3] rounded-lg">
              <h3 className="font-semibold mb-2">Getting Started</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Use the Products section to manage your product catalog</li>
                <li>Update your services information in the Services section</li>
                <li>Manage company information and affiliations</li>
                <li>Update social services and initiatives</li>
              </ul>
            </div>
          </div>
        </main>
      </AdminLayout>
  );
};

export default Dashboard;