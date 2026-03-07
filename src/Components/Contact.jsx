import React, { useEffect, useState, useRef } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { RotateCw, MapPin, MessageSquare, X, Check } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    phone: '',
    email: '',
    message: '',
    privacyAccepted: false
  });
  const [popup, setPopup] = useState({
    show: false,
    message: '',
    type: 'success' // 'success' or 'error'
  });

  useEffect(() => {
    // Initialize captcha: 6 chars, light gray bg, dark green text
    loadCaptchaEnginge(6, '#f3f4f6', '#2d4e41');
  }, []);

  const handleReload = () => {
    loadCaptchaEnginge(6, '#f3f4f6', '#2d4e41');
    document.getElementById('user_captcha_input').value = "";
  };

  const closePopup = () => setPopup({ ...popup, show: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    const user_captcha_value = document.getElementById('user_captcha_input').value;

    if (validateCaptcha(user_captcha_value)) {
      // Replace with your actual Service ID, Template ID, and Public Key
      emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
        .then((result) => {
          console.log("Email sent:", result.text);
          setPopup({ show: true, message: 'Message sent successfully!', type: 'success' });
          setFormData({
            company: '',
            name: '',
            phone: '',
            email: '',
            message: '',
            privacyAccepted: false
          });
          e.target.reset();
          document.getElementById('user_captcha_input').value = "";
        }, (error) => {
          console.log("Email error:", error.text);
          setPopup({ show: true, message: 'Failed to send message. Please try again.', type: 'error' });
        });
    } else {
      setPopup({ show: true, message: 'Captcha is incorrect. Please try again.', type: 'error' });
      document.getElementById('user_captcha_input').value = "";
    }
  };

  return (
    <section  className="w-full bg-[#8eb39b]">
      {/* 1. Map Section */}
      <div className="relative h-[350px] md:h-[500px] w-full">
        <iframe
          title="Ghana Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127065.3482470775!2d-0.3117467657106001!3d5.59021303845014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b7a773%3A0xbed14ed8650e2dd3!2sAccra%2C%20Ghana!5e0!3m2!1sen!2sgh!4v1700000000000!5m2!1sen!2sgh"
          className="absolute inset-0 w-full h-full border-0 grayscale-[20%]"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* 2. Content Container */}
      <div className="relative px-6 md:px-20 pb-16 md:pb-32 flex flex-col lg:grid lg:grid-cols-3 gap-12 text-center text-[#2d4e41]">
        
        {/* ORDER 1: ADDRESS (Top on mobile) */}
        <div className="order-1 lg:col-start-1 lg:row-start-1 flex flex-col items-center pt-12 md:pt-24">
          <div className="bg-[#2d4e41] p-4 rounded-full text-white mb-4">
            <MapPin size={32} />
          </div>
          <h3 className="text-3xl font-bold mb-2">Address</h3>
          <p className="uppercase font-bold text-sm tracking-wide">Oblogo Road</p>
          <p className="uppercase font-bold text-sm tracking-wide">Accra</p>
          <div className="mt-8 text-xs font-bold border-t border-[#2d4e41]/30 pt-4 w-48 mx-auto">
            Legal Notice | Privacy Policy
          </div>
        </div>

        {/* ORDER 2: THE FULL FORM (Second on mobile, Overlapping on desktop) */}
        <div className="order-2 lg:col-start-2 lg:row-start-1 lg:-mt-48 z-20 w-full max-w-md mx-auto px-4 md:px-0">
          <div className="bg-white p-8 md:p-12 shadow-2xl rounded-sm border-t-4 border-[#448c6c]">
            <h2 className="text-3xl md:text-5xl font-bold text-[#2d4e41] text-center mb-10">Get in touch</h2>
            
            <form ref={form} onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* Company Field */}
              <input 
                name="company"
                required 
                type="text" 
                placeholder="Company" 
                className="w-full p-3 border border-gray-300 focus:ring-1 focus:ring-[#448c6c] outline-none transition-all"
                onChange={(e) => setFormData({...formData, company: e.target.value})}
              />
              
              {/* Name Field */}
              <input 
                name="user_name"
                required 
                type="text" 
                placeholder="Name" 
                className="w-full p-3 border border-gray-300 focus:ring-1 focus:ring-[#448c6c] outline-none transition-all"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              
              {/* Phone Field */}
              <input 
                name="user_phone"
                required 
                type="tel" 
                placeholder="Phone" 
                className="w-full p-3 border border-gray-300 focus:ring-1 focus:ring-[#448c6c] outline-none transition-all"
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
              
              {/* Email Field */}
              <input 
                name="user_email"
                required 
                type="email" 
                placeholder="Email" 
                className="w-full p-3 border border-gray-300 focus:ring-1 focus:ring-[#448c6c] outline-none transition-all"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              
              {/* Message Field */}
              <textarea 
                name="message"
                required 
                placeholder="Message" 
                rows="4" 
                className="w-full p-3 border border-gray-300 focus:ring-1 focus:ring-[#448c6c] outline-none transition-all resize-none"
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
              
              {/* Privacy Policy Checkbox */}
              <div className="flex items-start gap-3 py-2">
                <input 
                  required 
                  type="checkbox" 
                  id="privacy" 
                  className="mt-1 w-4 h-4 accent-[#448c6c] cursor-pointer"
                  onChange={(e) => setFormData({...formData, privacyAccepted: e.target.checked})}
                />
                <label htmlFor="privacy" className="text-xs text-gray-600 underline cursor-pointer leading-tight">
                  I have read and understand the privacy policy.
                </label>
              </div>

              {/* LIVE CAPTCHA AREA */}
              <div className="py-4 bg-gray-50 px-4 rounded-md border border-gray-100 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="captcha-wrapper bg-white border border-gray-300 rounded overflow-hidden">
                    <LoadCanvasTemplate />
                  </div>
                  <button 
                    type="button" 
                    onClick={handleReload}
                    className="p-2 bg-[#448c6c] text-white rounded-full hover:bg-[#366d54] transition-colors shadow-sm"
                  >
                    <RotateCw size={18} />
                  </button>
                </div>
                <input 
                  id="user_captcha_input"
                  required
                  type="text" 
                  placeholder="Enter the code above" 
                  className="w-full p-2.5 border border-gray-300 focus:ring-1 focus:ring-[#448c6c] outline-none bg-white"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#448c6c] hover:bg-[#366d54] text-white font-bold py-4 rounded-full uppercase tracking-widest transition-all shadow-lg active:scale-95"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* ORDER 3: CONTACT (Bottom on mobile) */}
        <div className="order-3 lg:col-start-3 lg:row-start-1 flex flex-col items-center md:pt-24">
          <div className="bg-[#2d4e41] p-4 rounded-full text-white mb-4">
            <MessageSquare size={32} />
          </div>
          <h3 className="text-2xl font-bold mb-2">Contact</h3>
          <p className="font-extrabold text-sm uppercase tracking-wider">Build The Right Ghana</p>
          <p className="font-extrabold text-sm mt-1">+233 - 244271160</p>
          <p className="font-extrabold text-sm lowercase mt-1 text-[#2d4e41]/80">buildtherightgh@gmail.com</p>
        </div>

      </div>

      

      {/* Global Style Override for the Captcha Library */}
      <style>{`
        .captcha-wrapper a { display: none !important; }
        canvas { display: block !important; margin: 0 !important; }
      `}</style>

      {/* Status Popup Modal */}
      {popup.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={closePopup}></div>
          <div className="relative bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center transform transition-all scale-100">
            <div className={`mx-auto w-16 h-16 flex items-center justify-center rounded-full mb-4 ${popup.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
              {popup.type === 'success' ? <Check size={32} /> : <X size={32} />}
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {popup.type === 'success' ? 'Success!' : 'Error'}
            </h3>
            <p className="text-gray-600 mb-6">{popup.message}</p>
            <button 
              onClick={closePopup}
              className={`px-8 py-3 rounded-full font-bold text-white transition-colors ${popup.type === 'success' ? 'bg-[#448c6c] hover:bg-[#366d54]' : 'bg-red-500 hover:bg-red-600'}`}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;