//
//

import css from "../../Nav.module.css";
import SearchBar from "../../../search/Searchbar";
import { Btn } from "../../../btn/btn";
import { motion } from "framer-motion";

export function Search_OVERLAY({ search, SET_search, TOGGLE_search, searchBar_REF }) {
  return (
    <motion.div
      className={css.search_OVERLAY}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      // transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <SearchBar SET_search={SET_search} search={search} searchBar_REF={searchBar_REF} />
      <Btn
        styles={["btn-40", "round", "grey"]}
        text="Cancel"
        aria_LABEL="Search Heidelberg"
        onClick={() => {
          TOGGLE_search();
          SET_search("");
        }}
      />
    </motion.div>
  );
}
