import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

// Add token to requests if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;

// Auth APIs
export const authAPI = {
  login: (data) => API.post("/auth/login", data),
  register: (data) => API.post("/auth/register", data),
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  },
};

// Product APIs
export const productAPI = {
  getAll: (filters) => API.get("/products", { params: filters }),
  getById: (id) => API.get(`/products/${id}`),
  create: (data) => API.post("/products", data),
  update: (id, data) => API.put(`/products/${id}`, data),
  delete: (id) => API.delete(`/products/${id}`),
};

// Order APIs
export const orderAPI = {
  getAll: () => API.get("/orders"),
  getById: (id) => API.get(`/orders/${id}`),
  create: (data) => API.post("/orders", data),
  updateStatus: (id, status) => API.patch(`/orders/${id}/status`, { status }),
};

// User APIs
export const userAPI = {
  getProfile: () => API.get("/user/profile"),
  updateProfile: (data) => API.put("/user/profile", data),
};