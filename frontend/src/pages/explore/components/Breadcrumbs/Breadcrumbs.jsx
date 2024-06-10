//
//

import css from "./Breadcrumbs.module.css";
import { Link } from "react-aria-components";

export function Breadcrumbs() {
  // TODO => Re-write this to use the react-aria-components

  return (
    <nav className={css.Breadcrumbs}>
      <ul>
        <li>
          <Breadcrumb_LINK link="#" text="Link 1" />
        </li>
        <span>{">"}</span>
        <li>
          <Breadcrumb_LINK link="#" text="Link 2" />
        </li>
        <span>{">"}</span>
        <li>
          <Breadcrumb_LINK link="#" text="Link 3" IS_active={true} />
        </li>
      </ul>
    </nav>
  );
}
function Breadcrumb_LINK({ link, text, IS_active }) {
  return (
    <Link href={link || "/"} className={css.breadcrunb_LINK} data-active={IS_active}>
      {text || "Link"}
    </Link>
  );
}
