import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { FaArrowLeft, FaLock, FaUser, FaEnvelope, FaShieldAlt } from "react-icons/fa"
import {
  getAdminProfile,
  updateAdminProfile,
  getAdminSecretKey,
  setAdminSecretKey,
  resetAdminSecretKey,
} from "../../../data/mock/adminStore"

const AdminProfilePage = () => {
  const [profile, setProfile] = useState(getAdminProfile())
  const [name, setName] = useState(profile.name)
  const [email, setEmail] = useState(profile.email)
  const [role, setRole] = useState(profile.role)
  const [currentKey, setCurrentKey] = useState("")
  const [newKey, setNewKey] = useState("")
  const [confirmKey, setConfirmKey] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [secretVisible, setSecretVisible] = useState(false)

  useEffect(() => {
    setProfile(getAdminProfile())
  }, [])

  const secretKey = useMemo(() => getAdminSecretKey(), [profile])

  const handleProfileSave = () => {
    const updated = updateAdminProfile({ name, email, role })
    setProfile(updated)
    setMessage("Profile updated successfully.")
    setError("")
  }

  const handleChangeSecret = () => {
    if (currentKey !== secretKey) {
      setError("Current secret key does not match.")
      setMessage("")
      return
    }

    if (newKey.length !== 4 || confirmKey.length !== 4) {
      setError("New secret key must be exactly 4 digits.")
      setMessage("")
      return
    }

    if (newKey !== confirmKey) {
      setError("New secret key and confirmation do not match.")
      setMessage("")
      return
    }

    setAdminSecretKey(newKey)
    setProfile(getAdminProfile())
    setMessage("Secret key changed successfully.")
    setError("")
    setCurrentKey("")
    setNewKey("")
    setConfirmKey("")
  }

  const handleResetSecret = () => {
    if (currentKey !== secretKey) {
      setError("Current secret key does not match.")
      setMessage("")
      return
    }

    const updated = resetAdminSecretKey()
    setProfile(updated)
    setMessage(`Secret key reset to ${updated.secretKey}`)
    setError("")
    setCurrentKey("")
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-primary">Admin Profile</h1>
          <p className="text-gray-500 mt-2">
            Manage your admin account details and secret key confirmation settings.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link to="/admin/settings" className="btn-secondary">
            Back to Settings
          </Link>
          <Link to="/" className="btn-primary">
            View Public Site
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-soft p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-3xl bg-primary/10 text-primary flex items-center justify-center text-2xl">
              <FaUser />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-primary">{profile.name}</h2>
              <p className="text-sm text-gray-500">{profile.role}</p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-gray-600">
            <div>
              <p className="font-semibold text-gray-800">Email</p>
              <p>{profile.email}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Member since</p>
              <p>{new Date(profile.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Secret key</p>
              <p className="text-sm text-gray-500">
                {secretVisible ? secretKey : "••••"}
              </p>
              <button
                onClick={() => setSecretVisible((prev) => !prev)}
                className="mt-2 text-xs text-primary hover:text-secondary"
              >
                {secretVisible ? "Hide key" : "Reveal key"}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-soft p-8">
            <h2 className="text-2xl font-semibold text-primary mb-6">Account Details</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <label className="space-y-2 text-sm text-gray-600">
                Name
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-primary"
                />
              </label>
              <label className="space-y-2 text-sm text-gray-600">
                Email
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-primary"
                />
              </label>
              <label className="space-y-2 text-sm text-gray-600">
                Role
                <input
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="input-primary"
                />
              </label>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={handleProfileSave} className="btn-primary">
                Save Profile
              </button>
              <button
                onClick={() => {
                  setName(profile.name)
                  setEmail(profile.email)
                  setRole(profile.role)
                  setMessage("")
                  setError("")
                }}
                className="btn-secondary"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-soft p-8">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-primary">Secret Key Management</h2>
                <p className="text-sm text-gray-500">
                  Your backend issues a confirmation key automatically. Use this panel to change or reset a custom 4-digit key.
                </p>
              </div>
              <div className="text-right text-sm text-gray-400">
                <p>Current key status</p>
                <p className="font-semibold text-gray-700">Active</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <label className="space-y-2 text-sm text-gray-600">
                Confirm current key
                <input
                  type="password"
                  value={currentKey}
                  onChange={(e) => setCurrentKey(e.target.value.replace(/\D/g, ""))}
                  maxLength={4}
                  className="input-primary"
                />
              </label>
              <label className="space-y-2 text-sm text-gray-600">
                New 4-digit key
                <input
                  type="password"
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value.replace(/\D/g, ""))}
                  maxLength={4}
                  className="input-primary"
                />
              </label>
              <label className="space-y-2 text-sm text-gray-600">
                Confirm new key
                <input
                  type="password"
                  value={confirmKey}
                  onChange={(e) => setConfirmKey(e.target.value.replace(/\D/g, ""))}
                  maxLength={4}
                  className="input-primary"
                />
              </label>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={handleChangeSecret} className="btn-primary">
                Change Secret Key
              </button>
              <button onClick={handleResetSecret} className="btn-secondary">
                Reset to Generated Key
              </button>
            </div>

            {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
            {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProfilePage
