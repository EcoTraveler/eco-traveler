import { NextResponse } from 'next/server';
import { database } from '@/db/config';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const clerkId = searchParams.get('clerkId');

  if (!clerkId) {
    return NextResponse.json({ error: 'ClerkId is required' }, { status: 400 });
  }

  try {
    const planningUsers = await database.collection('PlanningUsers').find({ clerkId }).toArray();
    return NextResponse.json(planningUsers);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch planning users' }, { status: 500 });
  }
}