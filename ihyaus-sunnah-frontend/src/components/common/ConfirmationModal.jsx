import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLock, FaTimes, FaCheck } from "react-icons/fa";
// TODO: Replace secret key logic with real backend validation

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "danger"
}) => {
  const [confirmationKey, setConfirmationKey] = useState("");
  const [error, setError] = useState("");

  // Get the dynamic admin secret key
  // TODO: Fetch requiredKey from backend or context
  const requiredKey = "0000";

  const handleConfirm = () => {
    if (confirmationKey !== requiredKey) {
      setError("Invalid confirmation key. Please enter the correct key.");
      return;
    }

    onConfirm();
    setConfirmationKey("");
    setError("");
    onClose();
  };

  const handleClose = () => {
    setConfirmationKey("");
    setError("");
    onClose();
  };

  const getTypeStyles = () => {
    switch (type) {
      case "danger":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          button: "bg-red-600 hover:bg-red-700",
          icon: <FaTimes className="text-red-600" />
        };
      case "warning":
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          button: "bg-yellow-600 hover:bg-yellow-700",
          icon: <FaCheck className="text-yellow-600" />
        };
      default:
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          button: "bg-blue-600 hover:bg-blue-700",
          icon: <FaCheck className="text-blue-600" />
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={handleClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`bg-white rounded-2xl shadow-2xl border max-w-md w-full ${styles.bg} ${styles.border}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  {styles.icon}
                  <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                </div>
                <p className="text-gray-600 text-sm">{message}</p>
              </div>

              {/* Body */}
              <div className="p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Confirmation Key
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      value={confirmationKey}
                      onChange={(e) => {
                        setConfirmationKey(e.target.value);
                        setError("");
                      }}
                      placeholder="Enter confirmation key..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleConfirm();
                        }
                      }}
                    />
                  </div>
                  {error && (
                    <p className="text-red-600 text-sm mt-2">{error}</p>
                  )}
                  <p className="text-gray-500 text-xs mt-2">
                    Contact administrator for the confirmation key.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 pb-6 flex gap-3">
                <button
                  onClick={handleClose}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  {cancelText}
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={!confirmationKey.trim()}
                  className={`flex-1 px-4 py-3 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${styles.button}`}
                >
                  {confirmText}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;
