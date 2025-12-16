import { NextResponse } from 'next/server';
import { categorizeComplaint } from '@/lib/gemini';

export async function POST(req) {
  try {
    const { title, description } = await req.json();

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    const analysis = await categorizeComplaint(title, description);

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('Categorization error:', error);
    return NextResponse.json(
      { error: 'Failed to categorize complaint' },
      { status: 500 }
    );
  }
}
