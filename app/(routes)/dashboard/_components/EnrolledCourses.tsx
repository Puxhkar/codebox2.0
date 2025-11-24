'use client'

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from 'react';

function EnrolledCourses() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  return (
    <div className="mt-8">
        <h2 className="font-game mb-3 text-3xl">Your Enrolled courses</h2>
      {enrolledCourses.length === 0 ? (
        <div className="flex flex-col items-center gap-3 p-6 border-2 border-black rounded-2xl bg-zinc-900 shadow-[6px_6px_0_0_#000]">
          
          <Image 
            src="/books.png" 
            alt="book"
            width={90}
            height={90}
            className="rounded-md"
          />

          <h2 className="text-white text-lg font-semibold font-game ">
            You don't have any enrolled courses
          </h2>

          <Button variant="pixel" size="lg" className="mt-2 font-game text-xl">
            Browse All Courses
          </Button>

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
