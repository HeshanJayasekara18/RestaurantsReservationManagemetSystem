import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:7000',
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token from localStorage on every request
api.interceptors.request.use((config) => {
  // Read directly from localStorage to avoid circular import with Zustand store
  try {
    const raw = localStorage.getItem('erp-auth');
    if (raw) {
      const parsed = JSON.parse(raw);
      const token: string | null = parsed?.state?.token ?? null;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch {
    // localStorage not available (SSR) — skip
  }
  return config;
});

// Global response error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear stale auth and redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('erp-auth');
        window.location.href = '/erp/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// ── Typed API helpers ─────────────────────────────────────────────────────────

export const authApi = {
  loginStaff: (email: string, password: string) =>
    api.post('/auth/login/staff', { email, password }),
  getMe: () => api.get('/auth/me'),
  createStaff: (data: { name: string; email: string; password: string; role?: string }) =>
    api.post('/auth/staff', data),
  listStaff: () => api.get('/auth/staff'),
};

export const reservationsApi = {
  list: () => api.get('/reservations'),
  byRestaurant: (id: number) => api.get(`/reservations/restaurant/${id}`),
  byCustomer: (id: number) => api.get(`/reservations/customer/${id}`),
  getOne: (id: number) => api.get(`/reservations/${id}`),
  update: (id: number, data: Record<string, unknown>) => api.patch(`/reservations/${id}`, data),
  remove: (id: number) => api.delete(`/reservations/${id}`),
};

export const tablesApi = {
  list: () => api.get('/tables'),
  byRestaurant: (id: number) => api.get(`/tables/restaurant/${id}`),
  create: (data: Record<string, unknown>) => api.post('/tables', data),
  update: (id: number, data: Record<string, unknown>) => api.patch(`/tables/${id}`, data),
  remove: (id: number) => api.delete(`/tables/${id}`),
};

export const menuApi = {
  categories: (restaurantId: number) => api.get(`/menu/categories/restaurant/${restaurantId}`),
  createCategory: (data: { restaurantId: number; name: string }) =>
    api.post('/menu/categories', data),
  removeCategory: (id: number) => api.delete(`/menu/categories/${id}`),
  items: (restaurantId: number) => api.get(`/menu/items/restaurant/${restaurantId}`),
  createItem: (data: Record<string, unknown>) => api.post('/menu/items', data),
  updateItem: (id: number, data: Record<string, unknown>) => api.patch(`/menu/items/${id}`, data),
  removeItem: (id: number) => api.delete(`/menu/items/${id}`),
};

export const customersApi = {
  list: () => api.get('/customers'),
  getOne: (id: number) => api.get(`/customers/${id}`),
};

export const restaurantsApi = {
  list: () => api.get('/restaurants'),
  getOne: (id: number) => api.get(`/restaurants/${id}`),
};
