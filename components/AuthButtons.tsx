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
    <div>
      {session ? (
        <>
          {['admin', 'manager'].includes(session.user.role) && (
            <a href="/management">Management</a>
          )}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <button onClick={() => router.push('/signin')}>Login</button>
          <button onClick={() => router.push('/signup')}>Sign Up</button>
        </>
      )}
    </div>
  );
};

export default AuthButtons;
