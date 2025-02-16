import { axiosInstance } from '@/lib/axios';
import { Album, Song } from '@/types';
import { create } from 'zustand';

interface MusicStore {
  albums: Album[];
  songs: Song[];
  isLoading: boolean;
  error: string | null;

  fetchAlbums: () => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,

  fetchAlbums: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get('/albums');

      set({ albums: response.data });
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      set({ error: err.response?.data?.message || 'Something went wrong' });
    } finally {
      set({ isLoading: false });
    }
  },
}));
