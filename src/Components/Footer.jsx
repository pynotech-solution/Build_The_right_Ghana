import React from 'react'

const Footer = () => {
  return (
<div className="">
    {/* 4. Bottom Rights Section */}
      <div className="bg-[#d9e8e0] py-12 px-6 md:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[#2d4e41] font-bold text-sm md:text-base border-t border-[#2d4e41]/10 pt-10">
          <p className="mb-4 md:mb-0">
            © BUILD THE RIGHT GHANA. All Rights Reserved.
          </p>
          <div className="flex gap-4 cursor-pointer hover:text-[#448c6c]">
            <span>Legal Notice</span>
            <span>|</span>
            <span>Privacy</span>
          </div>
        </div>
      </div>
</div>
  )
}

export default Footer