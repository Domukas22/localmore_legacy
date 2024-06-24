//
//

import { USE_fetchData } from "./USE_fetchData";
import { database_URL } from "../../config";
import { useEffect, useState } from "react";

export default function USE_fetchCategories() {
  const [available_CATEGORIES, SET_availableCategories] = useState([]);

  const {
    data: categories,
    loading: LOADING_categories,
    error: categories_ERROR,
  } = USE_fetchData(`${database_URL}/categories`);

  useEffect(() => {
    if (categories) {
      SET_availableCategories(categories?.filter((category) => category?.visible));
    }
  }, [categories]);

  if (categories_ERROR) console.log(categories_ERROR);
  return { categories, LOADING_categories, categories_ERROR, available_CATEGORIES };
}
