import React from 'react';

const Header = () => {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
      {/* Logo Section */}
      <div className="flex items-center">
        <img 
          src="https://www.buildtherightghana.org/images/803/19268596/IMG-20240421-WA0012-f59c1EJLAv_GSvI_LtUCmg.jpg" 
          alt="Build The Right Ghana Logo" 
          className="h-12 w-auto"
        />
      </div>

      {/* Navigation Menu */}
      <nav className="hidden md:flex items-center space-x-4">
        <a href="/" className="px-6 py-2 bg-[#448c6c] text-white rounded-full font-medium hover:bg-[#366d54] transition">
          HOME
        </a>
        <a href="#" className="px-6 py-2 bg-[#448c6c] text-white rounded-full font-medium hover:bg-[#366d54] transition">
          ABOUT US
        </a>
        <a href="#" className="px-6 py-2 bg-[#448c6c] text-white rounded-full font-medium hover:bg-[#366d54] transition">
          OUR PROJECTS
        </a>
        <a href="#" className="px-6 py-2 bg-[#448c6c] text-white rounded-full font-medium hover:bg-[#366d54] transition">
          CONTACT US
        </a>
        <a href="/blog" className="px-6 py-2 bg-[#448c6c] text-white rounded-full font-medium hover:bg-[#366d54] transition">
          BLOG
        </a>
      </nav>

      {/* Mobile Toggle (Optional) */}
      <div className="md:hidden">
        <button className="text-gray-600 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;