'use client';

import { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import useSWR from 'swr';
import { ClipboardList, Clock, RefreshCw, CheckCircle, Plus, FolderOpen, Building2, Flame, Calendar } from 'lucide-react';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function UserDashboard({ session }) {
  const { data: response, mutate } = useSWR('/api/complaints/my-complaints', fetcher, {
    revalidateOnFocus: true, // Refresh when window regains focus
    revalidateOnReconnect: true, // Refresh on reconnect
  });
  // Safely extract complaints array from response
  const complaints = Array.isArray(response) ? response : [];

  // Compute stats directly from complaints
  const stats = {
    total: complaints.length,
    pending: complaints.filter((c) => c.status === 'pending').length,
    inProgress: complaints.filter((c) => c.status === 'in-progress').length,
    resolved: complaints.filter((c) => c.status === 'resolved').length,
  };

  // Refresh on mount
  useEffect(() => {
    mutate();
  }, []);

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
        return 'text-red-600 font-semibold';
      case 'high':
        return 'text-orange-600 font-semibold';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Civic-AI</h1>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-gray-700">Welcome, <span className="font-semibold">{session.user.name}</span></span>
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Complaints', value: stats.total, Icon: ClipboardList, color: 'text-blue-600' },
            { label: 'Pending', value: stats.pending, Icon: Clock, color: 'text-yellow-600' },
            { label: 'In Progress', value: stats.inProgress, Icon: RefreshCw, color: 'text-blue-600' },
            { label: 'Resolved', value: stats.resolved, Icon: CheckCircle, color: 'text-green-600' },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition"
            >
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

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <Link href="/complaint/new">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 shadow-sm">
              <Plus className="w-5 h-5" />
              File New Complaint
            </button>
          </Link>
        </div>

        {/* Complaints List */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Complaints</h2>
          
          {!response ? (
            <div className="text-center text-gray-500 py-8">Loading complaints...</div>
          ) : complaints.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p className="text-xl mb-4">No complaints filed yet</p>
              <Link href="/complaint/new">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm">
                  File Your First Complaint
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {complaints.map((complaint) => (
                <Link key={complaint._id} href={`/complaint/${complaint._id}`}>
                  <div className="bg-gray-50 rounded-lg p-5 hover:bg-gray-100 transition border border-gray-200">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{complaint.title}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2">{complaint.description}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(complaint.status)}`}>
                        {complaint.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <FolderOpen className="w-4 h-4" /> {complaint.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" /> {complaint.department}
                      </span>
                      <span className={`flex items-center gap-1 ${getPriorityColor(complaint.priority)}`}>
                        <Flame className="w-4 h-4" /> {complaint.priority}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" /> {new Date(complaint.createdAt).toLocaleDateString()}
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
