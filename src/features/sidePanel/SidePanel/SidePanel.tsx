import styles from "./SidePanel.module.css"
import logo from "@/assets/genz-screenreader-logo.png"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"
import { MdDragHandle } from "react-icons/md";
import { FaPause, FaPlay, FaStop, FaTrash } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { cleanUpText, delay } from "@/utils/utils";
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
   * @param textBeingRead Full text that is currently bein
   * @remark  https://developer.chrome.com/docs/extensions/reference/api/tts#listen_to_events
   */
  function ttsEventHandler(event: chrome.tts.TtsEvent, textBeingRead: string) {
    console.log(event)
    switch (event.type) {
      case "start":
        setHasStarted(true)
        setIsPlaying(true)
        break;
      case "resume":
        setHasStarted(true)
        setIsPlaying(true)
        break;
      case "sentence":
      case "word":
        if (event.charIndex===undefined|| event.length===undefined) break
        setCurrentWord(textBeingRead.slice(event.charIndex, event.charIndex + event.length))
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
   * Trigger the screen reader to run. The video is first set to a random time. Then we 
   * play, then wait a bit then use the tts. We delay due to some buffering.
   */
  async function startScreenReader(textToRead: string) {
    if (!youtubeRef.current) return 
    seekVideoToRandomTime(youtubeRef.current, 300, 3600)
    await delay(500)
    playVideoPlayer(youtubeRef.current)
    await delay(500)
    chrome.tts.speak(textToRead, { onEvent: (event) => ttsEventHandler(event, textToRead) });
  }


  /**
   * Pauses the screen reader and the YouTube video player.
   */
  function pauseScreenReader() {
    if (!youtubeRef.current) return 
    pauseVideoPlayer(youtubeRef.current)
    chrome.tts.pause();
  }

  /**
   * Resumes the screen reader. First play the video, (wait a bit cus it buffers)
   * then resume the tts.
   * 
   */
  async function resumeScreenReader() {
    if (!youtubeRef.current) return 
    playVideoPlayer(youtubeRef.current)
    await delay(500)
    chrome.tts.resume();
  }

  function stopScreenReader() {
    chrome.tts.stop();
  }

  /**
   * Reset input text when trash button pressed.
   */
  function handleClearText() {
    setInputText("")
  }

  /**
   * Stops the text-to-speech (TTS) engine.
   *
   */
  function handleStop() {
    stopScreenReader()
  }

  /**
   * Handles the play/pause functionality.
   * 
   * @returns A promise that resolves when the play/pause actions are completed.
   */
  async function handlePlayPause() {
    if (isPlaying) {
      pauseScreenReader()
    } else {
      if (!hasStarted) {
        startScreenReader(inputText)
      } else {
        resumeScreenReader()
      }
    }
  }

  // Use effect hooks

  // On initial render
  useEffect(() => {
    // Setup sidepanel port. keep it open by regularly sending messages
    const port = chrome.runtime.connect({ name: 'mySidepanel' });
    const intervalId = setInterval(() => {
      port.postMessage({ info: "keeping connection open" });
    }, 1000);
    console.log("sidepanel port opened - from sidepanel")
    port.onDisconnect.addListener(() => {
      clearInterval(intervalId)
      console.log("sidepanel port closed - from sidepanel")
    })

    // On message 
    port.onMessage.addListener(async (message) => {
      stopScreenReader()
      if (!message.text) return
      await delay(800) // The loading is artificial 🤭.
      const textToRead = cleanUpText(message.text)
      setInputText(textToRead)
      startScreenReader(textToRead)
    })

    return () => {
      clearInterval(intervalId);
      port.disconnect();
    }
  }, [])

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
            id="clear-text"
            onClick={handleClearText}
            disabled={isPlaying || hasStarted}
          >
            <FaTrash />
          </button>
          <button 
            id="play-pause" 
            onClick={handlePlayPause}
          >
            {isPlaying ? <FaPause />: <FaPlay /> }
          </button>
          <button 
            id="stop" 
            disabled={!hasStarted}
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