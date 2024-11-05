"use client";

import { ArrowRight, Globe, Leaf, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-green-800 mb-8">About EcoTraveler</h1>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <p className="text-lg mb-4">Eco Traveller is a web-based application designed to help travelers plan sustainable and environmentally friendly trips.</p>
            <p className="text-lg mb-4">
              This application combines modern technology to provide recommendations for tourist attractions, accommodations, and transportation that have minimal impact on the environment. In addition, this application also provides
              information about local culture and how to travel that respects the sustainability of natural resources and local traditions.
            </p>
            <p className="text-lg mb-4">
              And this application has several superior features such as Eco-Friendly Travel Planner, a feature to create an environmentally friendly vacation plan that has been recommended by AI in real time, then there is the
              Community-based Travel Tips feature where every user who has traveled can share stories and impressions of their trip, and this application also has paid and free features, namely Payment Feature Plans with the advantages and
              advantages of the planner packages offered.
            </p>
            <Link href="/destinations" className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold">
              Explore our eco-friendly destinations
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          <div className="relative h-96">
            <Image src="/assets/EcoTraveler.ico" alt="Eco-friendly travel" fill className="object-cover rounded-lg shadow-lg" sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-green-800 mb-8">Our Core Values</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Leaf className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Environmental Stewardship</h3>
            <p>We prioritize destinations and activities that actively contribute to conservation efforts and minimize ecological footprints.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Globe className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Cultural Respect</h3>
            <p>We promote travel experiences that foster genuine connections with local communities and preserve cultural heritage.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Users className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Responsible Tourism</h3>
            <p>We advocate for fair tourism practices that benefit local economies and support sustainable development initiatives.</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-green-800 mb-8">Join Our Mission</h2>
        <p className="text-lg mb-6">
          Whether you're a seasoned eco-traveler or just beginning your journey towards more sustainable travel, EcoTraveler is here to guide you. Together, we can explore the world responsibly and make a positive impact on the places we
          visit.
        </p>
        <Link href="/contact" className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
          Get in touch with us
        </Link>
      </main>
      <Footer />
    </>
  );
}
