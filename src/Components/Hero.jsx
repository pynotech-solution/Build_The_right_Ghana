import React from 'react';

const Hero = () => {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('src/assets/hero.png')",
        }}
      >
        {/* Dark Overlay to make text pop */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white">
        <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tight mb-6 drop-shadow-lg">
          Build the Right Ghana
        </h1>
        
        <p className="text-xl md:text-3xl font-semibold leading-relaxed drop-shadow-md">
          Let’s make a positive impact. <br className="hidden md:block" /> 
          Be a <span className="text-white">Citizen</span> not a <span className="text-white">Spectator.</span>
        </p>
      </div>
    </section>
  );
};

export default Hero;