import { NextResponse } from 'next/server'
import { createPlanningUser } from '@/db/models/PlanningUser'
import { ObjectId } from 'mongodb'

export async function POST(request: Request) {
  const { userId, planningId } = await request.json()
  const planningUser = await createPlanningUser({
    userId: new ObjectId(userId),
    planningId: new ObjectId(planningId),
    status: 'pending',
  })
  return NextResponse.json(planningUser)
}