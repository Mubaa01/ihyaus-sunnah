// src/services/api.js
// Central API service for all backend communication

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

// Helper function to make API calls
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Include cookies for auth
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `API error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

// ==================== STAFF API ====================
export const staffAPI = {
  getAll: () => apiCall("/staff"),
  getById: (id) => apiCall(`/staff/${id}`),
  getFiltered: (filters) => {
    const params = new URLSearchParams(filters).toString();
    return apiCall(`/staff/filter?${params}`);
  },
  create: (data, secretKey) =>
    apiCall("/staff", {
      method: "POST",
      headers: { "x-secret-key": secretKey },
      body: JSON.stringify(data),
    }),
  update: (id, data, secretKey) =>
    apiCall(`/staff/${id}`, {
      method: "PATCH",
      headers: { "x-secret-key": secretKey },
      body: JSON.stringify(data),
    }),
  delete: (id, secretKey) =>
    apiCall(`/staff/${id}`, {
      method: "DELETE",
      headers: { "x-secret-key": secretKey },
    }),
};

// ==================== PROGRAMS API ====================
export const programsAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return apiCall(`/programs?${params}`);
  },
  getBySlug: (slug) => apiCall(`/programs/${slug}`),
  create: (data, secretKey) =>
    apiCall("/programs", {
      method: "POST",
      headers: { "x-secret-key": secretKey },
      body: JSON.stringify(data),
    }),
  update: (id, data, secretKey) =>
    apiCall(`/programs/${id}`, {
      method: "PATCH",
      headers: { "x-secret-key": secretKey },
      body: JSON.stringify(data),
    }),
  delete: (id, secretKey) =>
    apiCall(`/programs/${id}`, {
      method: "DELETE",
      headers: { "x-secret-key": secretKey },
    }),
};

// ==================== MEDIA API ====================
export const mediaAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return apiCall(`/media?${params}`);
  },
  create: (data, secretKey) =>
    apiCall("/media", {
      method: "POST",
      headers: { "x-secret-key": secretKey },
      body: JSON.stringify(data),
    }),
  update: (id, data, secretKey) =>
    apiCall(`/media/${id}`, {
      method: "PATCH",
      headers: { "x-secret-key": secretKey },
      body: JSON.stringify(data),
    }),
  delete: (id, secretKey) =>
    apiCall(`/media/${id}`, {
      method: "DELETE",
      headers: { "x-secret-key": secretKey },
    }),
};

// ==================== PLAYLISTS API ====================
export const playlistsAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return apiCall(`/media/playlists?${params}`);
  },
  create: (data, secretKey) =>
    apiCall("/media/playlists", {
      method: "POST",
      headers: { "x-secret-key": secretKey },
      body: JSON.stringify(data),
    }),
};

// ==================== RESEARCH API ====================
export const researchAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return apiCall(`/research?${params}`);
  },
  create: (data, secretKey) =>
    apiCall("/research", {
      method: "POST",
      headers: { "x-secret-key": secretKey },
      body: JSON.stringify(data),
    }),
  update: (id, data, secretKey) =>
    apiCall(`/research/${id}`, {
      method: "PATCH",
      headers: { "x-secret-key": secretKey },
      body: JSON.stringify(data),
    }),
  delete: (id, secretKey) =>
    apiCall(`/research/${id}`, {
      method: "DELETE",
      headers: { "x-secret-key": secretKey },
    }),
};

// ==================== MAJLIS API ====================
export const majlisAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return apiCall(`/majlis?${params}`);
  },
  create: (data, secretKey) =>
    apiCall("/majlis", {
      method: "POST",
      headers: { "x-secret-key": secretKey },
      body: JSON.stringify(data),
    }),
  update: (id, data, secretKey) =>
    apiCall(`/majlis/${id}`, {
      method: "PATCH",
      headers: { "x-secret-key": secretKey },
      body: JSON.stringify(data),
    }),
  delete: (id, secretKey) =>
    apiCall(`/majlis/${id}`, {
      method: "DELETE",
      headers: { "x-secret-key": secretKey },
    }),
};

// ==================== AUTH API ====================
export const authAPI = {
  login: (email, password) =>
    apiCall("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  logout: () =>
    apiCall("/auth/logout", {
      method: "POST",
    }),
  generateSecretKey: (password) =>
    apiCall("/auth/generate-secret-key", {
      method: "POST",
      body: JSON.stringify({ password }),
    }),
};
