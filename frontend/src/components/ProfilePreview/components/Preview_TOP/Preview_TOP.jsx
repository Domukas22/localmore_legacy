//

import PropTypes from "prop-types";
import { useContext } from "react";
import css from "../../ProfilePreview.module.css";
import { Btn, Btn_profilePreviewIcons } from "../../../btn/btn";
import { ICON_save, ICON_activeDigit } from "../../../icons/icons";
import { SavedProfileIDs_CONTEXT } from "../../../../contexts/savedProfiles";
import { Lang_CONTEXT } from "../../../../contexts/lang";

export default function Preview_SWIPER({
  profile,
  TOGGLE_showTags,
  SET_panoramas,
  windowWidth,
  SHOW_tags,
}) {
  const { savedProfile_IDs, ADD_toSaved, REMOVE_fromSaved } = useContext(SavedProfileIDs_CONTEXT);
  const { lang } = useContext(Lang_CONTEXT);

  const IS_saved = savedProfile_IDs.has(profile._id);
  const IS_new = (new Date() - new Date(profile.createdAt)) / (1000 * 60 * 60) <= 72; // 72 hours

  return (
    <div className={css.top}>
      {IS_new && <div className={css.labelNew}>New</div>}

      <div className={css.top_RIGHT}>
        <Btn_profilePreviewIcons
          icons={profile.tags.map((t) => t.icon.url)}
          profile_ID={profile._id}
          onClick={() => {
            TOGGLE_showTags();
          }}
          visibleIcon_COUNT={windowWidth > 400 ? 3 : windowWidth > 380 ? 2 : 1}
          IS_open={SHOW_tags}
          activeDigit={<ICON_activeDigit count={1 /* get mathcing tag count */} IS_active={true} />}
          aria_LABEL={`${lang === "en" ? "Show tags of" : "Tags von"} ${profile.name.en} ${
            lang === "de" && "anzeigen"
          }`}
        />
        {Object.keys(profile.img.panoramas).length > 0 && (
          <Btn
            styles={["btn-36", "onImg"]}
            onClick={() => SET_panoramas(profile.img.panoramas)}
            text={"360"}
            aria_LABEL={`Show 360 panorama of ${profile.name.en}`}
          />
        )}
        <Btn
          styles={["btn-36", "onImg", "save"]}
          onClick={() => (IS_saved ? REMOVE_fromSaved(profile._id) : ADD_toSaved(profile._id))}
          saved={IS_saved}
          left_ICON={<ICON_save style={IS_saved ? "active" : "white"} />}
          aria_LABEL={`Save ${profile.name.en}`}
        />
      </div>
    </div>
  );
}
Preview_SWIPER.propTypes = {
  profile: PropTypes.object.isRequired,
  TOGGLE_showTags: PropTypes.func.isRequired,
  SET_panoramas: PropTypes.func.isRequired,
  windowWidth: PropTypes.number.isRequired,
  SHOW_tags: PropTypes.bool.isRequired,
};
