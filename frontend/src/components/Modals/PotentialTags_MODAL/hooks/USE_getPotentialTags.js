//
//

import { useMemo } from "react";

export function USE_getPotentialTags({ all_TAGS, potentialTag_IDs, activeTag_IDs }) {
  const potentialStayTag_IDs = Array.from(activeTag_IDs).filter(
    (tag_ID) => !potentialTag_IDs.toDelete_IDs.has(tag_ID)
  );

  const potentialAdd_TAGS = useMemo(
    () => all_TAGS.filter((tag) => potentialTag_IDs.toAdd_IDs.has(tag._id)),
    [all_TAGS, potentialTag_IDs]
  );
  const potentialDelete_TAGS = useMemo(
    () => all_TAGS.filter((tag) => potentialTag_IDs.toDelete_IDs.has(tag._id)),
    [all_TAGS, potentialTag_IDs]
  );
  const potentialStay_TAGS = useMemo(
    () => all_TAGS.filter((tag) => potentialStayTag_IDs.includes(tag._id)),
    [all_TAGS, potentialStayTag_IDs]
  );

  return {
    potentialAdd_TAGS,
    potentialDelete_TAGS,
    potentialStay_TAGS,
  };
}
