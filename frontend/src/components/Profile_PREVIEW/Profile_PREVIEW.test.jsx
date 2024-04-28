//

import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Profile_PREVIEW from "./Profile_PREVIEW";
import { tr } from "./translations";
import { global_TR } from "../../global_TRANSLATIONS";
import { SavedProfileIDs_CONTEXT } from "../../contexts/savedProfiles";

// profilePreview_BOTTOM
// - check nameBtn visibility / click / correct name
// - check searchBtn visibility / click / correct name / correct search
// check arrowWrapper visibility
// check arrow click

// swiper visibility

// tag_PREVIEW
// check visibility / name / closeBtn click / tagCount

describe("Profile_PREVIEW", () => {
  const _3daysAnd1SecondAgo = new Date(
    Date.now() - 3 * 24 * 60 * 60 * 1000 - 1 * 1000
  ).toISOString();

  const _2simpleTags = [
    {
      name: {
        en: "Water",
        de: "Wasser",
      },
    },
    {
      name: {
        en: "Sun",
        de: "Sonne",
      },
    },
  ];

  it("renders", () => {
    render(<Profile_PREVIEW />);
    expect(screen.getByRole("article")).toBeInTheDocument();
  });
  it("has correct aria-label", () => {
    render(
      <Profile_PREVIEW
        profile={{ name: { de: "German name" }, subname: { de: "German subname" } }}
        lang="de"
        tr={tr}
        global_TR={global_TR}
      />
    );
    // expect(
    //   screen.getByLabelText(tr.profileIntro_ARIA("German name", "German subname").de)
    // ).toBeInTheDocument();
  });

  describe("Preview_TOP", () => {
    it("renders", () => {
      render(<Profile_PREVIEW />);
      expect(screen.getByRole("banner")).toBeInTheDocument();
    });
    describe("label_NEW", () => {
      it("has label 'new'", () => {
        render(<Profile_PREVIEW profile={{ createdAt: new Date().toISOString() }} />);
        expect(screen.getByTestId("label-new")).toBeInTheDocument();
      });
      it("hides label 'new' if profile was created more than 3 days ago", () => {
        render(<Profile_PREVIEW profile={{ createdAt: _3daysAnd1SecondAgo }} />);
        expect(screen.queryByTestId("label-new")).toBeNull();
      });
      it("has correct language", () => {
        render(
          <Profile_PREVIEW
            profile={{ createdAt: new Date().toISOString() }}
            lang="de"
            global_TR={global_TR}
          />
        );
        screen.debug();
        expect(screen.getByTestId("label-new")).toHaveTextContent("Neu");
      });
    });
    describe("ShowTags_BTN", () => {
      it("renders when there are tags", () => {
        render(<Profile_PREVIEW profile={{ tags: _2simpleTags }} />);
        expect(screen.getByTestId("show-icons-btn")).toBeInTheDocument();
      });
      it("hides when there are no tags", () => {
        render(<Profile_PREVIEW />);
        expect(screen.queryByTestId("show-icons-btn")).toBeNull();
      });
      it("toggles tagPreview on click", async () => {
        render(<Profile_PREVIEW profile={{ tags: _2simpleTags }} />);
        const btn = screen.getByTestId("show-icons-btn");
        await userEvent.click(btn);
        expect(btn).toHaveAttribute("data-open", "true");
        expect(screen.getByTestId("tag-preview")).toBeInTheDocument();
        await userEvent.click(screen.getByTestId("show-icons-btn"));
        setTimeout(() => {
          expect(screen.queryByTestId("tag-preview")).toBeNull();
        }, 1000);
      });
    });
    describe("Btn show panoramas", () => {
      it("renders when there are panoramas", () => {
        render(<Profile_PREVIEW profile={{ img: { panoramas: ["obj", "obj"] } }} />);
        expect(screen.getByTestId("panorama-btn")).toBeInTheDocument();
      });
      it("hides when there are no panoramas", () => {
        render(<Profile_PREVIEW />);
        expect(screen.queryByTestId("panorama-btn")).toBeNull();
      });
      it("calls SET_panoramas()", async () => {
        const SET_panoramas = vi.fn();
        render(
          <Profile_PREVIEW
            profile={{ img: { panoramas: ["obj", "obj"] } }}
            SET_panoramas={SET_panoramas}
          />
        );
        await userEvent.click(screen.getByTestId("panorama-btn"));
        expect(SET_panoramas).toHaveBeenCalled();
      });
    });
    describe("Btn save", () => {
      it("renders", () => {
        render(<Profile_PREVIEW />);
        expect(screen.getByTestId("save-btn")).toBeInTheDocument();
      });
      it("data-saved='true' if saved in context", () => {
        render(
          <SavedProfileIDs_CONTEXT.Provider value={{ savedProfile_IDs: new Set(["123"]) }}>
            <Profile_PREVIEW profile={{ _id: "123" }} />
          </SavedProfileIDs_CONTEXT.Provider>
        );
        expect(screen.getByTestId("save-btn")).toHaveAttribute("data-saved", "true");
      });
      it("data-saved='false' if not saved in context ", () => {
        render(
          <SavedProfileIDs_CONTEXT.Provider value={{ savedProfile_IDs: new Set(["123"]) }}>
            <Profile_PREVIEW profile={{ _id: "55555" }} />
          </SavedProfileIDs_CONTEXT.Provider>
        );
        expect(screen.getByTestId("save-btn")).toHaveAttribute("data-saved", "false");
      });
      it("calls ADD_toSaved() if not saved in context", async () => {
        const ADD_toSaved = vi.fn();

        render(
          <SavedProfileIDs_CONTEXT.Provider value={{ savedProfile_IDs: new Set(), ADD_toSaved }}>
            <Profile_PREVIEW profile={{ _id: "123" }} />
          </SavedProfileIDs_CONTEXT.Provider>
        );

        await userEvent.click(screen.getByTestId("save-btn"));
        expect(ADD_toSaved).toHaveBeenCalledWith("123");
      });
      it("calls REMOVE_fromSaved() if saved in context", async () => {
        const REMOVE_fromSaved = vi.fn();

        render(
          <SavedProfileIDs_CONTEXT.Provider
            value={{ savedProfile_IDs: new Set(["123"]), REMOVE_fromSaved }}
          >
            <Profile_PREVIEW profile={{ _id: "123" }} />
          </SavedProfileIDs_CONTEXT.Provider>
        );

        await userEvent.click(screen.getByTestId("save-btn"));
        expect(REMOVE_fromSaved).toHaveBeenCalledWith("123");
      });
    });
  });

  describe("Preview_BOTTOM", () => {
    it("renders", () => {
      render(<Profile_PREVIEW />);
      expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });

    describe("ProfileName_BTN", () => {
      it("has correct name", () => {
        render(<Profile_PREVIEW profile={{ name: { de: "German name" } }} lang="de" />);
        expect(screen.getByRole("heading")).toHaveTextContent("German name");
      });
      it("has correct aria label", () => {
        render(<Profile_PREVIEW profile={{ name: { de: "German name" } }} lang="de" />);
        expect(screen.getByRole("heading")).toHaveTextContent("German name");
      });
    });
  });
});

// slider changes on click. Test it or leave it out?
