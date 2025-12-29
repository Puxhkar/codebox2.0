import React from 'react'
import CourseList from '../(routes)/courses/_components/CourseList'

function Exploremoresection() {
  return (
    <section className="relative bg-black pt-10 pb-24 px-6">
      
      {/* Soft background glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 blur-3xl" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <h2 className="font-game mb-10 text-3xl md:text-4xl text-center text-white">
          Explore Our <span className="text-yellow-400">Courses</span>
        </h2>

        <CourseList />
      </div>
    </section>
  )
}

export default Exploremoresection
