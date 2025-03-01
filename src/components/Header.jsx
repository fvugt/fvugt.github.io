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
                        {aboutData.websiteTitle}
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
    // Check if this is a project detail page and we're on the Projects nav item
    const isProjectPage = currentPath.startsWith('/projects/')
    const isProjectsNavItem = to === '/'
    
    // Determine if this nav item should be active
    const isActive = 
        currentPath === to || 
        (to !== '/' && currentPath.startsWith(to)) ||
        (isProjectPage && isProjectsNavItem)

    // Use a fixed width for all navigation items to prevent layout shifts
    return (
        <div className="inline-block w-24 text-center">
            <Link
                to={to}
                className={`py-2 px-4 inline-block transition-colors ${
                    isActive ? 'text-white font-medium' : 'text-gray-400 hover:text-white'
                }`}
            >
                {label}
            </Link>
            {isActive && (
                <div className="h-0.5 bg-accentColor rounded-full mx-auto mt-1 w-16"></div>
            )}
            {/* Add an invisible placeholder when not active to maintain height */}
            {!isActive && (
                <div className="h-0.5 bg-transparent rounded-full mx-auto mt-1 w-16"></div>
            )}
        </div>
    )
}

// Mobile Navigation Link
function MobileNavLink({ to, label, currentPath }) {
    // Check if this is a project detail page and we're on the Projects nav item
    const isProjectPage = currentPath.startsWith('/projects/')
    const isProjectsNavItem = to === '/'
    
    // Determine if this nav item should be active
    const isActive = 
        currentPath === to || 
        (to !== '/' && currentPath.startsWith(to)) ||
        (isProjectPage && isProjectsNavItem)

    return (
        <Link
            to={to}
            className={`block py-2 px-4 rounded-md font-medium ${isActive
                    ? 'bg-backgroundBColor text-white'
                    : 'text-gray-400 hover:text-white hover:bg-backgroundBColor/50'
                }`}
        >
            {label}
        </Link>
    )
}

export default Header
