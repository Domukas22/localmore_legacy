//

import PropTypes from "prop-types";
import css from "../../ProfilePreview.module.css";
import { Btn } from "../../../btn/btn";
import { ICON_x } from "../../../icons/icons";

export default function tag_OVERLAY({ tags, name, TOGGLE_showTags }) {
  return (
    <>
      <div className={css.tagPreview_TOP}>
        <h4>
          {tags.length} Tags of {name}
        </h4>
        <Btn
          styles={["btn-36", "onImg", "close"]}
          onClick={() => TOGGLE_showTags()}
          right_ICON={<ICON_x />}
          aria_LABEL={"Close tag preview"}
        />
      </div>
      <div className={css.tagPreview_BOTTOM}>
        {tags.map((tag) => {
          return (
            <Btn
              key={tag._id}
              styles={["btn-36", "onImg", "round"]}
              leftIcon_URL={tag.icon.url}
              right_ICON={<ICON_x rotate={true} />}
              text={tag.name.en}
              aria_LABEL={`Tag ${tag.name.en}`}
              onClick={() => alert("No function provided")}
            />
          );
        })}
      </div>
    </>
  );
}
tag_OVERLAY.propTypes = {
  tags: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  TOGGLE_showTags: PropTypes.func.isRequired,
};
