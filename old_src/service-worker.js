let runOnConnect = () => {}; // hack bleh
let sidePanelOpen = false;

// Open sidepanel on action icon click
chrome.sidePanel
	.setPanelBehavior({ openPanelOnActionClick: true })
	.catch((error) => console.error(error));

// Stop tts when sidepanel is closed
chrome.runtime.onConnect.addListener(function (port) {
	if (port.name === 'mySidepanel') {
		sidePanelOpen = true;
		runOnConnect();
		runOnConnect = () => {};
		port.onDisconnect.addListener(async () => {
			sidePanelOpen = false;
			chrome.tts.stop();
			runOnConnect = () => {};
			console.log('Sidepanel closed.');
		});
	}
});

// Add context menu for reading website
chrome.runtime.onInstalled.addListener(function () {
	chrome.contextMenus.create({
		title: "Read website (Dev)",
		id: "read-website",
		contexts: ["page"]
	});
	chrome.contextMenus.create({
		title: "Read selection (Dev): %s",
		id: "read-selection",
		contexts: ["selection"]
	});
})
// 
chrome.contextMenus.onClicked.addListener(
	async (info, tab) => {
		switch(info.menuItemId) {
			case "read-website":
				await chrome.sidePanel.open({ windowId: tab.windowId });
				if (sidePanelOpen) {
					readWebsite(tab.id);
				} else {
					runOnConnect = () => readWebsite(tab.id);
				}
				break;
			case "read-selection":
				await chrome.sidePanel.open({ windowId: tab.windowId });
				if (sidePanelOpen) {
					readSelection(info.selectionText);
				} else {
					runOnConnect = () => readSelection(info.selectionText);
				}
				break;
			default:
				break;
		}
	}
)

function readSelection(selection) {
	chrome.runtime.sendMessage({text: selection});
}

function readWebsite(tabId) {
	chrome.scripting.executeScript({
		target: { tabId: tabId },
		files: ["scripts/parseWebsite.bundle.js"]
	});
}