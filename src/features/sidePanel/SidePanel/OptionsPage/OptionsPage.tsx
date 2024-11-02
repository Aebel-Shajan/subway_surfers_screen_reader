import Header from "@/components/Header/Header";
import styles from "./OptionsPage.module.css"
import Button from "@/components/Button/Button";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useState } from "react";
import { ExtensionOptions, VideoInfo, VideoStartOptions } from "@/types/options";
import { DEFAULT_OPTIONS, VIDEO_START_OPTIONS } from "@/constants";
import { useDisclosure } from "@mantine/hooks";
import { CloseButton, Modal, Select } from "@mantine/core";
import VideoSelect from "./VideoSelect/VideoSelect";
import { TimeInput } from "@mantine/dates";
import { secondsToTimeString, timeStringToSeconds } from "@/utils/utils";
import PromoSection from "@/components/PromoSection/PromoSection";

interface OptionsPageProps {
  setPage: CallableFunction,
  options: ExtensionOptions,
  setOptions: CallableFunction
}
const OptionsPage = ({ setPage, options, setOptions }: OptionsPageProps) => {
  // States
  const [selectedVideo, setSelectedVideo] = useState<number>(options.selectedVideo)
  const [videoStart, setVideoStart] = useState<VideoStartOptions>(options.videoStart)
  const [startTime, setStartTime] = useState<number>(options.startTime)
  const [randomRange, setRandomRange] = useState<[number, number]>(options.randomRange)

  // Mantine Hooks
  const [videoSelectOpened, videoSelectHandler] = useDisclosure(false)

  // Functions
  function handleSelectVideo(value: string | null) {
    if (!value) return
    setSelectedVideo(Number(value))
    const newOptions = { ...options }
    newOptions.selectedVideo = Number(value)
    setOptions(newOptions)
  }

  function handleSelectVideoStart(value: string| null) {
    if (!value) return 
    setVideoStart(value as VideoStartOptions)
    const newOptions = { ...options }
    newOptions.videoStart = value as VideoStartOptions
    setOptions(newOptions)
  }

  function handleChangeStartTime(event: React.ChangeEvent<HTMLInputElement>) {
    const newStartTime = timeStringToSeconds(event.target.value, "hh:mm")
    setStartTime(newStartTime)
    const newOptions = {...options}
    newOptions.startTime = newStartTime
    setOptions(newOptions)
  }

  function handleChangeRangeStart(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = timeStringToSeconds(event.target.value, "hh:mm")
    setRandomRange(oldRange => {
      const newRange = oldRange
      newRange[0] = newValue
      const newOptions = {...options}
      newOptions.randomRange = newRange
      setOptions(newOptions)
      return oldRange
    })
  }
  function handleChangeRangeEnd(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = timeStringToSeconds(event.target.value, "hh:mm")
    setRandomRange(oldRange => {
      const newRange = oldRange
      newRange[1] = newValue
      const newOptions = {...options}
      newOptions.randomRange = newRange
      setOptions(newOptions)
      return oldRange
    })
  }


  function handleResetToDefault() {
    setSelectedVideo(DEFAULT_OPTIONS.selectedVideo)
    setVideoStart(DEFAULT_OPTIONS.videoStart)
    setStartTime(DEFAULT_OPTIONS.startTime)
    setRandomRange(DEFAULT_OPTIONS.randomRange)

    // Preserve user vids
    const newOptions = { ...DEFAULT_OPTIONS }
    newOptions.videos = options.videos
    setOptions(newOptions)
  }

  function setVideos(newVideos: VideoInfo[]) {
    const newOptions = { ...options }
    newOptions.videos = newVideos
    setOptions(newOptions)
  }

  const videoStartConfig = () => {
    switch (videoStart) {
      default:
      case "beginning":
        return
        break
      case "timestamp":
        return (
          <TimeInput
            label="timestamp:"
            description="hh:mm"
            value={secondsToTimeString(startTime, "hh:mm")}
            onChange={handleChangeStartTime}
            rightSection={
              <CloseButton onClick={() => setStartTime(0)}/>}
          />
        )
      case "random":
        return (<>
          <TimeInput
            label="from:"
            description="hh:mm"
            value={secondsToTimeString(randomRange[0], "hh:mm")}
            onChange={handleChangeRangeStart} />
          <TimeInput
            label="to:"
            description="hh:mm"
            value={secondsToTimeString(randomRange[1], "hh:mm")}
            onChange={handleChangeRangeEnd} />
        </>)
    }
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
      <h3>Options</h3>
        <Select
          label="Set background video"
          value={String(selectedVideo)}
          onChange={handleSelectVideo}
          data={options.videos.map((vid) => {
            return { label: vid.name, value: String(vid.index) }
          })}
          allowDeselect={false}
        />

        <Modal 
          opened={videoSelectOpened} 
          onClose={videoSelectHandler.close} 
          title="Select a video"
        >
          <VideoSelect 
            videos={options.videos} 
            setVideos={setVideos}
            handleSelectVideo={handleSelectVideo}
            selectedVideo={selectedVideo}
          />
        </Modal>

        <Button onClick={videoSelectHandler.open}>
          Add new video
        </Button>

        <Select
          label="Start the video from: "
          value={videoStart}
          onChange={handleSelectVideoStart}
          data={VIDEO_START_OPTIONS}
          allowDeselect={false}
        />
        {videoStartConfig()}

        <Button 
          onClick={handleResetToDefault}
          style={{border: "3px solid black"}}
        >
          Reset to default
        </Button>

        <hr />
        <PromoSection/>
      </div>
    </div>
  );
}

export default OptionsPage;