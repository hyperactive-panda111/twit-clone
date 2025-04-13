import prisma from '../../lib/prisma'
import Post from './Post';
import { auth } from '@clerk/nextjs/server';
import InfiniteFeed from './InfiniteFeed';

const Feed = async ({ userProfileId }: { userProfileId?: string }) => {
  console.log("userProfileId: ",userProfileId);

  const { userId } = await auth();

  
  if (!userId) return;
  console.log('userId in feed comp: ', userId);

  // const followings = await prisma.follow.findMany({ where: {followerId: userId}, select: {followingId: true}});
  // const ids = followings.map(f => f.followingId);
  // console.log('Response from DB: ', ids);

  const whereCondition = userProfileId !== 'undefined' ? { parentPostId: null, userId: userProfileId  as string} : {
    parentPostId: null,
    userId: {
      in: [userId, ...(await prisma.follow.findMany({ where: {followerId: userId }, select: {followingId: true}})).map(f => f.followingId)]
    }
  };

  const posts = await prisma.post.findMany({ 
    where: whereCondition,
    include: {
      user: {select: { displayName: true, username: true, img:true }},
      rePost: {
        include: {
          user: { select: { displayName: true, username: true, img: true }},
          _count: {select: {likes: true, rePosts: true, comments: true }},
          likes: { where: { userId: userId }, select: {id: true }},
          rePosts: { where: { userId: userId}, select: { id: true }},
          saves: { where: { userId: userId}, select: { id: true }},

        },
      },
      _count: {select: { likes: true, rePosts: true, comments: true }},
      likes: { where: { userId: userId }, select: {id: true }}, 
      rePosts: { where: { userId: userId}, select: { id: true }},
      saves: { where: { userId: userId}, select: { id: true }},
    },
    take: 3, 
    skip: 0, 
    orderBy: { createdAt: 'desc'}});
  console.log("DB Response for Posts request: ", posts);
  
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <Post post={post}/>
        </div>
      ))}
      <InfiniteFeed userProfileId={userProfileId}/>
    </div>

  )
};


export default Feed