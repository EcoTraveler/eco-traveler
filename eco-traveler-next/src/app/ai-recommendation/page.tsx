"use client";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { aiResult, destination, hotel, transportation } from "@/db/models/Plan";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

export default function TravelForm() {
  const [errMessage, setErrMessage] = useState("");
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState(5);
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [recommendations, setRecommendations] = useState<aiResult | null>();
  const [selectedDestination, setSelectedDestination] = useState<
    destination[] | null
  >();
  const [selectedHotel, setSelectedHotel] = useState<hotel[] | null>();
  const [selectedTransportation, setSelectedTransportation] = useState<
    transportation[] | null
  >();
  const [hasToken, setHasToken] = useState(true);
  const [token, setToken] = useState(0);
  const clerkId = useUser();
  const userId = clerkId.user?.id;

  useEffect(() => {
    const getTokenStatus = async () => {
      try {
        const status = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/setToken?userId=${userId}`,
          { method: "GET" }
        );
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
  }, [userId, recommendations]);

  const handleRecomendation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const recommen = await fetch(
        "http://localhost:3000/api/generate-recomendation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            destination,
            duration,
            budget,
          }),
        }
      );
      if (!recommen.ok) {
        const errorData = await recommen.json();
        setErrMessage(errorData.message || "An error occurred.");
        console.log(errorData.message || "An error occurred.");
        return;
      }
      if (recommen.ok) {
        const setToken = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/setToken`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ clerkId: userId, tokens: 1 }),
          }
        );
        if (!setToken.ok) {
          const errorData = await setToken.json();
          setErrMessage(errorData.message || "An error occurred.");
          console.log(errorData.message || "An error occurred.");
          return;
        }
      }
      const data = await recommen.json();

      setRecommendations(data);
    } catch (error: any) {
      setErrMessage(error.message);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlan = async () => {
    if (!recommendations) {
      throw new Error(
        "No recommendations available. Please get recommendations first."
      );
    }

    try {
      const response = await fetch("http://localhost:3000/api/plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          userId: "67224e9880f07c7d2023af17", // replace with actual user ID if needed
          duration,
          destination: selectedDestination, // Use the selected destination
          transportation: selectedTransportation, // Use the selected transportation
          hotel: selectedHotel, // Use the selected hotel
          budget,
          startDate,
          endDate,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setErrMessage(errorData.message || "An error occurred.");
        console.log(errorData.message || "An error occurred.");
        return;
      }
      if (response.ok) {
        console.log("Plan created successfully!");
      } else {
        const errorData = await response.json();
        console.log(`Failed to create plan: ${errorData.message}`);
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
    }
  };
  const handleDestinationChange = (place: destination) => {
    setSelectedDestination((prev) => {
      const currentSelection = prev || []; // Ensure prev is an array
      if (currentSelection.includes(place)) {
        return currentSelection.filter((p) => p !== place); // Deselect if already selected
      }
      return [...currentSelection, place]; // Select
    });
  };

  const handleHotelChange = (hotel: hotel) => {
    setSelectedHotel((prev) => {
      const currentSelection = prev || []; // Ensure prev is an array
      if (currentSelection.includes(hotel)) {
        return currentSelection.filter((h) => h !== hotel); // Deselect if already selected
      }
      return [...currentSelection, hotel]; // Select
    });
  };

  const handleTransportationChange = (transportation: transportation) => {
    setSelectedTransportation((prev) => {
      const currentSelection = prev || []; // Ensure prev is an array
      if (currentSelection.includes(transportation)) {
        return currentSelection.filter((t) => t !== transportation); // Deselect if already selected
      }
      return [...currentSelection, transportation]; // Select
    });
  };

  return (
    <div>
      <Navbar />
      {hasToken && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-2xl font-semibold mb-6">
              You don't have any tokens.
            </p>
            <Button
              asChild
              className="px-6 py-3 text-lg bg-green-500 hover:bg-green-600"
            >
              <a href="/paypal">Get 5 Free Tokens</a>
            </Button>
          </div>
        </div>
      )}
      {!hasToken && (
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex justify-center font-bold">
            My Token : {token}
          </div>
          <form onSubmit={handleRecomendation} className="mb-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Plan name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Destination
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Duration (days)
                </label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  min={1}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Budget</label>
                <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  min={1}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Start date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  End date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="animate-spin mr-2" />
                    Getting Recommendations...
                  </span>
                ) : (
                  "Get Recommendations"
                )}
              </button>
              {errMessage && (
                <span className="flex items-center justify-center text-red-600">
                  {errMessage}
                </span>
              )}
            </div>
          </form>
          {recommendations && (
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-bold mb-4">Places to Visit</h2>
                <div className="grid gap-4">
                  {recommendations?.destination?.map((place, index) => (
                    <div key={index} className="p-4 border rounded-md">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="destination"
                          checked={selectedDestination?.includes(place)}
                          onChange={() => handleDestinationChange(place)}
                          className="mr-2"
                        />
                        <h3 className="font-semibold">{place.name}</h3>
                      </label>
                      <p className="text-gray-600">{place.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">Hotels</h2>
                <div className="grid gap-4">
                  {recommendations?.hotel?.map((hotel, index) => (
                    <div key={index} className="p-4 border rounded-md">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="hotel"
                          value={hotel.name}
                          checked={selectedHotel?.includes(hotel)}
                          onChange={() => handleHotelChange(hotel)}
                          className="mr-2"
                        />
                        <h3 className="font-semibold">{hotel.name}</h3>
                      </label>
                      <p className="text-gray-600">{hotel.description}</p>
                      <div className="mt-2 flex justify-between text-sm">
                        <span>Rating: {hotel.rating}/5</span>
                        <span>Price: {hotel.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">Transportation</h2>
                <div className="grid gap-4">
                  {recommendations?.transportation?.map((transport, index) => (
                    <div key={index} className="p-4 border rounded-md">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="transportation"
                          value={transport.type}
                          checked={selectedTransportation?.includes(transport)}
                          onChange={() => handleTransportationChange(transport)}
                          className="mr-2"
                        />
                        <h3 className="font-semibold">{transport.type}</h3>
                      </label>
                      <p className="text-gray-600">{transport.description}</p>
                      <div className="mt-2">
                        <span className="text-sm">
                          Price: {transport.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <button
                onClick={handleCreatePlan}
                className="btn btn-neutral"
                disabled={
                  !selectedDestination ||
                  !selectedHotel ||
                  !selectedTransportation
                }
              >
                Create a Plan
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
