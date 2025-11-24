import { index } from 'drizzle-orm/gel-core';
import React from 'react'
import Image from "next/image";

const ExploreMoreOptions = [
    {
        id: 1,
        title: 'Quiz Pack',
        desc: 'Practice what you learned with bite-sized code challenges.',
        icon: '/laugh.png'
    },
    {
        id: 2,
        title: 'Video Courses',
        desc: 'Learn with structured video lessons taught step-by-step.',
        icon: '/play-button.png'
    },
    {
        id: 3,
        title: 'Community Project',
        desc: 'Build real-world apps by collaborating with the community.',
        icon: '/game.png'
    },
    {
        id: 4,
        title: 'Talk with AI',
        desc: 'Chat with AI to get help, explanations, and debugging tips.',
        icon: '/degree.png'
    }
];



function ExploreMore() {

  return (
    <div className='mt-8'>
        <h2 className="font-game mb-3 text-3xl">Explore More</h2>
        <div className='grid grid-cols-2 gap-5'>
            {ExploreMoreOptions.map((option,index)=>(
                <div key={index} className='p-2 flex gap-2 border rounded-xl bg-zinc-900'>
                    <Image src={option?.icon} alt={option.title} width={80} height={80}/>
                    <div>
                        <h2 className='font-game font-medium text-2xl'>{option?.title}</h2>
                        <p className='font-game text-gray-300'>{option.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ExploreMore