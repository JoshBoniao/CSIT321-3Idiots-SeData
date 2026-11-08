// API Client for SeData Spring Boot Backend

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const API_ENDPOINTS = {
  roles: "/role",
  users: "/user",
  courses: "/course",
  assessments: "/assessment",
  consentNotices: "/consent_notice",
  consentRecords: "/consent_record",
  submissions: "/submission",
  auditLogs: "/auditlog",
};

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP ${response.status}: ${errorText || response.statusText}`,
      );
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }
    return await response.text();
  } catch (err) {
    console.error(`API request error on ${url}:`, err);
    throw err;
  }
}

export const api = {
  // Generic CRUD
  getAll: (resource) => request(`${API_ENDPOINTS[resource]}`),
  getById: (resource, id) => request(`${API_ENDPOINTS[resource]}/${id}`),
  create: (resource, data) =>
    request(`${API_ENDPOINTS[resource]}`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (resource, id, data) =>
    request(`${API_ENDPOINTS[resource]}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (resource, id) =>
    request(`${API_ENDPOINTS[resource]}/${id}`, {
      method: "DELETE",
    }),

  // Health check to check if Spring Boot is reachable
  checkHealth: async () => {
    try {
      const res = await fetch(`${BASE_URL}/role`, {
        method: "GET",
        signal: AbortSignal.timeout(2500),
      });
      return res.status < 500;
    } catch {
      return false;
    }
  },
};
