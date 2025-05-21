import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../../layout/AdminLayout';
import Dashboard from './Dashboard';
import HomeManager from './HomeManager';
import AboutManager from './AboutManager';
import ServicesManager from './ServicesManager';
import ProductManager from './ProductManager';
import CompaniesManager from './CompaniesManager';
import SocialServicesManager from './SocialServicesManager';
import ContactManager from './ContactManager';
import ContactSubmissions from './ContactSubmissions';
import Login from './Login';
import ProtectedRoute from '../../components/ProtectedRoute';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<Login />} />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/home" element={<HomeManager />} />
                <Route path="/about" element={<AboutManager />} />
                <Route path="/services" element={<ServicesManager />} />
                <Route path="/products" element={<ProductManager />} />
                <Route path="/companies" element={<CompaniesManager />} />
                <Route path="/social-services" element={<SocialServicesManager />} />
                <Route path="/contact" element={<ContactManager />} />
                <Route path="/contact-submissions" element={<ContactSubmissions />} />
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;