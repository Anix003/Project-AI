'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import useSWR from 'swr';
import toast from 'react-hot-toast';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ComplaintDetail() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const complaintId = params.id;

  const { data: complaint, mutate } = useSWR(
    complaintId ? `/api/complaints/${complaintId}` : null,
    fetcher,
    { refreshInterval: 5000 } // Poll every 5 seconds for real-time updates
  );

  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

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

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/complaints/${complaintId}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: comment }),
      });

      if (!response.ok) throw new Error('Failed to add comment');

      toast.success('Comment added');
      setComment('');
      mutate();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || !complaint) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Complaint Details</h1>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition"
          >
            ← Back to Dashboard
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Main Complaint Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-2">{complaint.title}</h2>
                <div className="flex gap-4 text-sm text-gray-400 mb-4">
                  <span>📅 {new Date(complaint.createdAt).toLocaleString()}</span>
                  <span>👤 {complaint.userId?.name || 'Anonymous'}</span>
                </div>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(complaint.status)}`}>
                {complaint.status.toUpperCase()}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                <p className="text-gray-300">{complaint.description}</p>
              </div>

              {complaint.location && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Location</h3>
                  <p className="text-gray-300">📍 {complaint.location}</p>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Category</p>
                  <p className="text-white font-semibold">{complaint.category}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Department</p>
                  <p className="text-white font-semibold">{complaint.department}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Priority</p>
                  <p className="text-white font-semibold capitalize">{complaint.priority}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Complaint ID</p>
                  <p className="text-white font-semibold text-xs">{complaint._id.slice(-8)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Analysis */}
          {complaint.aiAnalysis && complaint.aiAnalysis.confidence && (
            <div className="bg-purple-500/10 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30">
              <h3 className="text-xl font-semibold text-white mb-4">🤖 AI Analysis</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Sentiment:</span>
                  <span className="ml-2 text-white capitalize">{complaint.aiAnalysis.sentiment}</span>
                </div>
                <div>
                  <span className="text-gray-400">Confidence:</span>
                  <span className="ml-2 text-white">{(complaint.aiAnalysis.confidence * 100).toFixed(0)}%</span>
                </div>
                {complaint.aiAnalysis.keywords && complaint.aiAnalysis.keywords.length > 0 && (
                  <div className="col-span-2">
                    <span className="text-gray-400">Keywords:</span>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {complaint.aiAnalysis.keywords.map((keyword, index) => (
                        <span key={index} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Updates Timeline */}
          {complaint.updates && complaint.updates.length > 0 && (
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">📋 Updates</h3>
              <div className="space-y-4">
                {complaint.updates.map((update, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-white">{update.message}</p>
                      <p className="text-sm text-gray-400">
                        {new Date(update.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comments Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">💬 Comments</h3>
            
            {complaint.comments && complaint.comments.length > 0 && (
              <div className="space-y-4 mb-6">
                {complaint.comments.map((comment, index) => (
                  <div key={index} className="bg-white/5 p-4 rounded-lg">
                    <p className="text-white mb-2">{comment.text}</p>
                    <p className="text-sm text-gray-400">
                      {comment.author?.name || 'Anonymous'} • {new Date(comment.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleAddComment} className="flex gap-3">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={loading || !comment.trim()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
