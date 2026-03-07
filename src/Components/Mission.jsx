import React from 'react';

const Mission = () => {
  return (
    <section className="py-20 px-6 md:px-20 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        
        {/* Left: Rounded Image Section */}
        <div className="w-full md:w-2/5">
          <div className="relative overflow-hidden rounded-[60px] shadow-2xl">
            <img 
              src="https://www.buildtherightghana.org/images/576/7003321/mission.jpg" 
              alt="Hands on tree trunk" 
              className="w-full h-[500px] object-cover"
            />
          </div>
        </div>

        {/* Right: Text Content Section */}
        <div className="w-full md:w-1/2 flex flex-col">
          <h3 className="text-[#448c6c] font-bold uppercase tracking-widest mb-4">
            OUR MISSION
          </h3>
          
          <h2 className="text-4xl md:text-6xl font-bold text-[#2d4e41] leading-tight mb-8">
            Our mission is to help the Earth breathe once more.
          </h2>
          
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-10 font-medium">
            Our mission is to contribute to the restoration of our planet's ability to breathe 
            freely once again. We believe that by working together and implementing 
            sustainable practices, we can rejuvenate the Earth, allowing it to thrive for 
            generations to come.
          </p>

          <div>
            <button className="bg-[#6db996] hover:bg-[#5aa885] text-white font-bold py-4 px-12 rounded-full transition-all uppercase tracking-wide shadow-md">
              Donate Now
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Mission;