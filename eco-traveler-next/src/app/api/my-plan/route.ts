import { NextRequest, NextResponse } from 'next/server';
import { database } from '@/db/config';
import { ObjectId } from 'mongodb';
import { useUser } from '@clerk/nextjs'; // Ensure you have the correct import for useUser

export async function GET(request: NextRequest) {
  try {
    const { user } = useUser();
    const clerkId = user?.id;

    if (!clerkId) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    // Fetch user's plans using clerkId
    const userPlans = await database.collection('Plan').find({ clerkId }).toArray();

    if (userPlans.length === 0) {
      return NextResponse.json({ error: 'No plans found' }, { status: 404 });
    }

    // Get all planning IDs from user plans
    const planIds = userPlans.map((plan) => plan._id);

    // Fetch join requests associated with user's plans
    const joinRequests = await database.collection('PlanningUsers')
      .find({ planningId: { $in: planIds.map(id => id.toString()) }, status: 'pending' })
      .toArray();

    return NextResponse.json({ plans: userPlans, joinRequests });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch plans and requests' }, { status: 500 });
  }
}