import { Menu, User } from 'lucide-react';
import { getDashboardTitle } from './utils';

const DashboardHeader = ({
  activeTab,
  currentUserEmail,
  isSuperAdmin,
  loggedInAdminData,
  onOpenSidebar,
  isDesktopSidebarOpen,
  onToggleDesktopSidebar,
}) => (
  <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white p-3 px-4 shadow-sm sm:p-4 sm:px-6">
    <div className="flex items-center gap-3">
      <button className="rounded p-1 text-gray-600 transition-colors hover:bg-gray-100 hover:text-[#2d4e41] lg:hidden" onClick={onOpenSidebar}>
        <Menu size={24} />
      </button>
      <button className="hidden rounded p-1 text-gray-600 transition-colors hover:bg-gray-100 hover:text-[#2d4e41] lg:block" onClick={onToggleDesktopSidebar}>
        <Menu size={24} />
      </button>
      <h2 className="hidden text-xl font-bold text-[#2d4e41] sm:block">{getDashboardTitle(activeTab)}</h2>
    </div>

    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 sm:gap-3 rounded-full border border-gray-200 bg-gray-50 p-1.5 pr-3 sm:px-4 shadow-inner">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#448c6c] text-sm font-bold text-white shadow-sm">
          {currentUserEmail ? currentUserEmail.charAt(0).toUpperCase() : <User size={16} />}
        </div>
        <div className="flex flex-col pr-2">
          <div className="flex items-center gap-2">
            <span className="max-w-[90px] truncate text-xs sm:text-sm font-bold leading-none text-gray-800 sm:max-w-[200px] md:max-w-none">
              {currentUserEmail || 'Loading...'}
            </span>
            {currentUserEmail && (
              <span className={`flex items-center gap-1 rounded-sm border px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider ${loggedInAdminData?.isDisabled ? 'border-red-200 bg-red-50 text-red-600' : 'border-emerald-200 bg-emerald-50 text-emerald-600'}`}>
                <span className={`h-1.5 w-1.5 sm:h-1 sm:w-1 rounded-full ${loggedInAdminData?.isDisabled ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
                <span className="hidden sm:inline">{loggedInAdminData?.isDisabled ? 'Disabled' : 'Active'}</span>
              </span>
            )}
          </div>
          <span className="mt-1 text-[9px] sm:text-[10px] font-medium uppercase tracking-wider text-[#448c6c]">
            {isSuperAdmin ? 'Super Admin' : 'Regular Admin'}
          </span>
        </div>
      </div>
    </div>
  </header>
);

export default DashboardHeader;
