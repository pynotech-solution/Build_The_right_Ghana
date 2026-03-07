import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Install lucide-react for icons

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Nav links helper to avoid repetition
  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT US', path: '/about' },
    { name: 'OUR PROJECTS', path: '/#projects' },
    { name: 'CONTACT US', path: '/#contact' },
    { name: 'BLOG', path: '/blog' },
  ];

  const handleNavClick = (path) => {
    if (path.includes('#')) {
      const id = path.split('#')[1];
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-white shadow-sm">
      {/* Logo Section */}
      <Link to="/" className="flex items-center">
        <img 
          src="https://www.buildtherightghana.org/images/803/19268596/IMG-20240421-WA0012-f59c1EJLAv_GSvI_LtUCmg.jpg" 
          alt="Build The Right Ghana Logo" 
          className="h-10 md:h-14 w-auto"
        />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-3">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            onClick={() => handleNavClick(link.path)}
            className="px-6 py-2 bg-[#448c6c] text-white rounded-full font-bold text-sm hover:bg-[#366d54] transition-all uppercase tracking-wider"
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Mobile Toggle Button (Hamburger) */}
      <button 
        onClick={toggleMenu}
        className="md:hidden p-2 text-[#448c6c] focus:outline-none"
      >
        <Menu size={32} />
      </button>

      {/* FULL SCREEN MOBILE OVERLAY */}
      {/* Matches the layout in your final image_466158.png */}
      <div 
        className={`fixed inset-0 bg-[#d9e8e0] z-[60] flex flex-col items-center justify-center transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close Button (The X) */}
        <button 
          onClick={toggleMenu}
          className="absolute top-6 right-8 text-[#448c6c]/60 hover:text-[#448c6c]"
        >
          <X size={48} strokeWidth={1} />
        </button>

        {/* Logo in the top left of the menu overlay */}
        <div className="absolute top-6 left-6">
           <img 
            src="https://www.buildtherightghana.org/images/803/19268596/IMG-20240421-WA0012-f59c1EJLAv_GSvI_LtUCmg.jpg" 
            alt="Logo" 
            className="h-10 w-auto"
          />
        </div>

        {/* Centered Pill Buttons */}
        <nav className="flex flex-col space-y-6 w-full px-12 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => {
                toggleMenu();
                handleNavClick(link.path);
              }}
              className="w-full max-w-[280px] py-4 bg-[#448c6c] text-white rounded-[40px] font-bold text-center text-xl hover:bg-[#366d54] transition-all shadow-md"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;