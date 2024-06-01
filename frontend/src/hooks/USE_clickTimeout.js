//
//

import { useState } from "react";

export function USE_clickTimeout(timeout = 3000) {
  const [locked, SET_locked] = useState(false);

  const fire = () => {
    if (locked) return;
    SET_locked(true);
    setTimeout(() => {
      SET_locked(false);
    }, timeout);
  };

  return { locked, fire };
}
