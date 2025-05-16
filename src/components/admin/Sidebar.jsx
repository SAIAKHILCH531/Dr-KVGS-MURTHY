import { Link, useLocation } from 'react-router-dom';
import { auth } from '../../firebase/config';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === `/admin/${path}`;
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <aside className="w-64 bg-white rounded-lg shadow-lg p-6 mt-4 h-[calc(100vh-5rem)] flex flex-col">
      <nav className="flex-1 flex flex-col">
        {/* CMS Title */}
        <div className="mb-6 pb-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-[#2F5A3D]">CMS</h2>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 space-y-2 overflow-y-auto">
          {[
            { path: 'dashboard', label: 'Dashboard' },
            { path: 'home', label: 'Home' },
            { path: 'about', label: 'About' },
            { path: 'services', label: 'Services' },
            { path: 'products', label: 'Products' },
            { path: 'companies', label: 'Companies' },
            { path: 'social-services', label: 'Social Services' },
            { path: 'contact', label: 'Contact' }
          ].map(({ path, label }) => (
            <Link
              key={path}
              to={`/admin/${path}`}
              className={`block px-4 py-2.5 rounded-md transition-all duration-200 font-medium ${isActive(path)
                ? 'bg-[#2F5A3D] text-white shadow-sm'
                : 'text-gray-600 hover:bg-[#2F5A3D]/10 hover:text-[#2F5A3D]'}`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Logout Button - Always visible at bottom */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2.5 rounded-md transition-all duration-200 text-left font-medium text-red-600 hover:bg-red-50 hover:shadow-sm flex items-center justify-between"
          >
            <span>Logout</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;