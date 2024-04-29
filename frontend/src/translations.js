//

export const global_TR = {
  new_TEXT: {
    en: "New",
    de: "Neu",
  },
  img_ALT: (name_OBJ, subname_OBJ, city_OBJ, adress_OBJ) => ({
    en: `${name_OBJ?.en}, ${subname_OBJ?.en} ${city_OBJ?.name?.en}, ${adress_OBJ?.street}, ${adress_OBJ?.region} ${city_OBJ?.name?.en}`,
    de: `${name_OBJ?.de}, ${subname_OBJ?.de} ${city_OBJ?.name?.de}, ${adress_OBJ?.street}, ${adress_OBJ?.region} ${city_OBJ?.name?.de}`,
  }),
};

export const profilePreview_TR = {
  profileIntro_ARIA: (name, subname) => ({
    en: name || subname ? `${name}, ${subname}` : "Profile",
    de: name || subname ? `${name}, ${subname}` : "Profil",
  }),
  showTagsBtn_ARIA: (name) => ({
    en: name ? `Show tags of ${name}` : "Show tags",
    de: name ? `Tags von ${name} anzeigen` : "Tags anzeigen",
  }),
  hideTagsBtn_ARIA: (name) => ({
    en: name ? `Hide tags of ${name}` : "Hide tags",
    de: name ? `Tags von ${name} verstecken` : "Tags verstecken",
  }),
  panoramaBtn_ARIA: (name) => ({
    en: name ? `Show panorama of ${name}` : "Show panorama",
    de: name ? `Panorama von ${name} anzeigen` : "Panorama anzeigen",
  }),
  saveBtn_ARIA: (name) => ({
    en: name ? `Save ${name}` : "Save profile",
    de: name ? `${name} speichern` : "Profil peichern",
  }),
  visitProfileBtn_ARIA: (name) => ({
    en: name ? `Visit ${name} profile` : "Visit profile",
    de: name ? `Profil ${name} besuchen` : "Profil besuchen",
  }),
  prevImageBtn_ARIA: (name) => ({
    en: name ? `Show previous image of ${name}` : "Show previous image",
    de: name ? `Vorheriges Bild von ${name} anzeigen` : "Vorheriges Bild anzeigen",
  }),
  nextImageBtn_ARIA: (name) => ({
    en: name ? `Show next image of ${name}` : "Show next image",
    de: name ? `Nächstes Bild von ${name} anzeigen` : "Nächstes Bild anzeigen",
  }),
  filterTagBtn_ARIA: (name) => ({
    en: name ? `Add tag ${name} to filters` : `Add tag to filters`,
    de: name ? `Tag ${name} zu Filtern hinfügen` : `Tag zu Filtern hinfügen`,
  }),

  tagsOverlay_TITLE: (count, word) => ({
    en: word ? `${count} Tags of ${word}` : count ? `${count} tags` : "Tags",
    de: word ? `${count} Tags von ${word}` : count ? `${count} tags` : "Tags",
  }),
};
