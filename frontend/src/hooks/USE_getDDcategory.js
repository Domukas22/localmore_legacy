//
//
import { USE_getCategIDs } from "./USE_getCategIDs";

export function USE_getCategoryByID(id) {
  const [businessCateg_ID, placesCateg_ID] = USE_getCategIDs();
  const category = id === businessCateg_ID ? "businesses" : id === placesCateg_ID ? "places" : null;

  return category;
}
