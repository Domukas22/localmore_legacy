//

import { createContext, useState } from "react";

const SavedProfileIDs_CONTEXT = createContext({
  savedProfile_IDs: [],
  ADD_toSaved: () => {},
  REMOVE_fromSaved: () => {},
});

const SavedProfileIDs_PROVIDER = ({ children }) => {
  const [savedProfile_IDs, SET_savedProfileIDs] = useState(
    new Set(JSON.parse(localStorage.getItem("savedProfile_IDs")) || [])
  );

  const ADD_toSaved = (profileID) => {
    SET_savedProfileIDs((prevIDs) => new Set([...prevIDs, profileID]));
    localStorage.setItem("savedProfile_IDs", JSON.stringify([...savedProfile_IDs, profileID]));
  };

  const REMOVE_fromSaved = (profileID) => {
    const newIDs = new Set(savedProfile_IDs);
    newIDs.delete(profileID);
    SET_savedProfileIDs(newIDs);
    localStorage.setItem("savedProfile_IDs", JSON.stringify(Array.from(newIDs)));
  };

  return (
    <SavedProfileIDs_CONTEXT.Provider value={{ savedProfile_IDs, ADD_toSaved, REMOVE_fromSaved }}>
      {children}
    </SavedProfileIDs_CONTEXT.Provider>
  );
};

export { SavedProfileIDs_CONTEXT, SavedProfileIDs_PROVIDER };
