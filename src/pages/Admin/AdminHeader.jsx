import React from 'react';

const AdminHeader = ({ onMenuClick, onLogout }) => {
  return (
    <header className="bg-[#2F5A3D] text-white px-4 py-4 fixed top-0 w-full z-50 flex items-center justify-between shadow-lg">
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-[#234431] rounded-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-xl font-semibold ml-4 "> ADMIN PORTAL</h1>
      </div>
     
    </header>
  );
};

export default AdminHeader;