import prisma from '../../lib/prisma'
import Post from './Post';
import { auth } from '@clerk/nextjs/server';
import InfiniteFeed from './InfiniteFeed';

const Feed = async ({ userProfileId }: { userProfileId?: string }) => {
  const { userId } = await auth();
  
  if (!userId) return;
  console.log('userId: ', userId);

  // const followings = await prisma.follow.findMany({ where: {followerId: userId}, select: {followingId: true}});
  // const ids = followings.map(f => f.followingId);
  // console.log('Response from DB: ', ids);

  const whereCondition = userProfileId ? { parentPostId: null, userId: userProfileId } : {
    parentPostId: null,
    userId: {
      in: [userId, ...(await prisma.follow.findMany({ where: {followerId: userId, }, select: {followingId: true}})).map(f => f.followingId)]
    }
  };

  const posts = await prisma.post.findMany({ where: whereCondition, take: 3, skip: 0, orderBy: { createdAt: 'desc'}});
  console.log("DB Response for Posts request: ", posts);
  
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <Post/>
          FROM SERVER
        </div>
      ))}
      <InfiniteFeed />
    </div>

  )
};


export default Feed