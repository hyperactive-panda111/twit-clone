import Feed from '@/components/Feed'
import Image from '@/components/Image'
import Link from 'next/link'
import React from 'react'

const UserPage = () => {
  return (
    <div className=''>
      {/* PROFILE TITLE */}
      <div className='flex items-center gap-8 sticky p-4 top-0 background-blur-md z-10 bg-[#00000084]'>
        <Link href='/'>
          <Image path='/icons/back.svg' alt='back' w={24} h={24} />
        </Link>
        <h1 className='font-bold text-lg'>KarmaDev</h1>
      </div>
      {/* INFO */}
      <div>
        {/* COVER & AVATAR CONTAINER */}
        <div className='relative w-full'>
          {/* COVER */}
          <div className='relative w-full aspect-[3/1]'>
            <Image path={'/general/arcane2.jpg'} alt={'cover'} h={200} w={600} tr={true}/>      
          </div>
          {/* AVATAR */}
          <div className='absolute left-4 -translate-y-1/2 w-1/6 aspect-square overflow-hidden border-4 border-black bg-gray-300 rounded-full'>
            <Image path={'/general/arcane2.jpg'} alt={'avatar'} w={100} h={100} tr={true} />      
          </div>
        </div>
        <div className='flex justify-end items-center gap-2 p-2'>
          <div className='w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer'>
            <Image path='/icons/more.svg' alt='more' w={20} h={20}/>
          </div>
          <div className='w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer'>
            <Image path='/icons/more.svg' alt='more' w={20} h={20}/>
          </div>
          <div className='w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer'>
            <Image path='/icons/more.svg' alt='more' w={20} h={20}/>
          </div>
          <button className='py-2 px-4 bg-white text-black font-bold rounded-full'>Follow</button>
        </div>
        {/* USER DETAILS */}
        <div className='flex flex-col gap-2 p-4'>
          {/* USERNAME & HANDLE */}
          <div className=''>
            <h1 className='text-2xl font-bold'>Karma Dev</h1>
            <span className='text-textGray text-sm'>@LamaDev</span>
          </div>
          <p>Karma Dev Youtube Channel</p>
          {/* JOB & LOCATION & DATE */}
          <div className='flex gap-4 text-textGray text-[15px]'>
            <div className='flex items-center gap-2'>
              <Image 
                path='/icons/userLocation.svg'
                alt='location'
                w={20}
                h={20}
              />
              <span>USA</span>
            </div>
            <div className='flex items-center gap-2'>
              <Image 
                path='/icons/date.svg'
                alt='date'
                w={20}
                h={20}
              />
              <span>Joined December 1959</span>
            </div>
          </div>
        {/* FOLLOWINGS & FOLLOWERS */}
        <div className='flex gap-4'>
          <div className='flex gap-2 items-center'>
            <span className='font-bold'>100</span>
            <span className='text-[15px] text-textGray'>Followers</span>
          </div>
          <div className='flex gap-2 items-center'>
            <span className='font-bold'>100</span>
            <span className='text-[15px] text-textGray'>Followed</span>
          </div>
        </div>
        </div>
      </div>  
      {/* FEED  */}
      <Feed />
    </div>
  )
}

export default UserPage