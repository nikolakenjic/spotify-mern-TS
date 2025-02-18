import Topbar from '@/components/Topbar';
import { useMusicStore } from '@/stores/useMusicStore';
import { useEffect } from 'react';

const HomePage = () => {
  const {
    featuredSongs,
    fetchMadeForYouSongs,
    fetchTrendingSongs,
    fetchFeaturedSongs,
    madeForYouSongs,
    trendingSongs,
    isLoading,
  } = useMusicStore();

  console.log(featuredSongs, madeForYouSongs, trendingSongs, isLoading);

  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

  return (
    <div>
      <Topbar />
    </div>
  );
};

export default HomePage;
