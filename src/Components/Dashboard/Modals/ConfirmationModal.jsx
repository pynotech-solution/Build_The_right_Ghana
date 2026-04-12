import { AlertTriangle, Loader2 } from 'lucide-react';

const ConfirmationModal = ({ confirmation, onClose, onConfirm, onInputChange }) => {
  if (!confirmation.show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center gap-3">
          {confirmation.isDestructive && <AlertTriangle className="text-red-500" size={24} />}
          <h3 className={`text-xl font-bold ${confirmation.isDestructive ? 'text-red-600' : 'text-[#2d4e41]'}`}>{confirmation.title}</h3>
        </div>
        <p className={`${confirmation.withInput ? 'mb-4' : 'mb-6'} leading-relaxed text-gray-600`}>{confirmation.message}</p>

        {confirmation.withInput && (
          <div className="mb-6">
            <input
              type="text"
              placeholder={confirmation.inputPlaceholder}
              value={confirmation.inputValue || ''}
              onChange={(e) => onInputChange && onInputChange(e.target.value)}
              className="w-full rounded border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-[#448c6c]"
            />
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button onClick={onClose} disabled={confirmation.isProcessing} className="rounded-lg px-4 py-2 font-medium text-gray-600 transition-colors hover:bg-gray-100 disabled:opacity-50">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={confirmation.isProcessing} className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-bold text-white shadow-md transition-colors disabled:opacity-70 ${confirmation.isDestructive ? 'bg-red-500 hover:bg-red-600' : 'bg-[#448c6c] hover:bg-[#366d54]'}`}>
            {confirmation.isProcessing ? <><Loader2 className="animate-spin" size={18} /> Processing...</> : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
