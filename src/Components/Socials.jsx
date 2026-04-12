import React from 'react';
import { Twitter, Instagram, Send, MessageCircle, Music2 } from 'lucide-react';
import Reveal from './Reveal';

const Socials = () => {
  const socialLinks = [
    { name: 'X', icon: <Twitter />, color: 'hover:bg-black', url: 'https://x.com/btrghana' },
    { name: 'TikTok', icon: <Music2 />, color: 'hover:bg-neutral-900', url: 'https://www.tiktok.com/@btr.ghana?_r=1&_t=ZS-95JO0j7DV0n' },
    { name: 'Instagram', icon: <Instagram />, color: 'hover:bg-pink-600', url: 'https://www.instagram.com/btr_ghana1?igsh=MXY2enI2OTcwcjgz' },
    { name: 'Telegram', icon: <Send />, color: 'hover:bg-blue-500', url: 'https://t.me/+233206787141' },
    { name: 'WhatsApp', icon: <MessageCircle />, color: 'hover:bg-green-600', url: 'https://wa.me/message/IDT5BMBG5QBGD1' },
  ];

  return (
    <Reveal>
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
    </Reveal>
  );
};

export default Socials;
