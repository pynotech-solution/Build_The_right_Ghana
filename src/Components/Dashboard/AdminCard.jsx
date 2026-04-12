import { AlertTriangle, Pencil, Shield, ShieldAlert, ShieldCheck, Trash2, User, UserCog, UserMinus, UserPlus } from 'lucide-react';

const badgeClassName = 'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold';

const AdminCard = ({
  admin,
  isDynSuper,
  isSelf,
  isRootAdmin,
  onRevokeSuperAdmin,
  onUpgradeAdmin,
  onToggleDisableAdmin,
  onToggleCreateSuperAdmin,
  onRemoveAdmin,
}) => (
  <div className={`rounded-xl border p-4 shadow-sm ${admin.isDisabled ? 'border-red-200 bg-red-50/40' : 'border-gray-200 bg-white'}`}>
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div className="min-w-0 flex-1 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <h5 className="break-all text-base font-bold text-gray-900">{admin.email}</h5>
          {admin.isRoot && <span className={`${badgeClassName} bg-amber-100 text-amber-700`}><ShieldAlert size={10} /> Root Admin</span>}
          {isDynSuper && <span className={`${badgeClassName} bg-emerald-100 text-emerald-700`}><ShieldCheck size={10} /> Super Admin</span>}
          {!admin.isRoot && !isDynSuper && <span className={`${badgeClassName} bg-slate-100 text-slate-600`}><User size={10} /> Regular Admin</span>}
          {admin.isDisabled && <span className={`${badgeClassName} bg-red-100 text-red-700`}><UserMinus size={10} /> Disabled</span>}
          {isSelf && <span className={`${badgeClassName} bg-blue-100 text-blue-700`}><UserCog size={10} /> You</span>}
        </div>

        <div className="flex flex-wrap gap-2 text-xs text-gray-600">
          {admin.createdBy && <span className={`${badgeClassName} bg-blue-50 text-blue-600`}><UserPlus size={10} /> Added by: {admin.createdBy}</span>}
          {admin.statusModifiedBy && <span className={`${badgeClassName} bg-red-50 text-red-600`}><Pencil size={10} /> Status: {admin.statusModifiedBy}</span>}
          {admin.permissionModifiedBy && <span className={`${badgeClassName} bg-purple-50 text-purple-600`}><Shield size={10} /> Permission: {admin.permissionModifiedBy}</span>}
          {admin.roleModifiedBy && <span className={`${badgeClassName} bg-amber-50 text-amber-600`}><ShieldCheck size={10} /> Role: {admin.roleModifiedBy}</span>}
          {admin.isDisabled && admin.disableReason && <span className={`${badgeClassName} bg-gray-100 text-gray-700`}><AlertTriangle size={10} /> Reason: {admin.disableReason}</span>}
        </div>
      </div>

      <div className="flex w-full flex-col gap-2 sm:flex-row sm:flex-wrap lg:w-auto lg:max-w-[18rem] lg:justify-end">
        {!admin.isRoot && !isDynSuper && (
          <button type="button" onClick={() => onUpgradeAdmin(admin.email)} className="w-full rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-100 sm:w-auto">
            Make Super Admin
          </button>
        )}
        {!admin.isRoot && isDynSuper && (
          <button type="button" onClick={() => onRevokeSuperAdmin(admin.email)} className="w-full rounded-lg bg-amber-50 px-3 py-2 text-sm font-medium text-amber-700 transition-colors hover:bg-amber-100 sm:w-auto">
            Revoke Super Admin
          </button>
        )}
        {!admin.isRoot && (
          <button type="button" onClick={() => onToggleDisableAdmin(admin.email, admin.isDisabled)} className={`w-full rounded-lg px-3 py-2 text-sm font-medium transition-colors sm:w-auto ${admin.isDisabled ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' : 'bg-red-50 text-red-700 hover:bg-red-100'}`}>
            {isSelf ? 'Disable My Account' : (admin.isDisabled ? 'Enable' : 'Disable')}
          </button>
        )}
        {!admin.isRoot && !isSelf && (
          <button type="button" onClick={() => onToggleCreateSuperAdmin(admin.email, admin.canCreateSuperAdmin)} className={`w-full rounded-lg px-3 py-2 text-sm font-medium transition-colors sm:w-auto ${admin.canCreateSuperAdmin ? 'bg-purple-50 text-purple-700 hover:bg-purple-100' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
            {admin.canCreateSuperAdmin ? 'Revoke SA Creation' : 'Allow SA Creation'}
          </button>
        )}
        {!admin.isRoot && isRootAdmin && !isSelf && (
          <button type="button" onClick={() => onRemoveAdmin(admin.email)} className="flex w-full items-center justify-center gap-1 rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-200 sm:inline-flex sm:w-auto sm:justify-start">
            <Trash2 size={14} /> Remove
          </button>
        )}
      </div>
    </div>
  </div>
);

export default AdminCard;
