//
//
import css from "../../Blocks.module.css";
import { Btn } from "../../../../Btn/Btn";
import { ICON_arrow } from "../../../../icons/icons";

export function AllCategories_BLOCK({
  start_CATEG,
  end_CATEG,
  SET_currentMenu,
  SET_reverse = () => {},
}) {
  return (
    <>
      <div className={css.Block} key={"all-categories-upper-block"}>
        <li key={"all-categories"}>
          <Btn
            styles={["btn-44", "flex", "text-left-auto"]}
            text="All Categories"
            aria_LABEL=""
            onClick={() => {}}
            FIRE_clickEvent={false}
          />
        </li>
        {start_CATEG.map((categ) => {
          return (
            <li key={categ.name?.en}>
              <Btn
                styles={["btn-44", "flex", "text-left-auto"]}
                left_ICON={<img src={categ.icon?.url} />}
                right_ICON={<ICON_arrow direction="right" />}
                text={categ.name.en}
                aria_LABEL=""
                onClick={() => {
                  SET_reverse(true);
                  SET_currentMenu(categ._id);
                }}
                FIRE_clickEvent={false}
              />
            </li>
          );
        })}
      </div>
      <div className={css.Block} key={"all-categories-lower-block"}>
        <p>All categories</p>
        {end_CATEG.map((categ) => {
          return (
            <li key={categ.name?.en}>
              <Btn
                styles={["btn-44", "flex", "text-left-auto"]}
                left_ICON={<img src={categ.icon?.url} />}
                text={categ.name.en}
                aria_LABEL=""
                onClick={() => {}}
                FIRE_clickEvent={false}
              />
            </li>
          );
        })}
        {end_CATEG.map((categ) => {
          return (
            <li key={categ.name?.en}>
              <Btn
                styles={["btn-44", "flex", "text-left-auto"]}
                left_ICON={<img src={categ.icon?.url} />}
                text={categ.name.en}
                aria_LABEL=""
                onClick={() => {}}
                FIRE_clickEvent={false}
              />
            </li>
          );
        })}
        {end_CATEG.map((categ) => {
          return (
            <li key={categ.name?.en}>
              <Btn
                styles={["btn-44", "flex", "text-left-auto"]}
                left_ICON={<img src={categ.icon?.url} />}
                text={categ.name.en}
                aria_LABEL=""
                onClick={() => {}}
                FIRE_clickEvent={false}
              />
            </li>
          );
        })}
        {end_CATEG.map((categ) => {
          return (
            <li key={categ.name?.en}>
              <Btn
                styles={["btn-44", "flex", "text-left-auto"]}
                left_ICON={<img src={categ.icon?.url} />}
                text={categ.name.en}
                aria_LABEL=""
                onClick={() => {}}
                FIRE_clickEvent={false}
              />
            </li>
          );
        })}

        {end_CATEG.map((categ) => {
          return (
            <li key={categ.name?.en}>
              <Btn
                styles={["btn-44", "flex", "text-left-auto"]}
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
    </>
  );
}
