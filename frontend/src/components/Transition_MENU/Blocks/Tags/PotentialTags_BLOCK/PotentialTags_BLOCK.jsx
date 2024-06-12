//
//

import css from "../../Blocks.module.css";
import { Btn } from "../../../../Btn/Btn";
import { ICON_x } from "../../../../icons/icons";

export function PotentialTags_BLOCK({ type, tags, SET_potentialTagIDs }) {
  const x_COLOR = type === "add" ? "green" : type === "delete" ? "red" : "brand";

  return (
    <div className={css.Block}>
      <p>
        {type === "add" ? "Add" : type === "delete" ? "Delete" : "Keep"} {tags?.length || "NUM"}{" "}
        tags
      </p>
      {tags?.map((tag) => (
        <Btn
          key={tag._id}
          styles={[
            "btn-40",
            "fullWidth",
            type === "add" && "green",
            type === "delete" && "red",
            type === "keep" && "active",
            "text-left-auto",
          ]}
          left_ICON={<img src={tag.icon?.url || ""} />}
          right_ICON={<ICON_x color={x_COLOR} small={true} />}
          text={tag?.name?.en || ""}
          onClick={() =>
            SET_potentialTagIDs((prev) => {
              const updated = { ...prev };
              if (type === "delete") updated.toDelete_IDs.delete(tag._id);
              if (type === "add") updated.toAdd_IDs.delete(tag._id);
              if (type === "keep") updated.toDelete_IDs.add(tag._id);
              return updated;
            })
          }
        />
      ))}
    </div>
  );
}
