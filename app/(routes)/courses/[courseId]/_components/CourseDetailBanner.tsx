"use client";

import React, { useState } from 'react'
import { Course } from '../../_components/CourseList'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Loader2Icon } from 'lucide-react'
import { toast } from 'sonner';
import { refresh } from 'next/cache';

type Props = {
  loading: boolean
  courseDetail: Course | undefined
  refreshData:()=>void
}

export default function CourseDetailBanner({ loading, courseDetail ,refreshData }: Props) {
  const [loading_, setLoading_] = useState(false)

  const EnrollCourse = async () => {
    // Detect proper courseId field (supports both id and courseId)
    const id = courseDetail?.courseId ?? courseDetail?.id

    if (!id) {
      console.error("❌ ERROR: courseId or id missing from courseDetail!")
      alert("Unable to enroll — Course ID not found.")
      return
    }

    console.log("Enrolling with courseId:", id)

    try {
      setLoading_(true)

      const result = await axios.post("/api/enroll-course", {
        courseId: id,
      })

      console.log("Enroll response:", result.data)
    } catch (err) {
      console.error("Enroll error:", err)
    } finally {
      toast.success('Course Enrolled!')
      refreshData()
      setLoading_(false)
    }
  }

  return (
    <div>
      {!courseDetail ? (
        <Skeleton className="w-full h-[300px] rounded-2xl" />
      ) : (
        <div className="w-full rounded-2xl overflow-hidden relative">
          <Image
            src={courseDetail.bannerImage}
            alt={courseDetail.title}
            width={1400}
            height={300}
            className="object-cover w-full h-[350px]"
          />

          <div className="absolute top-0 mt-20 p-10 md:px-24 lg:px-36 font-game">
            <h2 className="text-6xl mt-7">{courseDetail.title}</h2>
            <p className="text-3xl text-gray-300 mt-3">{courseDetail.desc}</p>

           {!courseDetail?.userEnrolled? <Button
              className="text-2xl mt-3"
              variant="pixel"
              disabled={loading_}
              onClick={EnrollCourse}>
              {loading_ && <Loader2Icon className="animate-spin mr-2" />}
              Enroll Now
            </Button>
            :<Button variant={'pixel'} className='text-2xl mt-7' size={'lg'}>Continue Learning...</Button>}
          </div>
        </div>
      )}
    </div>
  )
}
