import { NextRequest, NextResponse } from 'next/server';
import { getCounter, incrementCounter, getLog } from '@/lib/redis';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json(
      { error: 'Username is required' },
      { status: 400 }
    );
  }

  try {
    const count = await getCounter(username);
    const log = await getLog(username);
    return NextResponse.json({ username, count, log });
  } catch (error) {
    console.error('Error getting counter:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { username, amount, reason } = await request.json();

    if (!username || typeof amount !== 'number') {
      return NextResponse.json(
        { error: 'Username and amount are required' },
        { status: 400 }
      );
    }

    const newCount = await incrementCounter(username, amount, reason);
    return NextResponse.json({ username, count: newCount });
  } catch (error) {
    console.error('Error incrementing counter:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
