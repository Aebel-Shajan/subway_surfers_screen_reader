

let sidePanelPort: chrome.runtime.Port|null = null;
let onSidePanelConnect = () => {};

// Open sidepanel on action icon click
chrome.sidePanel
	.setPanelBehavior({ openPanelOnActionClick: true })
	.catch((error) => console.error(error));

// Stop tts when sidepanel is closed
chrome.runtime.onConnect.addListener(function (port: chrome.runtime.Port) {
	if (port.name === 'mySidepanel') {
		sidePanelPort = port
		onSidePanelConnect()
		onSidePanelConnect = () => {}
		port.onDisconnect.addListener(async () => {
			sidePanelPort = null
			onSidePanelConnect = () => {}
			chrome.tts.stop();
		});
	}
});

// Add context menu for reading website
chrome.runtime.onInstalled.addListener(function () {
	chrome.contextMenus.create({
		title: "Read website",
		id: "read-website",
		contexts: ["page"]
	});
	chrome.contextMenus.create({
		title: "Read selection: %s",
		id: "read-selection",
		contexts: ["selection"]
	});
})
// 
chrome.contextMenus.onClicked.addListener(
	async (info, tab) => {
		if (!tab) return
		if (!tab.id) return
		switch(info.menuItemId) {
			case "read-website":
				await chrome.sidePanel.open({ windowId: tab.windowId });
				if (sidePanelPort) {
					readWebsite(tab.id);
				} else {
					const tabId = tab.id;
					onSidePanelConnect = () => {
						readWebsite(tabId);
					}
				}
				break;
			case "read-selection":
				if (!info.selectionText) return;
				await chrome.sidePanel.open({ windowId: tab.windowId });
				if (sidePanelPort) {
					readSelection(info.selectionText, sidePanelPort);
				} else {
					onSidePanelConnect = () => {
						if (!sidePanelPort) return
						readSelection(info.selectionText? info.selectionText : "", sidePanelPort)
					};
				}
				break;
			default:
				break;
		}
	}
)

function readSelection(selection: string, sidePanelPort: chrome.runtime.Port) {
	sidePanelPort.postMessage({text: selection})
}

function readWebsite(tabId: number) {
	chrome.scripting.executeScript({
		target: { tabId: tabId },
		files: ["background/parseWebsite.js"]
	})
}