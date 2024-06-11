//
//

export function USE_getCategories(categories) {
  const startCateg_ARR = categories
    .filter((c) => c.IS_startCategory && !c.IS_endCategory)
    .sort((a, b) => a.name.en.localeCompare(b.name.en));

  const endCateg_ARR = categories
    .filter((c) => c.IS_endCategory && !c.IS_startCategory)
    .sort((a, b) => a.name.en.localeCompare(b.name.en));

  const GET_subCategories = (categ_OBJ) => {
    return categories.filter((c) => categ_OBJ.child_CATEG.some((categ_ID) => categ_ID === c._id));
  };

  return { startCateg_ARR, endCateg_ARR, GET_subCategories };
}
