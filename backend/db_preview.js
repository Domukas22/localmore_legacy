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
  tag_STRCUTURE: [
    {
      tags: {
        tagGroup_1: ["tag_1"],
        tagGroup_2: ["tag_2"],
      },
      inheritance: {
        tagGroup_1: ["categ_1, categ_2"],
        tagGroup_2: ["categ_1"],
      },
      tagUsages: [
        { categ_ID: "categ_1", tagGroup_ID: "tagGroup_1", tag_ID: "tag_1" },
        { categ_ID: "categ_2", tagGroup_ID: "tagGroup_1", tag_ID: "tag_1" },
        { categ_ID: "categ_1", tagGroup_ID: "tagGroup_2", tag_ID: "tag_2" },
      ],
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
