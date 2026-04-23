import React from "react";
import Header from "@/app/_components/Header";
import { Button } from "@/components/ui/button";

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

          {/* Custom Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 shadow-2xl flex flex-col items-center text-center transition hover:border-white/30">
              <h3 className="font-game text-3xl font-semibold mb-2">Free</h3>
              <p className="text-gray-400 text-sm mb-6">Start your coding journey.</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-gray-400">/mo</span>
              </div>
              <ul className="text-gray-300 space-y-3 mb-8 w-full text-left">
                <li>✅ Basic Courses</li>
                <li>✅ Community Support</li>
                <li>❌ Premium Projects</li>
              </ul>
              <Button variant="outline" className="w-full font-game text-lg mt-auto rounded-xl">Current Plan</Button>
            </div>

            {/* Pro Plan */}
            <div className="rounded-3xl border border-purple-500/50 bg-purple-900/10 backdrop-blur-xl p-8 shadow-2xl shadow-purple-500/20 flex flex-col items-center text-center transition relative">
              <div className="absolute top-0 -translate-y-1/2 bg-gradient-to-r from-purple-400 to-pink-500 text-black px-4 py-1 rounded-full text-sm font-bold font-game">Most Popular</div>
              <h3 className="font-game text-3xl font-semibold mb-2 text-purple-400">Pro</h3>
              <p className="text-gray-400 text-sm mb-6">Unlimited access to everything.</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$10</span>
                <span className="text-gray-400">/mo</span>
              </div>
              <ul className="text-white space-y-3 mb-8 w-full text-left">
                <li>✅ All Courses & Content</li>
                <li>✅ Priority Support</li>
                <li>✅ Premium Real-world Projects</li>
                <li>✅ Verified Certificates</li>
              </ul>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 font-game text-lg mt-auto rounded-xl">Upgrade to Pro</Button>
            </div>
          </div>

          {/* Footer Note */}
          <p className="mt-12 text-center text-sm text-gray-400">
            Cancel anytime · Secure payments · Instant access
          </p>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
