import { VIDEO_START_OPTIONS } from "@/constants"

export type VideoStartOptions = typeof VIDEO_START_OPTIONS[number]
export interface ExtensionOptions {
    selectedVideo: number,
    videos: VideoInfo[],
    videoStart: VideoStartOptions,
    startTime: number,
    randomRange: [number, number],
    muteVideo: boolean
  }
  
export interface VideoInfo {
  index: number,
  name: string,
  url: string
}