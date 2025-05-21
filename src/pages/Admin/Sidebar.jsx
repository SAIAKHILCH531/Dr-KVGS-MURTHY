import { Link, useLocation } from 'react-router-dom';
import { auth } from '../../firebase/config';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === `/admin/${path}`;
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div 
        className={`fixed inset-0 bg-gray-600 bg-opacity-50 transition-opacity lg:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-0 bottom-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 pt-20 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="h-full flex flex-col">
          {/* CMS Title */}
          {/* <div className="p-6 pb-2 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">CMS</h2>
          </div> */}

          {/* Navigation Links */}
          <nav className="flex-1 px-4 pb-4 overflow-y-auto">
            {[
              { path: 'dashboard', label: 'Dashboard' },
              { path: 'home', label: 'Home' },
              { path: 'about', label: 'About' },
              { path: 'services', label: 'Services' },
              { path: 'products', label: 'Products' },
              { path: 'social-services', label: 'Social-Services' },
              { path: 'companies', label: 'Companies' },
              { path: 'contact', label: 'Contact' },
              { path: 'contact-submissions', label: 'Contact Submissions'}
              
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={`/admin/${path}`}
                onClick={() => window.innerWidth < 1024 && onClose()}
                className={`block px-4 py-2 my-1 rounded-md transition-colors ${isActive(path)
                  ? 'bg-[#2F5A3D] text-white font-medium'
                  : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <Link
              to="/admin/login"
              onClick={() => {
                auth.signOut();
                onClose();
              }}
              className="flex items-center text-red-600 px-4 py-2 hover:bg-red-50 rounded-md"
            >
              <span>Logout</span>
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;