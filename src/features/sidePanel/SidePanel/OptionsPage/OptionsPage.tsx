import Header from "@/components/Header/Header";
import styles from "./OptionsPage.module.css"
import Button from "@/components/Button/Button";
import { IoMdArrowRoundBack } from "react-icons/io";

interface OptionsPageProps {
  setPage: CallableFunction,
  setOptions: CallableFunction
}
const OptionsPage = ({setPage}: OptionsPageProps) => {
  return ( 
    <div className={styles.container}>
      <Header>
        <Button
          onClick={() => setPage("main")}
        >
          <IoMdArrowRoundBack />
        </Button>
          <span>Options</span>
      </Header>
      <div>

      </div>
    </div>
  );
}

export default OptionsPage;