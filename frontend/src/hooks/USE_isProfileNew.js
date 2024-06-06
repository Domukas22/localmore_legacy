//
//

export function USE_isProfileNew(profile) {
  if (!profile || !profile.createdAt) return false;
  return (new Date() - new Date(profile?.createdAt)) / (1000 * 60 * 60) <= 72; // 72 hours
}
