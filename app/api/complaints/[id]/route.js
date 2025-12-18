import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import Complaint from '@/models/Complaint';

export async function GET(req, { params }) {
  try {
    // In Next.js 15, params is a Promise
    const { id } = await params;
    
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    console.log('Fetching complaint with ID:', id);

    const complaint = await Complaint.findById(id)
      .populate('userId', 'name email')
      .populate('assignedTo', 'name email')
      .populate('comments.author', 'name')
      .populate('updates.updatedBy', 'name')
      .lean();

    if (!complaint) {
      console.log('Complaint not found:', id);
      return NextResponse.json({ error: 'Complaint not found' }, { status: 404 });
    }

    console.log('Found complaint:', complaint.title);

    // Get actual user from database for authorization check
    const User = (await import('@/models/User')).default;
    const user = await User.findOne({ email: session.user.email });

    // Check authorization
    const isOwner = complaint.userId && user && complaint.userId._id.toString() === user._id.toString();
    const isDepartment = user && user.role === 'department' && complaint.department === user.department;
    const isAuthority = user && (user.role === 'authority' || user.role === 'developer');

    if (!isOwner && !isDepartment && !isAuthority) {
      console.log('Authorization failed for user:', user?.email);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json(complaint);
  } catch (error) {
    console.error('Fetch complaint error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch complaint' },
      { status: 500 }
    );
  }
}
