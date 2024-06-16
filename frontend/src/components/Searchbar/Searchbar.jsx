//

import { SearchField, Input, Button } from "react-aria-components";
import { ICON_search, ICON_x } from "../icons/icons";
import css from "./Searchbar.module.css";
import { useRef } from "react";
import { useEffect } from "react";

export default function SearchBar({ SET_search, search, searchBar_REF, placeholder, width }) {
  // const ref = useRef(null);
  const clear_BTN = useRef(null);
  // useEffect(() => {
  //   if (searchBar_REF?.current) {
  //     searchBar_REF.current.focus();
  //   }
  // }, [searchBar_REF]);

  return (
    <div className={css.search_WRAP}>
      <div className={css.searchIcon_WRAP}>
        <ICON_search small={true} />
      </div>

      <SearchField
        className={css.searchBar}
        aria-label="Heidelberg durchsuchen..."
        onChange={SET_search}
        style={{ width: width || "" }}
      >
        <Input
          placeholder={placeholder || "Suchen..."}
          className={css["react-aria-Input"]}
          aria-label="Heidelberg durchsuchen..."
          ref={searchBar_REF}
          value={search}
        />

        <Button ref={clear_BTN} className={css.invisibleClear_BTN}></Button>
      </SearchField>

      {search !== "" && (
        <Button
          className={css.clearer_BTN}
          aria-label={`Suche "${search}" löschen`}
          onPress={() => {
            SET_search("");
            document.dispatchEvent(new Event("click")); // for the dropdowns
            clear_BTN.current.click();
          }}
        >
          <div>
            <ICON_x />
          </div>
        </Button>
      )}
    </div>
  );
}
