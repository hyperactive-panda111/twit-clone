'use client';

import Image from '@/components/Image';
import { useRouter } from 'next/navigation';
import React from 'react'

const PostModal = () => {

    const router = useRouter();

    const closeModal = () => {
        router.back();
    }
    return (
        <div className=' flex justify-center absolute w-screen h-screen top-0 left-0 z-20 bg-[#293139a6]'>
            {/* MODAL */}
            <div className='py-4 px-8 rounded-xl bg-black w-[600px] h-max mt-12 '>
                {/* TOP */}
                <div className='flex items-center justify-between'>
                    <div className='cursor-pointer' onClick={closeModal}>X</div>
                    <div className='text-iconBlue font-bold'>Drafts</div>
                </div>
                {/* MIDDLE */}
                <div className='py-8 flex gap-4'>
                    <div className='relative rounded-full overflow-hidden w-10 h-10'>
                        <Image path='general/panda.png' alt='cover' w={100} h={100} tr={true} />
                    </div>
                    <input type='text' className='bg-transparent outline-none flex-1 text-lg' placeholder='What is happening?!' />
                </div>

                {/* BOTTOM */}
                <div className='flex items-center justify-between gap-4 flex-wrap border-t border-borderGray pt-4'>
                    <div className='flex flex-wrap gap-4'>
                        <Image path='/icons/image.svg' alt='link' w={20} h={20} className='cursor-pointer' />
                        <Image path='/icons/gif.svg' alt='link' w={20} h={20} className='cursor-pointer' />
                        <Image path='/icons/poll.svg' alt='link' w={20} h={20} className='cursor-pointer' />
                        <Image path='/icons/emoji.svg' alt='link' w={20} h={20} className='cursor-pointer' />
                        <Image path='/icons/schedule.svg' alt='link' w={20} h={20} className='cursor-pointer' />
                        <Image path='/icons/location.svg' alt='link' w={20} h={20} className='cursor-pointer' />
                    </div>
                    <button className='px-4 py-2 bg-white text-black rounded-full font-bold'>Post</button>
                </div>
            </div>
        </div>
    )
};

export default PostModal; 