import { MdDragHandle } from "react-icons/md";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import styles from "./MainPage.module.css";
import { FaPause, FaPlay, FaStop, FaTrash } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { pauseVideoPlayer, playVideoPlayer, seekVideoToRandomTime, stopVideoPlayer } from "@/utils/youtubeHelpers";
import { cleanUpText, delay } from "@/utils/utils";
import logo from "@/assets/genz-screenreader-logo.png"
import Header from "@/components/Header/Header";
import Button from "@/components/Button/Button";
import CustomTextarea from "@/components/CustomTextarea/CustomTextarea";
import Youtube from "@/components/Youtube/Youtube";
import { ExtensionOptions } from "@/types/options";
import { FaCog } from "react-icons/fa";


const placeholderText = "\
Either: \n\
  right click > click 'Read website'\n\
or\n\
  select text > right click > click 'Read selection'\n\
or\n\
  copy and paste content here\n\
"

interface MainPageProps {
  setPage: CallableFunction,
  options: ExtensionOptions,
  inputText: string,
  setInputText: CallableFunction
}

const MainPage = (
  {
    setPage,
    inputText,
    setInputText,
    options
  }
  : MainPageProps
) => {
  // States
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [hasStarted, setHasStarted] = useState<boolean>(false)
  const [currentWord, setCurrentWord] = useState<string>("")
  const [highlightPos, setHiglightPos] = useState<[number, number]|null>(null)

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
        setHiglightPos([event.charIndex, event.charIndex + event.length])
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
        setHiglightPos(null)
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
    port.onDisconnect.addListener(() => {
      clearInterval(intervalId)
    })

    interface message {
      text: string
    }
    async function loadScreenReader(message: message) {
      stopScreenReader()
      if (!message.text) return
      setIsLoading(true)
      await delay(800) // The loading is artificial 🤭.
      const textToRead = cleanUpText(message.text)
      setInputText(textToRead)
      startScreenReader(textToRead)
      setIsLoading(false)
    }

    // On message from background (selection text)
    port.onMessage.addListener(loadScreenReader)

    // on message from script being executed in activeTab
    chrome.runtime.onMessage.addListener(loadScreenReader)

    return () => {
      clearInterval(intervalId);
      port.disconnect();
    }
  }, [])

  return (
    <PanelGroup className={styles.container} direction="vertical" autoSaveId="persistence">
      {isLoading ? <div className={styles.loader}></div> : null}
      <Panel maxSize={75} className={styles.upperPanel}>
        <Header>
          <img src={logo} />
          <span>Subway Surfers Screen Reader</span>
        </Header>
        <CustomTextarea
          highlightMode={hasStarted}
          highlightRange={highlightPos}
          inputText={inputText}
          setInputText={setInputText}
          placeholder={placeholderText}
        />

        <div className={styles.buttonContainer} >
          <Button
            onClick={handleClearText}
            disabled={isPlaying || hasStarted}
          >
            <FaTrash />
          </Button>
          <Button
            onClick={handlePlayPause}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </Button>
          <Button
            disabled={!hasStarted}
            onClick={handleStop}
          >
            <FaStop />
          </Button>
          <Button
            onClick={() => setPage("options")}>
            <FaCog />
          </Button>

        </div>

      </Panel>
      <PanelResizeHandle className={styles.resizeHandle}>
        <MdDragHandle />
      </PanelResizeHandle>
      <Panel defaultSize={70}>
        <div className={styles.lowerPanel}>
          <Youtube videoUrl={options.videos[options.selectedVideo].url} ref={youtubeRef} />
          <div className={styles.overlay}>
            {isPlaying ? <p>{currentWord}</p> : null}
          </div>
        </div>
      </Panel>
    </PanelGroup>
  );
}

export default MainPage;