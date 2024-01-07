import { Readability } from "@mozilla/readability";

const scrapedContent = new Readability(document.cloneNode(true)).parse();
chrome.runtime.sendMessage({scrapedContent: scrapedContent});