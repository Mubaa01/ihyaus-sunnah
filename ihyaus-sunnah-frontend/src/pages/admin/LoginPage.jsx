import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../../services/api";

/**
 * Login error tiers. The backend returns a message plus (sometimes) a status
 * code; we map those to a consistent, actionable message with an icon and
 * tone so the user always knows what to do next.
 */
const buildLoginError = (err) => {
  const status = err?.status;
  const raw = (err?.message || "").trim();
  const lower = raw.toLowerCase();
  // Validation issues survive on the raw response payload (err.data.errors).
  const issues = Array.isArray(err?.data?.errors) ? err.data.errors : [];
  const issueText = issues
    .map((issue) => [issue?.message, issue?.path?.join(".")].filter(Boolean).join(" "))
    .join(" ")
    .toLowerCase();
  const isValidation = issues.length > 0;

  if (isValidation) {
    if (/too small|at least|required|min/i.test(issueText)) {
      return {
        tone: "danger",
        title: "Password too short",
        message:
          "Your password must be at least 6 characters. Check what you entered and try again.",
      };
    }
    return {
      tone: "danger",
      title: "Check your input",
      message: "Please review the password you entered and try again.",
    };
  }

  if (status === 429 || /too many|rate limit/i.test(lower)) {
    return {
      tone: "warning",
      title: "Too many attempts",
      message:
        "For security, sign-in is temporarily locked after repeated failed attempts. Please wait a few minutes before trying again.",
    };
  }

  if (status === 403 || /inactive|disabled|not permitted|forbidden/i.test(lower)) {
    const isInactive = /inactive|disabled/i.test(lower);
    return {
      tone: "danger",
      title: isInactive ? "Account is inactive" : "Access not permitted",
      message: isInactive
        ? "This admin account has been deactivated. Contact a director to restore access."
        : "This account does not have permission to use the admin console. Contact a director if you believe this is a mistake.",
    };
  }

  if (
    status === 400 ||
    status === 401 ||
    /invalid password|incorrect password|wrong password|invalid credentials/i.test(
      lower
    )
  ) {
    return {
      tone: "danger",
      title: "Incorrect password",
      message: "Check and try again.",
    };
  }

  if (status >= 500 || /server|failed/i.test(lower)) {
    return {
      tone: "danger",
      title: "Sign-in is temporarily unavailable",
      message:
        "The server could not process your sign-in. Please try again in a moment.",
    };
  }

  if (/network|cors|timed out|fetch|offline/i.test(lower)) {
    return {
      tone: "danger",
      title: "Cannot reach the server",
      message:
        "We could not connect to the server. Check your internet connection and try again.",
    };
  }

  return {
    tone: "danger",
    title: "Sign-in failed",
    message: raw || "Something went wrong while signing in. Please try again.",
  };
};

const toneStyles = {
  danger: {
    wrap: "border-red-200 bg-red-50",
    title: "text-red-700",
    body: "text-red-600",
    icon: "text-red-500",
  },
  warning: {
    wrap: "border-yellow-200 bg-yellow-100",
    title: "text-yellow-300",
    body: "text-neutral-700",
    icon: "text-yellow-300",
  },
};

const ErrorIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path strokeLinecap="round" d="M12 8v4.5" />
    <path strokeLinecap="round" d="M12 16h.01" />
  </svg>
);

const WarningIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className={className}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
    />
    <path strokeLinecap="round" d="M12 9v4" />
    <path strokeLinecap="round" d="M12 17h.01" />
  </svg>
);

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!password) {
      setError({
        tone: "danger",
        title: "Password required",
        message: "Please enter your password to continue.",
      });
      return;
    }

    setSubmitting(true);
    try {
      const data = await authAPI.login(password);
      // Auth cookie is set by the API (httpOnly). Clear any legacy localStorage tokens.
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("adminUser");

      if (data?.success && data?.user) {
        navigate("/admin");
      } else {
        setError({
          tone: "danger",
          title: "Sign-in failed",
          message: "We could not sign you in. Please try again.",
        });
      }
    } catch (err) {
      setError(buildLoginError(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // Clear stale errors as soon as the user starts correcting the input.
    if (error) setError(null);
  };

  const handleCapsLock = (e) => {
    if (typeof e.getModifierState === "function") {
      setCapsLockOn(e.getModifierState("CapsLock"));
    }
  };

  const tone = error?.tone === "warning" ? toneStyles.warning : toneStyles.danger;
  const Icon = error?.tone === "warning" ? WarningIcon : ErrorIcon;

  return (
    <div className="login-background flex min-h-screen items-center justify-center px-4 py-10">
      <div className="login-card w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-7 w-7"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-400">
            Secure Access
          </p>
          <h1 className="mt-3 text-3xl font-heading font-bold text-primary">
            Admin Login
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Enter your password to access the dashboard.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          {error && (
            <div
              id="login-error"
              role="alert"
              aria-live="assertive"
              className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${tone.wrap}`}
            >
              <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${tone.icon}`} />
              <div>
                <p className={`text-sm font-semibold ${tone.title}`}>
                  {error.title}
                </p>
                <p className={`mt-1 text-sm ${tone.body}`}>{error.message}</p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-neutral-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                className="login-field pr-12"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                onKeyUp={handleCapsLock}
                onKeyDown={handleCapsLock}
                onBlur={() => setCapsLockOn(false)}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "login-error" : undefined}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 transition-colors hover:text-neutral-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3l18 18M10.58 10.58a2 2 0 002.83 2.83M9.88 5.09A9.77 9.77 0 0112 5c5 0 9.27 3.11 11 7a11.8 11.8 0 01-4.29 5.19M6.1 6.1A11.8 11.8 0 001 12a11.8 11.8 0 005.6 5.9"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"
                    />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            {capsLockOn && (
              <p className="flex items-center gap-2 text-xs font-medium text-yellow-300">
                <WarningIcon className="h-3.5 w-3.5" />
                Caps Lock is on
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full py-3 text-base font-semibold disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
