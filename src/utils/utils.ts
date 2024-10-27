

/**
 * Retrieves the word at the specified index within a given string.
 *
 * @param str - The string from which to extract the word.
 * @param index - The position within the string to find the word.
 * @returns The word at the specified index, or an empty string if the index is out of bounds.
 */
export function getWordAtIndex(str: string, index: number): string {
    // Check if index is within the bounds of the string
    if (index < 0 || index >= str.length) return '';

    // Find the start of the word
    let start = index;
    while (start > 0 && str[start - 1] !== ' ') {
        start--;
    }

    // Find the end of the word
    let end = index;
    while (end < str.length && str[end] !== ' ') {
        end++;
    }

    // Extract and return the word
    return str.slice(start, end);
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