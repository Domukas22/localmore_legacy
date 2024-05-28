//
//
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { Btn, ProfileSearch_BTN, ProfileName_BTN, ShowTags_BTN } from "./btn";
import { ICON_save, ICON_activeDigit } from "../icons/icons";

describe("Header", () => {
  it("renders", () => {
    render(<Btn />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  // it("correct text", () => {
  //   render(<Btn text="Button" />);
  //   expect(screen.getByRole("paragraph")).toHaveTextContent("Button");
  // });
  // it("shows left icon", () => {
  //   render(<Btn leftIcon_URL="http://example.com/url" />);
  //   expect(screen.getByRole("img")).toHaveProperty("src", "http://example.com/url");
  // });
  // it("shows right icon", () => {
  //   render(<Btn rightIcon_URL="http://example.com/url" />);
  //   expect(screen.getByRole("img")).toHaveProperty("src", "http://example.com/url");
  // });
});
