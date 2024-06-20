//
//

import { FieldError, Input, Label, TextField } from "react-aria-components";
import css from "../../Form.module.css";
import { ICON_error } from "../../../icons/icons";

export default function Text_INPUT({
  name,
  placeholder,
  required = false,
  autoComplete,
  label,
  type = "text",
  value,
  SET_value,
}) {
  return (
    <TextField
      type={type}
      name={name}
      className={css.input_BLOCK}
      isRequired={required}
      autoComplete={autoComplete}
      value={value}
      onChange={SET_value}
      // isInvalid={true}
    >
      <Label>
        {label}
        {/* {required && " *"} */}
      </Label>
      <Input placeholder={placeholder} />
      <FieldError className={css.input_ERROR}>
        <ICON_error color="red" />
        <p>This is an error</p>
      </FieldError>
    </TextField>
  );
}
