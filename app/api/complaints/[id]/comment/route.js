import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import Complaint from '@/models/Complaint';

export async function POST(req, { params }) {
  try {
    // In Next.js 15, params is a Promise
    const { id } = await params;
    
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { text } = await req.json();

    if (!text || !text.trim()) {
      return NextResponse.json({ error: 'Comment text is required' }, { status: 400 });
    }

    await connectDB();

    const complaint = await Complaint.findById(id);

    if (!complaint) {
      return NextResponse.json({ error: 'Complaint not found' }, { status: 404 });
    }

    complaint.comments.push({
      text,
      author: session.user.id,
      timestamp: new Date(),
    });

    await complaint.save();

    await complaint.populate('comments.author', 'name');

    return NextResponse.json({ message: 'Comment added', complaint });
  } catch (error) {
    console.error('Add comment error:', error);
    return NextResponse.json(
      { error: 'Failed to add comment' },
      { status: 500 }
    );
  }
}
