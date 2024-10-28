/**
 * @file Handles logic to control youtube iframe.
 * 
 * @remark It's better to use the youtube iframe api. However when I tried using
 * it in the chrome extension, I got this content security policy error:
 * ```bash
 *   Refused to load the script 'https://www.youtube.com/iframe_api' because it violates
 *   the following Content Security Policy directive: "script-src 'self'".
 * ```
 * 
 */


interface MessageType {
    event: string,
    func: string
}

/**
 * Sends a message to the specified video player iframe.
 *
 * @param videoPlayer - The HTML iframe element of the video player.
 * @param message - The message to be sent to the video player.
 */
function postMessageToVideo(videoPlayer: HTMLIFrameElement , message: MessageType) {
	if (!videoPlayer.contentWindow) return 
    videoPlayer.contentWindow.postMessage(JSON.stringify(message), "*");
}

/**
 * Pauses the YouTube video player embedded in an iframe.
 *
 * @param videoPlayer - The HTMLIFrameElement containing the YouTube video player.
 */
export function pauseVideoPlayer(videoPlayer: HTMLIFrameElement) {

	postMessageToVideo(videoPlayer,
		{
			event: 'command',
			func: 'pauseVideo'
		}
	);
}

/**
 * Sends a message to the provided YouTube video player iframe to play the video.
 *
 * @param videoPlayer - The HTML iframe element of the YouTube video player.
 */
export function playVideoPlayer(videoPlayer: HTMLIFrameElement) {
	postMessageToVideo(videoPlayer,
		{
			event: 'command',
			func: 'playVideo'
		}
	);
}

/**
 * Stops the YouTube video player by sending a 'stopVideo' command.
 *
 * @param videoPlayer - The HTML iframe element of the YouTube video player.
 */
export function stopVideoPlayer(videoPlayer: HTMLIFrameElement) {
	postMessageToVideo(videoPlayer,
		{
			event: 'command',
			func: 'stopVideo'
		}
	);
}

/**
 * Seeks the video player to a specified time.
 * 
 * @remark Can't check if we are seeking to the end of video here :(
 *
 * @param videoPlayer - The HTMLIFrameElement representing the video player.
 * @param time - The time in seconds to seek the video to.
 */
export function seekVideoPlayer(videoPlayer: HTMLIFrameElement, time: number) {
    // Parse the original URL
    const url = new URL(videoPlayer.src);
    // Set new start parameter
    url.searchParams.set('start', time.toString());
    videoPlayer.src = url.toString();
}


/**
 * Seeks the given video player to a random time within the specified range.
 *
 * @param videoPlayer - The HTMLIFrameElement representing the video player.
 * @param minTime - The minimum time (in seconds) to seek to. Defaults to 0.
 * @param maxTime - The maximum time (in seconds) to seek to. Defaults to 3600.
 */
export function seekVideoToRandomTime(videoPlayer: HTMLIFrameElement, minTime = 0, maxTime = 3600) {
    // Generate random start time within specified range
    const randomStart = Math.floor(Math.random() * (maxTime - minTime)) + minTime;
	seekVideoPlayer(videoPlayer, randomStart)
}
