import { create } from 'zustand';
import { tablesApi, reservationsApi } from '../api';
import { DiningTable, Reservation } from '../types';

interface TablesState {
  tables: DiningTable[];
  activeReservations: Reservation[];
  isLoading: boolean;
  error: string | null;

  fetchTables: (restaurantId: number) => Promise<void>;
  fetchReservations: (restaurantId: number) => Promise<void>;
  createTable: (data: Partial<DiningTable>) => Promise<void>;
  updateTable: (id: number, data: Partial<DiningTable>) => Promise<void>;
  deleteTable: (id: number) => Promise<void>;
}

export const useTablesStore = create<TablesState>((set, get) => ({
  tables: [],
  activeReservations: [],
  isLoading: false,
  error: null,

  fetchTables: async (restaurantId: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await tablesApi.byRestaurant(restaurantId);
      set({ tables: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to fetch tables', isLoading: false });
    }
  },

  fetchReservations: async (restaurantId: number) => {
    try {
      // In a real app we might filter by today's date
      const response = await reservationsApi.byRestaurant(restaurantId);
      set({ activeReservations: response.data });
    } catch (error: any) {
      console.error('Failed to fetch reservations', error);
    }
  },

  createTable: async (data: Partial<DiningTable>) => {
    set({ isLoading: true, error: null });
    try {
      const response = await tablesApi.create({ ...data, restaurantId: data.restaurantId || 1 });
      set((state) => ({ tables: [...state.tables, response.data], isLoading: false }));
    } catch (error: any) {
      set({ error: error.message || 'Failed to create table', isLoading: false });
      throw error;
    }
  },

  updateTable: async (id: number, data: Partial<DiningTable>) => {
    try {
      const response = await tablesApi.update(id, data);
      set((state) => ({
        tables: state.tables.map((t) => (t.id === id ? response.data : t)),
      }));
    } catch (error: any) {
      throw error;
    }
  },

  deleteTable: async (id: number) => {
    try {
      await tablesApi.remove(id);
      set((state) => ({
        tables: state.tables.filter((t) => t.id !== id),
      }));
    } catch (error: any) {
      throw error;
    }
  },
}));
