import { ExtensionOptions, VideoInfo } from "./types/options";

// Disable preserve user videos in OptionsPage.tsx
export const DEFAULT_VIDEOS: VideoInfo[] = [
    {
        index: 0,
        name: "minecraft parkour",
        url: "https://www.youtube.com/watch?v=bBOBn1Jx5BY"
    },
    {
        index: 1,
        name: "subway surfers",
        url: "https://www.youtube.com/watch?v=MTLM8wgscaM"
    },
    {
        index: 2,
        name: "subway surfers 2",
        url: "https://www.youtube.com/watch?v=BkWT66jE8Hs"
    },
    {
        index: 3,
        name: "satisfying videos",
        url: "https://www.youtube.com/watch?v=WA6ePGoJ6Mk&t=6s"
    },
    {
        index: 4,
        name: "happy monkey circle",
        url: "https://www.youtube.com/watch?v=4-UbHw8eDzM"
    }
]

export const DEFAULT_OPTIONS: ExtensionOptions = {
    selectedVideo: 0,
    videos: DEFAULT_VIDEOS,
    videoStart: "beginning",
    startTime: 240,
    randomRange: [0, 3600],
}

export const VIDEO_START_OPTIONS = [
    "beginning",
    "timestamp",
    "random"
] as const