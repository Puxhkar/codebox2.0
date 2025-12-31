import React from 'react'
import Image from "next/image";
import CourseList from './_components/CourseList';
import Header from '@/app/_components/header';

function Courses() {
  return (
    <div className="bg-black min-h-screen">

      {/* HEADER — Keep it OUTSIDE the relative banner */}
      <div className="bg-black border-b border-zinc-800 font-game">
        <div className="max-w-7xl mx-auto px-6 font-game">
          <Header />
        </div>
      </div>

      {/* BANNER */}
      <div className="relative w-full">
        <Image
          src="/course-banner.gif"
          alt="courseBanner"
          width={1920}
          height={400}
          className="w-full h-[320px] object-cover"
        />

        {/* BANNER TEXT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center px-10 md:px-24 lg:px-36">
          <h2 className="font-game text-5xl md:text-6xl text-white">Explore All Courses</h2>
          <p className="font-game text-2xl md:text-3xl text-gray-200 mt-3">
            Increase your skills with high-quality learning!
          </p>
        </div>
      </div>

      {/* COURSE SECTION */}
      <div className="max-w-7xl mx-auto mt-10 px-10 md:px-24 lg:px-36">
        <h2 className="font-game text-4xl mb-6">All Courses</h2>
        <CourseList />
      </div>

    </div>
  )
}

export default Courses
