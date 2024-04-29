//

export default function USE_showSwiper(profile) {
  return {
    desktop: profile?.img?.desktop && profile.img.desktop?.length > 1,
    mobile: profile?.img?.mobile && profile.img.mobile?.length > 1,
  };
}
