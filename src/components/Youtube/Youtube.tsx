import { forwardRef } from "react";
import styles from "./Youtube.module.css";
import getVideoId from 'get-video-id';

interface YoutubeProps{
    videoUrl: string
}

const Youtube = ({videoUrl}: YoutubeProps, ref: React.ForwardedRef<HTMLIFrameElement>) => {
    let videoId: string | undefined = getVideoId(videoUrl).id
    if (!videoId) {
        videoId = "ZWcRmoLqhkc"
    }

    return (
    <iframe 
        className={styles.iframe}
        ref={ref}
        id="video" 
        src={`https://www.youtube.com/embed/${videoId}?mute=1&enablejsapi=1`}
    />
    );
}
 
export default forwardRef(Youtube);