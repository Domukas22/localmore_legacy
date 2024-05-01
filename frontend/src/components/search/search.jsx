//

import { SearchField, Input, Button } from "react-aria-components";
import { ICON_searchSmall, ICON_x } from "../icons/icons";
import css from "./search.module.css";
import { useRef } from "react";
import { motion } from "framer-motion";

export default function SearchBar({ SET_search, IS_mobile, shrink, search, SET_shrinkSearch }) {
  const inputRef = useRef(null);
  const clear_BTN = useRef(null);
  const opener_BTN = useRef(null);

  return (
    <div className={css.search_WRAP} data-shrink={shrink && IS_mobile}>
      {IS_mobile && shrink && (
        <Button
          className={css.opener_BTN}
          aria-label="Open search"
          onPress={() => {
            SET_shrinkSearch(false);
            setTimeout(() => {
              inputRef.current.focus();
            }, 100);
          }}
          data-hide={!IS_mobile && !shrink}
          ref={opener_BTN}
        ></Button>
      )}
      <div className={css.searchIcon_WRAP}>
        <ICON_searchSmall />
      </div>

      <SearchField
        className={css.searchBar}
        aria-label="Heidelberg durchsuchen..."
        onChange={SET_search}
      >
        {!shrink && (
          <Input
            placeholder="Heidelberg durchsuchen..."
            className={css["react-aria-Input"]}
            aria-label="Heidelberg durchsuchen..."
            ref={inputRef}
          />
        )}
        <Button ref={clear_BTN} className={css.invisibleClear_BTN}></Button>
      </SearchField>

      {IS_mobile && !shrink && search === "" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <Button
            className={css.closer_BTN}
            onPress={() => {
              SET_shrinkSearch(true);
              setTimeout(() => {
                opener_BTN.current.focus();
              }, 100);
            }}
            aria-label="Suche schließen"
            data-hide={!IS_mobile && shrink && search !== ""}
          >
            <p>Abbrechen</p>
          </Button>
        </motion.div>
      )}

      {!shrink && search !== "" && (
        <Button
          className={css.clearer_BTN}
          aria-label={`Suche "${search}" löschen`}
          onPress={() => {
            SET_search("");
            clear_BTN.current.click();
          }}
          data-hide={shrink && search === ""}
        >
          <div>
            <ICON_x />
          </div>
        </Button>
      )}
    </div>
  );
}
