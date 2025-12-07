'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { ChartNoAxesColumnIncreasing } from 'lucide-react'
import Link from 'next/link'

export type Course = {
  id: number,
  courseId: number,
  title: string,
  desc: string,
  level: string,
  bannerImage: string,
  tag: string,
  chapters?:Chapter[],
  userEnrolled?: boolean,
  courseEnrolledInfo?: courseEnrolledInfo
}

type courseEnrolledInfo={
  xpEarned: number,
  enrolledDate: any,
}


type Chapter={
  chapterId: number,
  courseId: number,
  desc: string,
  name:string ,
  id:number ,
  exercises:exercise[]
}

type exercise={
  name:string,
  slug:string,
  xp:number ,
  difficulty: string
}


function CourseList() {
  const [courseList, setCourseList] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    GetAllCourses()
  }, [])

  const GetAllCourses = async () => {
    const result = await axios.get('/api/course')
    setCourseList(result?.data)
    setLoading(false)
  }
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-6">

      {courseList?.map((course, index) => (
        <Link href={'/courses/'+course?.courseId
        } key={index}>
        <div
          className="rounded-2xl border-6 border-zinc-800 bg-zinc-900 
                     shadow-lg overflow-hidden hover:-translate-y-2 
                     hover:shadow-2xl transform transition-all duration-300 cursor-pointer"
        >

          
          { <Image
            src={course.bannerImage}
            width={500}
            height={300}
            alt={course.title}
            className="w-full h-[220px] object-cover"
          />}

          {/* Content */}
          <div className="p-5 space-y-3">
            <h2 className="font-game text-2xl">{course.title}</h2>

            <p className="font-game text-lg text-gray-400 line-clamp-2">
              {course.desc}
            </p>

            {/* Level Tag */}
            <div className="flex items-center gap-2 bg-zinc-800 w-fit py-1 px-3 rounded-full">
              <ChartNoAxesColumnIncreasing className="w-4 h-4 text-yellow-400" />
              <span className="font-game text-sm text-gray-300">{course.level}</span>
            </div>

          </div>

        </div>
        </Link>
      ))}
    </div>
  )
}

export default CourseList
