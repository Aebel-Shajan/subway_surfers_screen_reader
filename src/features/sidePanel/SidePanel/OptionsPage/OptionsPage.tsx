import Header from "@/components/Header/Header";
import styles from "./OptionsPage.module.css"
import Button from "@/components/Button/Button";
import { IoMdArrowRoundBack } from "react-icons/io";
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import { DEFAULT_OPTIONS } from "@/constants";
import { useState } from "react";
import { ExtensionOptions } from "@/types/options";

interface OptionsPageProps {
  setPage: CallableFunction,
  options: ExtensionOptions,
  setOptions: CallableFunction
}
const OptionsPage = ({setPage, options, setOptions}: OptionsPageProps) => {
  const [selectedVideo, setSelectedVideo] = useState<number>(options.selectedVideo)

  function handleVideoSelect(videoIndex: number) {
    setSelectedVideo(videoIndex)
    const newOptions = {...options}
    newOptions.selectedVideo = videoIndex
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
          setSelected={handleVideoSelect}
          options={DEFAULT_OPTIONS.videos}
        />
      </div>
    </div>
  );
}

export default OptionsPage;