//
//
import { Btn } from "../../../btn/btn";
import css from "../../Nav.module.css";
import { USE_getCategoryByID } from "../../../../hooks/USE_getDDcategory";
import { ICON_arrow } from "../../../icons/icons";

export function AllCategories_BLOCK({
  start_CATEG,
  end_CATEG,
  SET_currentMenu,
  SET_reverse = () => {},
}) {
  return (
    <>
      <div className={css.block_WRAP}>
        <li key={"all-categories"}>
          <Btn
            styles={["btn-44", "navDD_BTN"]}
            text="All Categories"
            aria_LABEL=""
            onClick={() => {}}
            FIRE_clickEvent={false}
          />
        </li>
        {start_CATEG.map((categ) => {
          return (
            <li key={categ._id}>
              <Btn
                styles={["btn-44", "navDD_BTN"]}
                left_ICON={<img src={categ.icon?.url} />}
                right_ICON={<ICON_arrow direction="right" />}
                text={categ.name.en}
                aria_LABEL=""
                onClick={() => {
                  SET_reverse(true);
                  SET_currentMenu(USE_getCategoryByID(categ._id));
                }}
                FIRE_clickEvent={false}
              />
            </li>
          );
        })}
      </div>
      <div className={css.block_WRAP}>
        <p>All categories</p>
        {end_CATEG.map((categ) => {
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
    </>
  );
}
