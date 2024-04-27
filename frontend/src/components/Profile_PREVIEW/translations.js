//

export const tr = {
  showTagsBtn_ARIA: (word) => ({
    en: word ? `Show tags of ${word}` : "Show tags",
    de: word ? `Tags von ${word} anzeigen` : "Tags anzeigen",
  }),
  hideTagsBtn_ARIA: (word) => ({
    en: word ? `Hide tags of ${word}` : "Hide tags",
    de: word ? `Tags von ${word} verstecken` : "Tags verstecken",
  }),
  panoramaBtn_ARIA: (word) => ({
    en: word ? `Show panorama of ${word}` : "Show panorama",
    de: word ? `Panorama von ${word} anzeigen` : "Panorama anzeigen",
  }),
  saveBtn_ARIA: (word) => ({
    en: word ? `Save ${word}` : "Save profile",
    de: word ? `${word} speichern` : "Profil peichern",
  }),
  visitProfileBtn_ARIA: (word) => ({
    en: word ? `Visit ${word} profile` : "Visit profile",
    de: word ? `Profil ${word} besuchen` : "Profil besuchen",
  }),
  prevImageBtn_ARIA: (word) => ({
    en: word ? `Show previous image of ${word}` : "Show previous image",
    de: word ? `Vorheriges Bild von ${word} anzeigen` : "Vorheriges Bild anzeigen",
  }),
  nextImageBtn_ARIA: (word) => ({
    en: word ? `Show next image of ${word}` : "Show next image",
    de: word ? `Nächstes Bild von ${word} anzeigen` : "Nächstes Bild anzeigen",
  }),
  filterTagBtn_ARIA: (word) => ({
    en: word ? `Add tag ${word} to filters` : `Add tag to filters`,
    de: word ? `Tag ${word} zu Filtern hinfügen` : `Tag zu Filtern hinfügen`,
  }),
};
