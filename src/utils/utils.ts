/**
 * @file Contains general utilty functions used within the chrome extension.
 * 
 *  I put the functions here cus i got no clue where else to put them.
 */


/**
 * Retrieves the word, its start and end indexes inside a given string.
 *
 * @param str - The string from which to extract the word.
 * @param index - The position within the string to find the word.
 * @returns The word at the specified index, or an empty string if the index is out of bounds.
 */
interface wordInfo {
    startPos: number,
    endPos: number,
    word: string
}
export function getWordAtIndex(str: string, index: number): wordInfo {
    // Check if index is within the bounds of the string
    if (index < 0 || index >= str.length) {
        return {
            startPos: 0,
            endPos: 0,
            word: ""
        };
    }

    const boundaryChars = [" ", "\n", "."]

    // Find the start of the word
    let start = index;
    while (start > 0 && !boundaryChars.includes(str[start - 1])) {
        start--;
    }

    // Find the end of the word
    let end = index;
    while (end < str.length && !boundaryChars.includes(str[end])) {
        end++; 
    }

    // Extract and return the word
    return {
        startPos: start,
        endPos: end,
        word: str.slice(start, end)
    }
}


/**
 * Delays the execution for a specified amount of time.
 *
 * @param time - The amount of time to delay in milliseconds.
 * @returns A promise that resolves after the specified delay.
 */
export async function delay(time: number) {
    await new Promise(resolve => setTimeout(resolve, time));
}

/**
 * Cleans up the given text by organizing/removing whitespace.
 *
 * @param text - The text to be cleaned up.
 * @returns The cleaned-up text.
 */
export function cleanUpText(text: string): string {
	if (text.length >= 30000) {
		text = text.slice(0, 30000) // max lenght that tts allows
	}
	return text
		// remove spaces before and after
		.trim()
		// remove spaces between new lines
		.replace(/ +\n/g, '\n')
		// condense multiple new lines into two
		.replace(/\n+/g, '\n\n')
		// add space to end of sentences
		.replace(/(?<=[A-Za-z0-9])\.(?=[A-Z])/g, '. ');
}

/**
 * Formats a time string into a number of seconds.
 * 
 * @param timeString - The time string to be converted.
 * @param format - The format of the time string. Either "hh:mm", "hh:mm:ss", or "mm:ss".
 * @returns The number of seconds represented by the time string.
 */
export function timeStringToSeconds(timeString: string, format: "hh:mm"|"hh:mm:ss"|"mm:ss"): number {
    const parts = timeString.split(':').map(Number);
    
    if (format === "hh:mm" && parts.length === 2) {
        return 3600 * parts[0] + 60 * parts[1];
    } else if (format === "mm:ss" && parts.length === 2) {
        return 60 * parts[0] + parts[1];
    } else if (format === "hh:mm:ss" && parts.length === 3) {
        return 3600 * parts[0] + 60 * parts[1] + parts[2];
    } else {
        return 0;
    }
}

/**
 * Converts a number of seconds into a formatted time string.
 * 
 * @param time - The number of seconds to be converted.
 * @param format - The desired format of the time string. Either "hh:mm", "hh:mm:ss", or "mm:ss".
 * @returns The formatted time string.
 */
export function secondsToTimeString(time: number, format: "hh:mm"|"hh:mm:ss"|"mm:ss"): string {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const pad = (num: number) => num.toString().padStart(2, '0');

    if (format === "hh:mm") {
        return `${pad(hours)}:${pad(minutes)}`;
    } else if (format === "hh:mm:ss") {
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    } else if (format === "mm:ss") {
        return `${pad(minutes)}:${pad(seconds)}`;
    } else {
        return "00:00";
    }
}