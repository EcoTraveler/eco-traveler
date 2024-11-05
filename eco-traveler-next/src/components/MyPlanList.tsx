"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from '@clerk/nextjs'; // Ensure you have the correct import for useUser
import router from "next/router";
import { useEffect, useState } from 'react';

type JoinRequest = {
  _id: string;
  clerkId: string;
  planningId: string;
  status: string;
  user: {
    name: string;
    email: string;
  };
};

type Plan = {
  _id: string;
  name: string;
  budget: string;
  duration: number;
  startDate: string;
  endDate: string;
  requests: JoinRequest[];
};

export default function MyPlanList() {
  const { user } = useUser();
  const clerkId = user?.id;
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    if (!clerkId) {
      return;
    }

    async function fetchPlans() {
      try {
        const response = await fetch(`/api/plans?clerkId=${clerkId}`);
        const data = await response.json();
        setPlans(data.plans || []);
      } catch (error) {
        console.error('Failed to fetch plans:', error);
      }
    }

    fetchPlans();
  }, [clerkId]);

  return (
    <div>
      {Array.isArray(plans) && plans.map((plan) => (
        <Card key={plan._id}>
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Budget: {plan.budget}</p>
            <p>Duration: {plan.duration} days</p>
            <p>Start Date: {plan.startDate}</p>
            <p>End Date: {plan.endDate}</p>
            <p>Join Requests:</p>
            <ul>
              {plan.requests.map((request) => (
                <li key={request._id}>
                  {request.user.name} ({request.user.email}) - {request.status}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push(`/plans/${plan._id}`)}>View Plan</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}