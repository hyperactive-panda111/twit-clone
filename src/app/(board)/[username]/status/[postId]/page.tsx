import Link from 'next/link'
import React from 'react'
import Image from '@/components/Image';
import Post from '@/components/Post';
import prisma from '../../../../../../lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';
import Comments from '@/components/Comments';

const StatusPage = async ({ params}: { params: Promise<{ username: string, postId: string }>}) => {
    
    const { userId } = await auth();
    const postId = (await params).postId;
    if (!postId) return;
    
    if (!userId) return;

    const post = await prisma.post.findFirst({
        where: { id: Number(postId)},
        include: {
            user: {select: { displayName: true, username: true, img:true }},
            _count: {select: { likes: true, rePosts: true, comments: true }},
            likes: { where: { userId: userId }, select: {id: true }}, 
            rePosts: { where: { userId: userId}, select: { id: true }},
            saves: { where: { userId: userId}, select: { id: true }},
            comments: {
                orderBy: { createdAt: 'desc' },
                include: {
                    user: {select: { displayName: true, username: true, img:true }},
                    _count: {select: { likes: true, rePosts: true, comments: true }},
                    likes: { where: { userId: userId }, select: {id: true }}, 
                    rePosts: { where: { userId: userId}, select: { id: true }},
                    saves: { where: { userId: userId}, select: { id: true }},
            },
          },
        },
});

    if (!post) return notFound();

    return (
        <div>
            <div className=''>
                <div className='flex items-center gap-8 sticky p-4 top-0 background-blur-md z-10 bg-[#00000084]'>
                    <Link href='/'>
                        <Image path='/icons/back.svg' alt='back' w={24} h={24} />
                    </Link>
                    <h1 className='font-bold text-lg'>Post</h1>
                </div>
                    <Post post={post} type='status'/>
                    <Comments 
                        postId={post.id} 
                        comments={post.comments}
                        username={post.user.username}
                     />
            </div>
        </div>
    )
}

export default StatusPage