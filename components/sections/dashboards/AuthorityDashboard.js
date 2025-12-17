'use client';

import { signOut } from 'next-auth/react';
import useSWR from 'swr';
import { FileText, Building2, TrendingUp } from 'lucide-react';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function AuthorityDashboard({ session }) {
  const { data: allComplaints } = useSWR('/api/complaints/all', fetcher);
  const { data: departments } = useSWR('/api/departments', fetcher);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Authority Dashboard</h1>
          <div className="flex items-center gap-6">
            <span className="text-gray-700 font-medium">{session.user.name}</span>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition border border-gray-300"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition">
            <h3 className="text-gray-600 text-sm font-medium">Total Complaints</h3>
            <p className="text-4xl font-bold text-blue-600 mt-2">{allComplaints?.length || 0}</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition">
            <h3 className="text-gray-600 text-sm font-medium">Active Departments</h3>
            <p className="text-4xl font-bold text-green-600 mt-2">{departments?.length || 0}</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition">
            <h3 className="text-gray-600 text-sm font-medium">Resolution Rate</h3>
            <p className="text-4xl font-bold text-purple-600 mt-2">
              {allComplaints
                ? Math.round(
                    (allComplaints.filter((c) => c.status === 'resolved').length / allComplaints.length) * 100
                  )
                : 0}
              %
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">System Overview</h2>
          <div className="text-gray-600">Authority dashboard with full system access and monitoring capabilities.</div>
        </div>
      </div>
    </div>
  );
}
