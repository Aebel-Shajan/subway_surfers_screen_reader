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
		document.querySelector("#preview-text").value = response.content;
	} catch (error) {
		document.querySelector("#preview-text").value = ":( no worky, sorry. Try refreshing the current page and press read website again";
		console.log('An error occurred:', error);
	}

})

let playPause = document.querySelector("#toggle-tts")
playPause.addEventListener("click", () => {
	chrome.tts.stop();
	let preview = document.querySelector("#preview-text");
	let words = preview.value;
	console.log(words);
	// for (let i = 0; i < words.length; i++) {
	chrome.tts.speak(words, {
		onEvent: function (event) {
			console.log('Event ' + event.type + ' at position ' + event.charIndex);
			document.querySelector("#text-overlay").innerText = getWordAtIndex(words, event.charIndex);
		}
	}
	)
	// }
});

document.querySelector("#stop-tts").addEventListener("click", () => {
	chrome.tts.stop();
})

function getWordAtIndex(text, index) {
  let words = text.split(' ');
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