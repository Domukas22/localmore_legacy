//

import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Profile_PREVIEW from "./Profile_PREVIEW";
import { profilePreview_TR as tr, global_TR } from "../../translations";
import { SavedProfileIDs_CONTEXT } from "../../contexts/savedProfiles";
import USE_imgAlt from "../../hooks/USE_imgAlt";

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
  it("correct ARIA", () => {
    render(
      <Profile_PREVIEW
        profile={{ name: { de: "German name" }, subname: { de: "German subname" } }}
        lang="de"
        tr={tr}
      />
    );
    expect(screen.getByRole("article")).toHaveAccessibleName(
      tr.profileIntro_ARIA("German name", "German subname").de
    );
  });

  describe("Preview_TOP", () => {
    it("renders", () => {
      render(<Profile_PREVIEW />);
      expect(screen.getByRole("banner")).toBeInTheDocument();
    });
    describe("label_NEW", () => {
      it("not older than 3 days? ==> show", () => {
        render(<Profile_PREVIEW profile={{ createdAt: new Date().toISOString() }} />);
        expect(screen.getByTestId("label-new")).toBeInTheDocument();
      });
      it("older than 3 days? ==> hide", () => {
        render(<Profile_PREVIEW profile={{ createdAt: _3daysAnd1SecondAgo }} />);
        expect(screen.queryByTestId("label-new")).toBeNull();
      });
      it("correct text", () => {
        render(
          <Profile_PREVIEW
            profile={{ createdAt: new Date().toISOString() }}
            lang="de"
            global_TR={global_TR}
          />
        );
        expect(screen.getByTestId("label-new")).toHaveTextContent(global_TR.new_TEXT.de);
      });
    });
    describe("ShowTags_BTN", () => {
      it("has tags? ==> show", () => {
        render(<Profile_PREVIEW profile={{ tags: _2simpleTags }} />);
        expect(screen.getByTestId("show-icons-btn")).toBeInTheDocument();
      });
      it("no tags? ==> hide", () => {
        render(<Profile_PREVIEW />);
        expect(screen.queryByTestId("show-icons-btn")).toBeNull();
      });
      it("toggles tagPreview", async () => {
        render(<Profile_PREVIEW profile={{ tags: _2simpleTags }} />);
        const btn = screen.getByTestId("show-icons-btn");
        await userEvent.click(btn);
        expect(btn).toHaveAttribute("data-open", "true");
        expect(screen.getByTestId("tag-overlay")).toBeInTheDocument();
        await userEvent.click(screen.getByTestId("show-icons-btn"));
        setTimeout(() => {
          expect(screen.queryByTestId("tag-overlay")).toBeNull();
        }, 1000);
      });
      it("correct ARIA", () => {
        render(
          <Profile_PREVIEW
            profile={{ name: { de: "Deutsch" }, tags: _2simpleTags }}
            lang="de"
            tr={tr}
          />
        );
        expect(
          screen.getByRole("button", { name: tr.showTagsBtn_ARIA("Deutsch").de })
        ).toBeInTheDocument();
      });
    });
    describe("Btn show panoramas", () => {
      it("has panoramas? ==> show", () => {
        render(<Profile_PREVIEW profile={{ img: { panoramas: ["obj", "obj"] } }} />);
        expect(screen.getByTestId("panorama-btn")).toBeInTheDocument();
      });
      it("no panoramas? ==> hide", () => {
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
      it("correct ARIA", () => {
        render(
          <Profile_PREVIEW
            profile={{ name: { de: "Deutsch Profil" }, img: { panoramas: ["obj", "obj"] } }}
            lang="de"
            tr={tr}
          />
        );
        expect(
          screen.getByRole("button", {
            name: tr.panoramaBtn_ARIA("Deutsch Profil").de,
          })
        ).toBeInTheDocument();
      });
    });
    describe("Btn save", () => {
      it("renders", () => {
        render(<Profile_PREVIEW />);
        expect(screen.getByTestId("save-btn")).toBeInTheDocument();
      });
      it("saved in context? ==> data-saved='true'", () => {
        render(
          <SavedProfileIDs_CONTEXT.Provider value={{ savedProfile_IDs: new Set(["123"]) }}>
            <Profile_PREVIEW profile={{ _id: "123" }} />
          </SavedProfileIDs_CONTEXT.Provider>
        );
        expect(screen.getByTestId("save-btn")).toHaveAttribute("data-saved", "true");
      });
      it("not saved in context? ==> data-saved='false'", () => {
        render(
          <SavedProfileIDs_CONTEXT.Provider value={{ savedProfile_IDs: new Set(["123"]) }}>
            <Profile_PREVIEW profile={{ _id: "55555" }} />
          </SavedProfileIDs_CONTEXT.Provider>
        );
        expect(screen.getByTestId("save-btn")).toHaveAttribute("data-saved", "false");
      });
      it("not saved in context? ==> click() ==> ADD_toSaved()", async () => {
        const ADD_toSaved = vi.fn();

        render(
          <SavedProfileIDs_CONTEXT.Provider value={{ savedProfile_IDs: new Set(), ADD_toSaved }}>
            <Profile_PREVIEW profile={{ _id: "123" }} />
          </SavedProfileIDs_CONTEXT.Provider>
        );

        await userEvent.click(screen.getByTestId("save-btn"));
        expect(ADD_toSaved).toHaveBeenCalledWith("123");
      });
      it("saved in context? ==> click() ==> REMOVE_toSaved()", async () => {
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
      it("correct ARIA", () => {
        render(<Profile_PREVIEW profile={{ name: { de: "Deutsch Profil" } }} lang="de" tr={tr} />);
        expect(
          screen.getByRole("button", { name: tr.saveBtn_ARIA("Deutsch Profil").de })
        ).toBeInTheDocument();
      });
    });
  });

  describe("Preview_BOTTOM", () => {
    it("renders", () => {
      render(<Profile_PREVIEW />);
      expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });

    describe("ProfileName_BTN", () => {
      // TODO => does it link to profile page?
      it("no search? ==> show", () => {
        render(<Profile_PREVIEW tr={tr} />);
        expect(screen.getByTestId("profile-name-btn")).toBeInTheDocument();
      });
      it("has search? ==> hide", () => {
        render(<Profile_PREVIEW tr={tr} search="search" />);
        expect(screen.queryByTestId("profile-name-btn")).toBeNull();
      });
      it("correct name", () => {
        render(<Profile_PREVIEW profile={{ name: { de: "German name" } }} lang="de" />);
        expect(screen.getByRole("heading")).toHaveTextContent("German name");
      });
      it("correct ARIA", () => {
        render(<Profile_PREVIEW profile={{ name: { de: "Deutsch Profil" } }} lang="de" tr={tr} />);
        expect(
          screen.getByRole("button", {
            name: tr.visitProfileBtn_ARIA("Deutsch Profil").de,
          })
        ).toBeInTheDocument();
      });
    });
    describe("ProfileSearch_BTN", () => {
      // TODO => does it link to profile page?
      it("has search? ==> show", () => {
        render(<Profile_PREVIEW search={"search"} />);
        expect(screen.getByTestId("profile-search-btn")).toBeInTheDocument();
      });
      it("no search? ==> hide", () => {
        render(<Profile_PREVIEW />);
        expect(screen.queryByTestId("profile-search-btn")).toBeNull();
      });
      it("correct name", () => {
        render(
          <Profile_PREVIEW profile={{ name: { de: "German name" } }} lang="de" search={"search"} />
        );
        expect(screen.getByRole("heading")).toHaveTextContent("German name");
      });
      it("correct search", () => {
        render(
          <Profile_PREVIEW profile={{ name: { de: "German name" } }} lang="de" search={"search"} />
        );
        expect(screen.getByRole("paragraph")).toHaveTextContent("search");
      });
      it("correct ARIA", () => {
        render(<Profile_PREVIEW profile={{ name: { de: "Deutsch Profil" } }} lang="de" tr={tr} />);
        expect(
          screen.getByRole("button", {
            name: tr.visitProfileBtn_ARIA("Deutsch Profil").de,
          })
        ).toBeInTheDocument();
      });
    });
    describe("slider_ARROWS", () => {
      it("has more than 1 image? ==> show", () => {
        render(
          <Profile_PREVIEW
            profile={{ img: { desktop: ["img-1", "img-2"], mobile: ["img-1", "img-2"] } }}
          />
        );
        expect(screen.getByTestId("swiper-arrows")).toBeInTheDocument();
      });
      it("has 1 or less images? ==> hide", () => {
        render(<Profile_PREVIEW profile={{ img: { desktop: ["img-1"], mobile: ["img-1"] } }} />);
        expect(screen.queryByTestId("swiper-arrows")).toBeNull();
      });
    });
    describe("swiper", () => {
      it("has more than 1 image? ==> show", () => {
        render(
          <Profile_PREVIEW
            profile={{ img: { desktop: ["img-1", "img-2"], mobile: ["img-1", "img-2"] } }}
          />
        );
        expect(screen.getByTestId("swiper")).toBeInTheDocument();
      });
      it("has 1 or less images? ==> hide", () => {
        render(<Profile_PREVIEW profile={{ img: { desktop: ["img-1"], mobile: ["img-1"] } }} />);
        expect(screen.queryByTestId("swiper")).toBeNull();
      });
      it("correct image ARIA", () => {
        render(
          <Profile_PREVIEW
            lang={"de"}
            profile={{
              name: { de: "baby", en: "baby" },
              img: { desktop: ["img-1", "img-2", "img-3"], mobile: ["img-1", "img-2", "img-3"] },
            }}
            tr={tr}
          />
        );
        // checking the ARIA text of 3 images
        const img_ALT = USE_imgAlt({ name: { de: "baby", en: "baby" } })["de"];
        expect(screen.getAllByRole("img", { alt: img_ALT })).toHaveLength(3);
      });
    });
  });

  describe("Tag_OVERLAY", () => {
    it("toggles after clicking ShowTags_BTN", async () => {
      render(<Profile_PREVIEW profile={{ tags: _2simpleTags }} />);
      const btn = screen.getByTestId("show-icons-btn");
      await userEvent.click(btn);
      expect(screen.getByRole("complementary")).toBeInTheDocument();
      await userEvent.click(screen.getByTestId("show-icons-btn"));
      setTimeout(() => {
        expect(screen.queryByRole("complementary")).toBeNull();
      }, 1000);
    });
    it("correct title", async () => {
      render(
        <Profile_PREVIEW
          profile={{ tags: _2simpleTags, name: { de: "Kartoffel" } }}
          tr={tr}
          lang="de"
        />
      );
      const btn = screen.getByTestId("show-icons-btn");
      await userEvent.click(btn);

      expect(
        screen.getByText(tr.tagsOverlay_TITLE(_2simpleTags.length, "Kartoffel").de)
      ).toBeInTheDocument();
    });
    describe("close overlay btn", () => {
      it("correct ARIA", async () => {
        render(
          <Profile_PREVIEW
            profile={{ tags: _2simpleTags, name: { de: "Kartoffel" } }}
            lang="de"
            tr={tr}
          />
        );
        const btn = screen.getByTestId("show-icons-btn");
        await userEvent.click(btn);

        expect(screen.getByTestId("close-tag-overlay-btn")).toHaveAccessibleName(
          tr?.hideTagsBtn_ARIA("Kartoffel").de
        );
      });
      it("closes overlay", async () => {
        render(
          <Profile_PREVIEW
            profile={{ tags: _2simpleTags, name: { de: "Kartoffel" } }}
            lang="de"
            tr={tr}
          />
        );
        const btn = screen.getByTestId("show-icons-btn");
        await userEvent.click(btn);
        await userEvent.click(screen.getByTestId("close-tag-overlay-btn"));
        setTimeout(() => {
          expect(screen.queryByRole("complementary")).toBeNull();
        }, 1000);
      });
    });
    describe("tags", () => {
      // TODO => applies / removes tags from filters
      it("correct ARIA", async () => {
        render(
          <Profile_PREVIEW
            profile={{
              tags: [{ name: { de: "Bier" } }],
            }}
            lang="de"
            tr={tr}
          />
        );
        const btn = screen.getByTestId("show-icons-btn");
        await userEvent.click(btn);
        expect(screen.getByLabelText(tr.filterTagBtn_ARIA("Bier").de)).toBeInTheDocument();
      });
      it("correct number of tags printed", async () => {
        render(
          <Profile_PREVIEW
            profile={{
              tags: _2simpleTags,
            }}
          />
        );
        const btn = screen.getByTestId("show-icons-btn");
        await userEvent.click(btn);
        expect(screen.getAllByTestId("overlay-tag-btn")).toHaveLength(2);
      });
    });
  });
});
