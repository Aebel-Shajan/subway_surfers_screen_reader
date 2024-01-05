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