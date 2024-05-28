//
//
import { Categories_DD } from "../../../../components/Nav/components/Dropdowns/Categories_DD";
import { Btn } from "../../../../components/btn/btn";
import css from "./Tagbar.module.css";
import { ICON_x } from "../../../../components/icons/icons";

export function Tagbar({ categories, tags }) {
  return (
    <header className={css.header}>
      <ul className={css.tag_WRAP}>
        {/* <li>
          <Categories_DD categories={categories} />
        </li>
        {tags?.map((tag, index) => {
          return (
            <li key={tag._id}>
              {console.log((index + 1) * 0.02)}
              <Btn
                key={tag._id}
                styles={["btn-36", "round"]}
                leftIcon_URL={tag.icon?.url ? tag.icon?.url : ""}
                right_ICON={<ICON_x rotate={true} />}
                text={tag.name?.en}
                // aria_LABEL={tr?.filterTagBtn_ARIA(tag.name?.[lang])[lang]}
                onClick={() => alert("No function provided")}
                test_ID={"overlay-tag-btn"}
              />
            </li>
          );
        })} */}
        {categories?.map((categ) => {
          return (
            <li key={categ._id}>
              <Btn
                styles={["btn-36", "round"]}
                left_ICON={<img src={categ.icon?.url} />}
                text={categ.name.en}
                aria_LABEL=""
                onClick={() => {}}
                FIRE_clickEvent={false}
              />
            </li>
          );
        })}
      </ul>
    </header>
  );
}

// function Categories_DD({ categories }) {
//   return (
//     <Btn
//       styles={["btn-40", "round", "nav-DD"]}
//       text="Categories"
//       right_ICON={<ICON_dropDownArrow />}
//       aria_LABEL=""
//       onClick={() => {}}
//     />
//   );
// }
