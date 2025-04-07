import Link from 'next/link'
import React from 'react'
import Image from '@/components/Image';
import Post from '@/components/Post';

const StatusPage = () => {
    return (
        <div>
            <div className=''>
                <div className='flex items-center gap-8 sticky p-4 top-0 background-blur-md z-10 bg-[#00000084]'>
                    <Link href='/'>
                        <Image path='/icons/back.svg' alt='back' w={24} h={24} />
                    </Link>
                    <h1 className='font-bold text-lg'>Post</h1>
                </div>
                    <Post type='status' />
            </div>
        </div>
    )
}

export default StatusPage