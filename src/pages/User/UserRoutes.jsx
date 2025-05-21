import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Services from './Services';
import Products from './Products';
import Companies from './Companies';
import SocialServices from './SocialServices';
import Contact from './Contact';

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/products" element={<Products />} />
      <Route path="/companies" element={<Companies />} />
      <Route path="/social-services" element={<SocialServices />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default UserRoutes;