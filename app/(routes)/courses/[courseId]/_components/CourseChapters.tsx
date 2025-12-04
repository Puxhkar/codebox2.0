'use client'
import React from 'react'
import { Course } from '../../_components/CourseList'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from '@/components/ui/button'


type Props = {
  loading: boolean
  courseDetail: Course | undefined
}

function CourseChapters({loading,courseDetail}:Props) {
  return (
    <div>
      <div className='p-5 border-4 rounded-2xl'>
        {courseDetail?.chapters?.map((chapter,index)=>(
          <Accordion type="single" collapsible key={index}>
          <AccordionItem value="item-1">
            <AccordionTrigger className='p-3 hover:bg-zinc-800 font-game text-3xl '>{chapter?.name}</AccordionTrigger>
            <AccordionContent>
              <div className='p-7 bg-zinc-800 rounded-xl'>
                {chapter?.exercises.map((exc,index)=>(
                  <div key={index} className='flex items-center justify-between mt-7'>
                    <div className='flex flex-center gap-10 font-game text-3xl'>
                    <h2 className='text-3xl'>Exercise {index +1}</h2>
                    <h2>{exc.name}</h2>
                    </div>
                    <Button variant={"pixel"}>{exc?.xp} xp</Button>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        ))}
      </div>
    </div>
  )
}

export default CourseChapters