import { Readability } from "@mozilla/readability";

const websiteContent = new Readability(document).parse();
if (websiteContent) {
    chrome.runtime.sendMessage({ text: websiteContent.textContent });
}
