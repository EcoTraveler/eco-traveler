"use client";

import { ArrowRight, Globe, Leaf, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function AboutPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <motion.h1 className="text-4xl font-bold text-green-800 mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          About EcoTraveler
        </motion.h1>

        <motion.div className="grid md:grid-cols-2 gap-12 items-center mb-16" variants={staggerChildren} initial="initial" animate="animate">
          <motion.div variants={fadeInUp}>
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
          </motion.div>
          <motion.div className="relative h-96" variants={fadeInUp}>
            <Image src="/assets/EcoTraveler.ico" alt="Eco-friendly travel" fill className="object-cover rounded-lg shadow-lg" sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" />
          </motion.div>
        </motion.div>

        <motion.h2 className="text-3xl font-bold text-green-800 mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          Our Core Values
        </motion.h2>
        <motion.div className="grid md:grid-cols-3 gap-8 mb-16" variants={staggerChildren} initial="initial" animate="animate">
          <motion.div className="bg-white p-6 rounded-lg shadow-md" variants={fadeInUp}>
            <Leaf className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Environmental Stewardship</h3>
            <p>We prioritize destinations and activities that actively contribute to conservation efforts and minimize ecological footprints.</p>
          </motion.div>
          <motion.div className="bg-white p-6 rounded-lg shadow-md" variants={fadeInUp}>
            <Globe className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Cultural Respect</h3>
            <p>We promote travel experiences that foster genuine connections with local communities and preserve cultural heritage.</p>
          </motion.div>
          <motion.div className="bg-white p-6 rounded-lg shadow-md" variants={fadeInUp}>
            <Users className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Responsible Tourism</h3>
            <p>We advocate for fair tourism practices that benefit local economies and support sustainable development initiatives.</p>
          </motion.div>
        </motion.div>

        <motion.h2 className="text-3xl font-bold text-green-800 mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
          Join Our Mission
        </motion.h2>
        <motion.p className="text-lg mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
          Whether you&apos;re a seasoned eco-traveler or just beginning your journey towards more sustainable travel, EcoTraveler is here to guide you. Together, we can explore the world responsibly and make a positive impact on the places
          we visit.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
          <Link href="/sign-in" className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
            Get in touch with us
          </Link>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
