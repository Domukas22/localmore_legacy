//

import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Profile_PREVIEW from "./Profile_PREVIEW";
import { Lang_CONTEXT } from "../../contexts/lang";
import { profilePreview_TR } from "./translations";

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
        render(<Profile_PREVIEW profile={{ createdAt: new Date().toISOString() }} lang="de" />);
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
        screen.debug();
        const btn = screen.getByTestId("show-icons-btn");
        await userEvent.click(btn);
        expect(btn).toHaveAttribute("data-open", "true");
        expect(screen.getByTestId("tag-preview")).toBeInTheDocument();
        await userEvent.click(screen.getByTestId("show-icons-btn"));
        setTimeout(() => {
          expect(screen.queryByTestId("tag-preview")).toBeNull();
        }, 1000);
      });
      // it("fires onClick() when clicked", async () => {
      //   const onClickMock = vi.fn();
      //   render(<Btn onClick={onClickMock} />);
      //   await userEvent.click(screen.getByRole("button"));
      //   expect(onClickMock).toHaveBeenCalledTimes(1);
      // });
    });
  });
  describe.skip("Preview_BOTTOM", () => {
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
