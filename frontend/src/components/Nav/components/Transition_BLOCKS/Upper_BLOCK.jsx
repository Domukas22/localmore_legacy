//
//
import { Btn } from "../../../btn/btn";
import css from "../../Nav.module.css";
import { ICON_arrow } from "../../../icons/icons";
import { useContext } from "react";
import { SavedProfileIDs_CONTEXT } from "../../../../contexts/savedProfiles";

export function Upper_BLOCK({ SET_currentMenu, visible_BTNs = {} }) {
  // Default values for visible_BTNs
  const {
    home = true,
    categ = true,
    settings = true,
    liked = true,
  } = { home: true, categ: true, settings: true, liked: true, ...visible_BTNs };

  const { savedProfile_IDs } = useContext(SavedProfileIDs_CONTEXT);

  return (
    <div className={css.block_WRAP}>
      {home && (
        <li>
          <Btn
            styles={["btn-44", "navDD_BTN"]}
            text="Home"
            left_ICON={<img src="https://cdn-icons-png.flaticon.com/512/609/609803.png"></img>}
            aria_LABEL=""
            // left_ICON={<ICON_activeDigit count={tagUsage_COUNT} IS_active={true} />}
            onClick={() => {}}
            FIRE_clickEvent={false}
          />
        </li>
      )}
      {categ && (
        <li>
          <Btn
            styles={["btn-44", "navDD_BTN"]}
            text="Categories"
            left_ICON={<img src="https://cdn-icons-png.flaticon.com/512/11244/11244162.png"></img>}
            aria_LABEL=""
            right_ICON={<ICON_arrow direction="right" />}
            onClick={() => SET_currentMenu("categories")}
            FIRE_clickEvent={false}
          />
        </li>
      )}
      {settings && (
        <li>
          <Btn
            styles={["btn-44", "navDD_BTN"]}
            text="Settings"
            aria_LABEL=""
            left_ICON={<img src="https://cdn-icons-png.flaticon.com/512/3953/3953226.png"></img>}
            right_ICON={<ICON_arrow direction="right" />}
            onClick={() => SET_currentMenu("settings")}
            FIRE_clickEvent={false}
          />
        </li>
      )}
      {liked && (
        <li>
          <Btn
            styles={["btn-44", "navDD_BTN"]}
            text={`Saved (${savedProfile_IDs.size})`}
            left_ICON={<img src="https://cdn-icons-png.flaticon.com/512/2107/2107845.png"></img>}
            aria_LABEL=""
            right_ICON={<ICON_arrow direction="right" />}
            onClick={() => SET_currentMenu("saved")}
            FIRE_clickEvent={false}
          />
        </li>
      )}
    </div>
  );
}
