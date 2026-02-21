import { create } from 'zustand';
import { menuApi } from '../api';
import { MenuCategory, MenuItem } from '../types';

interface MenuState {
  categories: MenuCategory[];
  items: MenuItem[];
  isLoading: boolean;
  error: string | null;

  fetchCategories: (restaurantId: number) => Promise<void>;
  fetchItems: (restaurantId: number) => Promise<void>;
  createCategory: (data: { restaurantId: number; name: string }) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
  createItem: (data: Partial<MenuItem>) => Promise<void>;
  updateItem: (id: number, data: Partial<MenuItem>) => Promise<void>;
  deleteItem: (id: number) => Promise<void>;
}

export const useMenuStore = create<MenuState>((set) => ({
  categories: [],
  items: [],
  isLoading: false,
  error: null,

  fetchCategories: async (restaurantId: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await menuApi.categories(restaurantId);
      set({ categories: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch categories', isLoading: false });
    }
  },

  fetchItems: async (restaurantId: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await menuApi.items(restaurantId);
      set({ items: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch items', isLoading: false });
    }
  },

  createCategory: async (data: { restaurantId: number; name: string }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await menuApi.createCategory(data);
      set((state) => ({ categories: [...state.categories, response.data], isLoading: false }));
    } catch (error: any) {
      set({ error: error.message || 'Failed to create category', isLoading: false });
      throw error;
    }
  },

  deleteCategory: async (id: number) => {
    try {
      await menuApi.removeCategory(id);
      set((state) => ({ categories: state.categories.filter(c => c.id !== id) }));
    } catch (error: any) {
      throw error;
    }
  },

  createItem: async (data: Partial<MenuItem>) => {
    set({ isLoading: true, error: null });
    try {
      const response = await menuApi.createItem({ ...data, restaurantId: data.restaurantId || 1 });
      set((state) => ({ items: [...state.items, response.data], isLoading: false }));
    } catch (error: any) {
      set({ error: error.message || 'Failed to create item', isLoading: false });
      throw error;
    }
  },

  updateItem: async (id: number, data: Partial<MenuItem>) => {
    try {
      const response = await menuApi.updateItem(id, data);
      set((state) => ({ items: state.items.map(i => i.id === id ? response.data : i) }));
    } catch (error: any) {
      throw error;
    }
  },

  deleteItem: async (id: number) => {
    try {
      await menuApi.removeItem(id);
      set((state) => ({ items: state.items.filter(i => i.id !== id) }));
    } catch (error: any) {
      throw error;
    }
  }
}));
