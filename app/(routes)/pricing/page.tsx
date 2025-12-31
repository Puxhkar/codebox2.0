import { PricingTable } from "@clerk/nextjs";
import React from "react";
import Header from "@/app/_components/Header";

function Pricing() {
  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Header */}
      <div className="flex flex-col items-center">
        <Header />
      </div>

      {/* Pricing Section */}
      <div className="relative py-24 px-4">
        
        {/* Gradient background glow */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-3xl" />

        <div className="mx-auto max-w-5xl">
          
          {/* Title */}
          <div className="text-center mb-14">
            <h2 className="font-game text-5xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Simple Pricing
            </h2>

            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Join for unlimited access to all features, premium tools, and future updates.
            </p>
          </div>

          {/* Pricing Card */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl transition-all hover:shadow-purple-500/20">
            <PricingTable />
          </div>

          {/* Footer Note */}
          <p className="mt-8 text-center text-sm text-gray-400">
            Cancel anytime · Secure payments · Instant access
          </p>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
