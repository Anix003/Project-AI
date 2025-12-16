'use client';

import { useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    // Hero animation
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
      });

      gsap.from('.hero-buttons', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out',
      });

      // Features animation
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Stats animation
      gsap.from('.stat-item', {
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        scale: 0.8,
        stagger: 0.15,
        duration: 0.6,
        ease: 'back.out(1.7)',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  if (session) {
    router.push('/dashboard');
    return null;
  }

  return (
    <div ref={heroRef} className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-lg z-50 border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">ComplainHub</h1>
          <div className="flex gap-4">
            <Link href="/auth/signin">
              <button className="px-6 py-2 text-white hover:text-blue-300 transition">
                Sign In
              </button>
            </Link>
            <Link href="/auth/signup">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-32 pb-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="hero-title text-6xl md:text-7xl font-bold text-white mb-6">
            Your Voice, <span className="text-blue-400">Amplified</span>
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl text-gray-300 mb-10">
            AI-powered complaint management system that ensures your concerns reach the right department instantly.
          </p>
          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <button className="px-8 py-4 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition transform hover:scale-105">
                File a Complaint
              </button>
            </Link>
            <Link href="/track">
              <button className="px-8 py-4 bg-white/10 text-white text-lg rounded-lg hover:bg-white/20 transition backdrop-blur">
                Track Complaint
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { number: '10K+', label: 'Complaints Resolved' },
            { number: '15+', label: 'Departments' },
            { number: '98%', label: 'Satisfaction Rate' },
            { number: '24/7', label: 'Support' },
          ].map((stat, index) => (
            <div key={index} className="stat-item text-center p-6 bg-white/10 backdrop-blur rounded-xl">
              <h3 className="text-4xl font-bold text-blue-400 mb-2">{stat.number}</h3>
              <p className="text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="container mx-auto px-6 py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
          Why Choose ComplainHub?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: '🤖',
              title: 'AI-Powered Categorization',
              description: 'Our advanced AI automatically categorizes and routes your complaint to the right department.',
            },
            {
              icon: '⚡',
              title: 'Real-Time Tracking',
              description: 'Track your complaint status in real-time with instant notifications and updates.',
            },
            {
              icon: '🎯',
              title: 'Smart Suggestions',
              description: 'Get intelligent suggestions while filing complaints for better clarity and faster resolution.',
            },
            {
              icon: '🔒',
              title: 'Secure & Private',
              description: 'Your data is encrypted and secure. We prioritize your privacy above everything.',
            },
            {
              icon: '📊',
              title: 'Analytics Dashboard',
              description: 'Comprehensive dashboards for users, departments, and authorities to monitor progress.',
            },
            {
              icon: '🚀',
              title: 'Fast Resolution',
              description: 'Streamlined workflow ensures faster complaint resolution and better communication.',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="feature-card p-8 bg-white/5 backdrop-blur rounded-xl border border-white/10 hover:bg-white/10 transition"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Make Your Voice Heard?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Join thousands of citizens making a difference in their community.
          </p>
          <Link href="/auth/signup">
            <button className="px-10 py-4 bg-white text-blue-600 text-lg font-semibold rounded-lg hover:bg-gray-100 transition transform hover:scale-105">
              Get Started Now
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>&copy; 2025 ComplainHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
