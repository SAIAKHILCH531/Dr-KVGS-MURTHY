import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "./ui/button"
import { Menu, X } from "lucide-react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Products", path: "/products" },
    { name: "Social Services", path: "/social-services" },
    { name: "Companies", path: "/companies" },
    { name: "Contact", path: "/contact" },
  ]

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="font-heading font-bold text-xl text-primary">Dr. KVGS Murthy</span>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${location.pathname === link.path
                  ? "text-white bg-[#2F5A3D] shadow-lg"
                  : "text-foreground hover:text-[#2F5A3D] hover:shadow-md hover:bg-[#2F5A3D]/10"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="flex md:hidden items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2"
              aria-label="Main menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-b border-border">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-all ${location.pathname === link.path
                ? "text-white bg-[#2F5A3D] shadow-lg"
                : "text-foreground hover:text-[#2F5A3D] hover:shadow-md hover:bg-[#2F5A3D]/10"
              }`}
              onClick={closeMenu}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar