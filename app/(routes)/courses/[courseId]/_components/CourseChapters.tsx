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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from "next/link";



type Props = {
  loading: boolean
  courseDetail: Course | undefined
}

function CourseChapters({loading,courseDetail}:Props) {

const EnableExercise = (
    chapterIndex: number,
    exerciseIndex: number,
    chapterExercisesLength: number
) => {
    const completed = courseDetail?.completedExcercises;

    // If nothing is completed, enable FIRST exercise ONLY
    if (!completed || completed.length === 0) {
        return chapterIndex === 0 && exerciseIndex === 0;
    }

    // last completed
    const last = completed[completed.length - 1];

    // Convert to global exercise number
    const currentExerciseNumber =
        chapterIndex * chapterExercisesLength + exerciseIndex + 1;

    const lastCompletedNumber =
        (last.chapterId - 1) * chapterExercisesLength + last.exerciseId;

    return currentExerciseNumber === lastCompletedNumber + 2;
};

const isExerciseCompleted=(chapterId:number,exerciseId:number)=>{
  const completeChapters = courseDetail?.completedExcercises;
  const completeChapter =  completeChapters?.find(item=>(item.chapterId==chapterId && item.exerciseId== exerciseId))
  return completeChapter?true:false
}
  
  return (
    <div>
      <div className='p-5 border-4 rounded-2xl'>
        {courseDetail?.chapters?.map((chapter,index)=>(
          <Accordion type="single" collapsible key={index}>
          <AccordionItem value="item-1">
            <AccordionTrigger className='p-3 hover:bg-zinc-800 font-game text-3xl '>{chapter?.name}</AccordionTrigger>
            <AccordionContent>
              <div className='p-7 bg-zinc-800 rounded-xl'>
                {chapter?.exercises.map((exc,indexExc)=>(
                  <div key={indexExc} className='flex items-center justify-between mt-7'>
                    <div className='flex flex-center gap-10 font-game text-3xl'>
                    <h2 className='text-3xl'>Exercise {index*chapter?.exercises?.length + indexExc+1}</h2>
                    <h2>{exc.name}</h2>
                    </div>
                    
                    {EnableExercise(index,indexExc, chapter?.exercises.length)? 
                    <Link href={'/courses/'+courseDetail?.courseId+'/'+chapter?.chapterId+ '/' +exc?.slug}>
                    <Button variant={"pixel"}>{exc?.xp} xp</Button>
                    </Link>:

                    isExerciseCompleted(chapter?.chapterId,index+1)?
                    <Button variant={"pixel"} className='bg-green-600'>Completed</Button>
                    :<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="pixelDisabled">***</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p className='text-lg font-game'>Please Enroll First!!</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>}
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