import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import Complaint from '@/models/Complaint';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, description, location, category, department, aiAnalysis } = await req.json();

    if (!title || !description || !category || !department) {
      return NextResponse.json(
        { error: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    await connectDB();

    // Find the actual user document to get MongoDB _id
    const User = (await import('@/models/User')).default;
    const user = await User.findOne({ email: session.user.email });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Determine priority from AI analysis or set default (ensure lowercase)
    const priority = (aiAnalysis?.priority || 'medium').toLowerCase();

    const complaint = await Complaint.create({
      userId: user._id,
      title,
      description,
      location: location || '',
      category,
      department,
      priority,
      aiAnalysis: aiAnalysis || {},
      status: 'pending',
    });

    await complaint.populate('userId', 'name email');

    return NextResponse.json(
      {
        message: 'Complaint created successfully',
        complaint,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create complaint error:', error);
    return NextResponse.json(
      { error: 'Failed to create complaint' },
      { status: 500 }
    );
  }
}
