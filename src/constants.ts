import { ExtensionOptions, VideoInfo } from "./types/options";

export const DEFAULT_VIDEOS: VideoInfo[] = [
    {
        index: 0,
        name: "subway surfers",
        url: "https://www.youtube.com/watch?v=BkWT66jE8Hs"
    },
    {
        index: 1,
        name: "minecraft parkour",
        url: "https://www.youtube.com/watch?v=bBOBn1Jx5BY"
    }
]

export const DEFAULT_OPTIONS: ExtensionOptions = {
    selectedVideo: 0,
    videos: DEFAULT_VIDEOS,
    startTime: 240,
    randomRange: 3600,
    randomStart: true
}
