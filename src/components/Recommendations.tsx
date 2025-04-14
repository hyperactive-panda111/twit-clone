import Link from "next/link"
import Image from "./Image"
import { auth } from "@clerk/nextjs/server";
import prisma from "../../lib/prisma";

const Recommendations = async () => {
    
    const { userId } = await auth();
    if (!userId) return;

    const followingIds = await prisma.follow.findMany({
        where: { followerId: userId },
        select: { followingId: true},
    });

    const followedUserIds = followingIds.map(following => following.followingId);
    const friendRecommendations = await prisma.user.findMany({
        where: {
            id: { notIn: [userId, ...followedUserIds]},
            followings: { some: { followerId: { in: followedUserIds}}},
        },
        take: 3,
        select: { id: true, displayName: true, username: true, img: true},
    });
    
    return (
        <div className="flex flex-col gap-4 rounded-2xl p-4 border-[1px] border-borderGray">
            {friendRecommendations.map((person) => (
            <div className="flex items-center justify-between" key={person.id}>
                <div className="flex items-center gap-2">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image path="/general/post.jpeg" alt={person.username} w={100} h={100} tr />
                    </div>
                    <div>
                        <h1 className="text-md font-black">{person.displayName || person.username}</h1>
                        <span className="text-textGray text-sm">@{person.username}</span>
                    </div>
                </div>
                <button className="py-1 px-4 font-semibold bg-white text-black rounded-full">Follow</button>
            </div>
           ))}

            <Link href={'/'} className="text-iconBlue">Show More</Link>
        </div>
    )
}

export default Recommendations; 