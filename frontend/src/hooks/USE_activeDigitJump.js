//
//

import { useEffect, useState } from "react";

export function USE_activeDigitJump(activeTags, timeoutDelay = 500) {
  const [SHOULD_activeDitigJump, SET_activeDitigJump] = useState(false);

  useEffect(() => {
    if (activeTags.size > 0) {
      SET_activeDitigJump(true);
      const timeout = setTimeout(() => {
        SET_activeDitigJump(false);
      }, timeoutDelay);

      return () => clearTimeout(timeout);
    } else {
      SET_activeDitigJump(false);
    }
  }, [activeTags, timeoutDelay]);

  return { SHOULD_activeDitigJump };
}
