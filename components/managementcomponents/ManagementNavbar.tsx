'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
const ManagementNavbar = () => {
  const { data: session } = useSession();
  const role = session?.user.role;

  return (
    <nav className="bg-gray-800 p-4 flex flex-row items-center justify-center flex-wrap">
      <ul className="flex flex-wrap justify-center space-x-4">
        <li>
          <Link href="/management/newsposts">
            <span className="text-white hover:text-gray-300">News Posts</span>
          </Link>
        </li>
        <li>
          <Link href="/management/team">
            <span className="text-white hover:text-gray-300">Team</span>
          </Link>
        </li>
        <li>
          <Link href="/management/admission">
            <span className="text-white hover:text-gray-300">Admission</span>
          </Link>
        </li>

        <li>
          <Link href="/management/courses">
            <span className="text-white hover:text-gray-300">Courses</span>
          </Link>
        </li>
        <li>
          <Link href="/management/feedbacks">
            <span className="text-white hover:text-gray-300">Feedbacks</span>
          </Link>
        </li>
        <li>
          <Link href="/management/instruments">
            <span className="text-white hover:text-gray-300">Instruments</span>
          </Link>
        </li>

        {session && (
          <>
            {['admin'].includes(session?.user.role) && (
              <li>
                <Link href="/management/users">
                  <span className="text-white hover:text-gray-300">Users</span>
                </Link>
              </li>
            )}
          </>
        )}
      </ul>
    </nav>
  );
};

export default ManagementNavbar;
