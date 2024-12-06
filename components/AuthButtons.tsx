'use client';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const AuthButtons = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };
  return (
    <div className="flex flex-row gap-2 text-white-ivory">
      {session ? (
        <>
          {session.user &&
            ['admin', 'manager'].includes(session.user.role ?? '') && (
              <a href="/management">Management</a>
            )}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <button onClick={() => router.push('/auth/signin')}>Login</button>
          <button onClick={() => router.push('/auth/signup')}>Sign Up</button>
        </>
      )}
    </div>
  );
};

export default AuthButtons;
