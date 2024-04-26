//
// TODO ==> show the correct icon digit count (after implementing filtering)

import userEvent from "@testing-library/user-event";
import { Btn, Btn_profileSearch, Btn_profileName, Btn_profilePreviewIcons } from "./btn";
import { ICON_save, ICON_activeDigit } from "../icons/icons";

import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("Btn", () => {
  it("renders", () => {
    render(<Btn />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("has correct text", () => {
    render(<Btn text="Button" />);
    expect(screen.getByRole("paragraph")).toHaveTextContent("Button");
  });
  it("has left icon", () => {
    render(<Btn leftIcon_URL="http://example.com/url" />);
    expect(screen.getByRole("img")).toHaveProperty("src", "http://example.com/url");
  });
  it("has right icon", () => {
    render(<Btn rightIcon_URL="http://example.com/url" />);
    expect(screen.getByRole("img")).toHaveProperty("src", "http://example.com/url");
  });
  it("has left icon element", () => {
    render(<Btn left_ICON={<ICON_save />} />);
    expect(screen.getByTestId("icon-save")).toBeInTheDocument();
  });
  it("has right icon element", () => {
    render(<Btn right_ICON={<ICON_save />} />);
    expect(screen.getByTestId("icon-save")).toBeInTheDocument();
  });
  it("fires onClick() when clicked", async () => {
    const onClickMock = vi.fn();
    render(<Btn onClick={onClickMock} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
describe("Btn_profileSearch", () => {
  it("renders", () => {
    render(<Btn_profileSearch />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("has correct name", () => {
    render(<Btn_profileSearch name="John" />);
    expect(screen.getByRole("heading")).toHaveTextContent("John");
  });
  it("has correct search", () => {
    render(<Btn_profileSearch search="searchResult" />);
    expect(screen.getByRole("paragraph")).toHaveTextContent("searchResult");
  });
  it("fires onClick() when clicked", async () => {
    const onClickMock = vi.fn();
    render(<Btn_profileSearch onClick={onClickMock} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
describe("Btn_profileName", () => {
  it("renders", () => {
    render(<Btn_profileName />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  it("has correct name", () => {
    render(<Btn_profileName name="John" />);
    expect(screen.getByRole("heading")).toHaveTextContent("John");
  });
  it("fires onClick() when clicked", async () => {
    const onClickMock = vi.fn();
    render(<Btn_profileName onClick={onClickMock} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
describe("Btn_profilePreviewIcons", () => {
  it("renders", () => {
    render(<Btn_profileName />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  describe("active digit", () => {
    it("shows active digit", () => {
      const { getByTestId } = render(
        <Btn_profilePreviewIcons activeDigit={<ICON_activeDigit count={1} />} />
      );
      expect(getByTestId("icon-active-digit")).toBeInTheDocument();
    });
    it("hides active digit", () => {
      const { queryByTestId } = render(<Btn_profilePreviewIcons />);
      expect(queryByTestId("icon-active-digit")).toBeNull();
    });
  });
  describe("tag icons", () => {
    it("shows no icons if not provided", () => {
      render(<Btn_profilePreviewIcons />);
      expect(screen.queryByRole("img")).toBeNull();
    });
    it("shows 1 tagIcon by default", () => {
      render(<Btn_profilePreviewIcons icons={["url-1"]} />);
      expect(screen.getByRole("img")).toBeInTheDocument();
    });
    it("shows 2 tagIcons when 2 are available", () => {
      render(<Btn_profilePreviewIcons visibleIcon_COUNT={2} icons={["url-1", "url-2"]} />);
      expect(screen.getAllByRole("img").length).toBe(2);
    });
    it("shows 2 tagIcons when more are available", () => {
      render(
        <Btn_profilePreviewIcons
          visibleIcon_COUNT={2}
          icons={["url-1", "url-2", "url-3", "url-4"]}
        />
      );
      expect(screen.getAllByRole("img").length).toBe(2);
    });
    it("shows 2 tagIcons when 2 icons are available and visibleCount is 1", () => {
      render(<Btn_profilePreviewIcons visibleIcon_COUNT={1} icons={["url-1", "url-2"]} />);
      expect(screen.getAllByRole("img").length).toBe(2);
    });
  });
  describe("hidden tags text", () => {
    it("hides hidden tags text", () => {
      render(<Btn_profilePreviewIcons visibleIcon_COUNT={3} icons={["url-1", "url-2", "url-3"]} />);
      expect(screen.queryByRole("paragraph")).toBeNull();
    });
    it("hides '+1' text", () => {
      render(<Btn_profilePreviewIcons visibleIcon_COUNT={1} icons={["url-1", "url-2"]} />);
      expect(screen.queryByRole("paragraph")).toBeNull();
    });
    it("shows '+2' hidden tags", () => {
      render(<Btn_profilePreviewIcons visibleIcon_COUNT={1} icons={["url-1", "url-2", "url-3"]} />);
      expect(screen.getByRole("paragraph")).toHaveTextContent("+2");
    });
    it("shows '+3' hidden tags", () => {
      render(
        <Btn_profilePreviewIcons
          visibleIcon_COUNT={2}
          icons={["url-1", "url-2", "url-3", "url-4", "url-5"]}
        />
      );
      expect(screen.getByRole("paragraph")).toHaveTextContent("+3");
    });
    it("shows 'No Tags' result", () => {
      render(<Btn_profilePreviewIcons />);
      expect(screen.getByRole("paragraph")).toBeInTheDocument();
    });
    it("defaults to 1 visible tag if no count povided", () => {
      render(<Btn_profilePreviewIcons icons={["url-1", "url-2", "url-3"]} />);
      expect(screen.getByRole("paragraph")).toHaveTextContent("+2");
    });
  });
  it("fires onClick() when clicked", async () => {
    const onClickMock = vi.fn();
    render(<Btn_profilePreviewIcons onClick={onClickMock} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
