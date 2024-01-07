export async function sendMessageToActiveTab(message) {
	const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
	const response = await chrome.tabs.sendMessage(tab.id, { ...message, sender: "side-panel" });
	return response
}
export function setButtonState(button, state) {
	button.className = state;
	switch (state) {
		case "play":
			button.textContent = "▶️";
			break
		case"pause":
			 button.textContent = "⏸️";
			break
		default:
			button.textContent = state.charAt(0).toUpperCase() + state.slice(1);
			break;
	}
	return button
}

// tts export functions
export function getWordPosition(str, charPos) {
	let startPos = 0;
	// Split the string into words
	const words = str.split(/ |\n/);
	// Iterate over the words
	for (let i = 0; i < words.length; i++) {
		const word = words[i];
		const endPos = startPos + word.length;
		// Check if the charPos is within the current word
		if (startPos <= charPos && charPos <= endPos) {
			return { startPos, endPos };
		}
		// Move to the next word
		// Add 1 to account for the space after each word
		startPos = endPos + 1;
	}
	// If no word is found, return null
	return null;
}
export function cleanUpText(text) {
	if (text.length >= 30000) {
		text = text.slice(0, 30000) // max lenght that tts allows
	}
	return text
		// remove spaces before and after
		.trim()
		// remove spaces between new lines
		.replace(/ +\n/g, '\n')
		// condense multiple new lines into two
		.replace(/\n+/g, '\n\n')
		// add space to end of sentences
		.replace(/(?<=[A-Za-z0-9])\.(?=[A-Z])/g, '. ');
}


// Video player functions
export function postMessageToVideo(videoPlayer, message) {
	videoPlayer.contentWindow.postMessage(JSON.stringify(message), "*");
}
export function pauseVideoPlayer(videoPlayer) {
	postMessageToVideo(videoPlayer,
		{
			event: 'command',
			func: 'pauseVideo'
		}
	);
}
export function playVideoPlayer(videoPlayer) {
	postMessageToVideo(videoPlayer,
		{
			event: 'command',
			func: 'playVideo'
		}
	);
}
export function stopVideoPlayer(videoPlayer) {
	postMessageToVideo(videoPlayer,
		{
			event: 'command',
			func: 'stopVideo',
			args: ""
		}
	);
}
export function seekVideoToRandomTime(videoPlayer) {
	const randomTime = 0; //MATH.floor(MATH.random() * 60 * 60);
	postMessageToVideo(videoPlayer, {
		event: 'command',
		func: 'seekTo',
		args: [randomTime, true] // [time in seconds, allowSeekAhead]// doesnt work owie // maybe theyre promises :0
	})
	return videoPlayer
}