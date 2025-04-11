import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const userProfileId = searchParams.get('user');
    
    const { userId } = await auth();

    if (!userId) return;
    console.log('userId: ', userId);

    // const followings = await prisma.follow.findMany({ where: {followerId: userId}, select: {followingId: true}});
    // const ids = followings.map(f => f.followingId);
    // console.log('Response from DB: ', ids);

    const whereCondition = userProfileId ? { parentPostId: null, userId: userProfileId } : {
        parentPostId: null,
        userId: {
            in: [userId, ...(await prisma.follow.findMany({ where: { followerId: userId }, select: { followingId: true } })).map(f => f.followingId)]
        }
    };

    const posts = await prisma.post.findMany({ where: whereCondition });

    return Response.json(posts);
}