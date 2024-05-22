//
//

import css from "../../Nav.module.css";
import SearchBar from "../../../search/search";
import { Btn } from "../../../btn/btn";

export function Search_OVERLAY({ search, SET_search, TOGGLE_search }) {
  return (
    <div className={css.search_OVERLAY}>
      <SearchBar SET_search={SET_search} search={search} />
      <Btn
        styles={["btn-40", "round", "grey"]}
        text="Cancel"
        aria_LABEL="Search Heidelberg"
        onClick={() => {
          TOGGLE_search();
          SET_search("");
        }}
      />
    </div>
  );
}
