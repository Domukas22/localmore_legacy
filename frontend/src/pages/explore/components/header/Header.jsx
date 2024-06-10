//
//
import SearchBar from "../../../../components/search/Searchbar";
import css from "./Header.module.css";
import { Link } from "react-aria-components";
import { useRef } from "react";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";

export function Header({ children }) {
  return (
    <header className={css.header}>
      <div className={css.content_WRAP}>{children && children}</div>
    </header>
  );
}
