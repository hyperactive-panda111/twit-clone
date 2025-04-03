import Image from "./Image"

const PostInfo = () => {
  return (
    <div className="relative w-4 h-4 cursor-pointer">
        <Image path="/icons/infoMore.svg" alt="more" w={16} h={16} />
    </div>
  )
}

export default PostInfo