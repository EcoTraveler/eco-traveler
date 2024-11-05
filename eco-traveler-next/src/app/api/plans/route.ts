import { NextResponse } from 'next/server';
import { database } from '@/db/config';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const plans = await database.collection('Plan').find({}).toArray();
    return NextResponse.json(plans);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch plans' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { planId, clerkId } = await request.json();
    const planningUser = await database.collection('PlanningUsers').findOne({ clerkId, planningId: planId });

    if (planningUser) {
      return NextResponse.json({ message: 'Already joined' }, { status: 400 });
    }

    await database.collection('PlanningUsers').insertOne({
      clerkId,
      planningId: planId,
      status: 'pending'
    });

    return NextResponse.json({ message: 'Joined successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to join plan' }, { status: 500 });
  }
}