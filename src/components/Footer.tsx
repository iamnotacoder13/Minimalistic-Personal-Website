import React from 'react';
export const Footer = () => {
  return <footer className="py-8 px-6 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto text-center text-gray-600">
        <p>© {new Date().getFullYear()} Mason Ferré. All rights reserved.</p>
      </div>
    </footer>;
};