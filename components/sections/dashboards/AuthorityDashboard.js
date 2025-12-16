'use client';

import { signOut } from 'next-auth/react';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function AuthorityDashboard({ session }) {
  const { data: allComplaints } = useSWR('/api/complaints/all', fetcher);
  const { data: departments } = useSWR('/api/departments', fetcher);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Authority Dashboard</h1>
          <div className="flex items-center gap-6">
            <span className="text-gray-300">{session.user.name}</span>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 shadow-lg">
            <h3 className="text-white/80 text-sm">Total Complaints</h3>
            <p className="text-4xl font-bold text-white mt-2">{allComplaints?.length || 0}</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 shadow-lg">
            <h3 className="text-white/80 text-sm">Active Departments</h3>
            <p className="text-4xl font-bold text-white mt-2">{departments?.length || 0}</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 shadow-lg">
            <h3 className="text-white/80 text-sm">Resolution Rate</h3>
            <p className="text-4xl font-bold text-white mt-2">
              {allComplaints
                ? Math.round(
                    (allComplaints.filter((c) => c.status === 'resolved').length / allComplaints.length) * 100
                  )
                : 0}
              %
            </p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">System Overview</h2>
          <div className="text-gray-300">Authority dashboard with full system access and monitoring capabilities.</div>
        </div>
      </div>
    </div>
  );
}
