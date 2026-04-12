import { AlertTriangle, X } from 'lucide-react';

const RemoveAdminInstructionsModal = ({ email, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative w-full max-w-md rounded-xl bg-white p-8 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-2xl font-bold text-red-600">
            <AlertTriangle size={28} /> Action Required
          </h3>
          <button onClick={onClose} className="text-gray-400 transition-colors hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4 text-gray-700">
          <p><strong>{email}</strong> has been successfully disabled and their privileges revoked. They can no longer manage the platform.</p>
          <p className="border-t pt-4 font-medium text-gray-900">To permanently delete their login account, please follow these steps:</p>
          <ol className="list-decimal space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-4 pl-5 text-sm">
            <li>Go to <strong>console.firebase.google.com</strong> and open your project.</li>
            <li>Click on <strong>Authentication</strong> in the left sidebar.</li>
            <li>Navigate to the <strong>Users</strong> tab.</li>
            <li>Find <strong className="text-[#448c6c]">{email}</strong> in the list.</li>
            <li>Click the three dots on the right side of their row.</li>
            <li>Select <strong className="text-red-600">Delete account</strong>.</li>
          </ol>
        </div>

        <button onClick={onClose} className="mt-8 w-full rounded-lg bg-[#448c6c] py-3 font-bold text-white shadow-md transition-all hover:bg-[#366d54]">
          I Understand
        </button>
      </div>
    </div>
  );
};

export default RemoveAdminInstructionsModal;
