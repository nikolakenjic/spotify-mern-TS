import Topbar from '@/components/Topbar';
import { useMusicStore } from '@/stores/useMusicStore';
import { useEffect } from 'react';
import FeaturedSection from './components/FeaturedSection';
import SectionGrid from './components/SectionGrid';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePlayerStore } from '@/stores/usePlayerStore';

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
  const { initializeQueue } = usePlayerStore();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

  useEffect(() => {
    if (
      madeForYouSongs.length > 0 &&
      featuredSongs.length > 0 &&
      trendingSongs.length > 0
    ) {
      const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs];
      initializeQueue(allSongs);
    }
  }, [initializeQueue, madeForYouSongs, trendingSongs, featuredSongs]);

  return (
    <main className="h-full bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-b-md">
      <Topbar />
      <ScrollArea className="h-[calc(100vh-180px)] rounded-md overflow-hidden">
        <div className="p-4 sm:p-6">
          <h1 className="text-xl sm:text-3xl font-bold mb-6">Good Afternoon</h1>
          <FeaturedSection />
          <div className="space-y-8">
            <SectionGrid
              songs={madeForYouSongs}
              title="Made For You"
              isLoading={isLoading}
            />
            <SectionGrid
              songs={trendingSongs}
              title="Trending"
              isLoading={isLoading}
            />
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};

export default HomePage;
