import React from 'react'
import CourseList from '../courses/_components/CourseList'
import Header from '@/app/_components/Header'

function Project() {
  return (
    <div>
         {/* Header */}
      <div className="flex flex-col items-center">
        <Header />
      </div>

        <CourseList/>
    </div>
  )
}

export default Project