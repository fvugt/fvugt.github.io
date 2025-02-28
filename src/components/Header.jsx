import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Container from './Container'
import aboutData from '../data/about.json'

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMenuOpen(false)
    }, [location])

    return (
        // <header className={`sticky top-0 z-50 transition-all duration-300 ${
        //     scrolled ? 'bg-backgroundColor/90 backdrop-blur-md shadow-md' : 'bg-transparent'
        // }`}>
        <header className={`sticky top-0 z-50 bg-boxColorB`}>
            <Container>
                <div className="flex items-center justify-between py-4">
                    {/* Logo - Now using name from about.json */}
                    <Link to="/" className="text-white font-bold text-xl ml-4">
                        {aboutData.name}
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex gap-4 justify-center">
                        <NavLink to="/" label="Projects" currentPath={location.pathname} />
                        <NavLink to="/about" label="About" currentPath={location.pathname} />
                        <NavLink to="/contact" label="Contact" currentPath={location.pathname} />
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <nav className="md:hidden py-4 border-t border-white/10 space-y-4">
                        <MobileNavLink to="/" label="Projects" currentPath={location.pathname} />
                        <MobileNavLink to="/about" label="About" currentPath={location.pathname} />
                        <MobileNavLink to="/contact" label="Contact" currentPath={location.pathname} />
                    </nav>
                )}
            <div className="w-full h-[1px] bg-white/20 "></div>

            </Container>
        </header>
    )
}

// Desktop Navigation Link
function NavLink({ to, label, currentPath }) {
    const isActive = currentPath === to || (to !== '/' && currentPath.startsWith(to))

    return (
        <Link
            to={to}
            className={`relative py-2 px-4 text-center w-[100px] inline-block transition-colors ${isActive
                    ? 'text-white font-medium'
                    : 'text-gray-400 hover:text-white'
                }`}
        >
            {label}
            {isActive && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-accentColor rounded-full"></span>
            )}
        </Link>
    )
}

// Mobile Navigation Link
function MobileNavLink({ to, label, currentPath }) {
    const isActive = currentPath === to || (to !== '/' && currentPath.startsWith(to))

    return (
        <Link
            to={to}
            className={`block py-2 px-4 rounded-md ${isActive
                    ? 'bg-backgroundBColor text-white font-medium'
                    : 'text-gray-400 hover:text-white hover:bg-backgroundBColor/50'
                }`}
        >
            {label}
        </Link>
    )
}

export default Header
