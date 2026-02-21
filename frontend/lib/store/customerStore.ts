import { create } from 'zustand';
import { Customer } from '@/lib/types';
import { customersApi } from '@/lib/api';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

interface CustomerState {
  customers: Customer[];
  isLoading: boolean;
  error: string | null;
  fetchCustomers: () => Promise<void>;
  createCustomer: (data: Partial<Customer>) => Promise<void>;
  updateCustomer: (id: number, data: Partial<Customer>) => Promise<void>;
  deleteCustomer: (id: number) => Promise<void>;
}

export const useCustomerStore = create<CustomerState>((set) => ({
  customers: [],
  isLoading: false,
  error: null,

  fetchCustomers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await customersApi.list();
      set({ customers: response.data, isLoading: false });
    } catch (error) {
      const msg = error instanceof AxiosError ? error.response?.data?.message || error.message : 'Failed to load customers';
      set({ error: msg, isLoading: false, customers: [] });
      toast.error(msg);
    }
  },

  createCustomer: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await customersApi.create(data);
      set((state) => ({
        customers: [...state.customers, response.data],
        isLoading: false,
      }));
      toast.success('Customer created successfully');
    } catch (error) {
      const msg = error instanceof AxiosError ? error.response?.data?.message || error.message : 'Failed to create customer';
      set({ error: msg, isLoading: false });
      toast.error(msg);
      throw error; // Rethrow to handle in the form
    }
  },

  updateCustomer: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await customersApi.update(id, data);
      set((state) => ({
        customers: state.customers.map((c) => (c.id === id ? response.data : c)),
        isLoading: false,
      }));
      toast.success('Customer updated successfully');
    } catch (error) {
      const msg = error instanceof AxiosError ? error.response?.data?.message || error.message : 'Failed to update customer';
      set({ error: msg, isLoading: false });
      toast.error(msg);
      throw error;
    }
  },

  deleteCustomer: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await customersApi.remove(id);
      set((state) => ({
        customers: state.customers.filter((c) => c.id !== id),
        isLoading: false,
      }));
      toast.success('Customer deleted successfully');
    } catch (error) {
      const msg = error instanceof AxiosError ? error.response?.data?.message || error.message : 'Failed to delete customer';
      set({ error: msg, isLoading: false });
      toast.error(msg);
    }
  },
}));
