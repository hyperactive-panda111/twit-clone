import Image from "./Image"

const Search = () => {
  return (
    <div className="flex gap-4 px-4 py-2 items-center rounded-full">
        <Image path="/icons/explore.svg" alt="search" w={16} h={16} className="cursor-pointer"/>
        <input type='text' placeholder="Search" className="bg-transparent outline-none placeholder:text-textGray" />
    </div>
  )
}

export default Search;