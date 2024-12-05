import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/lib/auth';

export default async function Management() {
  const session = await getServerSession(authOptions);

  if (
    !session ||
    !session.user ||
    !['admin', 'manager'].includes(session.user.role ?? '')
  ) {
    return <div>Access denied</div>;
  }

  return (
    <div>
      <h1>Management Page</h1>
    </div>
  );
}
