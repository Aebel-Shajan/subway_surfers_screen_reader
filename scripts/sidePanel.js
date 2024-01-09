import * as utils from "./utils.js"
import addLogicToResizer from "./resizer.js"

// DOM Element Selectors
const elements = {
	clearContents: document.querySelector("#clear-contents"),
	playPause: document.querySelector("#play-pause-toggle"),
	stop: document.querySelector("#stop"),
	videoPlayer: document.querySelector("#video"),
	previewText: document.querySelector("#preview-text"),
	textOverlay: document.querySelector("#text-overlay"),
	resizer: document.querySelector(".resizer")
};

function ttsEventHandler(event, words) {
	// console.log(`Event ${event.type} at position ${event.charIndex}`);
	switch (event.type) {
		case "start":
			elements.previewText.setAttribute("disabled", "disabled");
			elements.clearContents.setAttribute("disabled", "disabled");
			break;
		case "word":
			const pos = utils.getWordPosition(words, event.charIndex);
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
			elements.playPause = utils.setButtonState(elements.playPause, "play");
			elements.textOverlay.innerHTML = '<a href="https://www.youtube.com/watch?v=BkWT66jE8Hs" target="_blank">Youtube source</a>';
			utils.stopVideoPlayer(elements.videoPlayer);
			break;
		default:
			break;
	}
}

function startScreenReader() {
	elements.playPause = utils.setButtonState(elements.playPause, "pause");
	let words = elements.previewText.value;
	chrome.tts.speak(words, {
		onEvent: (event) => {
			ttsEventHandler(event, words)
		}
	});
	utils.playVideoPlayer(elements.videoPlayer);
}

function resumeScreenReader() {
	elements.playPause = utils.setButtonState(elements.playPause, "pause")
	chrome.tts.resume();
	utils.playVideoPlayer(elements.videoPlayer);
}

function pauseScreenReader() {
	elements.playPause = utils.setButtonState(elements.playPause, "play")
	chrome.tts.pause();
	utils.pauseVideoPlayer(elements.videoPlayer);
}

function stopScreenReader() {
	chrome.tts.stop();
	elements.playPause = utils.setButtonState(elements.playPause, "play");
	utils.stopVideoPlayer(elements.videoPlayer);
}


// Event listeners
window.onload = () => {
	const port = chrome.runtime.connect({ name: 'mySidepanel' });
	setInterval(()=> {
		port.postMessage({info: "keeping connection open"});
	}, 5000)
}

elements.clearContents.addEventListener("click", () => {
	elements.previewText.value = "";
})

elements.playPause.addEventListener("click", async () => {
	const isSpeaking = await chrome.tts.isSpeaking();
	if (isSpeaking) {
		if (elements.playPause.className === "play") {
			resumeScreenReader();
		} else {
			pauseScreenReader();
		}
	} else {
		startScreenReader();
	}
});

elements.stop.addEventListener("click",
	function () {
		stopScreenReader();
	}
)

chrome.runtime.onMessage.addListener(
	async (message, sender, sendResponse) => {
		stopScreenReader();
		try {
			elements.previewText.value = utils.cleanUpText(message.text);
		} catch (error) {
			elements.previewText.value = ":( no worky, sorry. Try refreshing the current page and press read website again";
		}
		startScreenReader();
	}
)

addLogicToResizer(elements.resizer);