// src/services/api.js
// Central API service for all backend communication

const API_BASE_URL =
  (import.meta.env.VITE_API_URL || "http://localhost:4000/api")
    .trim()
    .replace(/\/+$/, "");

const normalizeErrorMessage = (data, status) => {
  const rawMessage =
    data?.message ||
    data?.error ||
    (typeof data === "string" ? data : "");

  const message = rawMessage.trim();

  if (!message) {
    return status === 400
      ? "Please check your input and try again."
      : `Something went wrong (${status}). Please try again.`;
  }

  if (/required|must be provided|is required|validation/i.test(message)) {
    const fieldMatch = message.match(/Path `?([^`']+)`? is required/i);

    if (fieldMatch?.[1]) {
      const fieldLabel = fieldMatch[1].replace(/([A-Z])/g, " $1").trim();
      return `Please fill in the ${fieldLabel.toLowerCase()} field before saving.`;
    }

    return "Please complete all required fields before saving.";
  }

  if (/duplicate|already exists|unique|e11000/i.test(message)) {
    return "This information already exists. Please choose a different value.";
  }

  if (/invalid email|email.*valid|must be a valid email/i.test(message)) {
    return "Please enter a valid email address.";
  }

  if (/invalid email or password/i.test(message)) {
    return "The email address or password is incorrect.";
  }

  if (/invalid password|incorrect password|wrong password/i.test(message)) {
    return "The password you entered is incorrect. Please try again.";
  }

  if (/unauthorized|not authenticated|token/i.test(message)) {
    return "Your session needs to be refreshed. Please sign in again.";
  }

  return message;
};

// ==================== API CALL HELPER ====================

const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 60000);

  // Session auth uses httpOnly cookies (credentials: include). Do not store JWTs in localStorage.
  const defaultOptions = {
    headers: {},
    credentials: "include",
    signal: controller.signal,
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  if (
    mergedOptions.body &&
    !mergedOptions.headers["Content-Type"] &&
    !(mergedOptions.body instanceof FormData)
  ) {
    mergedOptions.headers["Content-Type"] = "application/json";
  }

  try {
    const response = await fetch(url, mergedOptions);
    const contentType = response.headers.get("content-type") || "";
    const responseText = await response.text();
    let data = { message: responseText };
    if (responseText && contentType.includes("application/json")) {
      try {
        data = JSON.parse(responseText);
      } catch {
        data = { message: responseText };
      }
    }

    window.clearTimeout(timeoutId);

    if (!response.ok) {
      const requestError = new Error(normalizeErrorMessage(data, response.status));
      requestError.status = response.status;
      requestError.data = data;
      throw requestError;
    }

    return data;
  } catch (error) {
    window.clearTimeout(timeoutId);

    if (error.name === "AbortError") {
      throw new Error(
        "Backend request timed out. The API may be cold-starting or the database may be slow to respond."
      );
    }

    if (error instanceof TypeError) {
      throw new Error(
        `Network/CORS error calling ${url}. Check that the backend is running and the frontend origin is allowed.`
      );
    }

    throw error;
  }
};

// ==================== COMPLETED MAJLIS API ====================

export const completedMajlisAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return apiCall(`/completed-majlis?${params}`);
  },

  create: (data) =>
    apiCall("/completed-majlis", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    apiCall(`/completed-majlis/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    apiCall(`/completed-majlis/${id}`, {
      method: "DELETE",
    }),
};

// ==================== STAFF API ====================

export const staffAPI = {
  getAll: () => apiCall("/staff"),

  getById: (id) => apiCall(`/staff/${id}`),

  getFiltered: (filters) => {
    const params = new URLSearchParams(filters).toString();
    return apiCall(`/staff/filter?${params}`);
  },

  create: (data) =>
    apiCall("/staff", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    apiCall(`/staff/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    apiCall(`/staff/${id}`, {
      method: "DELETE",
    }),
};

// ==================== PROGRAMS API ====================

export const programsAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return apiCall(`/programs?${params}`);
  },

  getBySlug: (slug) => apiCall(`/programs/${slug}`),

  create: (data) =>
    apiCall("/programs", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    apiCall(`/programs/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    apiCall(`/programs/${id}`, {
      method: "DELETE",
    }),
};

// ==================== MEDIA API ====================

export const mediaAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return apiCall(`/media?${params}`);
  },

  create: (data) =>
    apiCall("/media", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    apiCall(`/media/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    apiCall(`/media/${id}`, {
      method: "DELETE",
    }),

  getTelegramUrl: (id) => apiCall(`/media/${id}/telegram-url`),
};

// ==================== PLAYLISTS API ====================

export const playlistsAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return apiCall(`/media/playlists?${params}`);
  },

  create: (data) =>
    apiCall("/media/playlists", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    apiCall(`/media/playlists/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
};

// ==================== RESEARCH API ====================

export const researchAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return apiCall(`/research?${params}`);
  },

  getById: (id) => apiCall(`/research/${id}`),

  getTelegramUrl: (id) => apiCall(`/research/${id}/telegram-url`),

  create: (data) =>
    apiCall("/research", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    apiCall(`/research/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    apiCall(`/research/${id}`, {
      method: "DELETE",
    }),
};

// ==================== MAJLIS API ====================

export const majlisAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return apiCall(`/majlis?${params}`);
  },

  getById: (id) => apiCall(`/majlis/${id}`),

  create: (data) =>
    apiCall("/majlis", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    apiCall(`/majlis/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    apiCall(`/majlis/${id}`, {
      method: "DELETE",
    }),
};

// ==================== COMPLETED SERIES API ====================

export const completedSeriesAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return apiCall(`/completed-series?${params}`);
  },

  create: (data) =>
    apiCall("/completed-series", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    apiCall(`/completed-series/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    apiCall(`/completed-series/${id}`, {
      method: "DELETE",
    }),
};

// ==================== NOTIFICATIONS API ====================

export const notificationsAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return apiCall(`/notifications?${params}`);
  },

  markAsRead: (id) =>
    apiCall(`/notifications/${id}/read`, {
      method: "PATCH",
    }),

  delete: (id) =>
    apiCall(`/notifications/${id}`, {
      method: "DELETE",
    }),
};

// ==================== ACTIVITIES API ====================

export const activitiesAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return apiCall(`/activities?${params}`);
  },

  create: (data) =>
    apiCall("/activities", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    apiCall(`/activities/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    apiCall(`/activities/${id}`, {
      method: "DELETE",
    }),

  deleteAll: () =>
    apiCall("/activities", {
      method: "DELETE",
    }),
};

// ==================== AUTH API ====================

export const authAPI = {
  login: (password) =>
    apiCall("/auth/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    }),

  logout: () =>
    apiCall("/auth/logout", {
      method: "POST",
    }),

  getSession: () => apiCall("/auth/session"),
};

// ==================== CURRENT USER API ====================

export const currentUserAPI = {
  getProfile: () => apiCall("/users/me/profile"),

  updateProfile: (data) =>
    apiCall("/users/me/profile", {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
};
