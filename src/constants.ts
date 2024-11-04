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
        name: "family guy funny moments",
        url: "https://www.youtube.com/embed/rf9bO6dqVXI"
    },
    {
        index: 3,
        name: "lofi hip hop",
        url: "https://www.youtube.com/watch?v=l98w9OSKVNA"
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
    muteVideo: true
}

export const VIDEO_START_OPTIONS = [
    "beginning",
    "timestamp",
    "random"
] as const