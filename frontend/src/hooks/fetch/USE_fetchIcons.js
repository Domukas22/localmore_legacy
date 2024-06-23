//
//

import { USE_fetchData } from "./USE_fetchData";
import { base_URL } from "../../config";

export default function USE_fetchIcons() {
  const {
    data: icons,
    loading: LOADING_icons,
    error: icons_ERROR,
  } = USE_fetchData(`${base_URL}/icons`);

  if (icons_ERROR) console.log(icons_ERROR);
  return { icons, LOADING_icons, icons_ERROR };
}
