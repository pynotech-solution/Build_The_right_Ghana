import { FileText, Home, Key, LayoutDashboard, LogOut, UserMinus, UserPlus, Users, Wallet, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardSidebar = ({
  activeTab,
  isSidebarOpen,
  isDesktopSidebarOpen,
  isSuperAdmin,
  isRootAdmin,
  onClose,
  onLogout,
  onDisableSelf,
  onOpenAdminModal,
  onTabChange,
  onChangePassword,
}) => (
  <>
    {isSidebarOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose}></div>}

    <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 transform flex-col bg-[#2d4e41] text-white shadow-xl transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${isDesktopSidebarOpen ? 'lg:translate-x-0' : 'lg:-translate-x-full'}`}>
      <div className="flex items-center justify-between border-b border-[#448c6c]/30 p-6 text-2xl font-bold">
        <div className="flex items-center gap-2"><LayoutDashboard size={24} /> BTRG Admin</div>
        <button className="text-gray-300 transition-colors hover:text-white lg:hidden" onClick={onClose}>
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto p-4">
        <button onClick={() => onTabChange('posts')} className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-colors ${activeTab === 'posts' ? 'bg-[#448c6c] font-bold shadow-md' : 'hover:bg-[#366d54]/50'}`}>
          <FileText size={20} /> Blog Posts
        </button>
        {isSuperAdmin && (
          <>
            <button onClick={() => onTabChange('payments')} className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-colors ${activeTab === 'payments' ? 'bg-[#448c6c] font-bold shadow-md' : 'hover:bg-[#366d54]/50'}`}>
              <Wallet size={20} /> Payment Methods
            </button>
            <button onClick={() => onTabChange('admins')} className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-colors ${activeTab === 'admins' ? 'bg-[#448c6c] font-bold shadow-md' : 'hover:bg-[#366d54]/50'}`}>
              <Users size={20} /> Admin Directory
            </button>
          </>
        )}
      </nav>

      <div className="space-y-2 border-t border-[#448c6c]/30 p-4">
        {isSuperAdmin && (
          <button onClick={onOpenAdminModal} className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors hover:bg-[#366d54]/50">
            <UserPlus size={18} /> Add Admin
          </button>
        )}
        <button onClick={onChangePassword} className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors hover:bg-[#366d54]/50">
          <Key size={18} /> Change Password
        </button>
        <Link to="/" className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors hover:bg-[#366d54]/50">
          <Home size={18} /> Back to Website
        </Link>
        {!isRootAdmin && (
          <button onClick={onDisableSelf} className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-orange-300 transition-colors hover:bg-orange-500/20 hover:text-orange-100">
            <UserMinus size={18} /> Disable My Account
          </button>
        )}
        <button onClick={onLogout} className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-red-300 transition-colors hover:bg-red-500/20 hover:text-red-100">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  </>
);

export default DashboardSidebar;
