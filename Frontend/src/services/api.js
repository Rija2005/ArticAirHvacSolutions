
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Attach JWT to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;

  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  } else {
    config.headers["Content-Type"] = config.headers["Content-Type"] || "application/json";
  }

  return config;
});

// Auto-logout on 401 (expired/invalid token) — avoids stuck broken sessions
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const hadToken = !!localStorage.getItem("token");
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Only force a hard redirect for a genuine session expiry (a token existed
      // and the server rejected it). If there's no token, we're already logged
      // out — e.g. a stray in-flight request from a page that's mid-unmount
      // right after the user clicked Logout — so don't hijack navigation with
      // a full page reload; let the app's own routing (Sidebar's navigate)
      // decide where to go.
      if (hadToken && window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;