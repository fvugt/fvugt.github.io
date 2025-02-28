import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const location = useLocation()
    
    const isActive = (path) => {
        return location.pathname === path
    }

    return (
        <header className="py-6 bg-black border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center">
                    {/* Logo/Branding */}
                    <Link to="/" className="text-white font-bold text-2xl tracking-tight hover:text-gray-300 transition-colors">
                        Frank van Vugt
                    </Link>
                    
                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link 
                            to="/" 
                            className={`text-lg transition-colors ${isActive('/') ? 'text-white font-medium' : 'text-gray-400 hover:text-white'}`}
                        >
                            Projects
                        </Link>
                        <Link 
                            to="/about" 
                            className={`text-lg transition-colors ${isActive('/about') ? 'text-white font-medium' : 'text-gray-400 hover:text-white'}`}
                        >
                            About me
                        </Link>
                        <Link 
                            to="/contact" 
                            className={`text-lg transition-colors ${isActive('/contact') ? 'text-white font-medium' : 'text-gray-400 hover:text-white'}`}
                        >
                            Contact
                        </Link>
                    </nav>
                    
                    {/* Mobile Menu Button */}
                    <button 
                        className="md:hidden text-white focus:outline-none"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
                
                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <nav className="mt-4 md:hidden space-y-3 pb-3">
                        <Link 
                            to="/" 
                            className={`block py-2 px-4 rounded-md ${isActive('/') ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-900 hover:text-white'}`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Projects
                        </Link>
                        <Link 
                            to="/about" 
                            className={`block py-2 px-4 rounded-md ${isActive('/about') ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-900 hover:text-white'}`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            About
                        </Link>
                        <Link 
                            to="/contact" 
                            className={`block py-2 px-4 rounded-md ${isActive('/contact') ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-900 hover:text-white'}`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Contact
                        </Link>
                    </nav>
                )}
            </div>
        </header>
    )
}

export default Header
