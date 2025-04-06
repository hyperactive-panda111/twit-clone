import { menuList } from "@/constants/constants"
import Link from "next/link"
import Image from "./Image"


const LeftBar = () => {
  return (
    <div className="sticky top-0 left-0 pt-2 pb-8 h-screen flex flex-col justify-between">
      {/* LOGO MENU BUTTON */}
      <div className="flex flex-col gap-4 text-lg item-center xxl:items-start">
        {/* LOGO */}
        <Link href='/' className="p-2 rounded-full bg-[#181818]">
          <Image 
            path={"icons/logo.svg"} 
            w={24}
            h={24}
            alt="logo"
             />
        </Link>
        {/* MENU LIST */}
        <div className="flex flex-col">
          {menuList.map((item) => (
           <Link href={`icons/${item.link}`} className="flex items-center gap-4 p-2 rounded-full hover:bg-[#181818]" key={item.id}>
            <Image 
              path={`icons/${item.icon}`} 
              h={24} 
              w={24} 
              alt={item.name} 
            />
            <span className="hidden xxl:inline">{item.name}</span>
           </Link>
          ))}
        </div>
        {/* POST BUTTON */}
        <Link href={'/'} className="flex items-center justify-center w-12 h-12 bg-white rounded-full xxl:hidden">
          <Image path={"icons/post.svg"} h={24} w={24} alt="post" />
        </Link>
        <Link href={'/'} className="hidden xxl:block rounded-full bg-white text-black font-bold py-2 px-20">
          Post
        </Link>
      </div>
      {/* USER */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image 
              path="/general/panda.png"
              w={24}
              h={24}
              alt="user" 
            />
          </div>
          <div className="hidden xxl:flex flex-col">
            <span className="font-bold">Karma Dev</span>
            <span className="text-sm text-textGray">@KarmaDev</span>
          </div>
        </div>
        <div className="hidden xxl:block cursor-pointer font-bold">...</div>
      </div>
    </div>
  )
}

export default LeftBar