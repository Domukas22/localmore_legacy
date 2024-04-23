//

import { createContext } from "react";

export const savedProfileIDs_CONTEXT = createContext({
  savedProfile_IDs: [],
  ADD_toSaved: () => {},
  REMOVE_fromSaved: () => {},
});
