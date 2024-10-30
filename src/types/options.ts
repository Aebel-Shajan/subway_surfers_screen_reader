export interface ExtensionOptions {
    selectedVideo: number,
    videos: VideoInfo[],
    startTime: number,
    duration: number,
    randomStart: boolean
  }
  
export interface VideoInfo {
  index: number,
  name: string,
  url: string
}