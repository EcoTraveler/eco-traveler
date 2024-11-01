'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Planning {
  _id: string;
  name: string;
}

interface PlanningUser {
  _id: string;
  userId: string;
  planningId: string;
  status: string;
}

export function PlanningList() {
  const [plannings, setPlannings] = useState<Planning[]>([])
  const [planningUsers, setPlanningUsers] = useState<PlanningUser[]>([])

  useEffect(() => {
    fetch('/api/plannings')
      .then(res => res.json())
      .then(data => setPlannings(data))
  }, [])

  const handleJoin = async (planningId: string) => {
    // In a real app, you'd get the userId from authentication
    const userId = 'user123'
    await fetch('/api/plannings/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, planningId }),
    })
    // Refresh the list after joining
    const res = await fetch('/api/plannings')
    const data = await res.json()
    setPlannings(data)
  }

  return (
    <ul className="space-y-4">
      {plannings.map(planning => (
        <li key={planning._id} className="border p-4 rounded flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">{planning.name}</h2>
            <Link href={`/chat/${planning._id}`} className="text-blue-500 hover:underline">
              Join Chat Room
            </Link>
          </div>
          <Button 
            onClick={() => handleJoin(planning._id)}
            disabled={planningUsers.some(pu => pu.planningId === planning._id && pu.status === 'pending')}
          >
            {planningUsers.some(pu => pu.planningId === planning._id && pu.status === 'pending') ? 'Pending' : 'Join Planning'}
          </Button>
        </li>
      ))}
    </ul>
  )
}