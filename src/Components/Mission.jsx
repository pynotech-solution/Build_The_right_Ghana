import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Copy } from 'lucide-react';

const Mission = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

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
            <button 
              onClick={toggleModal}
              className="bg-[#6db996] hover:bg-[#5aa885] text-white font-bold py-4 px-12 rounded-full transition-all uppercase tracking-wide shadow-md"
            >
              Donate Now
            </button>
          </div>
        </div>

      </div>

      {/* Donation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={toggleModal}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
            {/* Header */}
            <div className="bg-[#2d4e41] p-6 text-white flex justify-between items-center">
              <h3 className="text-2xl font-bold">Support Our Cause</h3>
              <button onClick={toggleModal} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Body */}
            <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <p className="text-gray-600 text-center">
                Your contribution helps us build the right Ghana. Choose your preferred payment method below.
              </p>

              {/* Mobile Money Section */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-4 text-[#2d4e41]">
                  <Smartphone className="w-6 h-6" />
                  <h4 className="font-bold text-lg">Mobile Money</h4>
                </div>
                <div className="space-y-3 pl-2 border-l-2 border-[#2d4e41]/20 ml-2">
                  <div className="pl-4">
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Momo Number</p>
                    <div className="flex items-center gap-3">
                      <p className="text-xl font-mono font-bold text-gray-800 tracking-wide">024 427 1160</p>
                      <button onClick={() => copyToClipboard("0244271160")} className="text-gray-400 hover:text-[#2d4e41] transition-colors" title="Copy">
                        <Copy size={16} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 font-medium mt-1">Build The Right Ghana</p>
                  </div>
                </div>
              </div>

              {/* Bank Details Section */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-4 text-[#2d4e41]">
                  <CreditCard className="w-6 h-6" />
                  <h4 className="font-bold text-lg">Bank Transfer</h4>
                </div>
                <div className="space-y-3 pl-2 border-l-2 border-[#2d4e41]/20 ml-2">
                  <div className="pl-4">
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Bank Name</p>
                    <p className="text-gray-800 font-bold">GCB Bank</p>
                  </div>
                  <div className="pl-4">
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Account Number</p>
                    <div className="flex items-center gap-3">
                      <p className="text-xl font-mono font-bold text-gray-800 tracking-wide">1234567890123</p>
                      <button onClick={() => copyToClipboard("1234567890123")} className="text-gray-400 hover:text-[#2d4e41] transition-colors" title="Copy">
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Mission;