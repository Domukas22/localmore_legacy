//
//

import css from "../../Blocks.module.css";
import { Btn } from "../../../../Btn/Btn";
import { ICON_arrow, ICON_save } from "../../../../icons/icons";
import logo from "../../../../../assets/icons/logo.png";
import { useContext } from "react";
import { SavedProfileIDs_CONTEXT } from "../../../../../contexts/savedProfiles";

export function Nav_BLOCKS({ SET_currentMenu, visible_BTNs = {}, tagUsage_COUNT }) {
  const {
    home = true,
    categories = true,
    settings = true,
    liked = true,
  } = { home: true, categories: true, settings: true, liked: true, ...visible_BTNs };

  const { savedProfile_IDs } = useContext(SavedProfileIDs_CONTEXT);
  return (
    <>
      <div className={css.Block}>
        {home && (
          <li>
            <Btn
              styles={["btn-44", "flex", "text-left-auto"]}
              text="Home"
              left_ICON={<img src="https://cdn-icons-png.flaticon.com/512/609/609803.png"></img>}
              aria_LABEL=""
              onClick={() => {}}
              FIRE_clickEvent={false}
            />
          </li>
        )}
        <li>
          <Btn
            styles={["btn-44", "flex", "text-left-auto"]}
            text="Alle tags"
            aria_LABEL=""
            left_ICON={
              <img src="https://cdn-icons-png.freepik.com/512/9458/9458516.png?ga=GA1.1.807612306.1716024941" />
            }
            right_ICON={<span>{tagUsage_COUNT || 99}</span>}
            onClick={() => {}}
            FIRE_clickEvent={false}
          />
        </li>
        {categories && (
          <li>
            <Btn
              styles={["btn-44", "flex", "text-left-auto"]}
              text="Categories"
              left_ICON={
                <img src="https://cdn-icons-png.flaticon.com/512/11244/11244162.png"></img>
              }
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
              styles={["btn-44", "flex", "text-left-auto"]}
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
              styles={["btn-44", "flex", "text-left-auto"]}
              text={`Saved (${savedProfile_IDs.size})`}
              // left_ICON={<img src="https://cdn-icons-png.flaticon.com/512/2107/2107845.png"></img>}
              left_ICON={<ICON_save color="red" />}
              aria_LABEL=""
              right_ICON={<ICON_arrow direction="right" />}
              onClick={() => SET_currentMenu("saved")}
              FIRE_clickEvent={false}
            />
          </li>
        )}
      </div>
      <div className={css.Block}>
        <li>
          <Btn
            styles={["btn-44", "flex", "text-left-auto"]}
            text="Provide feedback"
            left_ICON={
              <img src="https://cdn-icons-png.freepik.com/512/4066/4066310.png?ga=GA1.1.807612306.1716024941" />
            }
            right_ICON={<ICON_arrow direction="right" />}
            aria_LABEL=""
            onClick={() => SET_currentMenu("feedback")}
            FIRE_clickEvent={false}
          />
        </li>

        <li>
          <Btn
            styles={["btn-44", "flex", "text-left-auto"]}
            text="About us"
            left_ICON={<img src={logo}></img>}
            aria_LABEL=""
            onClick={() => {}}
            FIRE_clickEvent={false}
          />
        </li>
        <li>
          <Btn
            styles={["btn-44", "flex", "text-left-auto"]}
            text="Contact"
            left_ICON={
              <img src="https://cdn-icons-png.freepik.com/512/7596/7596763.png?ga=GA1.1.807612306.1716024941" />
            }
            aria_LABEL=""
            onClick={() => {}}
            FIRE_clickEvent={false}
          />
        </li>
        <li>
          <Btn
            styles={["btn-44", "flex", "text-left-auto"]}
            text="Legal"
            left_ICON={<img src="https://cdn-icons-png.flaticon.com/512/3122/3122321.png"></img>}
            aria_LABEL=""
            right_ICON={<ICON_arrow direction="right" />}
            onClick={() => SET_currentMenu("legal")}
            FIRE_clickEvent={false}
          />
        </li>
      </div>
    </>
  );
}
