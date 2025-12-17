import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import Complaint from '@/models/Complaint';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    // Get actual user from database to ensure we have the correct MongoDB _id
    const User = (await import('@/models/User')).default;
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log('Fetching complaints for user:', user._id);

    const complaints = await Complaint.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .populate('userId', 'name email')
      .lean();

    console.log('Found complaints:', complaints.length);

    return NextResponse.json(complaints);
  } catch (error) {
    console.error('Fetch complaints error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch complaints' },
      { status: 500 }
    );
  }
}
