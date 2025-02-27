"use client";

import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { aiResult } from "@/db/models/Plan";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@clerk/nextjs";
import Footer from "@/components/Footer";

export default function TravelForm() {
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState(5);
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [recommendations, setRecommendations] = useState<aiResult | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [hasToken, setHasToken] = useState(true);
  const [token, setToken] = useState(0);

  const clerkId = useUser();
  const userId = clerkId.user?.id;

  useEffect(() => {
    const getTokenStatus = async () => {
      try {
        const status = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/setToken?userId=${userId}`, { method: "GET" });
        const data = await status?.json();
        console.log(data);

        if (status.ok) {
          setToken(data?.tokens);
          setHasToken(data?.freeToken);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTokenStatus();
  }, [userId]);

  const handleRecommendation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/generate-recomendation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destination,
          duration,
          budget,
        }),
      });

      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      console.error("Error:", error);
      setMessage({ type: "error", text: "Failed to get recommendations. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlan = async () => {
    if (!recommendations) {
      setMessage({ type: "error", text: "No recommendations available. Please get recommendations first." });
      return;
    }

    const { destination, transportation, hotel } = recommendations;

    try {
      const response = await fetch("/api/plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          duration,
          destination,
          transportation,
          hotel,
          budget,
          startDate,
          endDate,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Plan created successfully!" });
        // Reset form or navigate to another page if needed
      } else {
        setMessage({ type: "error", text: result.error || "Failed to create plan. Please try again." });
      }

      const tokenResponse = await fetch("/api/setToken", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clerkId: userId,
          tokens: 1, // Assuming 1 token per recommendation
        }),
      });

      if (!tokenResponse.ok) {
        throw new Error("Failed to update tokens");
      }
    } catch (error) {
      console.error("Error creating plan:", error);
      setMessage({ type: "error", text: "An unexpected error occurred. Please try again." });
    }
  };

  return (
    <>
      <Navbar />
      {hasToken && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-2xl font-semibold mb-6">You don&apos;t have any tokens.</p>
            <Button asChild className="px-6 py-3 text-lg bg-green-500 hover:bg-green-600">
              <a href="/pricing">Get 5 Free Tokens</a>
            </Button>
          </div>
        </div>
      )}
      {!hasToken && (
        <div className="container mx-auto p-6">
          {message && <div className={`mb-4 p-4 rounded-md ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{message.text}</div>}
          {!recommendations ? (
            <Card className="w-full max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Plan Your Trip</CardTitle>
                <CardDescription>Fill in the details to get personalized travel recommendations.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRecommendation} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Plan name</Label>
                    <Input id="name" value={name} onChange={e => setName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination</Label>
                    <Input id="destination" value={destination} onChange={e => setDestination(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (days)</Label>
                    <Input id="duration" type="number" value={duration} onChange={e => setDuration(parseInt(e.target.value))} min={1} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget</Label>
                    <Input id="budget" value={budget} onChange={e => setBudget(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start date</Label>
                    <Input id="startDate" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End date</Label>
                    <Input id="endDate" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                  </div>
                  <Button type="submit" className="w-full bg-green-500 hover:bg-green-600" disabled={loading}>
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Getting Recommendations...
                      </span>
                    ) : (
                      "Get Recommendations"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Places to Visit</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {recommendations.destination?.map((place, index) => (
                      <div key={index} className="p-4 border rounded-md flex items-center space-x-4">
                        <div className="flex-grow">
                          <Label htmlFor={`place-${index}`} className="font-semibold">
                            {place.name}
                          </Label>
                          <p className="text-sm text-muted-foreground">{place.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hotels</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {recommendations.hotel?.map((hotel, index) => (
                      <div key={index} className="p-4 border rounded-md flex items-center space-x-4">
                        <div className="flex-grow">
                          <Label htmlFor={`hotel-${index}`} className="font-semibold">
                            {hotel.name}
                          </Label>
                          <p className="text-sm text-muted-foreground">{hotel.description}</p>
                          <div className="mt-2 flex justify-between text-sm">
                            <span>Rating: {hotel.rating}/5</span>
                            <span>Price: {hotel.price}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Transportation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {recommendations.transportation?.map((transport, index) => (
                      <div key={index} className="p-4 border rounded-md flex items-center space-x-4">
                        <div className="flex-grow">
                          <Label htmlFor={`transport-${index}`} className="font-semibold">
                            {transport.type}
                          </Label>
                          <p className="text-sm text-muted-foreground">{transport.description}</p>
                          <div className="mt-2">
                            <span className="text-sm">Price: {transport.price}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Button onClick={handleCreatePlan} className="w-full bg-green-500 hover:bg-green-600">
                Create Plan with Selected Items
              </Button>
            </div>
          )}
        </div>
      )}
      <Footer />
    </>
  );
}
