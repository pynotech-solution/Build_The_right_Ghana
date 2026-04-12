import { Info } from 'lucide-react';

const FormLabel = ({ label, info }) => (
  <div className="flex items-center gap-2 mb-1">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="relative group" tabIndex="0">
      <Info size={16} className="text-gray-400 cursor-help focus:text-[#448c6c] outline-none" />
      <div className="absolute bottom-full left-1/2 z-10 mb-2 invisible w-48 -translate-x-1/2 rounded bg-gray-800 p-2 text-center text-xs text-white opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100 group-focus:visible group-focus:opacity-100 pointer-events-none">
        {info}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
      </div>
    </div>
  </div>
);

export default FormLabel;
