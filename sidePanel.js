async function sendMessageToActiveTab(message) {
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  const response = await chrome.tabs.sendMessage(tab.id, {...message, sender: "side-panel"});
	return response
}

document.addEventListener("DOMContentLoaded", function () {
	document.querySelector("#read-website").addEventListener('click', async () => {
		const response = await sendMessageToActiveTab({action: "read-website"});
		console.log(response);
		document.querySelector("#preview-text").innerText = response.content;
	})
});
