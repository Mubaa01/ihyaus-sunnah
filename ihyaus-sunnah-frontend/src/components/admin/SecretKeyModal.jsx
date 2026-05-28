// src/components/admin/SecretKeyModal.jsx

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaCheckCircle, FaExclamationTriangle, FaKey } from "react-icons/fa"

const SecretKeyModal = ({
  isOpen,
  onClose,
  onConfirm,
  onSuccess,
  loading = false,
  successMessage = "Secret key confirmed. Saving changes...",
}) => {
  const [secretKey, setSecretKey] = useState("")
  const [error, setError] = useState("")
  const [status, setStatus] = useState("idle")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setSecretKey("")
      setError("")
      setStatus("idle")
      setSubmitting(false)
    }
  }, [isOpen])

  const isWorking = loading || submitting

  const normalizeError = (message = "") => {
    const text = String(message)
    if (/invalid secret|forbidden|secret key/i.test(text)) {
      return "Secret key is not correct. Please check it and try again."
    }

    if (/unauthorized|not authenticated/i.test(text)) {
      return "Your admin session is not verified. Please log in again and retry."
    }

    return text || "Unable to confirm the secret key. Please try again."
  }

  const handleConfirm = async () => {
    if (!secretKey || secretKey.length !== 4) {
      setError("Secret key must be 4 digits")
      setStatus("error")
      return
    }

    setError("")
    setStatus("idle")
    setSubmitting(true)

    try {
      await Promise.resolve(onConfirm(secretKey))
      setStatus("success")
      window.setTimeout(() => {
        if (onSuccess) {
          onSuccess()
        } else {
          onClose()
        }
      }, 750)
    } catch (err) {
      setStatus("error")
      setError(normalizeError(err?.message))
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4)
    setSecretKey(value)

    if (error) setError("")
    if (status !== "idle") setStatus("idle")
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
            className="w-full max-w-md rounded-lg bg-white p-8 shadow-premium"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FaKey className="text-2xl" />
            </div>

            <h2 className="mb-3 text-3xl font-bold text-primary">Security Verification</h2>

            <p className="text-gray-500 mb-6">
              Enter the 4-digit secret key to continue.
            </p>

            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              value={secretKey}
              onChange={handleChange}
              placeholder="****"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault()
                  handleConfirm()
                }
              }}
              disabled={isWorking || status === "success"}
              className={`input-primary text-center text-2xl tracking-[0.5em] ${
                status === "success"
                  ? "border-secondary bg-brand-50 text-primary"
                  : status === "error"
                    ? "border-[#B91C1C] bg-[#FFF7F7]"
                    : ""
              }`}
              autoFocus
            />

            {status === "success" && (
              <div className="mt-4 flex items-start gap-3 rounded-lg border border-secondary/20 bg-brand-50 px-4 py-3 text-secondary">
                <FaCheckCircle className="mt-0.5 shrink-0" />
                <p className="text-sm font-semibold">{successMessage}</p>
              </div>
            )}

            {error && (
              <div className="mt-4 flex items-start gap-3 rounded-lg border border-[#F1B4B4] bg-[#FFF7F7] px-4 py-3 text-[#B91C1C]">
                <FaExclamationTriangle className="mt-0.5 shrink-0" />
                <p className="text-sm font-semibold">{error}</p>
              </div>
            )}

            <div className="flex gap-4 mt-8">
              <button
                onClick={onClose}
                disabled={isWorking}
                className="btn-dark-outline flex-1"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirm}
                disabled={isWorking || status === "success"}
                className="btn-primary flex-1"
              >
                {isWorking ? "Checking..." : status === "success" ? "Confirmed" : "Confirm"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SecretKeyModal
