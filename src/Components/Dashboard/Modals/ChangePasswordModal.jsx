import React, { useState } from 'react';
import { X, Eye, EyeOff, Loader2 } from 'lucide-react';

const ChangePasswordModal = ({ isOpen, onClose, passwordForm, passwordStatus, onFormChange, onSubmit }) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (!isOpen) return null;

  const isMatching = passwordForm.newPassword === passwordForm.confirmPassword;
  const showMatchStatus = passwordForm.confirmPassword.length > 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col">
        <div className="bg-[#2d4e41] px-6 py-4 flex justify-between items-center text-white">
          <h3 className="font-bold text-lg">Change Password</h3>
          <button onClick={onClose} className="hover:text-gray-300 transition-colors">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-4 flex-grow overflow-y-auto">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Current Password</label>
            <div className="relative">
              <input 
                type={showCurrentPassword ? "text" : "password"}
                value={passwordForm.currentPassword}
                onChange={(e) => onFormChange('currentPassword', e.target.value)}
                className="w-full p-2 pr-10 border border-gray-300 rounded focus:ring-2 focus:ring-[#448c6c] outline-none"
                placeholder="Enter current password"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">New Password</label>
            <div className="relative">
              <input 
                type={showNewPassword ? "text" : "password"}
                value={passwordForm.newPassword}
                onChange={(e) => onFormChange('newPassword', e.target.value)}
                className="w-full p-2 pr-10 border border-gray-300 rounded focus:ring-2 focus:ring-[#448c6c] outline-none"
                placeholder="Enter new password"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Confirm New Password</label>
            <div className="relative">
              <input 
                type={showConfirmPassword ? "text" : "password"}
                value={passwordForm.confirmPassword}
                onChange={(e) => onFormChange('confirmPassword', e.target.value)}
                className="w-full p-2 pr-10 border border-gray-300 rounded focus:ring-2 focus:ring-[#448c6c] outline-none"
                placeholder="Confirm new password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {showMatchStatus && (
              <p className={`mt-1.5 text-xs font-bold ${isMatching ? 'text-green-600' : 'text-red-500'}`}>
                {isMatching ? '✓ Passwords match' : '✕ Passwords do not match'}
              </p>
            )}
          </div>
          
          {passwordStatus.message && (
            <div className={`p-3 rounded-lg text-sm ${passwordStatus.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : passwordStatus.type === 'success' ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-blue-50 text-blue-600 border border-blue-200'}`}>
              {passwordStatus.message}
            </div>
          )}
          
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-bold transition-colors">Cancel</button>
            <button type="submit" disabled={passwordStatus.type === 'loading' || (showMatchStatus && !isMatching)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#448c6c] text-white rounded-lg hover:bg-[#366d54] font-bold transition-colors disabled:opacity-70">
              {passwordStatus.type === 'loading' ? <><Loader2 className="animate-spin" size={18} /> Updating...</> : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;