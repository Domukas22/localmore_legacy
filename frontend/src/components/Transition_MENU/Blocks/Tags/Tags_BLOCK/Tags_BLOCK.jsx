//
//
import css from "../../Blocks.module.css";
import { Btn } from "../../../../Btn/Btn";
import { ICON_x } from "../../../../icons/icons";

export function Tags_BLOCK({ title, tags, activeTag_IDs, UPDATE_tags, tag_COUNTS, width = 901 }) {
  return (
    <div className={css.Block}>
      {/* <p>All tags</p> */}
      <p>{title}</p>
      {tags?.map((tag) => {
        const IS_active = activeTag_IDs.has(tag._id);
        return (
          <li key={tag._id}>
            <Btn
              key={tag._id}
              styles={[
                `${width > 900 ? "btn-40" : "btn-44"}`,
                "fullWidth",
                `${IS_active ? "active" : ""}`,
                "text-left-auto",
              ]}
              left_ICON={<img src={tag.icon?.url ? tag.icon?.url : ""} />}
              right_ICON={
                IS_active ? (
                  <ICON_x color="brand" small={true} />
                ) : (
                  <span>{tag_COUNTS?.[tag._id]}</span>
                )
              }
              text={tag?.name?.en}
              onClick={() => UPDATE_tags(tag, IS_active ? "remove" : "add")}
            />
          </li>
        );
      })}
    </div>
  );
}
