chrome.runtime.onConnect.addListener(function (port) {
	if (port.name === 'mySidepanel') {
		port.onDisconnect.addListener(async () => {
			chrome.tts.stop();
			console.log('Sidepanel closed.');
		});
	}
});
chrome.sidePanel
	.setPanelBehavior({ openPanelOnActionClick: true })
	.catch((error) => console.error(error));


// Open sidepanel on action icon click
chrome.sidePanel
	.setPanelBehavior({ openPanelOnActionClick: true })
	.catch((error) => console.error(error));

// Stop tts when sidepanel is closed
chrome.runtime.onConnect.addListener(function (port) {
	if (port.name === 'mySidepanel') {
		port.onDisconnect.addListener(async () => {
			chrome.tts.stop();
			console.log('Sidepanel closed.');
		});
	}
});

// Add context menu for reading website
chrome.runtime.onInstalled.addListener(function () {
	chrome.contextMenus.create({
		title: "Read website",
		id: "read-website"
	});
})
// 
chrome.contextMenus.onClicked.addListener(
	async (info, tab) => {
		if (info.menuItemId === "read-website") {
			console.log("hello");
			await chrome.sidePanel.open({ windowId: tab.windowId });
			chrome.scripting.executeScript({
				target: { tabId: tab.id },
				files: ["parseWebsite.bundle.js"]
			});
		}
	}
)

