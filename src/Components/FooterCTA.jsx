import React, { useState, useEffect } from 'react';
import { X, CreditCard, Smartphone, Copy, Mail, MessageCircle, MessageSquare, Twitter, Instagram, Send, Music2 } from 'lucide-react';
import Reveal from './Reveal';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const FooterCTA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loadingPayments, setLoadingPayments] = useState(false);

  useEffect(() => {
    const fetchPayments = async () => {
      setLoadingPayments(true);
      try {
        const snapshot = await getDocs(collection(db, "paymentMethods"));
        setPaymentMethods(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      }
      setLoadingPayments(false);
    };

    if (isModalOpen) {
      fetchPayments();
    }
  }, [isModalOpen]);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    } catch {
      alert("Copy failed. Please copy it manually.");
    }
  };

  return (
    <Reveal>
    <section className="relative h-[60vh] flex items-center justify-center">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('assets/green_forest.png')" }}
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

              {loadingPayments ? (
                <p className="text-center text-gray-500 py-8">Loading payment methods...</p>
              ) : paymentMethods.length > 0 ? (
                paymentMethods.map((method) => (
                  <div key={method.id} className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-3 mb-4 text-[#2d4e41]">
                      {method.type === 'momo' ? <Smartphone className="w-6 h-6" /> : <CreditCard className="w-6 h-6" />}
                      <h4 className="font-bold text-lg">{method.type === 'momo' ? 'Mobile Money' : 'Bank Transfer'}</h4>
                    </div>
                    <div className="space-y-3 pl-2 border-l-2 border-[#2d4e41]/20 ml-2">
                      <div className="pl-4">
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">{method.provider}</p>
                        <div className="flex items-center gap-3">
                          <p className="text-xl font-mono font-bold text-gray-800 tracking-wide">{method.accountNumber}</p>
                          <button onClick={() => copyToClipboard(method.accountNumber.replace(/\s/g, ''))} className="text-gray-400 hover:text-[#2d4e41] transition-colors" title="Copy">
                            <Copy size={16} />
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 font-medium mt-1">{method.accountName}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-[#e6f0eb] text-[#448c6c] rounded-full flex items-center justify-center mb-4">
                    <MessageSquare size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-[#2d4e41] mb-2">Contact Support to Donate</h4>
                  <p className="text-gray-600 text-sm mb-6">
                    We are currently updating our payment methods. Please reach out to us directly, and we will assist you securely!
                  </p>
                  <div className="flex flex-col w-full gap-4">
                    <a 
                      href="mailto:solutionspynotech@gmail.com" 
                      className="flex items-center justify-center gap-2 w-full bg-[#ea4335] text-white font-bold py-3 rounded-lg hover:bg-[#d33426] transition-colors shadow-sm"
                    >
                      <Mail size={20} /> Email Admin
                    </a>
                    <div className="relative flex items-center py-2">
                      <div className="flex-grow border-t border-gray-300"></div>
                      <span className="flex-shrink-0 mx-4 text-gray-400 text-sm font-medium">or reach us on</span>
                      <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                      <a href="https://wa.me/message/IDT5BMBG5QBGD1" target="_blank" rel="noopener noreferrer" className="p-3 bg-[#25D366] text-white rounded-full hover:bg-[#20bd5a] transition-transform hover:scale-110 shadow-sm" title="WhatsApp"><MessageCircle size={20} /></a>
                      <a href="https://t.me/+233206787141" target="_blank" rel="noopener noreferrer" className="p-3 bg-[#0088cc] text-white rounded-full hover:bg-[#007ab8] transition-transform hover:scale-110 shadow-sm" title="Telegram"><Send size={20} /></a>
                      <a href="https://x.com/btrghana" target="_blank" rel="noopener noreferrer" className="p-3 bg-black text-white rounded-full hover:bg-gray-800 transition-transform hover:scale-110 shadow-sm" title="X (Twitter)"><Twitter size={20} /></a>
                      <a href="https://www.instagram.com/btr_ghana1?igsh=MXY2enI2OTcwcjgz" target="_blank" rel="noopener noreferrer" className="p-3 bg-[#E1306C] text-white rounded-full hover:bg-[#c92b60] transition-transform hover:scale-110 shadow-sm" title="Instagram"><Instagram size={20} /></a>
                      <a href="https://www.tiktok.com/@btr.ghana?_r=1&_t=ZS-95JO0j7DV0n" target="_blank" rel="noopener noreferrer" className="p-3 bg-[#000000] text-white rounded-full hover:bg-gray-800 transition-transform hover:scale-110 shadow-sm" title="TikTok"><Music2 size={20} /></a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
    </Reveal>
  );
};

export default FooterCTA;
