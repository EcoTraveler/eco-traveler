'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type JoinRequest = {
  _id: string;
  userId: string;
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
  const [plans, setPlans] = useState<Plan[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchMyPlans();
  }, []);

  const fetchMyPlans = async () => {
    const response = await fetch('/api/my-plan');
    if (response.ok) {
      const data = await response.json();
      setPlans(data);
    }
  };

  const handleJoinRequest = async (planningId: string, userId: string, action: 'accept' | 'reject' | 'confirm') => {
    const response = await fetch('/api/planning-users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ planningId, userId, action }),
    });

    if (response.ok) {
      const updatedPlans = await response.json();
      setPlans((prevPlans) =>
        prevPlans.map((plan) =>
          plan._id === planningId ? { ...plan, requests: plan.requests.filter((req) => req.userId !== userId) } : plan
        )
      );
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {plans.map((plan) => (
        <Card key={plan._id} className="w-full">
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Budget: {plan.budget}</p>
            <p>Duration: {plan.duration} days</p>
            <p>Start Date: {new Date(plan.startDate).toLocaleDateString()}</p>
            <p>End Date: {new Date(plan.endDate).toLocaleDateString()}</p>
            <div className="mt-4">
              <h4 className="font-semibold">Join Requests:</h4>
              {plan.requests.length === 0 ? (
                <p>No pending requests</p>
              ) : (
                <ul className="list-disc list-inside">
                  {plan.requests.map((request) => (
                    <li key={request._id}>
                      {request.user.name} ({request.user.email})
                      {request.status === 'pending' ? (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="ml-2"
                            onClick={() => handleJoinRequest(plan._id.toString(), request.userId, 'accept')}
                          >
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="ml-2"
                            onClick={() => handleJoinRequest(plan._id.toString(), request.userId, 'reject')}
                          >
                            Reject
                          </Button>
                        </>
                      ) : request.status === 'accepted' ? (
                        <Button
                          size="sm"
                          variant="outline"
                          className="ml-2"
                          onClick={() => handleJoinRequest(plan._id.toString(), request.userId, 'confirm')}
                        >
                          Confirm
                        </Button>
                      ) : null}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Link href={`/chat/${plan._id}`} passHref>
              <Button>Go to Chat</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
