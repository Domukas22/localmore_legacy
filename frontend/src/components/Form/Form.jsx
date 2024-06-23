//
//

import css from "./Form.module.css";

export default function Form({ autoComplete = "off", children, onSubmit }) {
  return (
    <form className={css.Form} autoComplete={autoComplete}>
      {children && children}
    </form>
  );
}
