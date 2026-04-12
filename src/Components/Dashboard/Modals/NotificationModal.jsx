import { Check, X } from 'lucide-react';

const NotificationModal = ({ notification, onClose }) => {
  if (!notification.show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative w-full max-w-sm rounded-xl bg-white p-8 text-center shadow-2xl">
        <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${notification.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
          {notification.type === 'success' ? <Check size={32} /> : <X size={32} />}
        </div>
        <h3 className="mb-2 text-2xl font-bold text-gray-800">{notification.type === 'success' ? 'Success!' : 'Error'}</h3>
        <p className="mb-6 text-gray-600">{notification.message}</p>
        <div className="flex flex-col gap-3">
          {notification.actionLabel && notification.onAction && (
            <button onClick={notification.onAction} className="rounded-full border-2 border-[#448c6c] px-8 py-3 font-bold text-[#448c6c] transition-colors hover:bg-[#e6f0eb]">
              {notification.actionLabel}
            </button>
          )}
          <button onClick={onClose} className={`rounded-full px-8 py-3 font-bold text-white transition-colors ${notification.type === 'success' ? 'bg-[#448c6c] hover:bg-[#366d54]' : 'bg-red-500 hover:bg-red-600'}`}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
