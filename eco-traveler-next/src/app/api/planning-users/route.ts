import { NextResponse, NextRequest } from 'next/server';
import { database } from '@/db/config';
import { verifyToken } from '@/db/utils/jwt';
import { cookies } from 'next/headers';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const token = cookies().get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await verifyToken<{ id: string }>(token);
    const userId = new ObjectId(payload.id);

    // Fetch all requests made by the user
    const planningUsers = await database.collection('PlanningUsers').find({ userId }).toArray();
    return NextResponse.json(planningUsers);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch planning users' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { planningId, userId, action } = await request.json();
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await verifyToken<{ id: string }>(token);
    const currentUserId = new ObjectId(payload.id);

    // Verify that the current user is the owner of the plan
    const plan = await database.collection('Plan').findOne({ _id: new ObjectId(planningId), userId: currentUserId });

    if (!plan) {
      return NextResponse.json({ error: 'Plan not found or you are not the owner' }, { status: 404 });
    }

    // Determine status based on action
    let status: string;
    switch (action) {
      case 'accept':
        status = 'accepted';
        break;
      case 'reject':
        status = 'rejected';
        break;
      case 'confirm':
        status = 'joined';
        break;
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    await database.collection('PlanningUsers').updateOne(
      { planningId: new ObjectId(planningId), userId: new ObjectId(userId) },
      { $set: { status } }
    );

    return NextResponse.json({ message: `Request ${status}` });
  } catch (error) {
    console.error('Error updating planning user:', error);
    return NextResponse.json({ error: 'Failed to update request' }, { status: 500 });
  }
}
