//

import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ProfilePreview from "./ProfilePreview";

describe("Btn", () => {
  it("renders", () => {
    render(<ProfilePreview />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});

// slider changes on click. Test it or leave it out?
