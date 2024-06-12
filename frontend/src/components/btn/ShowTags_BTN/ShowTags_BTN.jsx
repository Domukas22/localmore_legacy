//
//

import { Button } from "react-aria-components";
import css from "../Btn.module.css";
import { ICON_activeDigit } from "../../icons/icons";
import { profilePreview_TR } from "../../../translations";

export function ShowTags_BTN({
  onClick = () => alert("No function provided"),
  matchedTags_COUNT,
  lang,
  profile,
  visibleIcon_COUNT,
}) {
  const name = profile?.name?.[lang] || "Profile name not found";
  const icons = profile?.tags?.map((t) => (t.icon?.url ? t.icon.url : ""));
  const displayedIcons = icons ? icons.slice(0, visibleIcon_COUNT) : [];
  const remainingTagsCount =
    displayedIcons.length > 0 ? Math.max(0, icons.length - visibleIcon_COUNT) : 0;

  return (
    <Button
      className={css["onBlur"]}
      onPress={() => {
        onClick();

        document.dispatchEvent(new Event("click")); // for the dropdowns
        console.log("click");
      }}
      aria-label={profilePreview_TR?.showTagsBtn_ARIA(name)[lang]}
    >
      {matchedTags_COUNT > 0 && <ICON_activeDigit count={matchedTags_COUNT} IS_active={true} />}
      {icons && displayedIcons.map((icon) => <img key={icon} src={icon} className={css.icon} />)}
      {!icons && <p>No tags</p>}
      {remainingTagsCount > 0 && visibleIcon_COUNT && (
        <>
          {remainingTagsCount === 1 ? (
            icons && <img src={icons[visibleIcon_COUNT]} className={css.icon} />
          ) : (
            <p>+{remainingTagsCount}</p>
          )}
        </>
      )}
    </Button>
  );
}
