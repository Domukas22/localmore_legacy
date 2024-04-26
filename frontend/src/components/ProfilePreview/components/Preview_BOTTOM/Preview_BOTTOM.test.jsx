//

import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Preview_BOTTOM from "./Preview_BOTTOM";

describe("Preview_BOTTOM", () => {
  const lang = "en";

  it("renders", () => {
    render(<Preview_BOTTOM />);
    expect(screen.getByTestId("profile-preview-bottom")).toBeInTheDocument();
  });
  // it("shows correct name", () => {
  //   render(<Preview_BOTTOM name_OBJ={{ en: "Profile name", de: "Profilname" }} />);
  //   expect(screen.getByRole("heading")).toHaveTextContent("John");
  // });
  // it("hides name button", () => {
  //   render(<Preview_BOTTOM search={"e"} />);
  //   screen.debug();
  //   expect(screen.queryByRole("button", { ["data-testid"]: "btn-profile-name" })).toBeNull();
  // });
  // it("shows search results", () => {
  //   render(<Preview_BOTTOM />);
  //   // expect(screen.getByRole("button")).toBeInTheDocument();
  // });
  // it("hides search results", () => {
  //   render(<Preview_BOTTOM />);
  //   // expect(screen.getByRole("button")).toBeInTheDocument();
  // });
  // it("shows slider arrows", () => {
  //   render(<Preview_BOTTOM />);
  //   // expect(screen.getByRole("button")).toBeInTheDocument();
  // });
  // it("hides slider arrows", () => {
  //   render(<Preview_BOTTOM />);
  //   // expect(screen.getByRole("button")).toBeInTheDocument();
  // });

  it("fires onClick() when clicked", async () => {
    const slideMock = vi.fn();
    render(<Preview_BOTTOM slide={slideMock} HAS_swiper={true} />);
    await userEvent.click(screen.getByTestId("arrow-prev"));
    expect(slideMock).toHaveBeenCalledTimes(1);
  });
});
