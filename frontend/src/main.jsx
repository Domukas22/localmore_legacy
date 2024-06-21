import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import { FontSizeProvider } from "./contexts/fontSize.jsx";
import { Theme_PROVIDER } from "./contexts/theme.jsx";
import { Lang_PROVIDER } from "./contexts/lang.jsx";
import { SavedProfileIDs_PROVIDER } from "./contexts/savedProfiles.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Profile } from "./pages/Profile/Profile.jsx";

import { base_URL } from "./config.js";
import Contact_PAGE from "./pages/simple/Contact_PAGE/Contact_PAGE.jsx";
import ReportProblem_PAGE from "./pages/simple/Feedback/ReportProblem_PAGE/ReportProblem_PAGE.jsx";
import SuggestIdea_PAGE from "./pages/simple/Feedback/SuggestIdea_PAGE/SuggestIdea_PAGE.jsx";

// Use Node's process.env to check if in production
const isProduction = import.meta.env.PROD;

console.log(import.meta);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Theme_PROVIDER>
      <FontSizeProvider>
        <Lang_PROVIDER>
          <SavedProfileIDs_PROVIDER>
            <BrowserRouter basename={new URL(base_URL).pathname}>
              <Routes>
                <Route path={isProduction ? "/localmore" : "/"} element={<App />} />
                <Route
                  path={isProduction ? "/localmore/profile/:id" : "/profile/:id"}
                  element={<Profile />}
                />
                <Route
                  path={isProduction ? "/localmore/contact" : "/contact"}
                  element={<Contact_PAGE />}
                />
                <Route
                  path={isProduction ? "/localmore/reportProblem" : "/reportProblem"}
                  element={<ReportProblem_PAGE />}
                />
                <Route
                  path={isProduction ? "/localmore/suggestIdea" : "/suggestIdea"}
                  element={<SuggestIdea_PAGE />}
                />
                {/* <Route path="*" element={<NoPageFound />} /> */}
              </Routes>
            </BrowserRouter>
          </SavedProfileIDs_PROVIDER>
        </Lang_PROVIDER>
      </FontSizeProvider>
    </Theme_PROVIDER>
  </React.StrictMode>
);

// TODO => fix github deployment
