import React from 'react';
import { MenuIcon } from 'lucide-react';
export const Header: React.FC = () => {
  return <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50">
      <div className="max-w-screen-xl mx-auto px-8 py-4 flex justify-between items-center">
        <a href="#" className="text-xl font-medium">
          Mason Ferré
        </a>
        <nav className="hidden md:flex gap-8">
          <a href="#about" className="hover:text-green-600 transition-colors">
            About
          </a>
          <a href="#projects" className="hover:text-blue-600 transition-colors">
            Work
          </a>
          <a href="#contact" className="hover:text-red-600 transition-colors">
            Contact
          </a>
          <a href="https://substack.com/@masonferre" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition-colors">
            Blog
          </a>
        </nav>
        <button className="md:hidden" aria-label="Menu">
          <MenuIcon className="w-6 h-6" />
        </button>
      </div>
    </header>;
};