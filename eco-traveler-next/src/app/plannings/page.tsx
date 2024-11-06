"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, MapPin, Users, DollarSign, Clock, Plane, Hotel, Bus } from "lucide-react";

interface Plan {
  _id: string;
  name: string;
  budget: string;
  destination: Array<{ name: string; description: string }>;
  hotel: Array<{ name: string; description: string; rating: number; price: string }>;
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
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBudget, setFilterBudget] = useState("all");

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
      body: JSON.stringify({ planId, clerkId: user.id }),
    });

    if (response.ok) {
      fetchPlanningUsers();
    }
  };

  const getPlanStatus = (planId: string) => {
    const planningUser = planningUsers.find(pu => pu.planningId === planId);
    return planningUser ? planningUser.status : "Join";
  };

  const filteredPlans = plans.filter(plan => plan.name.toLowerCase().includes(searchTerm.toLowerCase()) && (filterBudget === "all" || plan.budget === filterBudget));

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Discover Amazing Travel Plans</h1>
        <div className="flex flex-col md:flex-row justify-center items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
          <Input placeholder="Search plans..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="max-w-sm" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map(plan => (
            <Card key={plan._id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <span>{plan.name}</span>
                </CardTitle>
                <CardDescription className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  <span>{plan.budget}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{plan.duration} days</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>
                      {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}
                    </span>
                  </p>
                  <div className="flex items-center space-x-2">
                    <Plane className="h-4 w-4 text-gray-500" />
                    <span>{plan.destination[0]?.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Hotel className="h-4 w-4 text-gray-500" />
                    <span>{plan.hotel[0]?.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Bus className="h-4 w-4 text-gray-500" />
                    <span>{plan.transportation[0]?.type}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => joinPlan(plan._id)} disabled={plan.clerkId === user?.id || getPlanStatus(plan._id) === "pending"} className="w-full">
                  <Users className="mr-2 h-4 w-4" />
                  {plan.clerkId === user?.id ? "Your Plan" : getPlanStatus(plan._id)}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
