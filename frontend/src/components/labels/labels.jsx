//
import { global_TR } from "../../translations";
import css from "./labels.module.css";
import PropTypes from "prop-types";

export function New_LABEL({ lang = "en" }) {
  return (
    <span className={css.labelNew} data-testid="label-new">
      {global_TR?.new_TEXT?.[lang] || "New"}
    </span>
  );
}
export function Tag_LABEL({ name, icon, color = "brand", small = false }) {
  return (
    <label className={css.Tag_LABEL} data-color={color} data-small={small}>
      {icon && icon}
      <p>{name}</p>
    </label>
  );
}
