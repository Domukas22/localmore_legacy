//
//
import { ICON_smiley } from "../../../icons/icons";
import css from "../Inputs.module.css";
import { RadioGroup, Radio, Label } from "react-aria-components";

export default function GiantSurvey_RADIOS({
  required = false,
  label,
  value,
  SET_value,
  options = [
    { text: "Sad", icon: <ICON_smiley emotion="sad" /> },
    { text: "Neutral", icon: <ICON_smiley emotion="neutral" /> },
    { text: "Happy", icon: <ICON_smiley emotion="happy" /> },
  ],
}) {
  return (
    <div className={css.input_BLOCK}>
      <RadioGroup className={css.GiantRadio_OTPIONS} value={value} onChange={SET_value}>
        <Label style={{ display: "none" }}>{label}</Label>
        {options.map((option) => (
          <Radio key={option.text} value={option.text}>
            {option.icon && option.icon}
            <p>{option.text && option.text}</p>
          </Radio>
        ))}
      </RadioGroup>
    </div>
  );
}
