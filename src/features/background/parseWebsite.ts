import { Readability } from "@mozilla/readability";

// In braces because variable stays persistent.
// When I execute this script multiple times, the websiteContent stays persistent.
{
    const clonedDocument = document.cloneNode(true) as Document;
    const websiteContent = new Readability(clonedDocument).parse();
    if (websiteContent) {
        chrome.runtime.sendMessage({ text: websiteContent.textContent });
    }
}