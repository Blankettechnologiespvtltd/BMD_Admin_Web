/**
 * ENV CONSTANTS
 * ─────────────────────────────────────────────────────────────────────────────
 * All environment variables are consumed here.
 * Never read import.meta.env directly in components or services.
 */

const ENV = {
  API_BASE_URL:
    import.meta.env.VITE_API_BASE_URL || "http://192.168.1.29:8000/api/v1",
  IS_PROD: import.meta.env.PROD,
  MODE: import.meta.env.MODE || "development",
};

export default ENV;
