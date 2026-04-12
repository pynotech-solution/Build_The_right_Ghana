import { AlertTriangle, CreditCard, Pencil, Plus, Smartphone, Trash2, User, X, Loader2 } from 'lucide-react';

const PaymentSection = ({
  editPaymentId,
  loading,
  paymentForm,
  paymentMethods,
  onCancelEdit,
  onDelete,
  onEdit,
  onFieldChange,
  onSubmit,
}) => (
  <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
    <div className="lg:col-span-1">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:sticky lg:top-8">
        <h4 className="mb-6 flex items-center gap-2 text-xl font-bold text-[#2d4e41]">
          {editPaymentId ? <><Pencil size={20} /> Edit Payment Method</> : <><Plus size={20} /> Add Payment Method</>}
        </h4>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Type</label>
            <select
              value={paymentForm.type}
              onChange={(event) => onFieldChange('type', event.target.value)}
              className="w-full rounded border border-gray-300 bg-white p-2 outline-none focus:ring-2 focus:ring-[#448c6c]"
            >
              <option value="momo">Mobile Money</option>
              <option value="bank">Bank Transfer</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Provider / Bank Name</label>
            <input type="text" required placeholder="e.g. MTN or GCB Bank" value={paymentForm.provider} onChange={(event) => onFieldChange('provider', event.target.value)} className="w-full rounded border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-[#448c6c]" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Account Number / Momo Number</label>
            <input type="text" required placeholder="e.g. 024 427 1160" value={paymentForm.accountNumber} onChange={(event) => onFieldChange('accountNumber', event.target.value)} className="w-full rounded border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-[#448c6c]" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Account Name</label>
            <input type="text" required placeholder="e.g. Build The Right Ghana" value={paymentForm.accountName} onChange={(event) => onFieldChange('accountName', event.target.value)} className="w-full rounded border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-[#448c6c]" />
          </div>

          {editPaymentId && (
            <button type="button" onClick={onCancelEdit} className="mb-2 flex w-full items-center justify-center gap-2 rounded-lg bg-gray-500 py-2 font-bold text-white shadow-md transition-all hover:bg-gray-600">
              <X size={18} /> Cancel Edit
            </button>
          )}

          <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#448c6c] py-3 font-bold text-white shadow-md transition-all hover:bg-[#366d54] disabled:opacity-70">
            {loading ? <><Loader2 className="animate-spin" size={20} /> Saving...</> : editPaymentId ? 'Update Method' : 'Add Method'}
          </button>
        </form>
      </div>
    </div>

    <div className="space-y-4 lg:col-span-2">
      {paymentMethods.map((method) => (
        <div key={method.id} className="flex flex-col items-start justify-between gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center">
          <div className="flex w-full items-start gap-4 sm:w-auto sm:items-center">
            <div className="rounded-full bg-[#e6f0eb] p-3 text-[#448c6c]">
              {method.type === 'momo' ? <Smartphone size={24} /> : <CreditCard size={24} />}
            </div>
            <div className="flex-grow overflow-hidden break-words">
              <h4 className="text-lg font-bold text-gray-800">{method.type === 'momo' ? 'Mobile Money' : 'Bank Transfer'} - {method.provider}</h4>
              <p className="font-mono text-gray-600">{method.accountNumber}</p>
              <p className="text-sm text-gray-500">{method.accountName}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {method.createdBy && <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-600"><User size={10} /> Added by: {method.createdBy}</span>}
                {method.lastEditedBy && <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-600"><Pencil size={10} /> Edited by: {method.lastEditedBy}</span>}
              </div>
            </div>
          </div>
          <div className="flex w-full justify-end gap-2 sm:w-auto">
            <button onClick={() => onEdit(method)} className="rounded-full p-2 text-blue-500 transition-colors hover:bg-blue-50"><Pencil size={20} /></button>
            <button onClick={() => onDelete(method.id)} className="rounded-full p-2 text-red-500 transition-colors hover:bg-red-50"><Trash2 size={20} /></button>
          </div>
        </div>
      ))}

      {paymentMethods.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-orange-300 bg-orange-50 p-8 text-center text-orange-800 shadow-sm">
          <AlertTriangle size={48} className="text-orange-500" />
          <h4 className="text-xl font-bold">No Payment Methods Added!</h4>
          <p className="text-sm font-medium leading-relaxed">
            Because there are no payment methods listed here, visitors who click "Donate" on the website will be shown a fallback <strong>"Contact Support"</strong> message instead of actual payment details.
          </p>
          <p className="mt-2 text-sm font-bold text-orange-700">
            Please use the form on the left to add at least one Mobile Money or Bank Transfer method.
          </p>
        </div>
      )}
    </div>
  </div>
);

export default PaymentSection;
