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
    videoStart: "timestamp",
    startTime: 240,
    randomRange: [0, 3600],
}

export const VIDEO_START_OPTIONS = [
    "beginning",
    "timestamp",
    "random"
] as const