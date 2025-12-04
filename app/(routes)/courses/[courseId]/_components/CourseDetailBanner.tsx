import React from 'react'
import { Course } from '../../_components/CourseList'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'

type Props = {
  loading: boolean
  courseDetail: Course | undefined
}

function CourseDetailBanner({ loading, courseDetail }: Props) {
  return (
    <div>
      {!courseDetail ? (
        <Skeleton className="w-full h-[300px] rounded-2xl" />
      ) : (
        <div className="w-full  rounded-2xl overflow-hidden relative">
          <Image
            src={courseDetail?.bannerImage}
            alt={courseDetail?.title}
            width={1400}
            height={300}
            className="object-cover w-full h-[350px]"

          />
          <div className="absolute top-0 mt-20 p-10 md:px-24 lg:px-36  font-game">
            <h2 className='text-6xl mt-7'>{courseDetail?.title}</h2>
            <p className='text-3xl text-gray-300 mt-3'>{courseDetail?.desc}</p>
            <Button className='text-2xl mt-3' variant={'pixel'}>Enroll Now</Button>
          </div>
          
        </div>
      )}
    </div>
  )
}

export default CourseDetailBanner

