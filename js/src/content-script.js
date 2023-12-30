import { Readability } from "@mozilla/readability";
console.log("hello from content script!")

chrome.runtime.onMessage.addListener(
	function(message, sender, sendResponse) {
		console.log(message);
		if (message.action === "read-website") {
			const scrapedContent = new Readability(document.cloneNode(true)).parse();
			console.log(scrapedContent);
			sendResponse({content: scrapedContent});
		}
	}
);
