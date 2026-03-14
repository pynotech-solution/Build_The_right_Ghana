import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Target, Heart } from 'lucide-react';
import Socials from '../Components/Socials';
import Reveal from '../Components/Reveal';

const FullAboutPage = () => {
  const navigate = useNavigate();

  return (
    <main className="pt-24 bg-white min-h-screen">

<section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
  {/* Background Image & Overlay */}
  <div 
    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
    style={{ 
      backgroundImage: "url('https://www.buildtherightghana.org/images/803/19268596/IMG-20240421-WA0012-f59c1EJLAv_GSvI_LtUCmg.jpg')", // A forest/nature background matching your theme
    }}
  >

    <div className="absolute inset-0 bg-[#2d4a3e]/60"></div>
  </div>

  {/* Content */}
  <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
    <button 
      onClick={() => navigate('/')}
      className="flex items-center gap-2 text-[#6db996] font-bold uppercase text-sm mb-6 hover:text-white transition-all mx-auto bg-black/20 px-4 py-2 rounded-full"
    >
      <ArrowLeft size={18} /> Back to Home
    </button>
    
    <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
      Our Story
    </h1>
    
    <p className="text-[#6db996] font-semibold text-xl uppercase tracking-widest drop-shadow-md">
      Empowering the ordinary Ghanaian
    </p>
  </div>
</section>

      {/* 2. Deep Dive Content */}
      <section className="py-20 px-6 md:px-20">
        <Reveal>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Image and Key Info */}
            <div className="md:col-span-4 sticky top-28">
               <img 
                src="https://www.buildtherightghana.org/images/576/19269745/IMG-20220119-WA0016-kMZPJnEJAtXKmD2V26ljBA.jpg" 
                alt="Founder" 
                className="w-full h-auto rounded-[40px] shadow-xl border-4 border-gray-100 mb-6"
              />
              <div className="bg-[#2d4a3e] p-6 rounded-2xl text-white">
                <h4 className="font-bold text-lg mb-2">Established</h4>
                <p className="text-gray-300 mb-4">Focusing on personal security and welfare.</p>
                <div className="border-t border-white/20 pt-4">
                  <p className="italic">"Be a Citizen, not a Spectator."</p>
                </div>
              </div>
            </div>

            {/* Right Column: Expanded Text */}
            <div className="md:col-span-8 space-y-8 text-lg text-gray-700 leading-relaxed">
              <h2 className="text-3xl font-bold text-[#2d4a3e]">The Vision of the Ordinary Ghanaian</h2>
              <p>
                Build The Right Ghana was founded on the principal concerns of the welfare and personal 
                security of the ordinary Ghanaian. We recognized a gap in the sensitization of public 
                values and the need for a stronger advocacy voice for those who feel unheard.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
                <div className="flex gap-4">
                  <div className="text-[#448c6c]"><ShieldCheck size={32} /></div>
                  <div>
                    <h5 className="font-bold text-[#2d4a3e]">Human Rights</h5>
                    <p className="text-sm">Protecting fundamental freedoms for every individual.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-[#448c6c]"><Target size={32} /></div>
                  <div>
                    <h5 className="font-bold text-[#2d4a3e]">Poverty Alleviation</h5>
                    <p className="text-sm">Empowering the less privileged through skills training.</p>
                  </div>
                </div>
              </div>

              <p>
                Our commitment extends beyond mere words. We are active in environmental protection 
                advocacy, believing that a clean and sustainable environment is a human right. 
                Through our entrepreneurship programs, we have seen women transform from spectators 
                into active citizens driving their local economies.
              </p>

              <h3 className="text-2xl font-bold text-[#2d4a3e] pt-4">Our Commitment to Tolerance</h3>
              <p>
                In a diverse nation, religious and tribal tolerance is the bedrock of peace. 
                We work tirelessly with local schools and community leaders to educate the 
                youth on Ghanaian values, ensuring that the future of Ghana is built on 
                mutual respect and unity.
              </p>
            </div>

          </div>
        </div>
        </Reveal>
      </section>

      <Socials />

      {/* 3. Call to Action Footer */}
      <Reveal>
      <section className="bg-[#2d4a3e] py-16 px-6 text-center text-white">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 italic">Join us in building a better Ghana.</h2>
        <button 
          onClick={() => navigate('/#contact')}
          className="bg-[#6db996] hover:bg-[#5aa885] text-white font-bold py-4 px-12 rounded-full uppercase transition-all shadow-lg"
        >
          Get Involved Now
        </button>
      </section>
      </Reveal>
    </main>
  );
};

export default FullAboutPage;