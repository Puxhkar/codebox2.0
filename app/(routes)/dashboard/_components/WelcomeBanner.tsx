"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

function WelcomeBanner() {
  const { data: session } = useSession()
  const user = session?.user

  return (
    <div className='flex items-center gap-4'>
      <Image src={'/machine.webp'} alt='robo' width={120} height={120} />
      <h2 className='font-game text-2xl p-4 border bg-zinc-800 rounded-lg rounded-bl-none'>
        Welcome back, <span className='text-yellow-500'>{user?.name || "Learner"}</span> Start Learning Something New...
      </h2>
    </div>
  )
}
export default WelcomeBanner
