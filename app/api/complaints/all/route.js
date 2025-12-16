import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import Complaint from '@/models/Complaint';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== 'authority' && session.user.role !== 'developer')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const complaints = await Complaint.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'name email')
      .lean();

    return NextResponse.json(complaints);
  } catch (error) {
    console.error('Fetch all complaints error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch complaints' },
      { status: 500 }
    );
  }
}
