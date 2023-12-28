let focusList = [];

function createFocusList() {
	focusList.push(...document.querySelectorAll('html, body >:not( [aria-hidden=true] )'));

	focusList = focusList.filter((element) => {
		const styles = getComputedStyle(element);
		if (styles.visibility === 'hidden' || styles.display === 'none') {
			return false;
		}
		return true;
	});
}