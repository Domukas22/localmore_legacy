//
import { global_TR } from "../../translations";
import css from "../Profile_PREVIEW/Profile_PREVIEW.module.css";

export function New_LABEL({ lang }) {
  return (
    <span className={css.labelNew} data-testid="label-new">
      {global_TR?.new_TEXT?.[lang] || "New"}
    </span>
  );
}
