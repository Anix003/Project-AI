'use client';

import { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import useSWR from 'swr';
import { BarChart3, Clock, RefreshCw, CheckCircle } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Department Dashboard</h1>
            <p className="text-gray-600 text-sm font-medium">{session.user.department}</p>
          </div>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total', value: stats.total, Icon: BarChart3, color: 'text-purple-600' },
            { label: 'Pending', value: stats.pending, Icon: Clock, color: 'text-yellow-600' },
            { label: 'In Progress', value: stats.inProgress, Icon: RefreshCw, color: 'text-blue-600' },
            { label: 'Resolved', value: stats.resolved, Icon: CheckCircle, color: 'text-green-600' },
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <p className={`text-4xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
                </div>
                <stat.Icon className={`w-10 h-10 opacity-50 ${stat.color}`} />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Department Complaints</h2>
          {!complaints ? (
            <div className="text-center text-gray-500 py-8">Loading...</div>
          ) : complaints.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No complaints assigned yet</div>
          ) : (
            <div className="space-y-4">
              {complaints.map((complaint) => (
                <div key={complaint._id} className="bg-gray-50 rounded-lg p-5 border border-gray-200 hover:bg-gray-100 transition">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{complaint.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{complaint.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span className="font-medium">Status: <span className="text-gray-900">{complaint.status}</span></span>
                      <span className="font-medium">Priority: <span className="text-gray-900">{complaint.priority}</span></span>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm">
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
