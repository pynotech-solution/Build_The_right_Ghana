import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Copy } from 'lucide-react';

const FooterCTA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <section className="relative h-[60vh] flex items-center justify-center">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('src/assets/green_forest.png')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Let’s make a positive <br /> impact together
        </h2>
        <p className="text-white text-xl md:text-2xl mb-10 max-w-2xl mx-auto font-medium">
          Nothing is too small to lend a helping hand. Together we can make the 
          world a better place for every individual.
        </p>
        <button 
          onClick={toggleModal}
          className="bg-[#6db996] hover:bg-[#5aa885] text-white font-bold py-4 px-12 rounded-full transition-all uppercase text-lg shadow-xl"
        >
          Donate Now
        </button>
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

export default FooterCTA;