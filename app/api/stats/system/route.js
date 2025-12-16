import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'developer') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Mock system statistics
    const stats = {
      apiCalls: Math.floor(Math.random() * 10000),
      dbQueries: Math.floor(Math.random() * 5000),
      aiRequests: Math.floor(Math.random() * 2000),
      activeUsers: Math.floor(Math.random() * 500),
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('System stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch system stats' },
      { status: 500 }
    );
  }
}
