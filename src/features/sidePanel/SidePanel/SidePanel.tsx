import styles from "./SidePanel.module.css"
import logo from "@/assets/genz-screenreader-logo.png"

const SidePanel = () => {
    return ( 
        <div className={styles.container}>
            <header className={styles.header}>
                <img src={logo} />
                <span>Subway surfers sidepanel</span>
            </header>
            <main>

            </main>
        </div>
     );
}
 
export default SidePanel;