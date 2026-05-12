import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}

        <Link to="/" className="flex items-center gap-2">
          <div className="bg-blue-600 rounded-lg p-1.5">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0
                     002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 
                2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 
                  2 0 01-2-2z"
              />
            </svg>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">
            AI <span className="text-blue-400">Audit</span>
          </span>
        </Link>

        {/* Desktop Links */}

        <div className="hidden md:flex items-center gap-6">
            <Link to="/" className={`text-sm font-medium transition ${isActive("/")?"text-white":"text-gray-400 hover:text-white"}`}>
            Home
            </Link>
            <Link to="/audit" className={`text-sm font-medium transition ${
                isActive("/audit")
                ?"text-white"
                :"text-gray-400 hover:text-white"
            }`}>
                Audit Tool
            </Link>
            <a href="#how-it-works" className="text-sm font-medium text-gray-400 hover:text-white transition">How It Works</a>
            <a href="#faq" className="text-sm font-medium text-gray-400 hover:text-white transition ">
                FAQ
            </a>
        </div>

        {/* Desktop CTA */}

        <div className="hidden md:flex items-center gap-3">
            <span className="text-xs text-gray-500 bg-gray-800 px-3 py-1 rounded-full">
                Free . No login required
            </span>
            <Link to="/audit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
            Start Audit 
            </Link>
        </div>

        {/* Mobile Menu Button */}

        <button onClick={()=>setMenuOpen(!menuOpen)} className="md:hidden text-gray-400 hover:text-white transition">
            {menuOpen ?(
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"/>
                </svg>
            ):(
                <svg className="w-6 h-6" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16 "/>
                </svg>
            )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen &&
      <div className="md:hidden bg-gray-900 border-t border-gray-800 px-4 py-4 space-y-3">
        <Link to="/" onClick={()=>setMenuOpen(false)}
        className={`block text-sm font-medium py-2 transition ${
            isActive("/")?"text-white":"text-gray-400 hover:text-white"
        }`}>Home</Link>

        <Link to="/audit" onClick={()=>setMenuOpen(false)} className={`block text-sm font-medium py-2 transition ${
            isActive("/audit")?"text-white":"text-gray-400 hover:text-white"
        }`}>Audit Tool</Link>
        <a href="#how-it-works" onClick={()=>setMenuOpen(false)} className="block text-sm font-medium text-gray-400 hover:text-white py-2 transition">
            How It Works
        </a>
        <a href="#faq" onClick={()=>setMenuOpen(false)} className="block text-sm font-medium text-gray-400 hover:text-white py-2 transition">
            FAQ
        </a>
        <Link to="/audit" onClick={()=>setMenuOpen(false)} className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg text-sm font-semibold transition">Start Audit</Link>
      </div>
      }

    </nav>
  );
};

export default Navbar;
