import { axiosInstance } from '@/lib/axios';
import { useAuthStore } from '@/stores/useAuthStore';
import { useChatStore } from '@/stores/useChatStore';
import { useAuth } from '@clerk/clerk-react';
import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';

const updateApiToken = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken, userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const { checkAdminStatus } = useAuthStore();
  const { initSocket, disconnectSocket } = useChatStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        if (token) {
          await checkAdminStatus();

          // Init Socket
          if (userId) initSocket(userId);
        }
        updateApiToken(token);
      } catch (error) {
        console.log('Error in auth provider', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
    // Clean up
    return () => disconnectSocket();
  }, [checkAdminStatus, disconnectSocket, getToken, initSocket, userId]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="size-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return <div>{children}</div>;
};

export default AuthProvider;
