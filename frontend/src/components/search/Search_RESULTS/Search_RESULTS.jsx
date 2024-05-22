//
//
import css from "../search.module.css";

export function Search_RESULTS({ search, profiles }) {
  return (
    <div className={css.search_RESULTS}>
      <p className>Search results for</p>
      <h2>{search}</h2>
    </div>
  );
}
