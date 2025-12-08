import React from 'react'
import WelcomeBanner from './_components/WelcomeBanner'
import EnrolledCourses from './_components/EnrolledCourses'
import ExploreMore from './_components/ExploreMore'
import InviteFrame from './_components/InviteFriend'
import UserStates from './_components/UserStates'
import UpgradeToPro from './_components/UpgradeToPro'
import Header from '@/app/_components/Header'

function Dashboard() {
  return (
    <div>
      
      {/* Header */}
      <div className="flex flex-col items-center">
        <Header />
      </div>

      {/* Main Content */}
      <div className='p-10 md:px-20 lg:px-36 xl:px-48'>
        <div className='grid grid-cols-3 gap-7'>
          
          {/* LEFT SIDE */}
          <div className='col-span-2 space-y-7'>
            <WelcomeBanner />
            <EnrolledCourses />
            <ExploreMore />
            <InviteFrame />
          </div>

          {/* RIGHT SIDE */}
          <div className='space-y-7'>
            <UserStates />
            <UpgradeToPro />
          </div>

        </div>
      </div>

    </div>
  )
}

export default Dashboard
