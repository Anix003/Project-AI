'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import UserDashboard from '@/components/sections/dashboards/UserDashboard';
import DepartmentDashboard from '@/components/sections/dashboards/DepartmentDashboard';
import AuthorityDashboard from '@/components/sections/dashboards/AuthorityDashboard';
import DeveloperDashboard from '@/components/sections/dashboards/DeveloperDashboard';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const renderDashboard = () => {
    switch (session.user.role) {
      case 'user':
        return <UserDashboard session={session} />;
      case 'department':
        return <DepartmentDashboard session={session} />;
      case 'authority':
        return <AuthorityDashboard session={session} />;
      case 'developer':
        return <DeveloperDashboard session={session} />;
      default:
        return <UserDashboard session={session} />;
    }
  };

  return renderDashboard();
}
