import { NextRequest, NextResponse } from 'next/server'
import { database } from '@/db/config'
import { ObjectId } from 'mongodb'
import { verifyToken } from '@/db/utils/jwt'

export async function POST(request: NextRequest) {
  try {
    const planData = await request.json()
    const token = request.cookies.get('token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await verifyToken<{ id: string }>(token)
    const userId = new ObjectId(payload.id)

    // Create the plan
    const result = await database.collection('Plan').insertOne({
      ...planData,
      userId,
    })

    // Automatically add the creator to PlanningUsers
    await database.collection('PlanningUsers').insertOne({
      userId,
      planningId: result.insertedId,
      status: 'accepted',
    })

    return NextResponse.json({ message: 'Plan created successfully', planId: result.insertedId })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create plan' }, { status: 500 })
  }
}