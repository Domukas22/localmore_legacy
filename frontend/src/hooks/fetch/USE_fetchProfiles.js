//
//

import { USE_fetchData } from "./USE_fetchData";
import { database_URL } from "../../config";

export default function USE_fetchProfiles() {
  const {
    data: profiles,
    loading: LOADING_profiles,
    error: profiles_ERROR,
  } = USE_fetchData(`${database_URL}/staticProfiles`);

  if (profiles_ERROR) console.log(profiles_ERROR);
  return { profiles, LOADING_profiles, profiles_ERROR };
}
