import { USE_fetchData } from "./USE_fetchData";
import { database_URL } from "../../config";

export default function USE_fetchTagUsages() {
  const {
    data: tagUsages,
    loading: LOADING_tagUsages,
    error: tagUsages_ERROR,
  } = USE_fetchData(`${database_URL}/tagUsages`);

  if (tagUsages_ERROR) console.log(tagUsages_ERROR);

  return { tagUsages, LOADING_tagUsages, tagUsages_ERROR };
}
