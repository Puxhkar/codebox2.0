"use client"
import React from 'react'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'

function WelcomeBanner() {
  const { user } = useUser()

  return (
    <div className='flex items-center gap-4'>
      <Image src={'/machine.webp'} alt='robo' width={120} height={120} />
      <h2 className='font-game text-2xl p-4 border bg-zinc-800 rounded-lg rounded-bl-none'>
        Welcome back, <span className='text-yellow-500'>{user?.fullName || "Learner"}</span> Start Learning Something New...
      </h2>
    </div>
  )
}
export default WelcomeBanner
