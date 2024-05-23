//
//
import { Modal, Dialog } from "react-aria-components";
import css from "../search.module.css";
import { useEffect } from "react";

// similar to the Mobile_MENU in the Mobile_MENU.jsx file, create a modal dialog that displays search results

export function Modal_SEARCH({ search, profiles }) {
  return (
    <div className={css.Modal_SEARCH}>
      <p className>Search results for</p>
      <h2>{search}</h2>
    </div>
  );
}
