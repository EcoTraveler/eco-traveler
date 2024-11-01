"use client";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { aiResult } from "../db/model/plants";

// interface TravelRecommendation {
//   destination: Array<{ name: string; description: string }>;
//   hotel: Array<{
//     name: string;
//     description: string;
//     rating: number;
//     price: string;
//   }>;
//   transportation: Array<{ type: string; description: string; price: string }>;
// }

export default function TravelForm() {
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState(5);
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [recommendations, setRecommendations] = useState<aiResult | null>(null);

  const handleRecomendation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        " http://localhost:3000/api/generate-recomendation",
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

      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
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

    const { destination, transportation, hotel } = recommendations;
    console.log(recommendations, "data dari client >>>>>>>>>>>>>>>>>>>>>>>>>>");

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
          destination,
          transportation,
          hotel,
          budget,
          startDate,
          endDate,
        }),
      });

      if (response.ok) {
        console.log("Plan created successfully!");
        // Optionally reset form or navigate to another page
      } else {
        const errorData = await response.json();
        console.log(`Failed to create plan: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error creating plan:", error);
      // alert("Failed to create plan. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleRecomendation} className="mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Plan name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
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
              required
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
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">budget</label>
            <input
              type="text"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              min={1}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Start-date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={1}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">end-date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={1}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:opacity-50">
            {loading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="animate-spin mr-2" />
                Getting Recommendations...
              </span>
            ) : (
              "Get Recommendations"
            )}
          </button>
        </div>
      </form>

      {recommendations && (
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-bold mb-4">Places to Visit</h2>
            <div className="grid gap-4">
              {recommendations.destination.map((place, index) => (
                <div key={index} className="p-4 border rounded-md">
                  <h3 className="font-semibold">{place.name}</h3>
                  <p className="text-gray-600">{place.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Hotels</h2>
            <div className="grid gap-4">
              {recommendations.hotel.map((hotel, index) => (
                <div key={index} className="p-4 border rounded-md">
                  <h3 className="font-semibold">{hotel.name}</h3>
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
              {recommendations.transportation.map((transport, index) => (
                <div key={index} className="p-4 border rounded-md">
                  <h3 className="font-semibold">{transport.type}</h3>
                  <p className="text-gray-600">{transport.description}</p>
                  <div className="mt-2">
                    <span className="text-sm">Price: {transport.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <button onClick={handleCreatePlan} className="btn btn-neutral">
            create a plan
          </button>
        </div>
      )}
    </div>
  );
}
