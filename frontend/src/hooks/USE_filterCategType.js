//
//

import { USE_getCategIDs } from "./USE_getCategIDs";

export function USE_filterCategType(categories) {
  const [businessCateg_ID, placesCateg_ID] = USE_getCategIDs();

  const startCateg_ARR = categories
    .filter((c) => c.IS_startCategory && !c.IS_endCategory)
    .sort((a, b) => a.name.en.localeCompare(b.name.en));

  const endCateg_ARR = categories
    .filter((c) => c.IS_endCategory && !c.IS_startCategory)
    .sort((a, b) => a.name.en.localeCompare(b.name.en));

  const businessCateg_ARR = categories.filter((c) => c.parent_CATEG === businessCateg_ID);
  const placesCateg_ARR = categories.filter((c) => c.parent_CATEG === placesCateg_ID);

  return { startCateg_ARR, endCateg_ARR, businessCateg_ARR, placesCateg_ARR };
}
