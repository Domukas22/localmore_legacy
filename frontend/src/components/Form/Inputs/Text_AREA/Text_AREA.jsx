//
//

import { FieldError, Input, Label, TextArea, TextField } from "react-aria-components";
import css from "../Inputs.module.css";
import { ICON_error } from "../../../icons/icons";

export default function Text_AREA({
  name,
  placeholder,
  required = false,
  label,
  value,
  SET_value,
}) {
  return (
    <TextField
      name={name}
      className={css.input_BLOCK}
      isRequired={required}
      value={value}
      onChange={SET_value}
      // isInvalid={true}
    >
      <Label>{label}</Label>
      <TextArea placeholder={placeholder} />
      <FieldError className={css.input_ERROR}>
        <ICON_error color="red" />
        <p>This is an error</p>
      </FieldError>
    </TextField>
  );
}
