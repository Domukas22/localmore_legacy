//

export default function USE_getName(profile, lang) {
  return profile?.name?.[lang] && profile?.name?.[lang] !== ""
    ? profile?.name?.[lang]
    : "Profile name not found";
}
