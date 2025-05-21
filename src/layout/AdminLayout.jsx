import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../pages/Admin/Sidebar';
import AdminHeader from '../pages/Admin/AdminHeader';

const AdminLayout = ({ children, title }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader 
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} 
        className="fixed top-0 left-0 right-0 z-50"
      />
      <div className="flex min-h-screen pt-16"> {/* Container for sidebar and main content */}
        <div className="lg:block lg:static lg:w-64">
          <Sidebar 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)}
            className="h-full overflow-y-auto bg-white shadow-lg"
          />
        </div>
        <div className="flex-1 transition-all duration-300">
          <main>
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-6">
              {title && (
                <h2 className="text-2xl font-semibold mb-6 text-[#2F5A3D] border-b pb-4">
                  {title}
                </h2>
              )}
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;