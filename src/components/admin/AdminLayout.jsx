import { useState } from 'react';
import Sidebar from './Sidebar';

const AdminLayout = ({ children, title }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#2F5A3D] text-white px-4 md:px-6 py-4 fixed top-0 w-full z-50 flex items-center justify-between">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden text-white p-2 hover:bg-[#234431] rounded-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-xl font-semibold text-center flex-1">ADMIN PORTAL</h1>
      </header>

      {/* Main Content */}
      <div className="flex pt-16">
        {/* Sidebar - Mobile Overlay */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}
          onClick={() => setIsSidebarOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={`fixed left-0 w-64 h-full z-50 transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
        >
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8 bg-gray-50 w-full lg:ml-64 transition-all duration-300">
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 max-w-7xl mx-auto">
            {title && (
              <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-[#2F5A3D]">{title}</h2>
            )}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;