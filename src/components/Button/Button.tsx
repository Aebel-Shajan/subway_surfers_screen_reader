import styles from "./Button.module.css"

const Button = (
    {children, ...props}: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
    return ( 
        <button className={styles.button} {...props}>
            {children}
        </button>
     );
}
 
export default Button;