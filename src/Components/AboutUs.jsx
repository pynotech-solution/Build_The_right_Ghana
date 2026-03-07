import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutUsCurvedCentered = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 px-6 md:px-20 bg-white min-h-[600px] flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* About Us Header - Right Aligned as per screenshot */}
        <h2 className="text-3xl md:text-5xl font-bold text-[#2d4a3e] mb-8 uppercase tracking-widest text-right pr-10">
          About Us
        </h2>

        <div className="relative">
          {/* The Image: Floated left with shape-outside. 
            The 'ellipse' shape tells the text to wrap around the curve.
          */}
          <div 
            className="float-left mr-12 shadow-2xl border-4 border-gray-50
                       w-[320px] h-[480px]
                       [clip-path:ellipse(50%_50%_at_50%_50%)] 
                       [shape-outside:ellipse(50%_50%_at_50%_50%)]"
            style={{ 
              backgroundImage: "url('https://www.buildtherightghana.org/images/576/19269745/IMG-20220119-WA0016-kMZPJnEJAtXKmD2V26ljBA.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>

          {/* Text Content: Because the image above is 'floated', 
            this text will naturally wrap around the ellipse curve.
          */}
          <div className="text-gray-800 text-lg md:text-xl leading-relaxed font-medium space-y-6 pt-10">
            <p>
              Build The Right Ghana is dedicated to promoting sanitation and human rights, 
              advocating for education on religious and tribal tolerance, and sensitizing 
              the public on Ghanaian values and personal security.
            </p>
            <p>
              We are committed to environmental protection advocacy, poverty eradication, 
              and empowering women through entrepreneurial skills training and helping the 
              less privileged in our society.
            </p>
            <p>
              The organization was founded on the principal concerns of the welfare and 
              personal security of the ordinary Ghanaian.
            </p>
            <p>
              The organization was founded on the principal concerns of the welfare and 
              personal security of the ordinary Ghanaian....
            </p>
          </div>

          {/* Read More Button - Floats right as per screenshot */}
          <div onClick={() => navigate('/about')} className="clear-both mt-12 flex justify-end">
            <button className="bg-[#5c947a] hover:bg-[#4a7a63] text-white font-bold py-3 px-10 rounded-full transition-all uppercase shadow-md">
              Read More
            </button>
          </div>
        </div>
      </div>

      
    </section>
  );
};

export default AboutUsCurvedCentered;