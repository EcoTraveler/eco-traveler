"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { UserButton, useUser } from "@clerk/nextjs";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="text-gray-700 hover:text-green-600 transition-colors">
    {children}
  </Link>
);

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isSignedIn } = useUser();

  return (
    <nav className="bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image src="/assets/EcoTraveler.ico" alt="EcoTraveler Logo" width={40} height={40} />
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavLink href="/destinations">Destinations</NavLink>
              <NavLink href="/plannings">List Plannings</NavLink>
              <NavLink href="/ai-recommendation">AI Recommendation</NavLink>
              <NavLink href="/about">About</NavLink>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-2">
            {isSignedIn ? (
              <div className="flex items-center space-x-4">
                <UserButton showName />
              </div>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button className="bg-green-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Sign In</Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="bg-white text-green-500 border border-green-500 px-4 py-2 rounded-md text-sm font-medium hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              Home
            </Link>
            <Link href="/destinations" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              Destinations
            </Link>
            <Link href="/about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              About
            </Link>
            <Link href="/contact" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              Contact
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isSignedIn ? (
              <div className="flex items-center px-5 space-x-4">
                <span className="text-sm font-medium text-gray-700">{user?.firstName}</span>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button className="block w-full px-5 py-3 text-center font-medium text-white bg-green-500 hover:bg-green-600 mb-2">Sign In</Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="block w-full px-5 py-3 text-center font-medium text-green-500 bg-white border border-green-500 hover:bg-green-50">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
