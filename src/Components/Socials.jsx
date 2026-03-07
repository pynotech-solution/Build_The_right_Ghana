import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Send } from 'lucide-react';

const Socials = () => {
  const socialLinks = [
    { name: 'Facebook', icon: <Facebook />, color: 'hover:bg-blue-600', url: '#' },
    { name: 'Twitter', icon: <Twitter />, color: 'hover:bg-sky-500', url: '#' },
    { name: 'Instagram', icon: <Instagram />, color: 'hover:bg-pink-600', url: '#' },
    { name: 'YouTube', icon: <Youtube />, color: 'hover:bg-red-600', url: '#' },
    { name: 'Telegram', icon: <Send />, color: 'hover:bg-blue-400', url: '#' },
  ];

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h3 className="text-[#448c6c] font-bold uppercase tracking-widest mb-4">
          STAY CONNECTED
        </h3>
        <h2 className="text-3xl md:text-5xl font-bold text-[#2d4e41] mb-12">
          Reach out on our socials
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 px-8 py-4 bg-gray-50 text-[#2d4e41] rounded-full font-bold transition-all duration-300 shadow-sm border border-gray-200 hover:text-white ${social.color} hover:scale-105`}
            >
              {social.icon}
              <span className="uppercase tracking-wider">{social.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Socials;