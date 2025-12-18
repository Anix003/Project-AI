'use client';

import { signOut } from 'next-auth/react';
import useSWR from 'swr';
import { Zap, Database, Bot, Users, FileText, Settings, HardDrive } from 'lucide-react';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function DeveloperDashboard({ session }) {
  const { data: systemStats } = useSWR('/api/stats/system', fetcher);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Developer Dashboard</h1>
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
            { label: 'API Calls', value: systemStats?.apiCalls || 0, Icon: Zap },
            { label: 'DB Queries', value: systemStats?.dbQueries || 0, Icon: Database },
            { label: 'AI Requests', value: systemStats?.aiRequests || 0, Icon: Bot },
            { label: 'Active Users', value: systemStats?.activeUsers || 0, Icon: Users },
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-4xl font-bold text-blue-600 mt-2">{stat.value}</p>
                </div>
                <stat.Icon className="w-10 h-10 opacity-50 text-blue-600" />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">System Monitoring</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-gray-900 font-semibold mb-2">Server Status</h3>
              <p className="text-green-600 font-medium">✓ Operational</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-gray-900 font-semibold mb-2">Database</h3>
              <p className="text-green-600 font-medium">✓ Connected</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-gray-900 font-semibold mb-2">AI Service</h3>
              <p className="text-green-600 font-medium">✓ Active</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-gray-900 font-semibold mb-2">Real-time</h3>
              <p className="text-green-600 font-medium">✓ Running</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex gap-4 flex-wrap">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm">
              View Logs
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition shadow-sm">
              System Settings
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-sm">
              Backup Database
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
