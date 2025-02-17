import { axiosInstance } from '@/lib/axios';
import { create } from 'zustand';

interface ChatStore {
  users: any[];
  isLoading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
}

export const useChatStore = create<ChatStore>((set) => ({
  users: [],
  isLoading: false,
  error: null,

  fetchUsers: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get('/users');

      set({ users: response.data });
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      set({ error: err.response?.data?.message || 'Something went wrong' });
    } finally {
      set({ isLoading: false });
    }
  },
}));
