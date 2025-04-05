'use client';

import { IKImage } from 'imagekitio-next';

type ImageType = {
	path: string;
	w?: number;
	h?: number;
	alt: string;
	className?: string;
	tr?: boolean; 
};

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

const Image = ({ path, w, h, alt, className, tr }: ImageType) => {
    return (
    <IKImage 
        urlEndpoint={urlEndpoint}
        path={path}
        width={w}
        height={h}
        alt={alt}
        className={className}
        {...(tr
             ? { transformation: [{ width: `${w}`, height: `${h}`}]}
             : { width: w, height: w } 
        )}
        lqip={{active: true, quality: 20 }}
    />
    );
};

export default Image;