'use client';

import { signOut } from 'next-auth/react';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function DeveloperDashboard({ session }) {
  const { data: systemStats } = useSWR('/api/stats/system', fetcher);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900">
      <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Developer Dashboard</h1>
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
            { label: 'API Calls', value: systemStats?.apiCalls || 0, icon: '🔌' },
            { label: 'DB Queries', value: systemStats?.dbQueries || 0, icon: '💾' },
            { label: 'AI Requests', value: systemStats?.aiRequests || 0, icon: '🤖' },
            { label: 'Active Users', value: systemStats?.activeUsers || 0, icon: '👥' },
          ].map((stat, index) => (
            <div key={index} className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl p-6 shadow-lg">
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

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">System Monitoring</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-lg">
              <h3 className="text-white font-semibold mb-2">Server Status</h3>
              <p className="text-green-400">✓ Operational</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <h3 className="text-white font-semibold mb-2">Database</h3>
              <p className="text-green-400">✓ Connected</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <h3 className="text-white font-semibold mb-2">AI Service</h3>
              <p className="text-green-400">✓ Active</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <h3 className="text-white font-semibold mb-2">Real-time</h3>
              <p className="text-green-400">✓ Running</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="flex gap-4 flex-wrap">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              View Logs
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
              System Settings
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              Backup Database
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
