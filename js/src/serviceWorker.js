import { Readability } from '@mozilla/readability';
// Your code that uses Readability

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

console.log("hello from bundle!")