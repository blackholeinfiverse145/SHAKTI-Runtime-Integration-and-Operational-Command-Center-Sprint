import axios, { type AxiosError } from "axios";

const BASE_URL =
  import.meta.env.VITE_CONTROL_PLANE_URL ?? "http://127.0.0.1:8009";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
});

// ─── Response interceptor — normalize errors ──────────────────────────────────

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const url = error.config?.url ?? "unknown";

    if (status === 404) {
      return Promise.reject(new Error(`Endpoint not found: ${url}`));
    }
    if (status === 503) {
      return Promise.reject(new Error(`Service unavailable: ${url}`));
    }
    if (error.code === "ECONNABORTED") {
      return Promise.reject(new Error(`Request timeout: ${url}`));
    }
    if (!error.response) {
      return Promise.reject(new Error(`Network error — cannot reach control plane at ${BASE_URL}`));
    }

    return Promise.reject(error);
  }
);
