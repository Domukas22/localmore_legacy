//
//

import css from "./Form.module.css";

export default function Form({ autoComplete = "off", children, onSubmit }) {
  return (
    <form autoComplete={autoComplete}>
      {children &&
        children.map((child, index) => (
          <div key={index} className={css.block}>
            {child}
          </div>
        ))}
    </form>
  );
}
