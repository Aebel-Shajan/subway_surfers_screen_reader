import { useEffect, useRef } from "react"
import styles from "./CustomTextare.module.css"

interface CustomTextareaProps {
	highlightMode: boolean,
	highlightRange: [number, number] | null,
	inputText: string,
	setInputText: CallableFunction,
	placeholder: string
}

const CustomTextarea = (
	{
		highlightMode,
		highlightRange,
		inputText,
		setInputText,
		placeholder="Enter text here"
	}: CustomTextareaProps
) => {

	// Refs
	const highlightRef = useRef<HTMLSpanElement | null>(null)

	// Use effect hooks 
	// Scroll highlight bit into view
	useEffect(() => {
		if (!highlightRef.current) return 
		if (highlightMode && highlightRange) {
			highlightRef.current.scrollIntoView();
		}
	}, [highlightRange, highlightMode])

	if (highlightMode) {
		if (!highlightRange) {
			return <div className={styles.textarea}>{inputText}</div>
		}

		return (
			<div className={styles.textarea}>
				{inputText.slice(0, highlightRange[0])}
				<span ref={highlightRef}>
					{inputText.slice(highlightRange[0], highlightRange[1])}
				</span>
				{inputText.slice(highlightRange[1], inputText.length)}
			</div>
		)
	}

	return (
		<textarea
			className={styles.textarea}
			placeholder={placeholder}
			value={inputText}
			onChange={(event) => setInputText(event.target.value)}
		/>
	);
}

export default CustomTextarea;