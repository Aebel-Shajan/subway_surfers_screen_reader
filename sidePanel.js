async function sendMessageToActiveTab(message) {
	const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
	// if we dont want the user to refresh the page 
	// await chrome.tabs.reload(tab.id);
	// // Wait for the tab to finish loading
	// await new Promise(resolve => {
	//   const listener = (tabId, changeInfo) => {
	//     if (tabId === tab.id && changeInfo.status === 'complete') {
	//       chrome.tabs.onUpdated.removeListener(listener);
	//       resolve();
	//     }
	//   };
	//   chrome.tabs.onUpdated.addListener(listener);
	// });
	const response = await chrome.tabs.sendMessage(tab.id, { ...message, sender: "side-panel" });
	return response
}

document.querySelector("#read-website").addEventListener('click', async () => {
	try {
		const response = await sendMessageToActiveTab({ action: "read-website" });
		console.log(response);
		let scrapedContent = response.content;
		document.querySelector("#preview-text").value = cleanUpText(scrapedContent.textContent);
	} catch (error) {
		document.querySelector("#preview-text").value = ":( no worky, sorry. Try refreshing the current page and press read website again";
		console.log('An error occurred:', error);
	}

})

let playPauseButton = document.querySelector("#play-pause-toggle");
let stopButton = document.querySelector("#stop");
let videoPlayer = document.querySelector("#video");
function setButtonState(button, state) {
	button.className = state;
	button.textContent = state.charAt(0).toUpperCase() + state.slice(1);
	return button
}
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
		args: [randomTime, true] // [time in seconds, allowSeekAhead]// doesnt work owie
	})
	return videoPlayer
}

playPauseButton.addEventListener("click", async () => {
	const isSpeaking = await chrome.tts.isSpeaking();
	if (isSpeaking) {
		if (playPauseButton.className === "play") {
			playPauseButton = setButtonState(playPauseButton, "pause")
			chrome.tts.resume();
			playVideoPlayer(videoPlayer);
		} else {
			playPauseButton = setButtonState(playPauseButton, "play")
			chrome.tts.pause();
			pauseVideoPlayer(videoPlayer);
		}
	} else {
		chrome.tts.stop();
		videoPlayer = seekVideoToRandomTime(videoPlayer);
		playPauseButton = setButtonState(playPauseButton, "pause");
		let preview = document.querySelector("#preview-text");
		let words = preview.value;
		console.log(words);
		chrome.tts.speak(words, {
			onEvent: function (event) {
				console.log('Event ' + event.type + ' at position ' + event.charIndex);
				document.querySelector("#text-overlay").innerText = getWordAtIndex(words, event.charIndex);
				if (event.type === "end") {
					playPauseButton = setButtonState(playPauseButton, "play");
					stopVideoPlayer(videoPlayer);
				}
			}
		}
		)
	}
});

stopButton.addEventListener("click", () => {
	chrome.tts.stop();
	playPauseButton = setButtonState(playPauseButton, "play");
	stopVideoPlayer(videoPlayer);
})


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