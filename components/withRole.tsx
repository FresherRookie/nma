'use client';
import React, { ReactNode, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface WithRoleProps {
  children?: ReactNode;
}

const WithRole = <P extends object>(
  Component: React.ComponentType<P>,
  allowedRoles: string[]
) => {
  const RoleComponent: React.FC<P & WithRoleProps> = (props) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === 'loading') return;
      if (!session || !allowedRoles.includes(session?.user?.role ?? '')) {
        router.push('/no-access');
      }
    }, [session, status, router]);

    if (status === 'loading') {
      return <div>Loading...</div>;
    }
    if (!session || !allowedRoles.includes(session?.user?.role ?? '')) {
      return null;
    }
    return <Component {...props} />;
  };

  RoleComponent.displayName = `WithRole(${
    Component.displayName || Component.name || 'Component'
  })`;

  return RoleComponent;
};

export default WithRole;
