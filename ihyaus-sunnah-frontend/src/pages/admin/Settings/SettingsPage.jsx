import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaArrowRight,
  FaCheckCircle,
  FaExclamationCircle,
  FaExternalLinkAlt,
  FaInfoCircle,
  FaShieldAlt,
  FaUserCircle,
} from "react-icons/fa";
import { currentUserAPI } from "../../../services/api";

// Roles that can access the admin console (matches backend authorization).
const CONSOLE_ROLES = ["admin", "director"];

const roleLabels = {
  director: "Director",
  admin: "Administrator",
  staff: "Staff",
};

const roleDescriptions = {
  director: "Has full console access, including account management.",
  admin: "Has full console access to website content.",
  staff: "Does not have access to the admin console.",
};

const formatDateTime = (value) => {
  if (!value) return "Not recorded";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not recorded";
  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const SettingsPage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let active = true;

    currentUserAPI
      .getProfile()
      .then((response) => {
        if (!active) return;
        setProfile(response?.data || response?.user || null);
      })
      .catch((error) => {
        if (!active) return;
        setLoadError(error.message || "Unable to load account details.");
        toast.error(error.message || "Unable to load account details.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const displayName = profile?.name?.trim() || "Unnamed account";
  const displayEmail = profile?.email?.trim() || "No email on file";
  const role = profile?.role || "";
  const roleLabel = roleLabels[role] || (role ? role : "Unknown");
  const roleDescription =
    roleDescriptions[role] || "Role is not recognised by the console.";
  const isActive = profile?.isActive === true;
  const hasConsoleAccess = CONSOLE_ROLES.includes(role);
  const updatedAt = formatDateTime(profile?.updatedAt);
  const createdAt = formatDateTime(profile?.createdAt);

  const statusTitle = isActive ? "Active" : "Inactive";
  const statusDescription = isActive
    ? "Admin account is available."
    : "This account is disabled and cannot sign in.";

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
              Review your account identity, access level, and session status.
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
          <section className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm transition hover:border-primary/30 hover:shadow-card">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary text-xl text-white">
                  <FaUserCircle />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-primary">
                    Profile
                  </h2>
                  <p className="mt-1 text-sm text-neutral-500">
                    Update the name and photo shown on your admin account.
                  </p>
                </div>
              </div>

              <Link
                to="/admin/profile"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-200 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-neutral-50"
              >
                Open profile
                <FaArrowRight className="text-xs" />
              </Link>
            </div>
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

            {loading ? (
              <div className="p-5 text-sm text-neutral-500">
                Loading account details...
              </div>
            ) : loadError ? (
              <div className="m-5 rounded-lg border border-red-200 bg-neutral-50 p-4 text-sm text-red-700">
                {loadError}
              </div>
            ) : (
              <div className="grid gap-4 p-5 md:grid-cols-3">
                <div className="rounded-lg bg-neutral-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <FaUserCircle className="text-secondary" /> Account
                  </div>
                  <p className="mt-3 font-semibold text-primary">
                    {displayName}
                  </p>
                  <p className="mt-1 break-words text-sm text-neutral-500">
                    {displayEmail}
                  </p>
                  <p className="mt-3 text-xs text-neutral-500">
                    Last sign-in: {formatDateTime(profile?.lastLoginAt)}
                  </p>
                </div>

                <div
                  className={`rounded-lg p-4 ${
                    isActive ? "bg-brand-50" : "bg-yellow-100"
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 text-sm font-semibold ${
                      isActive ? "text-primary" : "text-yellow-300"
                    }`}
                  >
                    {isActive ? <FaCheckCircle /> : <FaExclamationCircle />}{" "}
                    Status
                  </div>
                  <p
                    className={`mt-3 font-semibold ${
                      isActive ? "text-primary" : "text-yellow-300"
                    }`}
                  >
                    {statusTitle}
                  </p>
                  <p className="mt-1 text-sm text-neutral-600">
                    {statusDescription}
                  </p>
                </div>

                <div
                  className={`rounded-lg p-4 ${
                    hasConsoleAccess ? "bg-brand-50" : "bg-yellow-100"
                  }`}
                >
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <FaShieldAlt /> Role
                  </div>
                  <p className="mt-3 font-semibold text-primary">
                    {roleLabel}
                  </p>
                  <p className="mt-1 text-sm text-neutral-600">
                    {roleDescription}
                  </p>
                </div>
              </div>
            )}
          </section>

          {!loading && !loadError && profile && (
            <section className="rounded-lg border border-neutral-200 bg-white shadow-sm">
              <div className="border-b border-neutral-200 p-5">
                <h2 className="text-xl font-semibold text-primary">
                  Account details
                </h2>
                <p className="mt-1 text-sm text-neutral-500">
                  Read-only record information for this account.
                </p>
              </div>

              <dl className="divide-y divide-neutral-200">
                {[
                  { term: "Account ID", detail: profile._id || "Not available" },
                  { term: "Created", detail: createdAt },
                  { term: "Last updated", detail: updatedAt },
                ].map((row) => (
                  <div
                    key={row.term}
                    className="flex flex-col gap-1 p-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <dt className="text-sm font-semibold text-primary">
                      {row.term}
                    </dt>
                    <dd className="break-all text-sm text-neutral-500">
                      {row.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
        </main>

        <aside className="space-y-6">
          <section className="rounded-lg border border-neutral-200 bg-white shadow-sm">
            <div className="border-b border-neutral-200 p-5">
              <h2 className="text-xl font-semibold text-primary">
                Session
              </h2>
              <p className="mt-1 text-sm text-neutral-500">
                Current sign-in state for this console.
              </p>
            </div>

            <div className="space-y-4 p-5">
              <div className="flex items-start gap-3">
                <FaShieldAlt className="mt-1 text-secondary" />
                <div>
                  <p className="text-sm font-semibold text-primary">
                    {loading
                      ? "Checking session..."
                      : isActive && hasConsoleAccess
                      ? "Authenticated"
                      : "Limited access"}
                  </p>
                  <p className="mt-1 text-sm text-neutral-500">
                    {loading
                      ? "Retrieving your current admin session."
                      : isActive && hasConsoleAccess
                      ? "You are signed in with access to the admin console."
                      : "This account cannot use the admin console."}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FaInfoCircle className="mt-1 text-secondary" />
                <div>
                  <p className="text-sm font-semibold text-primary">
                    Session expiry
                  </p>
                  <p className="mt-1 text-sm text-neutral-500">
                    Sign-in sessions expire automatically. You will be asked to
                    sign in again once yours ends.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-neutral-200 bg-neutral-50 p-5">
            <div className="flex items-start gap-3">
              <FaShieldAlt className="mt-1 text-secondary" />
              <div>
                <h2 className="font-semibold text-primary">
                  Keeping the account secure
                </h2>
                <p className="mt-1 text-sm text-neutral-600">
                  Keep your profile details current and review access whenever
                  the people managing this console change.
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
