"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PlanningUser } from "@/db/models/PlanningUser";
import { plan } from "@/db/models/Plan";

export default function PlannerList() {
  const { user } = useUser();
  const [plans, setPlans] = useState<plan[]>([]);
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
    const response = await fetch(`/api/planning-users/${user?.id}`, {
      method: "GET",
    });
    const data = await response.json();
    // console.log(data);

    setPlanningUsers(data.data);
  };

  const joinPlan = async (planId: string) => {
    if (!user) return;

    const response = await fetch("/api/plans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId, clerkId: user.id, name: user.fullName }),
    });

    if (response.ok) {
      fetchPlanningUsers();
    }
  };
  useEffect(() => {
    console.log(planningUsers);
  }, [planningUsers]);
  const getPlanStatus = (planId: string) => {
    const isJoined = planningUsers?.find(
      (el) => el.planningId.toString() === planId
    );
    return isJoined ? isJoined.status : "Not Joined";
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Planner List</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <Card key={plan._id.toString()}>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>Budget: {plan.budget}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Duration: {plan.duration} days</p>
                <p>
                  Start Date: {new Date(plan.startDate).toLocaleDateString()}
                </p>
                <p>End Date: {new Date(plan.endDate).toLocaleDateString()}</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => joinPlan(plan._id.toString())}>
                  {plan.clerkId === user?.id
                    ? "Your Plan"
                    : getPlanStatus(plan._id.toString())}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
