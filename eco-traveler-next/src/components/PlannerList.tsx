'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type Plan = {
  _id: string
  name: string
  budget: string
  duration: number
  startDate: string
  endDate: string
  userId: string
}

type PlanningUser = {
  _id: string
  userId: string
  planningId: string
  status: string
}

export default function PlanList({ initialPlans, currentUserId }: { initialPlans: Plan[], currentUserId: string }) {
  const [plans, setPlans] = useState<Plan[]>(initialPlans)
  const [planningUsers, setPlanningUsers] = useState<PlanningUser[]>([])
  const router = useRouter()

  useEffect(() => {
    fetchPlanningUsers()
  }, [])

  const fetchPlanningUsers = async () => {
    const response = await fetch('/api/planning-users')
    if (response.ok) {
      const data = await response.json()
      setPlanningUsers(data)
    }
  }

  const joinPlan = async (planId: string) => {
    const response = await fetch('/api/plans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ planId }),
    })

    if (response.ok) {
      fetchPlanningUsers()
      router.refresh()
    }
  }

  const getButtonStatus = (planId: string) => {
    const planningUser = planningUsers.find(pu => pu.planningId === planId && pu.userId === currentUserId)
    if (planningUser) {
      return planningUser.status
    }
    return 'Join'
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {plans.map((plan) => (
        <Card key={plan._id} className="w-full">
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            {plan.userId === currentUserId && (
              <h4>You Created This Plan</h4>
            )}
          </CardHeader>
          <CardContent>
            <p>Budget: {plan.budget}</p>
            <p>Duration: {plan.duration} days</p>
            <p>Start Date: {new Date(plan.startDate).toLocaleDateString()}</p>
            <p>End Date: {new Date(plan.endDate).toLocaleDateString()}</p>
          </CardContent>
          <CardFooter>
            {plan.userId !== currentUserId && (
              <Button
                onClick={() => joinPlan(plan._id)}
                disabled={getButtonStatus(plan._id) !== 'Join'}
                variant={getButtonStatus(plan._id) === 'pending' ? 'secondary' : 'default'}
              >
                {getButtonStatus(plan._id)}
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}