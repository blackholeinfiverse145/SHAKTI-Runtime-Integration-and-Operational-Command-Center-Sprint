import axios, { type AxiosError } from "axios";
import { logger } from "@/utils/logger";

const BASE_URL =
  import.meta.env.VITE_CONTROL_PLANE_URL ?? "http://127.0.0.1:8009";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
  headers: { "Content-Type": "application/json" },
});

// ─── Response interceptor — normalize errors ──────────────────────────────────

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const url = error.config?.url ?? "unknown";

    if (status === 404) {
      logger.warn(`Endpoint not found: ${url}`);
      return Promise.reject(new Error(`Endpoint not found: ${url}`));
    }
    if (status === 503) {
      logger.warn(`Service unavailable: ${url}`);
      return Promise.reject(new Error(`Service unavailable: ${url}`));
    }
    if (error.code === "ECONNABORTED") {
      logger.error(`Request timeout: ${url}`);
      return Promise.reject(new Error(`Request timeout: ${url}`));
    }
    if (!error.response) {
      logger.error(`Network error: ${BASE_URL}`);
      return Promise.reject(new Error(`Network error — cannot reach control plane at ${BASE_URL}`));
    }

    logger.error("API Client Error", error, { url, status });
    return Promise.reject(error);
  }
);
