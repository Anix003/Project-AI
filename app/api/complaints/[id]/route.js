import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import Complaint from '@/models/Complaint';

export async function GET(req, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const complaint = await Complaint.findById(params.id)
      .populate('userId', 'name email')
      .populate('assignedTo', 'name email')
      .populate('comments.author', 'name')
      .populate('updates.updatedBy', 'name')
      .lean();

    if (!complaint) {
      return NextResponse.json({ error: 'Complaint not found' }, { status: 404 });
    }

    // Check authorization
    const isOwner = complaint.userId._id.toString() === session.user.id;
    const isDepartment = session.user.role === 'department' && complaint.department === session.user.department;
    const isAuthority = session.user.role === 'authority' || session.user.role === 'developer';

    if (!isOwner && !isDepartment && !isAuthority) {
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
