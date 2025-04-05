'use client';

import { useState } from 'react';
import Image from './Image';
import NxtImage from 'next/image';
import { shareAction } from '../../../actions';
import { ImageEditor } from './ImageEditor';

const Share = () => {
  const [media, setMedia] = useState<File | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [settings, setSettings] = useState<{
    type: 'original' | 'wide' | 'square';
    sensitive: boolean;
  }>({
    type: 'original',
    sensitive: false,
  })

  const handleMediaChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMedia(e.target.files[0]); 
    };
  };

  const previewURL = media ? URL.createObjectURL(media) : null;
  
  console.log(`previewURL: ${previewURL}`);
  return (
    <form className='p-4 flex gap-4' action={formData => shareAction(formData,settings)}>
      <div className='relative w-10 h-10 rounded-full overflow-hidden'>
        <Image
          path='general/panda.png'
          alt='profile'
          w={100}
          h={100}
          tr
        />
      </div>
      <div className='flex flex-1 flex-col gap-4'>
        <input type='text' name='desc' placeholder='What is happening?!' className='bg-transparent outline-none placeholder:text-textGray text-xl'/>
        {
          media?.type.includes('image') && previewURL && <div className='relative rounded-xl overflow-hidden'>
            <NxtImage 
              src={previewURL}
              alt='preview-image'
              width={600} 
              height={600}
              className={`w-full ${settings.type === 'original'
                ? 'h-full object-contain'
                : settings.type === 'square'
                  ? 'aspect-square object-cover' : 'aspect-video object-cover'
                }`} />
            <div className='absolute top-2 left-2 bg-black bg-opacity-50 px-4 py-1 text-white text-sm font-bold cursor-pointer rounded-full' onClick={() => setIsEditorOpen(true)}>Edit</div>
            <div className='absolute top-2 right-2 bg-black cursor-pointer rounded-full bg-opacity-50 text-white h-8 w-8 flex items-center justify-center' onClick={() => setMedia(null)}>X</div>
          </div>
        }
        {
          media?.type.includes('video') && previewURL && <div className='relative'>
            <video src={previewURL} controls />
            <div className='absolute top-2 right-2 bg-black cursor-pointer rounded-full bg-opacity-50 text-white h-8 w-8 flex items-center justify-center' onClick={() => setMedia(null)}>X</div>
          </div>
        }
        {
          isEditorOpen && previewURL && (
            <ImageEditor 
              onClose={() => setIsEditorOpen(false)}
              previewURL={previewURL}
              settings={settings}
              setSettings={setSettings}
            />
          )
        }
        <div className='flex items-center justify-between gap-4 flex-wrap'>
          <div className='flex items-center gap-4 flex-wrap'>
            <input type='file' name='file' onChange={handleMediaChange} className='hidden' id='file' accept='image/*,video/*'/>
            <label htmlFor='file'>
              <Image path='/icons/image.svg' alt='link' w={20} h={20} className='cursor-pointer' />
            </label>
            <Image path='/icons/gif.svg' alt='link' w={20} h={20} className='cursor-pointer' />
            <Image path='/icons/poll.svg' alt='link' w={20} h={20} className='cursor-pointer' />
            <Image path='/icons/emoji.svg' alt='link' w={20} h={20} className='cursor-pointer' />
            <Image path='/icons/schedule.svg' alt='link' w={20} h={20} className='cursor-pointer' />
            <Image path='/icons/location.svg' alt='link' w={20} h={20} className='cursor-pointer' />
          </div>
          <button className='bg-white text-black font-bold rounded-full py-2 px-4'>Post</button>
        </div>
      </div>
    </form>
  )
}

export default Share