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
        const options: ExtensionOptions = { ...data.options }
        setOptions(options)
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