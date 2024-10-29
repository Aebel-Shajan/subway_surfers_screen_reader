import styles from "./Header.module.css";

const Header = ({children, ...props}: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <header className={styles.header} {...props}>
            {children}
        </header>
    );
};

export default Header;