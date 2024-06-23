//
//
import css from "../Inputs.module.css";
import { Checkbox } from "react-aria-components";

export default function Checkbox_LINE({ required = false, label, checked, SET_checked }) {
  return (
    <div className={css.input_BLOCK}>
      <Checkbox isSelected={checked} onChange={SET_checked} className={css.Checkbox_LINE}>
        {label}
      </Checkbox>
    </div>
  );
}
