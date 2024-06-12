//
//
import css from "./Header.module.css";

export function Header({ children, header_REF }) {
  return (
    <header className={css.header} ref={header_REF}>
      <div className={css.content_WRAP}>{children && children}</div>
    </header>
  );
}
