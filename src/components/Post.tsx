import Image from "./Image";
import PostInfo from "./PostInfo";
import PostInteractions from "./PostInteractions";
import Link from "next/link";
import { Post as PostType } from "../../prisma/db/generated/prisma";
import { format } from "timeago.js";

type PostWithDetails = PostType & {
    user: {
        displayName: string | null;
        img: string | null;
        username: string;
    };
    rePost?: PostType & {
        user: {
            displayName: string | null;
            img: string | null;
            username: string;
        };
        _count: {likes: number; rePosts: number; comments: number};
        likes: {id: number}[];
        rePosts: { id: number}[]; 
        saves: {id: number}[];   
    };
    _count: {likes: number; rePosts: number; comments: number};
    likes: {id: number}[];
    rePosts: { id: number}[];  
    saves: {id: number}[];     
};


const Post = ({ type, post }: { type ?: 'status' | 'comment', post: PostWithDetails}) => {
    
    const originalPost = post.rePost || post;
    return (
        <div className='p-4 border-y-[1px] border-borderGray'>
            {/* POST TYPE */}
            {post.rePostId && (
            <div className='flex gap-2 items-center text-sm text-textGray mb-2 font-bold'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#71767b"
                        d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z"
                    />
                </svg>
                <span className="">{post.user.displayName} reposted</span>
            </div>)}
            
            {/* POST CONTENT */}
            <div className="flex gap-4">
                {/* AVATAR COLUMN */}
                <div className={`${type === 'status' ? 'hidden' : ''}`}>
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image
                            //@ts-ignore
                            path={!!originalPost.user.img && '/general/noprofile.jpg'}
                            alt="profile"
                            tr={true}
                            w={100}
                            h={100}
                        />
                    </div>
                </div>
                
                {/* MAIN CONTENT COLUMN */}
                <div className="flex-1 flex flex-col gap-2 max-w-full overflow-hidden">
                    {/* USER INFO ROW */}
                    <div className='w-full flex justify-between'>
                        <Link href={`/${originalPost.user.username}`} className="flex gap-4">
                            {/* AVATAR - shown only when status */}
                            {type === 'status' && (
                                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                    <Image
                                        path={originalPost.user.img || "/general/panda.png"}
                                        alt="profile"
                                        tr={true}
                                        w={100}
                                        h={100}
                                    />
                                </div>
                            )}
                            
                            <div className={`flex gap-2 items-center flex-wrap ${type === 'status' ? 'flex-col gap-0 !items-start' : ''}`}>
                                <h1 className={`text-md text-bold ${type === 'status' ? 'text-sm' : ''}`}>{originalPost.user.displayName}</h1>
                                <span className="text-textGray">@{originalPost.user.username}</span>
                                {type !== 'status' && <span className="text-textGray">{format(originalPost.createdAt)}</span>}
                            </div>
                        </Link>
                        <PostInfo />
                    </div>
                    
                    {/* POST TEXT */}
                    <div className="w-full break-words">
                        <Link href={`/test/status/12`} className="inline-block w-full">
                            <p className={`${type === 'status' ? 'text-lg' : ''} whitespace-normal break-words`}>
                                {originalPost.desc}
                            </p>
                        </Link>
                    </div>
                    
                    {/* POST MEDIA */}
                    {originalPost.img && (
                        <div className="mt-2 w-full rounded-xl overflow-hidden">
                            <Image 
                                //@ts-ignore
                                path={!!originalPost.img && '/general/arcane2.jpg'} 
                                w={600} 
                                h={600} 
                                alt="post" 
                            />
                        </div>
                    )}
                    
                    {/* TIMESTAMP FOR STATUS */}
                    {type === 'status' && <span className='text-textGray'>8:41 PM · Dec 5, 1886</span>}
                    
                    {/* INTERACTIONS */}
                    <PostInteractions 
                        count={originalPost._count}
                        isLiked={!!originalPost.likes.length}
                        isReposted={!!originalPost.rePosts.length}
                        isSaved={!!originalPost.saves.length}                         
                    />
                </div>
            </div>
        </div>
    );
};

export default Post;