import { NextRequest, NextResponse } from 'next/server';
import { database } from '@/db/config';
import { ObjectId } from 'mongodb';
import { verifyToken } from '@/db/utils/jwt';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await verifyToken<{ id: string }>(token);
    const userId = new ObjectId(payload.id);

    // Fetch user's plans
    const userPlans = await database.collection('Plan').find({ userId }).toArray();

    if (userPlans.length === 0) {
      return NextResponse.json({ error: 'No plans found' }, { status: 404 });
    }

    // Get all planning IDs from user plans
    const planIds = userPlans.map((plan) => plan._id);

    // Fetch join requests associated with user's plans
    const joinRequests = await database.collection('PlanningUsers')
      .find({ 
        planningId: { $in: planIds }, 
        status: { $in: ['pending', 'accepted'] }
      })
      .toArray();

    // Fetch users who made requests
    const requestUsers = await database.collection('Users')
      .find({ _id: { $in: joinRequests.map((req) => new ObjectId(req.userId)) } })
      .toArray();

    // Format plans with join requests and user information
    const plansWithRequests = userPlans.map((plan) => ({
      ...plan,
      requests: joinRequests
        .filter((req) => req.planningId.toString() === plan._id.toString())
        .map((req) => {
          const user = requestUsers.find((u) => u._id.toString() === req.userId.toString());
          return { ...req, user: { name: user?.name, email: user?.email } };
        }),
    }));

    return NextResponse.json(plansWithRequests);
  } catch (error) {
    console.error('Error fetching my plans:', error);
    return NextResponse.json({ error: 'Failed to fetch plans' }, { status: 500 });
  }
}
