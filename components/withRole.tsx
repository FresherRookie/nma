'use client';
import React, { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface WithRoleProps {
  children?: ReactNode;
}

const withRole = <P extends object>(
  Component: React.ComponentType<P>,
  allowedRoles: string[]
) => {
  return (props: P & WithRoleProps) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === 'loading') {
      return <div>Loading...</div>;
    }
    if (!session || !allowedRoles.includes(session.user.role)) {
      router.push('/no-access');
      return null;
    }
    return <Component {...props} />;
  };
};

export default withRole;
