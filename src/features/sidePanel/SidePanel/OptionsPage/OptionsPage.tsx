import Header from "@/components/Header/Header";
import styles from "./OptionsPage.module.css"
import Button from "@/components/Button/Button";
import { IoMdArrowRoundBack } from "react-icons/io";
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import { ChangeEvent, useState } from "react";
import { ExtensionOptions, VideoInfo } from "@/types/options";
import { DEFAULT_OPTIONS } from "@/constants";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import VideoSelect from "./VideoSelect/VideoSelect";

interface OptionsPageProps {
  setPage: CallableFunction,
  options: ExtensionOptions,
  setOptions: CallableFunction
}
const OptionsPage = ({setPage, options, setOptions}: OptionsPageProps) => {
  // States
  const [selectedVideo, setSelectedVideo] = useState<number>(options.selectedVideo)
  const [randomStart, setRandomStart] = useState<boolean>(options.randomStart)
  const [startTime, setStartTime] = useState<number>(options.startTime)
  const [duration, setDuration] = useState<number>(options.duration)

  // Mantine Hooks
  const [videoSelectOpened, videoSelectHandler] = useDisclosure(false)
  
  // Functions
  function handleSelectVideo(videoIndex: number) {
    setSelectedVideo(videoIndex)
    const newOptions = {...options}
    newOptions.selectedVideo = videoIndex
    setOptions(newOptions)
  } 

  function handleCheckRandomStart() {
    setRandomStart(oldValue => !oldValue)
    const newOptions = {...options}
    newOptions.randomStart = !randomStart
    setOptions(newOptions)
  }
  
  function handleChangeStartTime(event: ChangeEvent<HTMLInputElement>) {
    const newTime = Number(event.target.value)
    setStartTime(newTime)
  }

  function handleStartTimePicked() {
    const newOptions = {...options}
    newOptions.startTime = startTime
    setOptions(newOptions)
  }

  function handleChangeDuration(event: ChangeEvent<HTMLInputElement>) {
    const newTime = Number(event.target.value)
    setDuration(newTime)
    const newOptions = {...options}
    newOptions.duration = newTime
    setOptions(newOptions)
    if (newTime < startTime) {
      setStartTime(newTime)
    }
  }

  function handleResetToDefault() {
    setSelectedVideo(DEFAULT_OPTIONS.selectedVideo)
    setStartTime(DEFAULT_OPTIONS.startTime)
    setDuration(DEFAULT_OPTIONS.duration)
    setRandomStart(DEFAULT_OPTIONS.randomStart)
    setOptions(DEFAULT_OPTIONS)
  }

  function setVideos(newVideos: VideoInfo[]) {
    const newOptions = {...options}
    newOptions.videos = newVideos
    setOptions(newOptions)
  }

  return ( 
    <div className={styles.container}>
      <Header>
        <Button
          onClick={() => setPage("main")}
        >
          <IoMdArrowRoundBack />
        </Button>
          <span>Options</span>
      </Header>
      <div className={styles.optionsContainer}>
        <CustomSelect
          label="Set background video"
          selected={selectedVideo}
          setSelected={handleSelectVideo}
          options={options.videos}
        />
        <div>
          <label>Start offset time: {startTime}s</label>
          <input 
            type="range" 
            min="0" 
            max={duration}
            value={startTime}
            onChange={handleChangeStartTime} 
            onMouseUp={handleStartTimePicked}
            onTouchEnd={handleStartTimePicked}
          />
        </div>
        <div>
          <label>Duration of the video</label>
          <input 
            type="number" 
            min="0" 
            max={7200}
            value={duration}
            onChange={handleChangeDuration}
            />
        </div>
        <div onClick={handleCheckRandomStart}>
          <label >Start at random time</label>
          <input type="checkbox" checked={randomStart}/>
        </div>

        <Modal opened={videoSelectOpened} onClose={videoSelectHandler.close} title="Select a video">
          <VideoSelect videos={options.videos} setVideos={setVideos}/>
        </Modal>

        <Button onClick={videoSelectHandler.open}>
          Add new video
        </Button>

        <Button onClick={handleResetToDefault}>
          Reset to default
        </Button>
      </div>
    </div>
  );
}

export default OptionsPage;