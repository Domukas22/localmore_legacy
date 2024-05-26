//
//
import { Btn } from "../../../btn/btn";
import css from "../../Nav.module.css";

export function Places_BLOCK({ places_CATEG }) {
  return (
    <div className={css.block_WRAP}>
      <p>Find places</p>
      {places_CATEG.map((categ) => {
        return (
          <li key={categ.id}>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              left_ICON={<img src={categ.icon?.url} />}
              // right_ICON={<ICON_arrow direction="right" />}
              text={categ.name.en}
              aria_LABEL=""
              onClick={() => {}}
              FIRE_clickEvent={false}
            />
          </li>
        );
      })}
    </div>
  );
}
