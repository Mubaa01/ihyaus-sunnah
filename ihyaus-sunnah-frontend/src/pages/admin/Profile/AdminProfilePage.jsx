import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { FaArrowLeft, FaLock, FaUser, FaEnvelope, FaShieldAlt } from "react-icons/fa"
import { authAPI } from '../../../services/api'

const AdminProfilePage = () => {
  // TODO: Replace with real API profile fetch
  const [profile, setProfile] = useState({ name: '', email: '', role: '' });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [currentKey, setCurrentKey] = useState("")
  const [newKey, setNewKey] = useState("")
  const [confirmKey, setConfirmKey] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [secretVisible, setSecretVisible] = useState(false)

  useEffect(() => {
    // Implement API fetch for admin profile
  }, []);

  // TODO: Replace with real secret key logic
  const secretKey = '';

  const handleProfileSave = () => {
    // Implement API update for admin profile
    setMessage("Profile updated successfully (API not implemented).");
    setError("");
  };

  const handleChangeSecret = () => {
    // Implement API update for secret key
    setMessage("Secret key changed successfully (API not implemented).");
    setError("");
    setCurrentKey("");
    setNewKey("");
    setConfirmKey("");
  };


  const handleResetSecret = async () => {
    setError("");
    setMessage("");
    try {
      const data = await authAPI.generateSecretKey(currentKey);
      setMessage(`Secret key reset. New key: ${data.secretKey || 'Check your email or profile.'}`);
      setCurrentKey("");
      setNewKey("");
      setConfirmKey("");
    } catch (err) {
      setError(err.message || 'Failed to reset secret key.');
    }
  }

  const handleSetCustomKey = async () => {
    setError("");
    setMessage("");
    if (!newKey || newKey.length !== 4 || newKey !== confirmKey) {
      setError("New key must be 4 digits and match confirmation.");
      return;
    }
    try {
      const data = await authAPI.setCustomSecretKey({ password: currentKey, secretKey: newKey });
      setMessage(`Custom secret key set successfully.`);
      setCurrentKey("");
      setNewKey("");
      setConfirmKey("");
    } catch (err) {
      setError(err.message || 'Failed to set custom secret key.');
    }
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


          <div className="bg-white rounded-3xl border border-gray-100 shadow-soft p-8 space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-primary mb-2">Secret Key Management</h2>
              <p className="text-sm text-gray-500 mb-4">
                You can reset your secret key to a randomly generated 4-digit code (recommended for security), or set your own custom 4-digit key. <br />
                <span className="text-primary font-semibold">You must enter your account password to confirm either action.</span>
              </p>
            </div>

            {/* Reset to random key */}
            <div className="border-b pb-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">Reset to Random 4-Digit Key</h3>
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <label className="flex-1 space-y-2 text-sm text-gray-600">
                  Password
                  <input
                    type="password"
                    value={currentKey}
                    onChange={e => setCurrentKey(e.target.value)}
                    className="input-primary"
                    placeholder="Enter your account password"
                  />
                </label>
                <button onClick={handleResetSecret} className="btn-secondary min-w-[180px]">Reset to Random Key</button>
              </div>
            </div>

            {/* Set custom key */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Set Custom 4-Digit Key</h3>
              <div className="grid gap-4 md:grid-cols-4">
                <label className="space-y-2 text-sm text-gray-600">
                  Password
                  <input
                    type="password"
                    value={currentKey}
                    onChange={e => setCurrentKey(e.target.value)}
                    className="input-primary"
                    placeholder="Enter your account password"
                  />
                </label>
                <label className="space-y-2 text-sm text-gray-600">
                  New 4-digit key
                  <input
                    type="password"
                    value={newKey}
                    onChange={e => setNewKey(e.target.value.replace(/\D/g, ""))}
                    maxLength={4}
                    className="input-primary"
                    placeholder="e.g. 1234"
                  />
                </label>
                <label className="space-y-2 text-sm text-gray-600">
                  Confirm new key
                  <input
                    type="password"
                    value={confirmKey}
                    onChange={e => setConfirmKey(e.target.value.replace(/\D/g, ""))}
                    maxLength={4}
                    className="input-primary"
                    placeholder="Repeat new key"
                  />
                </label>
                <div className="flex items-end">
                  <button onClick={handleSetCustomKey} className="btn-primary min-w-[180px]">Set Custom Key</button>
                </div>
              </div>
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
