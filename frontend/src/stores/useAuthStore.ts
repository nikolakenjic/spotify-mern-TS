import { axiosInstance } from '@/lib/axios';
import { create } from 'zustand';

interface AuthStore {
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;

  checkAdminStatus: () => Promise<void>;
  reset: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAdmin: true,
  isLoading: false,
  error: null,

  checkAdminStatus: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get('/admin/check');

      set({ isAdmin: response.data.admin });
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      set({
        isAdmin: false,
        error: err.response?.data?.message || 'Something went wrong',
      });
    } finally {
      set({ isLoading: false });
    }
  },

  reset: () => {
    set({ isAdmin: false, isLoading: false, error: null });
  },
}));
