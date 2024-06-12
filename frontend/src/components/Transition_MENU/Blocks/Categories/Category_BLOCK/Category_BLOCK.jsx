//
//

import css from "../../Blocks.module.css";
import { Btn } from "../../../../Btn/Btn";

export function Category_BLOCK({ category_OBJ, categoryChildren_ARR }) {
  return (
    <div className={css.Block}>
      <p>Find {category_OBJ.name.en}</p>
      <li>
        <Btn
          styles={["btn-44", "flex", "text-left-auto"]}
          text={`All ${category_OBJ.name.en}`}
          aria_LABEL=""
          onClick={() => {}}
          FIRE_clickEvent={false}
        />
      </li>
      {categoryChildren_ARR.map((categ) => {
        return (
          <li key={categ._id}>
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
  );
}
