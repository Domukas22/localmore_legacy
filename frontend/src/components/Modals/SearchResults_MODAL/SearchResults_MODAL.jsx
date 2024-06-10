//
//

import css from "./SearchResults_MODAL.module.css";

export function SearchResults_MODAL({ search, SET_search, TOGGLE_search, searchBar_REF }) {
  return (
    <div className={css.SearchResults_MODAL}>
      <p className>Search results for</p>
      <h2>{search}</h2>
    </div>
  );
}
