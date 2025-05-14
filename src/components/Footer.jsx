import { Link } from "react-router-dom"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#2F5A3D] text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-white/60 text-sm">
            © {currentYear} Dr. KVGS Murthy - KALAGA Herbal Research Labs. All rights reserved.
          </p>
      
      </div>
    </footer>
  )
}

export default Footer