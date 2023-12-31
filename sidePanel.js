// DOM Element Selectors
const elements = {
	readButton: document.querySelector("#read-website"),
	playPause: document.querySelector("#play-pause-toggle"),
	stop: document.querySelector("#stop"),
	videoPlayer: document.querySelector("#video"),
	previewText: document.querySelector("#preview-text"),
	textOverlay: document.querySelector("#text-overlay"),
};
async function sendMessageToActiveTab(message) {
	const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
	const response = await chrome.tabs.sendMessage(tab.id, { ...message, sender: "side-panel" });
	return response
}
function setButtonState(button, state) {
	button.className = state;
	button.textContent = state.charAt(0).toUpperCase() + state.slice(1);
	return button
}

// tts functions
function getWordAtIndex(text, index) {
	let words = text.split(/ |\n/);
	let accumulatedLength = 0;
	for (let i = 0; i < words.length; i++) {
		accumulatedLength += words[i].length;
		// Add 1 for the space character
		if (i !== words.length - 1) {
			accumulatedLength += 1;
		}
		if (index < accumulatedLength) {
			return words[i];
		}
	}
	return null;
}
function cleanUpText(text) {
	if (text.length > 32768) {
		text = text.slice(0, 32768) // max lenght that tts allows
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
function ttsEventHandler(event, words) {
	console.log('Event ' + event.type + ' at position ' + event.charIndex);
	elements.textOverlay.innerText = getWordAtIndex(words, event.charIndex);
	switch (event.type) {
		case "start":
			elements.previewText.setAttribute("disabled", "disabled");
			elements.readButton.setAttribute("disabled", "disabled");
			break;
		case "end":
		case "interrupted":
			elements.previewText.removeAttribute("disabled");
			elements.readButton.removeAttribute("disabled");
			elements.playPause = setButtonState(elements.playPause, "play");
			stopVideoPlayer(elements.videoPlayer);
			break;
		default:
			break;
	}
}

// Video player functions
function postMessageToVideo(videoPlayer, message) {
	videoPlayer.contentWindow.postMessage(JSON.stringify(message), "*");
}
function pauseVideoPlayer(videoPlayer) {
	postMessageToVideo(videoPlayer,
		{
			event: 'command',
			func: 'pauseVideo'
		}
	);
}
function playVideoPlayer(videoPlayer) {
	postMessageToVideo(videoPlayer,
		{
			event: 'command',
			func: 'playVideo'
		}
	);
}
function stopVideoPlayer(videoPlayer) {
	postMessageToVideo(videoPlayer,
		{
			event: 'command',
			func: 'stopVideo',
			args: ""
		}
	);
}
function seekVideoToRandomTime(videoPlayer) {
	const randomTime = 0; //MATH.floor(MATH.random() * 60 * 60);
	postMessageToVideo(videoPlayer, {
		event: 'command',
		func: 'seekTo',
		args: [randomTime, true] // [time in seconds, allowSeekAhead]// doesnt work owie // maybe theyre promises :0
	})
	return videoPlayer
}

// Event listeners
elements.playPause.addEventListener("click", async () => {
	const isSpeaking = await chrome.tts.isSpeaking();
	if (isSpeaking) {
		if (elements.playPause.className === "play") {
			elements.playPause = setButtonState(elements.playPause, "pause")
			chrome.tts.resume();
			playVideoPlayer(elements.videoPlayer);
		} else {
			elements.playPause = setButtonState(elements.playPause, "play")
			chrome.tts.pause();
			pauseVideoPlayer(elements.videoPlayer);
		}
	} else {
		chrome.tts.stop();
		elements.videoPlayer = seekVideoToRandomTime(elements.videoPlayer);
		elements.playPause = setButtonState(elements.playPause, "pause");
		let words = elements.previewText.value;
		chrome.tts.speak(words, {onEvent: (event) => {
			ttsEventHandler(event, words)
		}})
	}
});

elements.stop.addEventListener("click", () => {
	chrome.tts.stop();
	elements.playPause = setButtonState(elements.playPause, "play");
	stopVideoPlayer(elements.videoPlayer);
})

elements.readButton.addEventListener('click', async () => {
	try {
		const response = await sendMessageToActiveTab({ action: "read-website" });
		console.log("Response message: ", response);
		const scrapedContent = response.content;
		elements.previewText.value = cleanUpText(scrapedContent.textContent);
	} catch (error) {
		elements.previewText.value = ":( no worky, sorry. Try refreshing the current page and press read website again";
		console.log('An error occurred:', error);
	}

})