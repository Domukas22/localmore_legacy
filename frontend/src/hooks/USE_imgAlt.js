//

import { global_TR } from "../translations";

export default function USE_imgAlt(profile, lang) {
  return (
    global_TR?.img_ALT(profile?.name, profile?.subname, profile?.city, profile?.adress)[lang] ||
    "Profile image"
  );
}
