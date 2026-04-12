import AdminCard from './AdminCard';

const AdminsSection = ({
  combinedAdmins,
  currentUserEmail,
  dynamicSuperAdmins,
  isRootAdmin,
  trackEmail,
  onFieldChange,
  onRemoveAdmin,
  onRevokeSuperAdmin,
  onSubmit,
  onToggleCreateSuperAdmin,
  onToggleDisableAdmin,
  onUpgradeAdmin,
}) => (
  <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
    <div className="lg:col-span-1">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:sticky lg:top-8">
        <h4 className="mb-4 text-xl font-bold text-[#2d4e41]">Track Existing Admin</h4>
        <p className="mb-4 text-sm text-gray-600">
          If you created an admin directly in the Firebase Console before, enter their email here to track them in this list.
        </p>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="admin@example.com"
            value={trackEmail}
            onChange={(event) => onFieldChange(event.target.value)}
            required
            className="w-full rounded border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-[#448c6c]"
          />
          <button type="submit" className="w-full rounded-lg bg-[#448c6c] py-2 font-bold text-white shadow-md transition-all hover:bg-[#366d54]">
            Add to List
          </button>
        </form>
      </div>
    </div>

    <div className="lg:col-span-2">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h4 className="mb-4 text-xl font-bold text-[#2d4e41]">All Administrators</h4>
        <p className="mb-4 text-sm text-gray-600">Easily upgrade or revoke Super Admin privileges from this list.</p>
        <div className="space-y-3">
          {combinedAdmins.map((admin) => (
            <AdminCard
              key={admin.email}
              admin={admin}
              isDynSuper={dynamicSuperAdmins.includes(admin.email)}
              isSelf={Boolean(currentUserEmail && admin.email === currentUserEmail.toLowerCase().trim())}
              isRootAdmin={isRootAdmin}
              onRevokeSuperAdmin={onRevokeSuperAdmin}
              onUpgradeAdmin={onUpgradeAdmin}
              onToggleDisableAdmin={onToggleDisableAdmin}
              onToggleCreateSuperAdmin={onToggleCreateSuperAdmin}
              onRemoveAdmin={onRemoveAdmin}
            />
          ))}
          {combinedAdmins.length === 0 && <p className="py-4 italic text-gray-500">No admins found.</p>}
        </div>
      </div>
    </div>
  </div>
);

export default AdminsSection;
