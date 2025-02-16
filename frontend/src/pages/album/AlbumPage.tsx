import { useMusicStore } from '@/stores/useMusicStore';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AlbumPage = () => {
  const { albumId } = useParams();
  const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();

  useEffect(() => {
    if (albumId) fetchAlbumById(albumId);
  }, [albumId, fetchAlbumById]);

  if (isLoading) return null;

  return <div>AlbumPage</div>;
};

export default AlbumPage;
