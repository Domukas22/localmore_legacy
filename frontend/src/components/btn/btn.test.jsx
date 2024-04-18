//

import { render, screen } from "@testing-library/react";
import Btn from "./btn";
import { describe, it, expect } from "vitest";

describe("Button component", () => {
  it("renders correct btn text", () => {
    render(<Btn style="brand" text="Button here" />);
    expect(screen.getByRole("button").textContent).toMatch(/Button here/i);
  });
});
