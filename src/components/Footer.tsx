import React from 'react';
export const Footer = () => {
  return <footer className="py-8 px-6 bg-[#124734] border-t border-gray-300">
      <div className="max-w-5xl mx-auto text-center text-gray-200">
        <p>© {new Date().getFullYear()} Mason Ferré. All rights reserved.</p>
      </div>
    </footer>;
};