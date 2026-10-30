const isProduction = () => process.env.NODE_ENV === "production";

/**
 * Cross-site Netlify ↔ API needs SameSite=None; Secure.
 * Localhost stays Lax so cookies work over http.
 */
export const getAuthCookieOptions = () => ({
  httpOnly: true,
  secure: isProduction(),
  sameSite: isProduction() ? "none" : "lax",
  maxAge: 24 * 60 * 60 * 1000,
  path: "/",
});

export const clearAuthCookie = (res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction(),
    sameSite: isProduction() ? "none" : "lax",
    path: "/",
  });
};
