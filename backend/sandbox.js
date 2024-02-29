
// CREATE_tag

{
  marked: {
    val: {{c_TOGGLE_tagMark.value}},
    notes: "{{c_INPUT_tagMarkedNote.value}}"
  },
  new: true,
  type: "tag",
  slug: "{{c_INPUT_tagSlug.value}}",
  icon: { "$oid": "{{c_DD_tagIcon.value}}"},
  name: {
    en: "{{c_INPUT_tagNameEN.value}}",
    de: "{{c_INPUT_tagNameDE.value}}",
  },
  "createdAt": {"$date": "{{new Date().toISOString()}}"}
  "updatedAt": {"$date": "{{new Date().toISOString()}}"}
}

{ $currentDate: { $type: "date"}}

db.collection.update(
  { /* query criteria to match the document */ },
  {
    "$setOnInsert": {
      "createdAt": new Date()
    },
    "$currentDate": {
      "updatedAt": true
    },
    // Other $set operations...
  },
  { "upsert": true }
)