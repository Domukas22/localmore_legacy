//
//
import css from "../../Form.module.css";
import { RadioGroup, Radio, Label } from "react-aria-components";

export default function Radio_LINES({ required = false, label, value, SET_value, options = [] }) {
  return (
    <div className={css.input_BLOCK}>
      <RadioGroup className={css.Radio_LINES} value={value} onChange={SET_value}>
        <Label style={{ display: "none" }}>{label}</Label>
        {options.map((option) => (
          <Radio key={option} value={option}>
            {option}
          </Radio>
        ))}
      </RadioGroup>
    </div>
  );
}
