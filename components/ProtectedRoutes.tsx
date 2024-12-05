import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { UserZod } from '../schemas/user';

interface ProtectedRouteProps {
  role: UserZod['role'];
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role, children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  React.useEffect(() => {
    if (!session && status !== 'loading') {
      router.replace('/');
    } else if (session && session.user?.role !== role) {
      router.replace('/');
    }
  }, [session, status, role, router]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }
  if (!session || session.user?.role !== role) {
    return null;
  }
  return <>{children}</>;
};
export default ProtectedRoute;
