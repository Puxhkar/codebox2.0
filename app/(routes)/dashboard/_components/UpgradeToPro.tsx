"use client"
import React from 'react'
import Image from "next/image";
import { Button } from '@/components/ui/button';
import Link from "next/link";
import { useSession } from 'next-auth/react';

function UpgradeToPro() {
  const { data: session } = useSession();
  const hasUnlimitedAccess = false; // Mocking until Stripe is connected to DB

  return !hasUnlimitedAccess && (
    <div className='flex items-center flex-col p-5 border-4 rounded-4xl mt-8'>
        <Image src={'/logo.png'} alt='logo' width={70} height={70}/>
        <h2 className='font-game text-3xl'>Upgrade To Pro</h2>
        <p className='font-game text-xl text-gray-500 text-center'>Join pro membership to get all courses access</p>
        <Link href='/pricing'>
        <Button variant={'pixel'} className='font-game' size={'lg'}>Upgrade</Button>
        </Link>
    </div>
  )
}

export default UpgradeToPro