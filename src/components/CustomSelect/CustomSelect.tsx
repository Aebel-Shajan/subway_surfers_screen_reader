
import styles from "./CustomSelect.module.css";

interface OptionType {
  name: string,
  index: number
}


interface CustomSelectProps {
  label: string;
  options: OptionType[];
  selected: number;
  setSelected: (value: number) => void;
}

const CustomSelect = ({
  label = "Choose an option: ",
  options,
  selected,
  setSelected,
}: CustomSelectProps) => {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <select
        value={selected}
        onChange={(e) => setSelected(Number(e.target.value))}
      >
        {options.map((option) => (
          <option key={option.index} value={option.index}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
