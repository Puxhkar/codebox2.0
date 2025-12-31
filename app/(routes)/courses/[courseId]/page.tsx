'use client'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CourseDetailBanner from './_components/CourseDetailBanner'
import axios from 'axios'
import { Course } from '../_components/CourseList'
import CourseChapters from './_components/CourseChapters'
import CourseStatus from './_components/CourseStatus'
import UpgradeToPro from '../../dashboard/_components/UpgradeToPro'
import Header from '@/app/_components/Header'

function CourseDetails() {

  const { courseId } = useParams()
  const [courseDetail, setCourseDetail] = useState<Course>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    courseId && GetCourseDetails();
  }, [courseId])

  const GetCourseDetails = async () => {
    setLoading(true);
    const result = await axios.get('/api/course?courseid=' + courseId);
    setCourseDetail(result.data)
    setLoading(false)
  };

  return (
    <div>

      {/* HEADER */}
      <div className="bg-black border-b border-zinc-800 font-game">
        <div className="max-w-7xl mx-auto px-6 font-game">
          <Header />
        </div>
      </div>

      {/* BANNER */}
      <CourseDetailBanner 
        loading={loading}
        courseDetail={courseDetail}
        refreshData={()=> GetCourseDetails()}
      />

      {/* PAGE CONTENT */}
      <div className='grid grid-cols-3 p-10 md:px-24 lg:px-36 gap-7'>
        <div className='col-span-2'>
          <CourseChapters
            loading={loading}
            courseDetail={courseDetail}
          />
        </div>

        <div>
          <CourseStatus courseDetail={courseDetail}/>
          <UpgradeToPro />
        </div>
      </div>

    </div>
  )
}

export default CourseDetails
