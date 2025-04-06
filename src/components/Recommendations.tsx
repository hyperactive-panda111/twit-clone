import Link from "next/link"
import Image from "./Image"

const Recommendations = () => {
  return (
    <div className="flex flex-col gap-4 rounded-2xl p-4 border-[1px] border-borderGray">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image path="/general/post.jpeg" alt="John Doe" w={100} h={100} tr/>
                </div>
                <div>
                    <h1 className="text-md font-black">John Doe</h1>
                    <span className="text-textGray text-sm">@JohnDoe</span>
                </div>
            </div>
            <button className="py-1 px-4 font-semibold bg-white text-black rounded-full">Follow</button>
        </div>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image path="/general/post.jpeg" alt="John Doe" w={100} h={100} tr/>
                </div>
                <div>
                    <h1 className="text-md font-black">John Doe</h1>
                    <span className="text-textGray text-sm">@JohnDoe</span>
                </div>
            </div>
            <button className="py-1 px-4 font-semibold bg-white text-black rounded-full">Follow</button>
        </div>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image path="/general/post.jpeg" alt="John Doe" w={100} h={100} tr/>
                </div>
                <div>
                    <h1 className="text-md font-black">John Doe</h1>
                    <span className="text-textGray text-sm">@JohnDoe</span>
                </div>
            </div>
            <button className="py-1 px-4 font-semibold bg-white text-black rounded-full">Follow</button>
        </div>
        
        <Link href={'/'} className="text-iconBlue">Show More</Link>

    </div>
  )
}

export default Recommendations