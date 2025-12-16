'use client';

import { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function UserDashboard({ session }) {
  const { data: complaints, mutate } = useSWR('/api/complaints/my-complaints', fetcher);
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
      case 'in-progress':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
      case 'resolved':
        return 'bg-green-500/20 text-green-300 border-green-500/50';
      case 'rejected':
        return 'bg-red-500/20 text-red-300 border-red-500/50';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'text-red-400';
      case 'high':
        return 'text-orange-400';
      case 'medium':
        return 'text-yellow-400';
      case 'low':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Navigation */}
      <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">ComplainHub</h1>
          <div className="flex items-center gap-6">
            <span className="text-gray-300">Welcome, {session.user.name}</span>
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Complaints', value: stats.total, icon: '📋', color: 'from-blue-500 to-blue-600' },
            { label: 'Pending', value: stats.pending, icon: '⏳', color: 'from-yellow-500 to-yellow-600' },
            { label: 'In Progress', value: stats.inProgress, icon: '🔄', color: 'from-blue-500 to-cyan-500' },
            { label: 'Resolved', value: stats.resolved, icon: '✅', color: 'from-green-500 to-green-600' },
          ].map((stat, index) => (
            <div
              key={index}
              className={`bg-gradient-to-r ${stat.color} rounded-xl p-6 shadow-lg transform hover:scale-105 transition`}
            >
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

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <Link href="/complaint/new">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
              <span className="text-xl">+</span>
              File New Complaint
            </button>
          </Link>
        </div>

        {/* Complaints List */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">Your Complaints</h2>
          
          {!complaints ? (
            <div className="text-center text-gray-300 py-8">Loading complaints...</div>
          ) : complaints.length === 0 ? (
            <div className="text-center text-gray-300 py-8">
              <p className="text-xl mb-4">No complaints filed yet</p>
              <Link href="/complaint/new">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  File Your First Complaint
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {complaints.map((complaint) => (
                <Link key={complaint._id} href={`/complaint/${complaint._id}`}>
                  <div className="bg-white/5 rounded-lg p-5 hover:bg-white/10 transition border border-white/10">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2">{complaint.title}</h3>
                        <p className="text-gray-300 text-sm line-clamp-2">{complaint.description}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(complaint.status)}`}>
                        {complaint.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        📁 {complaint.category}
                      </span>
                      <span className="flex items-center gap-1">
                        🏢 {complaint.department}
                      </span>
                      <span className={`flex items-center gap-1 ${getPriorityColor(complaint.priority)}`}>
                        🔥 {complaint.priority}
                      </span>
                      <span className="flex items-center gap-1">
                        📅 {new Date(complaint.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
