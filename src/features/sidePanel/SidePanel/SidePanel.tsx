import styles from "./SidePanel.module.css"
import logo from "@/assets/genz-screenreader-logo.png"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"
import { MdDragHandle } from "react-icons/md";
import { FaPause, FaPlay, FaStop } from "react-icons/fa6";
import { useRef, useState } from "react";
import { delay, getWordAtIndex } from "@/utils/utils";
import Youtube from "./Youtube/Youtube";
import { pauseVideoPlayer, playVideoPlayer, seekVideoToRandomTime, stopVideoPlayer } from "@/utils/youtubeHelpers";



const SidePanel = () => {
  // States
  const [inputText, setInputText] = useState<string>("")
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [hasStarted, setHasStarted] = useState<boolean>(false)
  const [currentWord, setCurrentWord] = useState<string>("")

  // Refs
  const youtubeRef = useRef<HTMLIFrameElement|null>(null)

  // Functions
  /**
   * Function which fires on every chrome tts event. This function main purpose is to set
   * the states for isPlaying, hasStarted and currentWord. 
   * 
   * I end the video here when the tts fails/ends/stops.
   * 
   * @param event Chrome tts event
   * @remark  https://developer.chrome.com/docs/extensions/reference/api/tts#listen_to_events
   */
  function ttsEventHandler(event: chrome.tts.TtsEvent) {
    switch (event.type) {
      case "start":
        setHasStarted(true)
        setIsPlaying(true)
        setCurrentWord(getWordAtIndex(inputText, 0))
        break;
      case "resume":
        setHasStarted(true)
        setIsPlaying(true)
        break;
      case "sentence":
      case "word":
        if (!event.charIndex) break
        setCurrentWord(getWordAtIndex(inputText, event.charIndex))
        break
      case "end":
      case "interrupted":
      case "cancelled":
      case "error":
        setHasStarted(false);
        setIsPlaying(false)
        setCurrentWord("")
        if (youtubeRef.current) {
          stopVideoPlayer(youtubeRef.current)
        }
        break;
      case "pause":
        setIsPlaying(false)
        setCurrentWord("")
        break
    }
  }


  /**
   * Stops the text-to-speech (TTS) engine.
   *
   * @Remark I have not stopped the video here because it is more robust to handle it
   * in the ttsEventHandler. There it considers cases where it ends, interrupted, 
   * cancelled or errored out.
   */
  function handleStop() {
    chrome.tts.stop()
  }

  /**
   * Handles the play/pause functionality.
   * 
   * * If the tts is currently playing, it pauses both the video player and the TTS 
   *  service.
   * * If the tts has not started, it starts the video from a random time, waits
   *   a while and then begins TTS.
   * * If the tts is has started and is not currently playing, it starts the vid, waits,
   *   then resumes tts.
   * 
   * @remark The reason for the wait is because the vid takes some time to load up.
   * 
   * 
   * @returns A promise that resolves when the play/pause actions are completed.
   */
  async function handlePlayPause() {
    if (!youtubeRef.current) return 
    if (isPlaying) {
      pauseVideoPlayer(youtubeRef.current)
      chrome.tts.pause();
    } else {
      if (!hasStarted) {
        seekVideoToRandomTime(youtubeRef.current, 300, 3600)
        await delay(500)
        playVideoPlayer(youtubeRef.current)
        await delay(500)
        chrome.tts.speak(inputText, { onEvent: ttsEventHandler });
      } else {
        playVideoPlayer(youtubeRef.current)
        await delay(500)
        chrome.tts.resume();
      }
    }
  }


  return (
    <PanelGroup className={styles.container} direction="vertical">
      <Panel maxSize={75} className={styles.upperPanel}>
        <header>
          <img src={logo} />
          <span>Subway surfers sidepanel</span>
        </header>
        <div className={styles.textareaContainer}>
          <textarea
            placeholder="Type your text to read aloud here."
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
          />
        </div>

        <div className={styles.buttonContainer} >
          <button 
            id="play-pause" 
            onClick={handlePlayPause}
          >
            {isPlaying ? <FaPause />: <FaPlay /> }
          </button>
          <button 
            id="stop" 
            disabled={!isPlaying || !hasStarted}
            onClick={handleStop}
          >
            <FaStop />
          </button>
        </div>

      </Panel>
      <PanelResizeHandle className={styles.resizeHandle}>
        <MdDragHandle />
      </PanelResizeHandle>
      <Panel>
        <div className={styles.lowerPanel}>
        <Youtube videoId="BkWT66jE8Hs" ref={youtubeRef} />
        <div className={styles.overlay}>
          {isPlaying ? <p>{currentWord}</p> : null}
        </div>
        </div>
      </Panel>
    </PanelGroup>
  );
}

export default SidePanel;