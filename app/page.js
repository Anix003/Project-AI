'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  if (session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Civic-AI</h1>
          </div>
          <div className="flex gap-3">
            <Link href="/auth/signin">
              <button className="px-6 py-2 text-gray-700 hover:text-blue-600 font-medium transition">
                Sign In
              </button>
            </Link>
            <Link href="/auth/signup">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition shadow-sm">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-white py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Professional Complaint Management System
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Streamline complaint resolution with AI-powered categorization, real-time tracking, and efficient department routing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <button className="px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition shadow-md">
                  Get Started
                </button>
              </Link>
              <Link href="/auth/signin">
                <button className="px-8 py-4 bg-white text-gray-700 text-lg font-medium rounded-lg hover:bg-gray-50 transition border-2 border-gray-300">
                  View Demo
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '10,000+', label: 'Complaints Resolved' },
              { number: '15+', label: 'Departments' },
              { number: '98%', label: 'Satisfaction Rate' },
              { number: '24/7', label: 'Support Available' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <h3 className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Civic-AI
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Enterprise-grade features designed for efficient complaint management
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: '🤖',
                title: 'AI-Powered Categorization',
                description: 'Automatic complaint categorization and routing to the appropriate department using advanced AI.',
              },
              {
                icon: '⚡',
                title: 'Real-Time Tracking',
                description: 'Monitor complaint status with live updates and instant notifications throughout the resolution process.',
              },
              {
                icon: '🎯',
                title: 'Smart Suggestions',
                description: 'Intelligent recommendations while filing complaints for clarity and faster resolution.',
              },
              {
                icon: '🔒',
                title: 'Secure & Private',
                description: 'Enterprise-level security with encrypted data storage and strict privacy controls.',
              },
              {
                icon: '📊',
                title: 'Analytics Dashboard',
                description: 'Comprehensive dashboards with insights, trends, and performance metrics.',
              },
              {
                icon: '🚀',
                title: 'Fast Resolution',
                description: 'Streamlined workflows and automated routing ensure quick complaint resolution.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join organizations using Civic-AI to streamline their complaint management process.
          </p>
          <Link href="/auth/signup">
            <button className="px-10 py-4 bg-white text-blue-600 text-lg font-semibold rounded-lg hover:bg-gray-50 transition shadow-lg">
              Create Free Account
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-6 text-center text-gray-600">
          <p>&copy; 2025 Civic-AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
