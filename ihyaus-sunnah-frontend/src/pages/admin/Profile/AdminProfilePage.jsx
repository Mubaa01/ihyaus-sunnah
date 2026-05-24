import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaExternalLinkAlt,
  FaEye,
  FaEyeSlash,
  FaKey,
  FaLock,
  FaSave,
  FaShieldAlt,
  FaUndo,
  FaUser,
} from "react-icons/fa";
import { authAPI } from "../../../services/api";

const defaultProfile = {
  name: "Admin User",
  email: "admin@example.com",
  role: "Super Administrator",
  createdAt: null,
};

const AdminProfilePage = () => {
  const [profile, setProfile] = useState(defaultProfile);
  const [name, setName] = useState(defaultProfile.name);
  const [email, setEmail] = useState(defaultProfile.email);
  const [role, setRole] = useState(defaultProfile.role);
  const [randomPassword, setRandomPassword] = useState("");
  const [customPassword, setCustomPassword] = useState("");
  const [newKey, setNewKey] = useState("");
  const [confirmKey, setConfirmKey] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [secretVisible, setSecretVisible] = useState(false);

  const memberSince = profile.createdAt
    ? new Date(profile.createdAt).toLocaleDateString()
    : "Not available";

  const handleProfileSave = () => {
    const nextProfile = {
      ...profile,
      name: name.trim() || defaultProfile.name,
      email: email.trim() || defaultProfile.email,
      role: role.trim() || defaultProfile.role,
    };

    setProfile(nextProfile);
    setMessage("Profile details saved locally. Connect the profile API to persist changes.");
    setError("");
  };

  const handleResetProfile = () => {
    setName(profile.name);
    setEmail(profile.email);
    setRole(profile.role);
    setMessage("");
    setError("");
  };

  const handleResetSecret = async () => {
    setError("");
    setMessage("");

    if (!randomPassword) {
      setError("Enter your account password before resetting the secret key.");
      return;
    }

    try {
      const data = await authAPI.generateSecretKey(randomPassword);
      setMessage(
        `Secret key reset successfully. ${
          data.secretKey ? `New key: ${data.secretKey}` : "Check your email or profile for the new key."
        }`
      );
      setRandomPassword("");
    } catch (err) {
      setError(err.message || "Failed to reset secret key.");
    }
  };

  const handleSetCustomKey = async () => {
    setError("");
    setMessage("");

    if (!customPassword) {
      setError("Enter your account password before setting a custom key.");
      return;
    }

    if (!newKey || newKey.length !== 4 || newKey !== confirmKey) {
      setError("New key must be 4 digits and match the confirmation.");
      return;
    }

    try {
      await authAPI.setCustomSecretKey({
        password: customPassword,
        secretKey: newKey,
      });
      setMessage("Custom secret key set successfully.");
      setCustomPassword("");
      setNewKey("");
      setConfirmKey("");
    } catch (err) {
      setError(err.message || "Failed to set custom secret key.");
    }
  };

  const keyStrength = newKey.length;

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm lg:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-secondary">
              Account control
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-primary">
              Admin Profile
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-neutral-500 sm:text-base">
              Manage account identity, role visibility, and secret key confirmation.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              to="/admin/settings"
              className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-200 px-4 text-sm font-semibold text-primary transition-colors hover:bg-brand-50"
            >
              Settings
            </Link>
            <Link
              to="/"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primaryLight"
            >
              <FaExternalLinkAlt className="text-xs" /> Public site
            </Link>
          </div>
        </div>
      </section>

      {(message || error) && (
        <div
          className={`rounded-lg border p-4 text-sm ${
            error
              ? "border-red-100 bg-red-50 text-red-700"
              : "border-green-100 bg-green-50 text-green-700"
          }`}
        >
          {error || message}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[340px_1fr]">
        <aside className="space-y-6">
          <section className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary text-xl text-white">
                <FaUser />
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-lg font-semibold text-primary">
                  {profile.name}
                </h2>
                <p className="truncate text-sm text-neutral-500">{profile.role}</p>
              </div>
            </div>

            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="font-semibold text-neutral-600">Email</dt>
                <dd className="mt-1 text-neutral-500">{profile.email}</dd>
              </div>
              <div>
                <dt className="font-semibold text-neutral-600">Member since</dt>
                <dd className="mt-1 text-neutral-500">{memberSince}</dd>
              </div>
              <div>
                <dt className="font-semibold text-neutral-600">Secret key</dt>
                <dd className="mt-1 flex items-center justify-between gap-3">
                  <span className="font-mono text-neutral-500">
                    {secretVisible ? "1234" : "••••"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSecretVisible((prev) => !prev)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 transition-colors hover:text-primary"
                    aria-label={secretVisible ? "Hide secret key" : "Reveal secret key"}
                  >
                    {secretVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </dd>
              </div>
            </dl>
          </section>

          <section className="rounded-lg border border-green-100 bg-green-50 p-5">
            <div className="flex items-start gap-3">
              <FaShieldAlt className="mt-1 text-green-700" />
              <div>
                <h3 className="font-semibold text-green-800">Security note</h3>
                <p className="mt-1 text-sm text-green-700">
                  Secret key changes require the account password before a new
                  generated or custom 4-digit key can be applied.
                </p>
              </div>
            </div>
          </section>
        </aside>

        <main className="space-y-6">
          <section className="rounded-lg border border-neutral-200 bg-white shadow-sm">
            <div className="border-b border-neutral-200 p-5">
              <h2 className="text-xl font-semibold text-primary">Account details</h2>
              <p className="mt-1 text-sm text-neutral-500">
                Keep the account label and contact information clear for audit trails.
              </p>
            </div>

            <div className="grid gap-4 p-5 md:grid-cols-3">
              <label className="space-y-2 text-sm font-medium text-neutral-600">
                Name
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="h-11 w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 text-sm outline-none transition focus:border-primary/40 focus:bg-white focus:ring-2 focus:ring-primary/10"
                  placeholder="Admin name"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-neutral-600">
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-11 w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 text-sm outline-none transition focus:border-primary/40 focus:bg-white focus:ring-2 focus:ring-primary/10"
                  placeholder="admin@example.com"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-neutral-600">
                Role
                <input
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                  className="h-11 w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 text-sm outline-none transition focus:border-primary/40 focus:bg-white focus:ring-2 focus:ring-primary/10"
                  placeholder="Administrator role"
                />
              </label>
            </div>

            <div className="flex flex-wrap gap-2 border-t border-neutral-200 p-5">
              <button
                type="button"
                onClick={handleProfileSave}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primaryLight"
              >
                <FaSave className="text-xs" /> Save profile
              </button>
              <button
                type="button"
                onClick={handleResetProfile}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-neutral-200 px-4 text-sm font-semibold text-primary transition-colors hover:bg-brand-50"
              >
                <FaUndo className="text-xs" /> Reset
              </button>
            </div>
          </section>

          <section className="rounded-lg border border-neutral-200 bg-white shadow-sm">
            <div className="border-b border-neutral-200 p-5">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-primary">
                <FaKey className="text-secondary" /> Secret key management
              </h2>
              <p className="mt-1 text-sm text-neutral-500">
                Reset to a generated key or define a custom 4-digit key.
              </p>
            </div>

            <div className="grid gap-6 p-5 lg:grid-cols-2">
              <div className="rounded-lg border border-neutral-200 p-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-primary">
                    <FaLock />
                  </span>
                  <div>
                    <h3 className="font-semibold text-primary">
                      Reset to generated key
                    </h3>
                    <p className="mt-1 text-sm text-neutral-500">
                      Generate a fresh 4-digit confirmation key.
                    </p>
                  </div>
                </div>

                <label className="mt-5 block space-y-2 text-sm font-medium text-neutral-600">
                  Account password
                  <input
                    type="password"
                    value={randomPassword}
                    onChange={(event) => setRandomPassword(event.target.value)}
                    className="h-11 w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 text-sm outline-none transition focus:border-primary/40 focus:bg-white focus:ring-2 focus:ring-primary/10"
                    placeholder="Enter your account password"
                  />
                </label>

                <button
                  type="button"
                  onClick={handleResetSecret}
                  className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-neutral-200 px-4 text-sm font-semibold text-primary transition-colors hover:bg-brand-50"
                >
                  <FaUndo className="text-xs" /> Reset key
                </button>
              </div>

              <div className="rounded-lg border border-neutral-200 p-4">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
                    <FaKey />
                  </span>
                  <div>
                    <h3 className="font-semibold text-primary">Set custom key</h3>
                    <p className="mt-1 text-sm text-neutral-500">
                      Use a memorable 4-digit PIN for confirmation prompts.
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <label className="space-y-2 text-sm font-medium text-neutral-600 md:col-span-3">
                    Account password
                    <input
                      type="password"
                      value={customPassword}
                      onChange={(event) => setCustomPassword(event.target.value)}
                      className="h-11 w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 text-sm outline-none transition focus:border-primary/40 focus:bg-white focus:ring-2 focus:ring-primary/10"
                      placeholder="Enter your account password"
                    />
                  </label>
                  <label className="space-y-2 text-sm font-medium text-neutral-600">
                    New key
                    <input
                      type="password"
                      value={newKey}
                      onChange={(event) =>
                        setNewKey(event.target.value.replace(/\D/g, ""))
                      }
                      maxLength={4}
                      inputMode="numeric"
                      className="h-11 w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 text-sm outline-none transition focus:border-primary/40 focus:bg-white focus:ring-2 focus:ring-primary/10"
                      placeholder="1234"
                    />
                  </label>
                  <label className="space-y-2 text-sm font-medium text-neutral-600">
                    Confirm
                    <input
                      type="password"
                      value={confirmKey}
                      onChange={(event) =>
                        setConfirmKey(event.target.value.replace(/\D/g, ""))
                      }
                      maxLength={4}
                      inputMode="numeric"
                      className="h-11 w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 text-sm outline-none transition focus:border-primary/40 focus:bg-white focus:ring-2 focus:ring-primary/10"
                      placeholder="Repeat"
                    />
                  </label>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={handleSetCustomKey}
                      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primaryLight"
                    >
                      <FaCheckCircle className="text-xs" /> Apply
                    </button>
                  </div>
                </div>

                <div className="mt-4 h-2 rounded-full bg-neutral-100">
                  <div
                    className="h-2 rounded-full bg-primary transition-all"
                    style={{ width: `${(keyStrength / 4) * 100}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-neutral-500">
                  {keyStrength}/4 digits entered
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminProfilePage;
