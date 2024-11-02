import { forwardRef } from "react";
import styles from "./Youtube.module.css";
import getVideoId from 'get-video-id';
import { DEFAULT_OPTIONS } from "@/constants";

interface YoutubeProps {
  videoUrl: string
}

const Youtube = ({ videoUrl }: YoutubeProps, ref: React.ForwardedRef<HTMLIFrameElement>) => {
  let videoId: string | undefined = getVideoId(videoUrl).id
  if (!videoId) {
    videoId = getVideoId(DEFAULT_OPTIONS.videos[DEFAULT_OPTIONS.selectedVideo].url).id // never undefined
  }

  return (
    <div 
      className={styles.iframeContainerContainer}>
      <div 
        className={styles.iframeContainer}>
        <iframe
          className={styles.iframe}
          ref={ref}
          id="video"
          src={`https://www.youtube.com/embed/${videoId}?mute=1&enablejsapi=1`}
        />
      </div>
    </div>

  );
}

export default forwardRef(Youtube);