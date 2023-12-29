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
  const response = await chrome.tabs.sendMessage(tab.id, {...message, sender: "side-panel"});
	return response
}

document.querySelector("#read-website").addEventListener('click', async () => {
		const response = await sendMessageToActiveTab({action: "read-website"});
		console.log(response);
		document.querySelector("#preview-text").innerText = response.content;
})
