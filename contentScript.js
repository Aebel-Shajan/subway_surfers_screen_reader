console.log("hello from content script!")

chrome.runtime.onMessage.addListener(
	function(message, sender, sendResponse) {
		if (message.sender === "side-panel") {
			console.log(message);
			let parser = new DOMParser();
			let doc = parser.parseFromString(document.documentElement.outerHTML, "text/html");
			console.log(doc);
			const scrapedContent = new Readability(doc).parse();
			console.log(scrapedContent);
			sendResponse({content: scrapedContent});
		}
	}
);
