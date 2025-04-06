import Link from "next/link"
import Image from "./Image"

const PopularTags = () => {
  return (
    <div className="flex flex-col gap-4 rounded-2xl p-4 border-[1px] border-borderGray">
        <h1 className="text-xl font-bold text-textGrayLight">{"What's"} Happening</h1>
        <div className="flex gap-4">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden">
                <Image path="/general/cover.jpg" alt="event" w={120} h={120} tr/>
            </div>
            <div className="flex-1">
                <h2 className="font-bold text-textGrayLight">Study Web Dev</h2>
                <span className="text-sm text-textGray">Today</span>
            </div>
        </div>
        <div className="">
            <div className="flex items-center justify-between">
                <span className="text-textGray text-sm">Technology • Trending</span>
                <Image path="/icons/infoMore.svg" alt="info" w={16} h={16} />
            </div>
            <h2 className="text-textGrayLight font-bold">Web Development with AI</h2>
            <span className="text-textGray text-sm">30k posts</span>
        </div>
        <div className="">
            <div className="flex items-center justify-between">
                <span className="text-textGray text-sm">Technology • Trending</span>
                <Image path="/icons/infoMore.svg" alt="info" w={16} h={16} />
            </div>
            <h2 className="text-textGrayLight font-bold">Web Development with AI</h2>
            <span className="text-textGray text-sm">30k posts</span>
        </div>
        <div className="">
            <div className="flex items-center justify-between">
                <span className="text-textGray text-sm">Technology • Trending</span>
                <Image path="/icons/infoMore.svg" alt="info" w={16} h={16} />
            </div>
            <h2 className="text-textGrayLight font-bold">Web Development with AI</h2>
            <span className="text-textGray text-sm">30k posts</span>
        </div>
        <div className="">
            <div className="flex items-center justify-between">
                <span className="text-textGray text-sm">Technology • Trending</span>
                <Image path="/icons/infoMore.svg" alt="info" w={16} h={16} />
            </div>
            <h2 className="text-textGrayLight font-bold">Web Development with AI</h2>
            <span className="text-textGray text-sm">30k posts</span>
        </div>
        <Link href={'/'} className="text-iconBlue">Show More</Link>
    </div>
  )
}

export default PopularTags