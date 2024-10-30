import { ExtensionOptions } from "./types/options";

export const DEFAULT_OPTIONS: ExtensionOptions = {
    selectedVideo: 0,
    videos: [
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
    ],
    startTime: 240,
    duration: 3600,
    randomStart: true
}