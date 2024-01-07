// DOM Element Selectors
const elements = {
	clearContents: document.querySelector("#clear-contents"),
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

// tts functions
function getWordPosition(str, charPos) {
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
function cleanUpText(text) {
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
function ttsEventHandler(event, words) {
	// console.log(`Event ${event.type} at position ${event.charIndex}`);
	switch (event.type) {
		case "start":
			elements.previewText.setAttribute("disabled", "disabled");
			elements.clearContents.setAttribute("disabled", "disabled");
			break;
		case "word":
			const pos = getWordPosition(words, event.charIndex);
			if (pos) {
				const focusedWord = words.slice(pos.startPos, pos.endPos);
				elements.textOverlay.innerText = focusedWord;
				// Temporarily enable the textarea
				elements.previewText.removeAttribute("disabled");
				// move to start pos
				elements.previewText.selectionStart = elements.previewText.selectionEnd = pos.startPos;
				elements.previewText.blur();
				elements.previewText.focus();
				// select word
				elements.previewText.setSelectionRange(pos.startPos, pos.endPos);
				elements.previewText.focus();
				// Disable the textarea again
				elements.previewText.setAttribute("disabled", "disabled");
			}
			break;
		case "end":
		case "interrupted":
		case "error":
			elements.previewText.removeAttribute("disabled");
			elements.clearContents.removeAttribute("disabled");
			elements.playPause = setButtonState(elements.playPause, "play");
			elements.textOverlay.innerHTML = '<a href="https://www.youtube.com/watch?v=BkWT66jE8Hs" target="_blank">Youtube source</a>';
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
window.onload = () => {
	chrome.tts.stop();
	chrome.runtime.connect({ name: 'mySidepanel' });
}
elements.clearContents.addEventListener("click", ()=>{
	elements.previewText.value = "";
})
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
		chrome.tts.speak(words, {
			onEvent: (event) => {
				ttsEventHandler(event, words)
			}
		})
	}
});

elements.stop.addEventListener("click", () => {
	chrome.tts.stop();
	elements.playPause = setButtonState(elements.playPause, "play");
	stopVideoPlayer(elements.videoPlayer);
})


chrome.runtime.onMessage.addListener(
	(message, sender, sendResponse) => {
	chrome.tts.stop();
	elements.playPause = setButtonState(elements.playPause, "play");
	stopVideoPlayer(elements.videoPlayer);
	try {
		elements.previewText.value = cleanUpText(message.scrapedContent.textContent);
	} catch (error) {
		elements.previewText.value = ":( no worky, sorry. Try refreshing the current page and press read website again";
	}
})