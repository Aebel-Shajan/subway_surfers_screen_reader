import styles from "./SidePanel.module.css"
import logo from "@/assets/genz-screenreader-logo.png"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"
import { MdDragHandle } from "react-icons/md";
// https://github.com/tjallingt/react-youtube
import YouTube from "react-youtube";


const SidePanel = () => {
  return (
      <PanelGroup className={styles.container} direction="vertical">
        <Panel maxSize={75} className={styles.upperPanel}>
          <header>
            <img src={logo} />
            <span>Subway surfers sidepanel</span>
          </header>
        </Panel>
        <PanelResizeHandle className={styles.resizeHandle}>
          <MdDragHandle />
        </PanelResizeHandle>
        <Panel>
          <YouTube videoId={"BkWT66jE8Hs"} className={styles.youtube}/>
        </Panel>
      </PanelGroup>
  );
}

export default SidePanel;