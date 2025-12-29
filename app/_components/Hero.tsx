import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Exploremoresection from "./Exploremoresection";

function Hero() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative w-full min-h-[85vh] overflow-hidden pb-24">
        
        {/* Background Image */}
        <Image
          src="/banner.gif"
          alt="hero"
          fill
          priority
          className="object-cover"
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] text-center px-4">
          
          <h1 className="font-game font-extrabold text-5xl md:text-7xl lg:text-8xl tracking-tight text-white">
            Start Your
          </h1>

          <h1 className="font-game font-extrabold text-5xl md:text-7xl lg:text-8xl tracking-tight text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.6)]">
            Coding Adventure
          </h1>

          <p className="mt-6 max-w-2xl font-game text-lg md:text-2xl text-gray-200">
            Beginner-friendly coding courses, real projects, and game-like learning
          </p>

          <Link href="/sign-in">
            <Button
              variant="pixel"
              className="mt-10 px-10 py-7 text-2xl md:text-3xl font-game transition-transform hover:scale-105"
            >
              Get Started
            </Button>
          </Link>
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-300 font-game text-sm animate-bounce">
          ↓ Scroll to explore courses
        </div>
      </section>

      {/* COURSE SECTION */}
      <div className="-mt-28 relative z-20">
        <Exploremoresection />
      </div>
    </>
  );
}

export default Hero;
