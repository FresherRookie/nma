import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function Management() {
  const session = await getServerSession(authOptions);

  if (!session || !['admin', 'manager'].includes(session.user.role)) {
    return <div>Access denied</div>;
  }

  return (
    <div>
      <h1>Management Page</h1>
    </div>
  );
}
