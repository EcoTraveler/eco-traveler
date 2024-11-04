import { NextRequest, NextResponse } from 'next/server'
import { database } from '@/db/config'
import { ObjectId } from 'mongodb'
import { verifyToken } from '@/db/utils/jwt'

export async function GET() {
  try {
    const plans = await database.collection('Plan').find().toArray()
    return NextResponse.json(plans)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch plans' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { planId } = await request.json()
    const token = request.cookies.get('token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await verifyToken<{ id: string }>(token)
    const userId = new ObjectId(payload.id)

    const plan = await database.collection('Plan').findOne({ _id: new ObjectId(planId) })

    if (!plan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 })
    }

    const existingPlanningUser = await database.collection('PlanningUsers').findOne({
      userId,
      planningId: new ObjectId(planId),
    })

    if (existingPlanningUser) {
      return NextResponse.json({ message: 'Already joined' })
    }

    const status = plan.userId.toString() === userId.toString() ? 'accepted' : 'pending'

    await database.collection('PlanningUsers').insertOne({
      userId,
      planningId: new ObjectId(planId),
      status,
    })

    return NextResponse.json({ message: 'Joined successfully', status })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to join plan' }, { status: 500 })
  }
}