'use client';

import { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function DepartmentDashboard({ session }) {
  const { data: complaints } = useSWR('/api/complaints/department', fetcher);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });

  useEffect(() => {
    if (complaints) {
      setStats({
        total: complaints.length,
        pending: complaints.filter((c) => c.status === 'pending').length,
        inProgress: complaints.filter((c) => c.status === 'in-progress').length,
        resolved: complaints.filter((c) => c.status === 'resolved').length,
      });
    }
  }, [complaints]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Department Dashboard</h1>
            <p className="text-gray-300 text-sm">{session.user.department}</p>
          </div>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total', value: stats.total, icon: '📊', color: 'from-purple-500 to-purple-600' },
            { label: 'Pending', value: stats.pending, icon: '⏳', color: 'from-yellow-500 to-yellow-600' },
            { label: 'In Progress', value: stats.inProgress, icon: '🔄', color: 'from-blue-500 to-cyan-500' },
            { label: 'Resolved', value: stats.resolved, icon: '✅', color: 'from-green-500 to-green-600' },
          ].map((stat, index) => (
            <div key={index} className={`bg-gradient-to-r ${stat.color} rounded-xl p-6 shadow-lg`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">{stat.label}</p>
                  <p className="text-4xl font-bold text-white mt-2">{stat.value}</p>
                </div>
                <div className="text-5xl">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">Department Complaints</h2>
          {!complaints ? (
            <div className="text-center text-gray-300 py-8">Loading...</div>
          ) : complaints.length === 0 ? (
            <div className="text-center text-gray-300 py-8">No complaints assigned yet</div>
          ) : (
            <div className="space-y-4">
              {complaints.map((complaint) => (
                <div key={complaint._id} className="bg-white/5 rounded-lg p-5 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-2">{complaint.title}</h3>
                  <p className="text-gray-300 text-sm mb-3">{complaint.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4 text-sm text-gray-400">
                      <span>Status: {complaint.status}</span>
                      <span>Priority: {complaint.priority}</span>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      Update Status
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
