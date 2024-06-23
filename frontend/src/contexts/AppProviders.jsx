//
//

import { FontSizeProvider } from "./fontSize";
import { Lang_PROVIDER } from "./lang";
import { SavedProfileIDs_PROVIDER } from "./savedProfiles";
import { Theme_PROVIDER } from "./theme";

export default function AppProviders({ children }) {
  return (
    <Theme_PROVIDER>
      <FontSizeProvider>
        <Lang_PROVIDER>
          <SavedProfileIDs_PROVIDER>{children}</SavedProfileIDs_PROVIDER>
        </Lang_PROVIDER>
      </FontSizeProvider>
    </Theme_PROVIDER>
  );
}
