import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Progress } from '@/components/ui/progress'
import { Course } from '../../_components/CourseList'
import { Item } from '@radix-ui/react-navigation-menu'


type Props={
  courseDetail:Course|undefined
}

function CourseStatus({courseDetail}:Props) {

    const [counts,setCounts] = useState<{
        totalExce: number,
        totalXp: number,
    }>()

    useEffect(()=>{
        courseDetail && GetCounts()
    },[courseDetail])

    const GetCounts=()=>{
        let totalExercises = 0;
        let totalXp = 0;
        courseDetail?.chapters?.forEach((chapters)=>{
            totalExercises = totalExercises+chapters?.exercises?.length
            chapters?.exercises?.forEach(exc=>{
                totalXp=totalXp+exc?.xp;
            })
        })

        setCounts({
            totalExce:totalExercises,
            totalXp:totalXp
        })
    }

    const updateProgress =(currentValue:number,totalvalue: number)=>{
        if(currentValue&&totalvalue){

            const perc  = (currentValue*100)/totalvalue;
            return perc

        }return 0
    }
  return (
    <div className='font-game p-4 border-4 rounded-2xl w-full'>
        <h2 className='text-3xl'>Course Progress</h2>
        <div className='flex items-center mt-4 gap-5 '>
        <Image src={'/books.png'} alt='image' width={50} height={50}/>
            <h2 className='flex justify-between text-2xl '>Exercises-
                <span className='text-yellow-500'>1/{courseDetail?.completedExcercises?.length}/{counts?.totalExce}</span> </h2>
                {/* @ts-ignore */}
            <Progress value={updateProgress(courseDetail?.completedExcercises?.length??0,counts?.totalExce)} className='mt-2'/>
        </div>

        <div className='flex items-center mt-4 gap-5 '>
        <Image src={'/star.png'} alt='image' width={50} height={50}/>
            <h2 className='flex justify-between text-2xl '>XP Earned
                <span className='text-yellow-500'>{courseDetail?.courseEnrolledInfo?.xpEarned}/{counts?.totalXp}</span> </h2>
                  {/* @ts-ignore */}
            <Progress value={updateProgress(courseDetail?.courseEnrolledInfo?.xpEarned??0,counts?.totalXp)} className='mt-2'/>
        </div>

        
    </div>
  )
}

export default CourseStatus