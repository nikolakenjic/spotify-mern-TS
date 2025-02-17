import { SignedIn, SignedOut, SignOutButton } from '@clerk/clerk-react';
import { LayoutDashboardIcon } from 'lucide-react';

import { Link } from 'react-router-dom';
import SignInAuthButtons from './SignInAuthButtons';
import { useAuthStore } from '@/stores/useAuthStore';

const Topbar = () => {
  const { isAdmin } = useAuthStore();

  console.log('isAdmin', isAdmin);

  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
      <div className="flex gap-2 items-center">Spotify</div>
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link to={'/admin'}>
            <LayoutDashboardIcon className="size-4 mt-2" />
            Admin Dashboard
          </Link>
        )}

        <SignedIn>
          <SignOutButton />
        </SignedIn>

        <SignedOut>
          <SignInAuthButtons />
        </SignedOut>
      </div>
    </div>
  );
};

export default Topbar;
