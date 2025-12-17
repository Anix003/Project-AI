'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Lightbulb, Bot } from 'lucide-react';

export default function NewComplaint() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    category: '',
    department: '',
  });
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  // Get suggestions while typing
  useEffect(() => {
    const getSuggestions = async () => {
      if (formData.description.length > 20) {
        try {
          const response = await fetch('/api/ai/suggestions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: formData.description }),
          });
          const data = await response.json();
          if (data.suggestions) {
            setSuggestions(data.suggestions);
          }
        } catch (error) {
          console.error('Error getting suggestions:', error);
        }
      }
    };

    const debounce = setTimeout(getSuggestions, 1000);
    return () => clearTimeout(debounce);
  }, [formData.description]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const analyzeComplaint = async () => {
    if (!formData.title || !formData.description) {
      toast.error('Please provide title and description');
      return;
    }

    setAnalyzing(true);
    try {
      const response = await fetch('/api/ai/categorize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
        }),
      });

      const data = await response.json();
      if (data.analysis) {
        setAiAnalysis(data.analysis);
        setFormData({
          ...formData,
          category: data.analysis.category,
          department: data.analysis.department,
        });
        toast.success('AI analysis complete!');
      }
    } catch (error) {
      toast.error('Failed to analyze complaint');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.category || !formData.department) {
      toast.error('Please analyze the complaint first or manually select category and department');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/complaints/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          aiAnalysis,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create complaint');
      }

      toast.success('Complaint filed successfully!');
      router.push(`/complaint/${data.complaint._id}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
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
          <h1 className="text-2xl font-bold text-gray-900">File New Complaint</h1>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition border border-gray-300"
          >
            ← Back to Dashboard
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Complaint Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief summary of your complaint"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Provide detailed description of your complaint..."
                />
                
                {suggestions.length > 0 && (
                  <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-700 mb-2 font-medium flex items-center gap-1"><Lightbulb className="w-4 h-4" /> AI Suggestions:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span>•</span>
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Address or location of the issue"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={analyzeComplaint}
                  disabled={analyzing}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50 flex items-center gap-2 shadow-sm"
                >
                  <Bot className="w-5 h-5" />
                  {analyzing ? 'Analyzing...' : 'AI Analyze & Categorize'}
                </button>
              </div>

              {aiAnalysis && (
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="text-green-700 font-semibold mb-3">AI Analysis Results:</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>
                      <span className="text-gray-500">Category:</span>
                      <span className="ml-2 font-semibold text-gray-900">{aiAnalysis.category}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Department:</span>
                      <span className="ml-2 font-semibold text-gray-900">{aiAnalysis.department}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Priority:</span>
                      <span className="ml-2 font-semibold text-gray-900">{aiAnalysis.priority}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Confidence:</span>
                      <span className="ml-2 font-semibold text-gray-900">{(aiAnalysis.confidence * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                  {aiAnalysis.reasoning && (
                    <p className="mt-3 text-sm text-gray-700">
                      <span className="text-gray-500">Reasoning:</span> {aiAnalysis.reasoning}
                    </p>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Infrastructure"
                  />
                </div>

                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                    Department *
                  </label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Public Works"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 shadow-sm"
                >
                  {loading ? 'Filing Complaint...' : 'File Complaint'}
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/dashboard')}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition border border-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
