import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header className="py-6 bg-black">
            <nav className="max-w-7xl mx-auto px-4 flex justify-center items-center">
                <Link to="/" className="text-white hover:text-green-500 transition-colors">
                    Projects
                </Link>
                <span className="mx-4 text-gray-400">/</span>
                <Link to="/resume" className="text-white hover:text-green-500 transition-colors">
                    Resume
                </Link>
                <span className="mx-4 text-gray-400">/</span>
                <Link to="/about" className="text-white hover:text-green-500 transition-colors">
                    About Me
                </Link>
            </nav>
        </header>
    )
}

export default Header
