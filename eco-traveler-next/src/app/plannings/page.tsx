"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
=======
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
>>>>>>> 3651f847e8764bf307c0e29cba1b421da5334958

interface Plan {
  _id: string;
  name: string;
  budget: string;
  destination: Array<{ name: string; description: string }>;
  hotel: Array<{
    name: string;
    description: string;
    rating: number;
    price: string;
  }>;
  transportation: Array<{ type: string; description: string; price: string }>;
  duration: number;
  startDate: string;
  endDate: string;
  clerkId: string;
  userId: string | null;
}

interface PlanningUser {
  clerkId: string;
  planningId: string;
  status: string;
}

export default function PlannerList() {
  const { user } = useUser();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [planningUsers, setPlanningUsers] = useState<PlanningUser[]>([]);

  useEffect(() => {
    fetchPlans();
    if (user) {
      fetchPlanningUsers();
    }
  }, [user]);

  const fetchPlans = async () => {
    const response = await fetch("/api/plans");
    const data = await response.json();
    setPlans(data);
  };

  const fetchPlanningUsers = async () => {
    const response = await fetch(`/api/planning-users?clerkId=${user?.id}`);
    const data = await response.json();
    setPlanningUsers(data);
  };

  const joinPlan = async (planId: string) => {
    if (!user) return;

    const response = await fetch("/api/plans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
<<<<<<< HEAD
      body: JSON.stringify({ planId, clerkId: user.id, name: user.fullName }),
=======
      body: JSON.stringify({ planId, clerkId: user.id }),
>>>>>>> 3651f847e8764bf307c0e29cba1b421da5334958
    });

    if (response.ok) {
      fetchPlanningUsers();
    }
  };

  const getPlanStatus = (planId: string) => {
<<<<<<< HEAD
    const planningUser = planningUsers.find((pu) => pu.planningId === planId);
=======
    const planningUser = planningUsers.find(pu => pu.planningId === planId);
>>>>>>> 3651f847e8764bf307c0e29cba1b421da5334958
    return planningUser ? planningUser.status : "Join";
  };

  return (
<<<<<<< HEAD
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Planner List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <Card key={plan._id}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>Budget: {plan.budget}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Duration: {plan.duration} days</p>
              <p>Start Date: {new Date(plan.startDate).toLocaleDateString()}</p>
              <p>End Date: {new Date(plan.endDate).toLocaleDateString()}</p>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => joinPlan(plan._id)}
                disabled={
                  plan.clerkId === user?.id ||
                  getPlanStatus(plan._id) === "pending"
                }>
                {plan.clerkId === user?.id
                  ? "Your Plan"
                  : getPlanStatus(plan._id)}
              </Button>
            </CardFooter>
          </Card>
        ))}
=======
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Planner List</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {plans.map(plan => (
            <Card key={plan._id}>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>Budget: {plan.budget}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Duration: {plan.duration} days</p>
                <p>Start Date: {new Date(plan.startDate).toLocaleDateString()}</p>
                <p>End Date: {new Date(plan.endDate).toLocaleDateString()}</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => joinPlan(plan._id)} disabled={plan.clerkId === user?.id || getPlanStatus(plan._id) === "pending"}>
                  {plan.clerkId === user?.id ? "Your Plan" : getPlanStatus(plan._id)}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
>>>>>>> 3651f847e8764bf307c0e29cba1b421da5334958
      </div>
      <Footer />
    </>
  );
}
