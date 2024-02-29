//

const categ_residents = {
  _id: "categResidentsID",
  name: "Residents",
  tagGroups: ["hobbyGroupID", "regionGroupID"],
};

const tagGroup_hobbies = {
  _id: "groupHobbiesID",
  name: "Hobbies",
};

const profile = {
  _id: "profileID_ben",
  name: "Ben",
  category: "categResidentsID",
  tag_STRUCTURE: [
    {
      categ_ID: {
        tagGroupId: ["tag_ID"],
        tagGroupId: ["tag_ID"],
      },
      categ_ID: {
        tagGroupId: ["tag_ID"],
        tagGroupId: ["tag_ID"],
      },
    },
  ],
};

const tag_swimming = {
  _id: "tagSwimmingID",
  name: "Swimming",
};

const tagUsage_swimming = {
  desc: "Tag Swimming in category Residents",
  tag_ID: "tagSwimmingID",
  category_ID: "categResidentsID",
  group_ID: "groupHobbiesID",
  count: 1,
};
