//
//

export function USE_getCategories(categories) {
  const startCateg_ARR = categories
    .filter((c) => c.IS_startCategory && !c.IS_endCategory)
    .sort((a, b) => a.name.en.localeCompare(b.name.en));

  const endCateg_ARR = categories
    .filter((c) => c.IS_endCategory && !c.IS_startCategory)
    .sort((a, b) => a.name.en.localeCompare(b.name.en));

  const GET_categoryChildren = (parentCateg_ID) => {
    return categories.filter((c) => c.parent_CATEG === parentCateg_ID);
  };

  return { startCateg_ARR, endCateg_ARR, GET_categoryChildren };
}
