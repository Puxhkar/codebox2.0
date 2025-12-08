import React from 'react'
import Image from "next/image";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function InviteFriend() {
  return (
    <div className='flex flex-col items-center mt-8 p-4 border rounded-xl'>
        <Image src={'/invitation.gif'} alt='mail' width={80} height={80}/>
        <h2 className='text-3xl font-game'>Invite Friends</h2>
        <p className='font-game '>Having Fun? Share with Your Friend! Enter an email we will share them personally</p>
        <div className='flex gap-2 items-center mt-5'>
            <Input placeholder='Enter Invite Email' className='min-w-sm bg-zinc-900'/>
            <Button variant={'pixel'} className='font-game' size={'lg'}>Invite!</Button>
        </div>
    </div>
  )
}

export default InviteFriend