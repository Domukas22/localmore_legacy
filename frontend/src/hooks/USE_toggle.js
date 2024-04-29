//

import { useState } from "react";

export default function USE_Toggle(initialState = false) {
  const [state, SET_state] = useState(initialState);
  const toggle = () => SET_state((prev) => !prev);
  const SET_ToggleStatus = (value) => SET_state(Boolean(value));

  return [state, toggle, SET_ToggleStatus];
}
