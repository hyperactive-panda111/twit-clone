'use client';
import { IKVideo } from "imagekitio-next";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

type VideoType = {
    path: string;
    className?: string;
};

const Video = ({ path, className }: VideoType) => {
    return (
        <IKVideo
            urlEndpoint={urlEndpoint}
            path={path} 
            className={className}
            controls
            transformation={[
                { height: 1080, width: 1920, quality: 70 },
                { raw: "l-text,i-KarmaDev,fs-50,l-end" }
            ]}
         />
    )
};

export default Video