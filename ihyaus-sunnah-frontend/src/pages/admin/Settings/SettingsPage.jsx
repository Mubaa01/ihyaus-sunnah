import { Link } from "react-router-dom"
import { FaArrowRight, FaCogs, FaShieldAlt, FaUserCircle, FaExternalLinkAlt } from "react-icons/fa"
import { getAdminProfile } from "../../../data/mock/adminStore"

const SettingsPage = () => {
  const profile = getAdminProfile()

  return (
    <div className="space-y-10">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-primary">Admin Settings</h1>
          <p className="text-gray-500 mt-2">
            Configure your account and access system-level settings from one place.
          </p>
        </div>

        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          <FaExternalLinkAlt /> Go to Public Site
        </Link>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-soft p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-3xl bg-primary/10 text-primary flex items-center justify-center text-xl">
              <FaUserCircle />
            </div>
            <div>
              <h2 className="font-semibold text-lg text-primary">Profile</h2>
              <p className="text-sm text-gray-500">Update account details and secret key settings.</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">{profile.name}</p>
          <p className="text-sm text-gray-600">{profile.email}</p>
          <div className="mt-6">
            <Link to="/admin/profile" className="btn-secondary w-full inline-flex justify-center">
              Open Profile Settings <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-soft p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-3xl bg-secondary/10 text-secondary flex items-center justify-center text-xl">
              <FaShieldAlt />
            </div>
            <div>
              <h2 className="font-semibold text-lg text-primary">Secret Key Policy</h2>
              <p className="text-sm text-gray-500">Confirm and customize your admin access PIN.</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">Your backend issues a confirmation key automatically for every admin account.</p>
          <p className="text-sm text-gray-600 mt-3">You can reset it to a new generated key or change it to a custom 4-digit PIN.</p>
          <div className="mt-6">
            <Link to="/admin/profile" className="btn-primary w-full inline-flex justify-center">
              Manage Secret Key <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-soft p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-3xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl">
                <FaCogs />
              </div>
              <div>
                <h2 className="font-semibold text-lg text-primary">System Links</h2>
                <p className="text-sm text-gray-500">Quick access to admin and public sections.</p>
              </div>
            </div>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center justify-between gap-2">
                <span>Admin dashboard</span>
                <Link to="/admin" className="text-primary">Open</Link>
              </li>
              <li className="flex items-center justify-between gap-2">
                <span>Admin profile</span>
                <Link to="/admin/profile" className="text-primary">Open</Link>
              </li>
              <li className="flex items-center justify-between gap-2">
                <span>Public website</span>
                <Link to="/" className="text-primary">Home</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
