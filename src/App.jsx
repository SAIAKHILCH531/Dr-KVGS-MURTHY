import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar'
import HeroSection from './assets/pages/Home'
import About from './assets/pages/About'
import Services from './assets/pages/Services'
import Products from './assets/pages/Products'
import Companies from './assets/pages/Companies'
import SocialServices from './assets/pages/SocialServices'
import Contact from './assets/pages/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Login from './components/admin/Login';
import HomeManager from './components/admin/HomeManager';
import AboutManager from './components/admin/AboutManager';
import ServicesManager from './components/admin/ServicesManager';
import ProductManager from './components/admin/ProductManager';
import CompaniesManager from './components/admin/CompaniesManager';
import SocialServicesManager from './components/admin/SocialServicesManager';
import ContactManager from './components/admin/ContactManager';
import Dashboard from './components/admin/Dashboard';
import { Navigate } from 'react-router-dom';
import { auth } from './firebase/config';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAuthenticated(!!user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!authenticated) return <Navigate to="/admin/login" replace />;
  return children;
};

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/home" element={<HeroSection />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/social-services" element={<SocialServices />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/home" element={<ProtectedRoute><HomeManager /></ProtectedRoute>} />
          <Route path="/admin/about" element={<ProtectedRoute><AboutManager /></ProtectedRoute>} />
          <Route path="/admin/services" element={<ProtectedRoute><ServicesManager /></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute><ProductManager /></ProtectedRoute>} />
          <Route path="/admin/companies" element={<ProtectedRoute><CompaniesManager /></ProtectedRoute>} />
          <Route path="/admin/social-services" element={<ProtectedRoute><SocialServicesManager /></ProtectedRoute>} />
          <Route path="/admin/contact" element={<ProtectedRoute><ContactManager /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
};

export default App