import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import { FontSizeProvider } from "./contexts/fontSize.jsx";
import { Theme_PROVIDER } from "./contexts/theme.jsx";
import { Lang_PROVIDER } from "./contexts/lang.jsx";
import { SavedProfileIDs_PROVIDER } from "./contexts/savedProfiles.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Theme_PROVIDER>
      <FontSizeProvider>
        <Lang_PROVIDER>
          <SavedProfileIDs_PROVIDER>
            <App />
          </SavedProfileIDs_PROVIDER>
        </Lang_PROVIDER>
      </FontSizeProvider>
    </Theme_PROVIDER>
  </React.StrictMode>
);
