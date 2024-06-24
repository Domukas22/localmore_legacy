import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Profile_PAGE } from "./pages/Profile_PAGE/Profile_PAGE.jsx";

import Contact_PAGE from "./pages/simple/Contact_PAGE/Contact_PAGE.jsx";
import ReportProblem_PAGE from "./pages/simple/ReportProblem_PAGE/ReportProblem_PAGE.jsx";
import SuggestIdea_PAGE from "./pages/simple/SuggestIdea_PAGE/SuggestIdea_PAGE.jsx";
import Survey_PAGE from "./pages/simple/Survey_PAGE/Survey_PAGE.jsx";
import Attributions_PAGE from "./pages/simple/Attributions_PAGE/Attributions_PAGE.jsx";
import Consent_PAGE from "./pages/simple/Consent_PAGE/Consent_PAGE.jsx";
import Privacy_PAGE from "./pages/simple/Privacy_PAGE/Privacy_PAGE.jsx";
import AppProviders from "./contexts/AppProviders.jsx";
import Impressum_PAGE from "./pages/simple/Impressum_PAGE/Impressum_PAGE.jsx";
import _404_PAGE from "./pages/simple/_404_PAGE/_404_PAGE.jsx";

// Use Node's process.env to check if in production
const isProduction = import.meta.env.PROD;
const basePath = isProduction ? "/localmore" : "";
console.log("basePath", basePath);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProviders>
      <BrowserRouter basename={basePath}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/profile/:id" element={<Profile_PAGE />} />
          <Route path="/contact" element={<Contact_PAGE />} />
          <Route path="/suggestIdea" element={<SuggestIdea_PAGE />} />
          <Route path="/reportProblem" element={<ReportProblem_PAGE />} />
          <Route path="/survey" element={<Survey_PAGE />} />
          <Route path="/impressum" element={<Impressum_PAGE />} />
          <Route path="/consent" element={<Consent_PAGE />} />
          <Route path="/privacy" element={<Privacy_PAGE />} />
          <Route path="/attributions" element={<Attributions_PAGE />} />
          <Route path="*" element={<_404_PAGE />} />
          <Route path="*" element={<_404_PAGE />} />
        </Routes>
      </BrowserRouter>
    </AppProviders>
  </React.StrictMode>
);

// TODO => fix github deployment
