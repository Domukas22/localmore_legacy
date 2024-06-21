//
//
import css from "./Header.module.css";

export function Header({ children, header_REF = null, padding = true }) {
  return (
    <header className={css.header} ref={header_REF} data-padding={padding}>
      <div className={css.content_WRAP}>{children && children}</div>
    </header>
  );
}
