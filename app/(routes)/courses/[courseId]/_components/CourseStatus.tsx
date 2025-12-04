import React from 'react'
import Image from 'next/image'
import { Progress } from '@/components/ui/progress'
function CourseStatus() {
  return (
    <div className='font-game p-4 border-4 rounded-2xl w-full'>
        <h2 className='text-3xl'>Course Progress</h2>
        <div className='flex items-center mt-4 gap-5 '>
        <Image src={'/books.png'} alt='image' width={50} height={50}/>
            <h2 className='flex justify-between text-2xl '>Exercises-
                <span className='text-yellow-500'>1/72</span> </h2>
            <Progress value={37} className='mt-2'/>
        </div>

        <div className='flex items-center mt-4 gap-5 '>
        <Image src={'/star.png'} alt='image' width={50} height={50}/>
            <h2 className='flex justify-between text-2xl '>XP Earned
                <span className='text-yellow-500'>1/340</span> </h2>
            <Progress value={37} className='mt-2'/>
        </div>

        
    </div>
  )
}

export default CourseStatus