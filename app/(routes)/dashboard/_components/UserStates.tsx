'use client'
import React from 'react'
import Image from "next/image";
import { useUser } from '@clerk/nextjs';

function UserStates() {
  const { user } = useUser()

  return (
    <div className='p-5 border-4 rounded-2xl'>
      
      {/* LEFT SIDE */}
      <div className="flex gap-1 items-center">
        <Image 
          src="/alex_walk.gif" alt="walking-user" width={80} height={80}
        />
        <h2 className="font-game text-xl">
          {user?.primaryEmailAddress?.emailAddress}
        </h2>
      </div>

      {/* RIGHT SIDE */}
      <div className='grid grid-cols-2 gap-5'>
        <div className='flex gap-3 items-center'>
        <Image 
          src="/star.png" alt="star" width={35} height={35}/>
            <h2 className='text-3xl font-game' >20</h2>
            <h2 className='font-game text-xl text-gray-500'>Total Rewards</h2>
    
      </div>
        <div className='flex gap-3 items-center'>
        <Image 
          src="/star.png" alt="star" width={35} height={35}/>
            <h2 className='text-3xl font-game' >20</h2>
            <h2 className='font-game text-xl text-gray-500'>Total Rewards</h2>
      
      </div>

        <div className='flex gap-3 items-center'>
        <Image 
          src="/star.png" alt="star" width={35} height={35}/>
            <h2 className='text-3xl font-game' >20</h2>
            <h2 className='font-game text-xl text-gray-500'>Total Rewards</h2>
      </div>
      </div>

    </div>
  )
}

export default UserStates
