import Header from "@/components/Header/Header";
import styles from "./OptionsPage.module.css"
import Button from "@/components/Button/Button";
import { IoMdArrowRoundBack } from "react-icons/io";
import { ChangeEvent, useState } from "react";
import { ExtensionOptions, VideoInfo, VideoStartOptions } from "@/types/options";
import { DEFAULT_OPTIONS, VIDEO_START_OPTIONS } from "@/constants";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Select } from "@mantine/core";
import VideoSelect from "./VideoSelect/VideoSelect";


interface OptionsPageProps {
  setPage: CallableFunction,
  options: ExtensionOptions,
  setOptions: CallableFunction
}
const OptionsPage = ({setPage, options, setOptions}: OptionsPageProps) => {
  // States
  const [selectedVideo, setSelectedVideo] = useState<number>(options.selectedVideo)
  const [videoStart, setVideoStart] = useState<VideoStartOptions>(options.videoStart)
  const [startTime, setStartTime] = useState<number>(options.startTime)
  const [, setRandomRange] = useState<[number, number]>(options.randomRange)

  // Mantine Hooks
  const [videoSelectOpened, videoSelectHandler] = useDisclosure(false)
  
  // Functions
  function handleSelectVideo(value: string|null) {
    if (!value) return
    setSelectedVideo(Number(value))
    const newOptions = {...options}
    newOptions.selectedVideo = Number(value)
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


  function handleResetToDefault() {
    setSelectedVideo(DEFAULT_OPTIONS.selectedVideo)
    setVideoStart(DEFAULT_OPTIONS.videoStart)
    setStartTime(DEFAULT_OPTIONS.startTime)
    setRandomRange(DEFAULT_OPTIONS.randomRange)

    // Preserve user vids
    const newOptions = {...DEFAULT_OPTIONS}
    newOptions.videos = options.videos
    setOptions(newOptions)
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
        <Select
          label="Set background video"
          value={String(selectedVideo)}
          onChange={handleSelectVideo}
          data={options.videos.map((vid) => {
            return {label: vid.name, value: String(vid.index)}
          })}
          allowDeselect={false}
        />
        <Select 
          label="Start the video from: "
          value={videoStart}
          onChange={(value) => setVideoStart(value as VideoStartOptions)}
          data={VIDEO_START_OPTIONS}
        />

        <div>
          <label>Start offset time: {startTime}s</label>
          <input 
            type="range" 
            min="0" 
            max="3600"
            value={startTime}
            onChange={handleChangeStartTime} 
            onMouseUp={handleStartTimePicked}
            onTouchEnd={handleStartTimePicked}
          />
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