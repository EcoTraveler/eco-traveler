import { Suspense } from 'react'
import MyPlanList from '@/components/MyPlanList'

export default function MyPlansPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Plans</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <MyPlanList />
      </Suspense>
    </div>
  )
}