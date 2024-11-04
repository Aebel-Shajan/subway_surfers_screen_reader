import { useEffect, useState } from "react";
import MainPage from "./MainPage/MainPage";
import { DEFAULT_OPTIONS } from "@/constants";
import { ExtensionOptions } from "@/types/options";
import OptionsPage from "./OptionsPage/OptionsPage";

const SidePanel = () => {
  // States
  const [page, setPage] = useState<string>("main")
  const [options, setOptions] = useState<ExtensionOptions>(DEFAULT_OPTIONS)
  const [inputText, setInputText] = useState<string>("")

  // Use effect hooks
  // On initial render
  useEffect(() => {
    chrome.storage.sync.get(['options'], function (data) {
      if (data.options) {
        const newOptions: ExtensionOptions = { ...data.options }
        // I LOVE JAVASCRITP
        // Just in case options are whack
        setOptions({
          selectedVideo: newOptions.selectedVideo ? newOptions.selectedVideo : DEFAULT_OPTIONS.selectedVideo,
          startTime: newOptions.startTime ? newOptions.startTime : DEFAULT_OPTIONS.startTime,
          videoStart: newOptions.videoStart ? newOptions.videoStart : DEFAULT_OPTIONS.videoStart,
          randomRange: newOptions.randomRange ? newOptions.randomRange : DEFAULT_OPTIONS.randomRange,
          videos: newOptions.videos ? newOptions.videos : DEFAULT_OPTIONS.videos,
          muteVideo: newOptions.muteVideo ? newOptions.muteVideo : DEFAULT_OPTIONS.muteVideo
        })
      }
    })
  }, [])

  // On options change
  useEffect(() => {
    chrome.storage.sync.set({ options })
  }, [options])


  // JSX
  if (page === "options") {
    return <OptionsPage setPage={setPage} setOptions={setOptions} options={options} />
  }
  return <MainPage
    setPage={setPage}
    options={options}
    inputText={inputText}
    setInputText={setInputText}
  />
}

export default SidePanel;