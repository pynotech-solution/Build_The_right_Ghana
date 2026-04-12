import React, { useState } from 'react';
import { UserPlus, X, Eye, EyeOff, Loader2 } from 'lucide-react';

const AddAdminModal = ({
  adminStatus,
  currentUserCanCreateSuperAdmin,
  isOpen,
  newAdminEmail,
  newAdminPassword,
  newAdminRole,
  onClose,
  onEmailChange,
  onPasswordChange,
  onRoleChange,
  onSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-xl font-bold text-[#2d4e41]">
            <UserPlus size={24} /> Add New Admin
          </h3>
          <button onClick={onClose} className="text-gray-400 transition-colors hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" placeholder="admin@example.com" value={newAdminEmail} onChange={(event) => onEmailChange(event.target.value)} required className="w-full rounded border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-[#448c6c]" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Password (min 6 chars)</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} placeholder="........" value={newAdminPassword} onChange={(event) => onPasswordChange(event.target.value)} required minLength="6" className="w-full rounded border border-gray-300 p-2 pr-10 outline-none focus:ring-2 focus:ring-[#448c6c]" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Admin Role</label>
            <select value={newAdminRole} onChange={(event) => onRoleChange(event.target.value)} disabled={!currentUserCanCreateSuperAdmin} className="w-full rounded border border-gray-300 bg-white p-2 outline-none focus:ring-2 focus:ring-[#448c6c] disabled:bg-gray-100 disabled:text-gray-500">
              <option value="admin">Regular Admin (Can manage posts)</option>
              {currentUserCanCreateSuperAdmin && <option value="superadmin">Super Admin (Can manage posts, payments, and admins)</option>}
            </select>
            {!currentUserCanCreateSuperAdmin && <p className="mt-1 text-xs text-gray-500">You do not have permission to create other Super Admins.</p>}
          </div>

          {adminStatus.message && (
            <div className={`rounded p-3 text-sm ${adminStatus.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
              {adminStatus.message}
            </div>
          )}

          <button type="submit" disabled={adminStatus.type === 'loading'} className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#448c6c] py-2 font-bold text-white shadow-md transition-all hover:bg-[#366d54] disabled:opacity-70">
            {adminStatus.type === 'loading' ? <><Loader2 className="animate-spin" size={18} /> Creating...</> : 'Create Admin'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAdminModal;
