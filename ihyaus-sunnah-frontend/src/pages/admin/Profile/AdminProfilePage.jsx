import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaExclamationTriangle,
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
import { authAPI, currentUserAPI } from "../../../services/api";

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
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileSaving, setProfileSaving] = useState(false);
  const [secretFeedback, setSecretFeedback] = useState({
    generate: null,
    custom: null,
  });
  const [secretLoading, setSecretLoading] = useState({
    generate: false,
    custom: false,
  });
  const [secretVisible, setSecretVisible] = useState(false);

  const memberSince = profile.createdAt
    ? new Date(profile.createdAt).toLocaleDateString()
    : "Not available";

  const normalizeProfile = (user = {}) => ({
    name: user.name || user.email?.split("@")[0] || defaultProfile.name,
    email: user.email || defaultProfile.email,
    role: user.role || defaultProfile.role,
    createdAt: user.createdAt || null,
  });

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      try {
        setProfileLoading(true);
        const response = await currentUserAPI.getProfile();
        if (!isMounted) return;

        const nextProfile = normalizeProfile(response.data);
        setProfile(nextProfile);
        setName(nextProfile.name);
        setEmail(nextProfile.email);
        setRole(nextProfile.role);
        setError("");
      } catch (err) {
        if (!isMounted) return;
        setError(err.message || "Failed to load profile details.");
      } finally {
        if (isMounted) {
          setProfileLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const normalizeSecretError = (err, fallback) => {
    const text = err?.message || fallback;

    if (/invalid password/i.test(text)) {
      return "Password is not correct. Please check it and try again.";
    }

    if (/unauthorized|not authenticated/i.test(text)) {
      return "Your admin session is not verified. Please log in again and retry.";
    }

    return text;
  };

  const setGenerateFeedback = (feedback) => {
    setSecretFeedback((prev) => ({ ...prev, generate: feedback }));
  };

  const setCustomFeedback = (feedback) => {
    setSecretFeedback((prev) => ({ ...prev, custom: feedback }));
  };

  const setActionLoading = (key, value) => {
    setSecretLoading((prev) => ({ ...prev, [key]: value }));
  };

  const handleProfileSave = async () => {
    setError("");

    const nextName = name.trim();
    const nextEmail = email.trim().toLowerCase();

    if (nextName.length < 2) {
      setError("Name must be at least 2 characters.");
      setMessage("");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextEmail)) {
      setError("Enter a valid email address.");
      setMessage("");
      return;
    }

    try {
      setProfileSaving(true);
      const response = await currentUserAPI.updateProfile({
        name: nextName,
        email: nextEmail,
      });

      const nextProfile = normalizeProfile(response.data);
      setProfile(nextProfile);
      setName(nextProfile.name);
      setEmail(nextProfile.email);
      setRole(nextProfile.role);
      setMessage("Profile details saved successfully.");
      setError("");
    } catch (err) {
      setError(err.message || "Failed to save profile details.");
      setMessage("");
    } finally {
      setProfileSaving(false);
    }
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
    setGenerateFeedback(null);

    if (!randomPassword.trim()) {
      setGenerateFeedback({
        type: "error",
        title: "Password required",
        body: "Enter your account password before generating a new secret key.",
      });
      return;
    }

    if (randomPassword.length < 6) {
      setGenerateFeedback({
        type: "error",
        title: "Password too short",
        body: "Account password must be at least 6 characters.",
      });
      return;
    }

    try {
      setActionLoading("generate", true);
      const data = await authAPI.generateSecretKey(randomPassword);
      setGenerateFeedback({
        type: "success",
        title: "Generated key confirmed",
        body: data.secretKey
          ? "A new 4-digit secret key was generated. Save it now because it will not be shown again."
          : "A new 4-digit secret key was generated successfully.",
        secretKey: data.secretKey,
      });
      setRandomPassword("");
    } catch (err) {
      setGenerateFeedback({
        type: "error",
        title: "Could not generate key",
        body: normalizeSecretError(err, "Failed to generate a new secret key."),
      });
    } finally {
      setActionLoading("generate", false);
    }
  };

  const handleSetCustomKey = async () => {
    setError("");
    setMessage("");
    setCustomFeedback(null);

    if (!customPassword.trim()) {
      setCustomFeedback({
        type: "error",
        title: "Password required",
        body: "Enter your account password before setting a custom key.",
      });
      return;
    }

    if (customPassword.length < 6) {
      setCustomFeedback({
        type: "error",
        title: "Password too short",
        body: "Account password must be at least 6 characters.",
      });
      return;
    }

    if (!/^\d{4}$/.test(newKey)) {
      setCustomFeedback({
        type: "error",
        title: "Invalid key",
        body: "Custom key must be exactly 4 digits.",
      });
      return;
    }

    if (newKey !== confirmKey) {
      setCustomFeedback({
        type: "error",
        title: "Keys do not match",
        body: "The confirmation key must match the new custom key.",
      });
      return;
    }

    try {
      setActionLoading("custom", true);
      await authAPI.setCustomSecretKey({
        password: customPassword,
        secretKey: newKey,
      });
      setCustomFeedback({
        type: "success",
        title: "Custom key confirmed",
        body: "Your custom 4-digit secret key is now active for admin confirmations.",
        secretKey: newKey,
      });
      setCustomPassword("");
      setNewKey("");
      setConfirmKey("");
    } catch (err) {
      setCustomFeedback({
        type: "error",
        title: "Could not set custom key",
        body: normalizeSecretError(err, "Failed to set custom secret key."),
      });
    } finally {
      setActionLoading("custom", false);
    }
  };

  const keyStrength = newKey.length;
  const keyIsComplete = /^\d{4}$/.test(newKey);
  const keyMatches = keyIsComplete && newKey === confirmKey;
  const keyMismatch = confirmKey.length > 0 && newKey !== confirmKey;

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
                  readOnly
                  className="h-11 w-full cursor-not-allowed rounded-lg border border-neutral-200 bg-neutral-100 px-3 text-sm text-neutral-500 outline-none"
                  placeholder="Administrator role"
                />
              </label>
            </div>

            <div className="flex flex-wrap gap-2 border-t border-neutral-200 p-5">
              <button
                type="button"
                onClick={handleProfileSave}
                disabled={profileLoading || profileSaving}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primaryLight disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FaSave className="text-xs" /> {profileSaving ? "Saving..." : "Save profile"}
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
                    onChange={(event) => {
                      setRandomPassword(event.target.value);
                      setGenerateFeedback(null);
                    }}
                    className="h-11 w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 text-sm outline-none transition focus:border-primary/40 focus:bg-white focus:ring-2 focus:ring-primary/10"
                    placeholder="Enter your account password"
                  />
                </label>

                <SecretFeedbackPanel feedback={secretFeedback.generate} />

                <button
                  type="button"
                  onClick={handleResetSecret}
                  disabled={secretLoading.generate}
                  className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-neutral-200 px-4 text-sm font-semibold text-primary transition-colors hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FaUndo className="text-xs" /> {secretLoading.generate ? "Generating..." : "Generate key"}
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
                      onChange={(event) => {
                        setCustomPassword(event.target.value);
                        setCustomFeedback(null);
                      }}
                      className="h-11 w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 text-sm outline-none transition focus:border-primary/40 focus:bg-white focus:ring-2 focus:ring-primary/10"
                      placeholder="Enter your account password"
                    />
                  </label>
                  <label className="space-y-2 text-sm font-medium text-neutral-600">
                    New key
                    <input
                      type="password"
                      value={newKey}
                      onChange={(event) => {
                        setNewKey(event.target.value.replace(/\D/g, "").slice(0, 4));
                        setCustomFeedback(null);
                      }}
                      maxLength={4}
                      inputMode="numeric"
                      className={`h-11 w-full rounded-lg border bg-neutral-50 px-3 text-sm outline-none transition focus:bg-white focus:ring-2 ${
                        keyIsComplete
                          ? "border-green-300 focus:border-green-400 focus:ring-green-100"
                          : "border-neutral-200 focus:border-primary/40 focus:ring-primary/10"
                      }`}
                      placeholder="1234"
                    />
                  </label>
                  <label className="space-y-2 text-sm font-medium text-neutral-600">
                    Confirm
                    <input
                      type="password"
                      value={confirmKey}
                      onChange={(event) => {
                        setConfirmKey(event.target.value.replace(/\D/g, "").slice(0, 4));
                        setCustomFeedback(null);
                      }}
                      maxLength={4}
                      inputMode="numeric"
                      className={`h-11 w-full rounded-lg border bg-neutral-50 px-3 text-sm outline-none transition focus:bg-white focus:ring-2 ${
                        keyMatches
                          ? "border-green-300 focus:border-green-400 focus:ring-green-100"
                          : keyMismatch
                            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                            : "border-neutral-200 focus:border-primary/40 focus:ring-primary/10"
                      }`}
                      placeholder="Repeat"
                    />
                  </label>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={handleSetCustomKey}
                      disabled={secretLoading.custom}
                      className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primaryLight disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <FaCheckCircle className="text-xs" /> {secretLoading.custom ? "Checking..." : "Apply"}
                    </button>
                  </div>
                </div>

                <div className="mt-4 h-2 rounded-full bg-neutral-100">
                  <div
                    className="h-2 rounded-full bg-primary transition-all"
                    style={{ width: `${(keyStrength / 4) * 100}%` }}
                  />
                </div>
                <p
                  className={`mt-2 text-xs ${
                    keyMatches
                      ? "text-green-700"
                      : keyMismatch
                        ? "text-red-600"
                        : "text-neutral-500"
                  }`}
                >
                  {keyMatches
                    ? "Confirmed: keys match."
                    : keyMismatch
                      ? "Warning: confirmation does not match."
                      : `${keyStrength}/4 digits entered`}
                </p>

                <SecretFeedbackPanel feedback={secretFeedback.custom} />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

const SecretFeedbackPanel = ({ feedback }) => {
  if (!feedback) return null;

  const isSuccess = feedback.type === "success";

  return (
    <div
      className={`mt-4 rounded-lg border px-4 py-3 text-sm ${
        isSuccess
          ? "border-green-200 bg-green-50 text-green-800"
          : "border-red-200 bg-red-50 text-red-700"
      }`}
    >
      <div className="flex items-start gap-3">
        {isSuccess ? (
          <FaCheckCircle className="mt-0.5 shrink-0" />
        ) : (
          <FaExclamationTriangle className="mt-0.5 shrink-0" />
        )}
        <div className="min-w-0">
          <p className="font-semibold">{feedback.title}</p>
          <p className="mt-1">{feedback.body}</p>
          {feedback.secretKey && (
            <div className="mt-3 rounded-lg border border-current/20 bg-white/80 px-3 py-2">
              <p className="text-xs font-semibold uppercase tracking-[0.12em]">
                Active key
              </p>
              <p className="mt-1 font-mono text-lg tracking-[0.35em]">
                {feedback.secretKey}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;
