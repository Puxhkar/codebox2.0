import React from "react";
import { Button } from "@/components/ui/button";
import Header from "@/app/_components/Header";

function Contacts() {
  return (
    <>
      {/* Header */}
      <div className="flex flex-col items-center">
        <Header />
      </div>

      {/* Contact Page */}
      <section className="relative min-h-screen bg-black px-6 pt-16 pb-24">
        
        {/* Background Glow */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 blur-3xl" />

        <div className="max-w-5xl mx-auto">
          
          {/* Page Title */}
          <div className="text-center mb-16">
            <h1 className="font-game text-5xl md:text-6xl text-white font-bold">
              Contact <span className="text-yellow-400">Us</span>
            </h1>
            <p className="mt-4 text-gray-400 text-lg max-w-xl mx-auto">
              Have a question, feedback, or idea? We’d love to hear from you.
            </p>
          </div>

          {/* Contact Card */}
          <div className="grid md:grid-cols-2 gap-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 shadow-2xl">
            
            {/* Left Info */}
            <div className="space-y-6">
              <h2 className="font-game text-3xl text-white">
                Let’s Talk 👋
              </h2>

              <p className="text-gray-300">
                Reach out for course support, collaboration, or general queries.
                Our team usually replies within 24 hours.
              </p>

              <div className="space-y-3 text-gray-300">
                <p>📧 support@yourplatform.com</p>
                <p>🌍 Available worldwide</p>
                <p>⏰ 24/7 Community Support</p>
              </div>
            </div>

            {/* Right Form */}
            <form className="space-y-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3 text-white font-game focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3 text-white font-game focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <textarea
                rows={5}
                placeholder="Your Message"
                className="w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3 text-white font-game focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <Button
                variant="pixel"
                className="w-full py-6 text-xl font-game"
              >
                Send Message 🚀
              </Button>
            </form>

          </div>
        </div>
      </section>
    </>
  );
}

export default Contacts;
