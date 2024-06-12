// TODO => activeDigit now appears conditionally /// {matchedTags_COUNT > 0 && <ICON_activeDigit count={matchedTags_COUNT} IS_active={true} />}
// TODO ==> show the correct icon digit count (after implementing filtering)

import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { Btn, ProfileSearch_BTN, ProfileName_BTN, ShowTags_BTN } from "./Btn";
import { ICON_save, ICON_activeDigit } from "../icons/icons";

describe("Btn", () => {
  it("renders", () => {
    render(<Btn />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("correct text", () => {
    render(<Btn text="Button" />);
    expect(screen.getByRole("paragraph")).toHaveTextContent("Button");
  });
  it("shows left icon", () => {
    render(<Btn leftIcon_URL="http://example.com/url" />);
    expect(screen.getByRole("img")).toHaveProperty("src", "http://example.com/url");
  });
  it("shows right icon", () => {
    render(<Btn rightIcon_URL="http://example.com/url" />);
    expect(screen.getByRole("img")).toHaveProperty("src", "http://example.com/url");
  });
  it("shows left icon element", () => {
    render(<Btn left_ICON={<ICON_save />} />);
    expect(screen.getByTestId("icon-save")).toBeInTheDocument();
  });
  it("shows right icon element", () => {
    render(<Btn right_ICON={<ICON_save />} />);
    expect(screen.getByTestId("icon-save")).toBeInTheDocument();
  });
  it("fires onClick()", async () => {
    const onClickMock = vi.fn();
    render(<Btn onClick={onClickMock} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
describe("Btn_profileSearch", () => {
  it("renders", () => {
    render(<ProfileSearch_BTN />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("correct name", () => {
    render(<ProfileSearch_BTN name="John" />);
    expect(screen.getByRole("heading")).toHaveTextContent("John");
  });
  it("correct search", () => {
    render(<ProfileSearch_BTN search="searchResult" />);
    expect(screen.getByRole("paragraph")).toHaveTextContent("searchResult");
  });
  it("fires onClick()", async () => {
    const onClickMock = vi.fn();
    render(<ProfileSearch_BTN onClick={onClickMock} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
describe("Btn_profileName", () => {
  it("renders", () => {
    render(<ProfileName_BTN />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  it("correct name", () => {
    render(<ProfileName_BTN name="John" />);
    expect(screen.getByRole("heading")).toHaveTextContent("John");
  });
  it("fires onClick()", async () => {
    const onClickMock = vi.fn();
    render(<ProfileName_BTN onClick={onClickMock} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
describe("Btn_profilePreviewIcons", () => {
  it("renders", () => {
    render(<ProfileName_BTN />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  describe("active digit", () => {
    it("matchedTags_COUNT above 1? ==> shows", () => {
      const { getByTestId } = render(<ShowTags_BTN matchedTags_COUNT={1} />);
      expect(getByTestId("active-digit-icon")).toBeInTheDocument();
    });
    it("matchedTags_COUNT under 1 or undefined? ==> hide", () => {
      const { queryByTestId } = render(<ShowTags_BTN />);
      expect(queryByTestId("active-digit-icon")).toBeNull();
    });
    it("correct number", () => {
      const { getByTestId } = render(<ShowTags_BTN matchedTags_COUNT={5} />);
      expect(getByTestId("active-digit-icon")).toHaveTextContent("5");
    });
  });
  describe("tag icons", () => {
    it("shows no icons if not provided", () => {
      render(<ShowTags_BTN />);
      expect(screen.queryByRole("img")).toBeNull();
    });
    it("icon has correcnt url", () => {
      render(<ShowTags_BTN visibleIcon_COUNT={1} icons={["url-1"]} />);
      expect(screen.getByRole("img")).toHaveAttribute("src", "url-1");
    });
    it("shows 1 tagIcon by default", () => {
      render(<ShowTags_BTN icons={["url-1"]} />);
      expect(screen.getByRole("img")).toBeInTheDocument();
    });
    it("shows 2 tagIcons when 2 are available", () => {
      render(<ShowTags_BTN visibleIcon_COUNT={2} icons={["url-1", "url-2"]} />);
      expect(screen.getAllByRole("img").length).toBe(2);
    });
    it("shows 2 tagIcons when more are available", () => {
      render(<ShowTags_BTN visibleIcon_COUNT={2} icons={["url-1", "url-2", "url-3", "url-4"]} />);
      expect(screen.getAllByRole("img").length).toBe(2);
    });
    it("shows 2 tagIcons when 2 icons are available and visibleCount is 1", () => {
      render(<ShowTags_BTN visibleIcon_COUNT={1} icons={["url-1", "url-2"]} />);
      expect(screen.getAllByRole("img").length).toBe(2);
    });
  });
  describe("hidden tags text", () => {
    it("hides hidden tags text", () => {
      render(<ShowTags_BTN visibleIcon_COUNT={3} icons={["url-1", "url-2", "url-3"]} />);
      expect(screen.queryByRole("paragraph")).toBeNull();
    });
    it("hides '+1' text", () => {
      render(<ShowTags_BTN visibleIcon_COUNT={1} icons={["url-1", "url-2"]} />);
      expect(screen.queryByRole("paragraph")).toBeNull();
    });
    it("shows '+2' hidden tags", () => {
      render(<ShowTags_BTN visibleIcon_COUNT={1} icons={["url-1", "url-2", "url-3"]} />);
      expect(screen.getByRole("paragraph")).toHaveTextContent("+2");
    });
    it("shows '+3' hidden tags", () => {
      render(
        <ShowTags_BTN visibleIcon_COUNT={2} icons={["url-1", "url-2", "url-3", "url-4", "url-5"]} />
      );
      expect(screen.getByRole("paragraph")).toHaveTextContent("+3");
    });
    it("shows 'No Tags' result", () => {
      render(<ShowTags_BTN />);
      expect(screen.getByRole("paragraph")).toBeInTheDocument();
    });
    it("defaults to 1 visible tag if no count povided", () => {
      render(<ShowTags_BTN icons={["url-1", "url-2", "url-3"]} />);
      expect(screen.getByRole("paragraph")).toHaveTextContent("+2");
    });
  });
  it("fires onClick() when clicked", async () => {
    const onClickMock = vi.fn();
    render(<ShowTags_BTN onClick={onClickMock} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
