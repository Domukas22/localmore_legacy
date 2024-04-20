import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("Button component", () => {
  it("renders correct btn text", () => {
    render();
    expect(screen.getByRole("").textContent).toMatch(/text/i);
  });
});
