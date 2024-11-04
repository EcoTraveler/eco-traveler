"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  const destinations = [
    {
      title: "Mount Bromo",
      location: "Indonesia",
      image: "/assets/bali.jpg",
    },
    {
      title: "Raja Ampat",
      location: "Indonesia",
      image: "/assets/rajaampat.jpg",
    },
    {
      title: "Borobudur Temple",
      location: "Indonesia",
      image: "/assets/borobudur.jpg",
    },
    {
      title: "Pink Beach",
      location: "Indonesia",
      image: "/assets/pinkbeach.jpg",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col">
        {/* Hero Section Container */}
        <div className="container mx-auto px-4 py-8">
          {/* Banner Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative overflow-hidden rounded-3xl">
            <div className="relative h-[400px] w-full">
              <Image src="/assets/banner2.jpg" alt="Mountain landscape with clouds" className="object-cover" fill priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 text-center text-white px-4">
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-4xl font-bold sm:text-5xl md:text-6xl">
                  AI trip builder
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="max-w-[600px] text-lg md:text-xl">
                  Get a whole getaway's worth of ideas made for you—ready in seconds.
                </motion.p>
                <Link href="/ai-recommendation">
                  <Button className="bg-green-500 hover:bg-green-600">Try it!</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Popular Destinations */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="mb-8 text-2xl font-bold">Popular Destinations</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((destination, index) => (
              <Card key={index} className="group overflow-hidden rounded-xl border-none">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="relative h-64">
                      <Image src={destination.image} alt={destination.title} className="object-cover transition-transform duration-300 group-hover:scale-110" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                      <h3 className="text-xl font-semibold">{destination.title}</h3>
                      <div className="mt-1 flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{destination.location}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <h2 className="mb-8 text-2xl font-bold">Get inspired by our traveler</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((destination, index) => (
              <Card key={index} className="group overflow-hidden rounded-xl border-none">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="relative h-64">
                      <Image src={destination.image} alt={destination.title} className="object-cover transition-transform duration-300 group-hover:scale-110" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                      <h3 className="text-xl font-semibold">{destination.title}</h3>
                      <div className="mt-1 flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{destination.location}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div>
          {/* Banner Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="relative h-[400px] w-full">
              <Image src="/assets/banner.jpg" alt="Mountain landscape with clouds" className="object-cover" fill priority sizes="100vw" />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 text-center text-white px-4">
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-4xl font-bold sm:text-5xl md:text-6xl">
                  Enjoy Your Dream Vacation
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="max-w-[600px] text-lg md:text-xl">
                  Plan our perfect trip with expert advice, travel tips, destination information and inspiration from us
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
