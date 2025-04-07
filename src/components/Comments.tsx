import { imagekit } from "@/utils";
import Image from "./Image";
import PostInfo from "./PostInfo";
import PostInteractions from "./PostInteractions";
import Video from "./Video";
import Link from "next/link";

interface FileDetailsResponse {
    width: number;
    height: number;
    filePath: string;
    url: string;
    fileType: string;
    customMetadata?: {
        sensitive: boolean;
    }
};

const Post = async ({ type }: { type ?: 'status' | 'comment'}) => {
    const getFileDetails = async (fileId: string): Promise<FileDetailsResponse> => {
        return new Promise((resolve, reject) => {
            imagekit.getFileDetails(fileId, function (error, result) {
                if (error) reject(error);
                else resolve(result as FileDetailsResponse);
            });
        });
    }
// 67f16b9d432c4764160e9ae8 67f190a8432c476416e134a8 67f24698432c476416b0319d
    const fileDetails = await getFileDetails('67f24698432c476416b0319d');


    return (
        <div className='p-4 border-y-[1px] border-borderGray'>
            {/* POST TYPE */}
            <div className='flex gap-2 items-center text-sm text-textGray mb-2 font-bold'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#71767b"
                        d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z"
                    />
                </svg>
                <span className="">KarmaDev reposted</span>
            </div>
            {/* POST CONTENT */}
            {/*<div className="flex gap-4">*/}
            <div className={`flex gap-4 ${type === 'status' && 'flex-col'}`}>
                {/* AVATAR */}
                <div className={`${type === 'status' && 'hidden'} relative w-10 h-10 rounded-full overflow-hidden`}>
                    <Image
                        path="/general/panda.png"
                        alt="profile"
                        tr
                        w={100}
                        h={100}
                    />
                </div>
                {/* CONTENT */}
                <div className="flex-1 flex flex-col gap-2">
                    {/* TOP */}
                    <div className='w-full flex justify-between'>
                        <Link href={`/test`} className="flex gap-4">
                            <div className={`${type !== 'status' && 'hidden'} relative w-10 h-10 rounded-full overflow-hidden`}>
                                <Image
                                    path="/general/panda.png"
                                    alt="profile"
                                    tr
                                    w={100}
                                    h={100}
                                />
                            </div>
                            <div className={`flex gap-2 items-center flex-wrap ${type === 'status' && 'flex-col gap-0 !items-start'}`}>
                                <h1 className={`text-md text-bold ${type==='status' && 'text-sm'}`}>Karma Dev</h1>
                                <span className="text-textGray">@karmadev</span>
                                {type !== 'status' && <span className="text-textGray">1 day ago</span>}
                            </div>
                        </Link>
                            <PostInfo />
                        </div>
                    </div>
                    {/* TEXT & MEDIA */}
                    <Link href={`/test/status/12`}>
                        <p className={`${type === 'status' && 'text-lg'}`}>
                            Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Repellendus maiores animi
                            vitae temporibus, inventore, rerum excepturi
                            distinctio voluptatem voluptate laboriosam at!
                            Assumenda tempore cum, ipsum doloremque
                            consectetur debitis vel quaerat.
                        </p>
                    </Link>
                    {/* <Image path="/general/post.jpeg" w={600} h={600} alt="post" /> */}
                    {fileDetails && fileDetails.fileType === 'image' ? (
                        <Image 
                            className={fileDetails?.customMetadata?.sensitive ? 'blur-lg' : ''} 
                            alt='' 
                            path={fileDetails.filePath} 
                            w={fileDetails.width} 
                            h={fileDetails.height}
                        />
                    ) : (
                            <Video 
                                path={fileDetails.filePath}
                                className={fileDetails?.customMetadata?.sensitive ? 'blur-lg' : ''} 
                            />
                        )}
                    {type === 'status' && <span className='text-textGray'>8:41 PM · Dec 5, 1886</span>}
                    <PostInteractions />
                </div>
            </div>
    );
};

export default Post;