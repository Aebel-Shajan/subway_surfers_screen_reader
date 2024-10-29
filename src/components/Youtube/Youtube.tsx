import { forwardRef } from "react";
import styles from "./Youtube.module.css";

interface YoutubeProps{
    videoId: string
}

const Youtube = ({videoId}: YoutubeProps, ref: React.ForwardedRef<HTMLIFrameElement>) => {
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