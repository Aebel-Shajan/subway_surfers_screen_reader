import { Readability } from "@mozilla/readability";

const websiteContent = new Readability(document.cloneNode(true)).parse();
chrome.runtime.sendMessage({text: websiteContent.textContent});