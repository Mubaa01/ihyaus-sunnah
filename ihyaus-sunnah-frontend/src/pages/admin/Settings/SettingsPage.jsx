import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaBell,
  FaBookOpen,
  FaCheckCircle,
  FaCogs,
  FaExternalLinkAlt,
  FaImages,
  FaKey,
  FaShieldAlt,
  FaUserCircle,
} from "react-icons/fa";

const profile = {
  name: "Admin User",
  email: "admin@example.com",
  role: "Super Administrator",
};

const primarySettings = [
  {
    title: "Profile",
    description: "Update account identity, role display, and contact details.",
    icon: <FaUserCircle />,
    path: "/admin/profile",
    action: "Open profile",
  },
  {
    title: "Secret key policy",
    description: "Reset generated keys or set a custom 4-digit confirmation PIN.",
    icon: <FaKey />,
    path: "/admin/profile",
    action: "Manage key",
  },
  {
    title: "Notifications",
    description: "Review admin alerts, unread updates, and operational notices.",
    icon: <FaBell />,
    path: "/admin/notifications",
    action: "View alerts",
  },
];

const systemLinks = [
  { label: "Dashboard", path: "/admin", icon: <FaCogs /> },
  { label: "Programs", path: "/admin/programs", icon: <FaBookOpen /> },
  { label: "Media library", path: "/admin/media", icon: <FaImages /> },
  { label: "Public website", path: "/", icon: <FaExternalLinkAlt /> },
];

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm lg:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-secondary">
              System preferences
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-primary">
              Admin Settings
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-neutral-500 sm:text-base">
              Configure admin identity, security, notifications, and key system
              destinations from one organized workspace.
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primaryLight"
          >
            <FaExternalLinkAlt className="text-xs" /> Public site
          </Link>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <main className="space-y-6">
          <section className="grid gap-4 md:grid-cols-3">
            {primarySettings.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                className="group rounded-lg border border-neutral-200 bg-white p-5 shadow-sm transition hover:border-primary/30 hover:shadow-card"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-xl text-white">
                  {item.icon}
                </div>
                <h2 className="mt-5 text-lg font-semibold text-primary">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm text-neutral-500">
                  {item.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  {item.action}
                  <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </section>

          <section className="rounded-lg border border-neutral-200 bg-white shadow-sm">
            <div className="border-b border-neutral-200 p-5">
              <h2 className="text-xl font-semibold text-primary">
                Access and security
              </h2>
              <p className="mt-1 text-sm text-neutral-500">
                A quick view of the current admin account posture.
              </p>
            </div>

            <div className="grid gap-4 p-5 md:grid-cols-3">
              <div className="rounded-lg bg-neutral-50 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                  <FaUserCircle className="text-secondary" /> Account
                </div>
                <p className="mt-3 font-semibold text-primary">{profile.name}</p>
                <p className="mt-1 text-sm text-neutral-500">{profile.email}</p>
              </div>
              <div className="rounded-lg bg-green-50 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-green-800">
                  <FaCheckCircle /> Status
                </div>
                <p className="mt-3 font-semibold text-green-800">Active</p>
                <p className="mt-1 text-sm text-green-700">
                  Admin account is available.
                </p>
              </div>
              <div className="rounded-lg bg-brand-50 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                  <FaShieldAlt /> Role
                </div>
                <p className="mt-3 font-semibold text-primary">{profile.role}</p>
                <p className="mt-1 text-sm text-neutral-500">
                  Has full console access.
                </p>
              </div>
            </div>
          </section>
        </main>

        <aside className="space-y-6">
          <section className="rounded-lg border border-neutral-200 bg-white shadow-sm">
            <div className="border-b border-neutral-200 p-5">
              <h2 className="text-xl font-semibold text-primary">System links</h2>
              <p className="mt-1 text-sm text-neutral-500">
                Jump to high-use admin areas.
              </p>
            </div>

            <div className="grid gap-2 p-3">
              {systemLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="group flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-brand-50"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 text-primary">
                    {item.icon}
                  </span>
                  <span className="min-w-0 flex-1 font-semibold text-primary">
                    {item.label}
                  </span>
                  <FaArrowRight className="text-xs text-neutral-400 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-green-100 bg-green-50 p-5">
            <div className="flex items-start gap-3">
              <FaShieldAlt className="mt-1 text-green-700" />
              <div>
                <h2 className="font-semibold text-green-800">
                  Recommended setup
                </h2>
                <p className="mt-1 text-sm text-green-700">
                  Keep profile details current and rotate the secret key when
                  admin access changes hands.
                </p>
                <Link
                  to="/admin/profile"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                >
                  Review profile <FaArrowRight className="text-xs" />
                </Link>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default SettingsPage;
