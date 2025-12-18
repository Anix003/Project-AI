'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import useSWR from 'swr';
import toast from 'react-hot-toast';
import { Calendar, User, Bot, MessageCircle } from 'lucide-react';

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
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'resolved':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-900 text-2xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Complaint Details</h1>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition border border-gray-300"
          >
            ← Back to Dashboard
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Main Complaint Card */}
          <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{complaint.title}</h2>
                <div className="flex gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(complaint.createdAt).toLocaleString()}</span>
                  <span className="flex items-center gap-1"><User className="w-4 h-4" /> {complaint.userId?.name || 'Anonymous'}</span>
                </div>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(complaint.status)}`}>
                {complaint.status?.toUpperCase() || 'PENDING'}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700">{complaint.description}</p>
              </div>

              {complaint.location && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Location</h3>
                  <p className="text-gray-700">📍 {complaint.location}</p>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-500 text-sm">Category</p>
                  <p className="text-gray-900 font-semibold">{complaint.category}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-500 text-sm">Department</p>
                  <p className="text-gray-900 font-semibold">{complaint.department}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-500 text-sm">Priority</p>
                  <p className="text-gray-900 font-semibold capitalize">{complaint.priority}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-500 text-sm">Complaint ID</p>
                  <p className="text-gray-900 font-semibold text-xs">{complaint._id?.slice(-8) || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Analysis */}
          {complaint.aiAnalysis && complaint.aiAnalysis.confidence && (
            <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2"><Bot className="w-5 h-5" /> AI Analysis</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Sentiment:</span>
                  <span className="ml-2 text-gray-900 font-medium capitalize">{complaint.aiAnalysis.sentiment}</span>
                </div>
                <div>
                  <span className="text-gray-500">Confidence:</span>
                  <span className="ml-2 text-gray-900 font-medium">{(complaint.aiAnalysis.confidence * 100).toFixed(0)}%</span>
                </div>
                {complaint.aiAnalysis.keywords && complaint.aiAnalysis.keywords.length > 0 && (
                  <div className="col-span-2">
                    <span className="text-gray-500">Keywords:</span>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {complaint.aiAnalysis.keywords.map((keyword, index) => (
                        <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium border border-purple-200">
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
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">📋 Updates</h3>
              <div className="space-y-4">
                {complaint.updates.map((update, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-gray-900">{update.message}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(update.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comments Section */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2"><MessageCircle className="w-5 h-5" /> Comments</h3>
            
            {complaint.comments && complaint.comments.length > 0 && (
              <div className="space-y-4 mb-6">
                {complaint.comments.map((comment, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-gray-900 mb-2">{comment.text}</p>
                    <p className="text-sm text-gray-500">
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
                className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={loading || !comment.trim()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 shadow-sm"
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
