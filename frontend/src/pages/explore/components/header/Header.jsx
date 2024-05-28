//
//
import SearchBar from "../../../../components/search/Searchbar";
import css from "./Header.module.css";
import { Link } from "react-aria-components";
import { useRef } from "react";

export function Header({
  window_WIDTH,
  SHOULD_showBreadcrumbs = false,
  profile_COUNT = 99,
  search,
  SET_search,
}) {
  const search_REF = useRef(null);
  return (
    <header className={css.header}>
      {SHOULD_showBreadcrumbs && <Beardcrumbs />}
      {!SHOULD_showBreadcrumbs && <p>Look through {profile_COUNT} places</p>}

      {window_WIDTH >= 630 && <h1>Find what you're looking for in Heidelberg</h1>}
      {window_WIDTH <= 629 && window_WIDTH >= 450 && <h1>Explore the city of Heidelberg</h1>}
      {window_WIDTH <= 449 && <h1>Explore Heidelberg</h1>}
    </header>
  );
}

function Beardcrumbs() {
  return (
    <nav className={css.breadcrumbs}>
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
