import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AdminRoutes from './pages/Admin/AdminRoutes'
import UserRoutes from './pages/User/UserRoutes'
import ScrollToTop from './components/ScrollToTop'

const AppContent = () => {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow w-full max-w-[1920px] mx-auto">
        {isAdminRoute ? <AdminRoutes /> : <UserRoutes />}
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  )
}

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  )
}

export default App