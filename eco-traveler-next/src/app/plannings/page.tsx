// app/plans/page.tsx
import { database } from '@/db/config';
import { verifyToken } from '@/db/utils/jwt';
import { cookies } from 'next/headers';
import PlanList from "@/components/PlannerList"

export default async function PlansPage() {
  const plans = await database.collection('Plan').find().toArray();

  const token = cookies().get('token')?.value;
  let currentUserId = '';

  if (token) {
    try {
      const payload = await verifyToken<{ id: string }>(token);
      currentUserId = payload.id;
    } catch (error) {
      console.error('Token verification failed:', error);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Planner Lists</h1>
      <PlanList initialPlans={JSON.parse(JSON.stringify(plans))} currentUserId={currentUserId} />
    </div>
  );
} 