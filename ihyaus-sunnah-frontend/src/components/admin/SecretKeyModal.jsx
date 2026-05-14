// src/components/admin/SecretKeyModal.jsx

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const SecretKeyModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading = false,
}) => {
  const [secretKey, setSecretKey] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (isOpen) {
      setSecretKey("")
      setError("")
    }
  }, [isOpen])

  const handleConfirm = () => {
    if (!secretKey || secretKey.length !== 4) {
      setError("Secret key must be 4 digits")
      return
    }

    setError("")
    onConfirm(secretKey)
  }

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "") // numbers only
    setSecretKey(value)

    if (error) setError("")
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-premium"
          >
            <h2 className="text-3xl font-bold text-primary mb-3">
              Security Verification
            </h2>

            <p className="text-gray-500 mb-6">
              Enter the 4-digit secret key to continue.
            </p>

            <input
              type="password"
              maxLength={4}
              value={secretKey}
              onChange={handleChange}
              placeholder="****"
              className="input-primary text-center text-2xl tracking-[0.5em]"
              autoFocus
            />

            {/* ERROR MESSAGE */}
            {error && (
              <p className="text-red-500 text-sm mt-3 text-center">
                {error}
              </p>
            )}

            <div className="flex gap-4 mt-8">
              <button
                onClick={onClose}
                disabled={loading}
                className="btn-dark-outline flex-1"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirm}
                disabled={loading}
                className="btn-primary flex-1"
              >
                {loading ? "Processing..." : "Confirm"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SecretKeyModal