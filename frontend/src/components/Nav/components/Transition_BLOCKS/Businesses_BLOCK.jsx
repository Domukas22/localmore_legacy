//
//
import { Btn } from "../../../btn/btn";
import css from "../../Nav.module.css";

export function Businesses_BLOCK({ business_CATEG }) {
  return (
    <div className={css.block_WRAP}>
      <p>Find businesses</p>
      {business_CATEG.map((categ) => {
        return (
          <li key={categ.id}>
            <Btn
              styles={["btn-44", "navDD_BTN"]}
              left_ICON={<img src={categ.icon?.url} />}
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
