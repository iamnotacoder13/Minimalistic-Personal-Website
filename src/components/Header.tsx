import React, { useState } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full bg-[#124734]/80 backdrop-blur-sm z-50">
      <div className="max-w-screen-xl mx-auto px-8 py-4 flex justify-between items-center">
        <a href="#" className="text-xl font-medium text-white">
          Mason Ferré
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          <a href="#about" className="text-white hover:text-[#ff6b35] transition-colors">
            About
          </a>
          <a href="#projects" className="text-white hover:text-[#ff6b35] transition-colors">
            Work
          </a>
          <a href="#contact" className="text-white hover:text-[#ff6b35] transition-colors">
            Contact
          </a>
          <a href="https://substack.com/@masonferre" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#ff6b35] transition-colors">
            Blog
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden" 
          aria-label="Menu"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200">
          <nav className="flex flex-col py-4 px-8 space-y-4">
            <a 
              href="#about" 
              className="hover:text-green-600 transition-colors py-2"
              onClick={closeMenu}
            >
              About
            </a>
            <a 
              href="#projects" 
              className="hover:text-blue-600 transition-colors py-2"
              onClick={closeMenu}
            >
              Work
            </a>
            <a 
              href="#contact" 
              className="hover:text-red-600 transition-colors py-2"
              onClick={closeMenu}
            >
              Contact
            </a>
            <a 
              href="https://substack.com/@masonferre" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-purple-600 transition-colors py-2"
              onClick={closeMenu}
            >
              Blog
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};