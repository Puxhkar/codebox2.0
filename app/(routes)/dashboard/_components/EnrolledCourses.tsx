'use client'

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from 'react';

function EnrolledCourses() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  return (
    <div className="mt-8">
      <h2 className="font-game mb-3 text-3xl">Your Enrolled Courses</h2>

      {enrolledCourses.length === 0 ? (
        <div className="
          flex flex-col items-center text-center gap-4 
          p-8 border-2 border-black rounded-2xl 
          bg-zinc-900 shadow-[6px_6px_0_0_#000]
        ">
          
          {/* ICON */}
          <Image 
            src="/books.png" 
            alt="book"
            width={90}
            height={90}
            className="rounded-md"
          />

          {/* TEXT */}
          <h2 className="text-white text-xl font-game font-semibold">
            You don't have any enrolled courses
          </h2>

          {/* BUTTON */}
          <Link href="/courses">
            <Button 
              variant="pixel" 
              size="lg" 
              className="mt-2 font-game text-xl"
            >
              Browse All Courses
            </Button>
          </Link>
        </div>
      ) : (
        <div>
          {/* Render user enrolled courses here */}
          List
        </div>
      )}
    </div>
  )
}

export default EnrolledCourses;
