export interface ExtensionOptions {
    selectedVideo: number,
    videos: VideoInfo[],
    startTime: number,
    endTime: number,
    randomTime: boolean
  }
  
export interface VideoInfo {
  index: number,
  name: string,
  url: string
}