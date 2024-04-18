//

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrorMessage from "./error";

describe("ErrorMessage", () => {
  it("renders DEFAULT error state", () => {
    render(<ErrorMessage />);
    expect(screen.getByTestId("message-container").textContent).toBe("Something went wrong");
  });
  it("renders CUSTOM error state", () => {
    render(<ErrorMessage message="Email is already taken" />);
    expect(screen.getByTestId("message-container").textContent).toBe("Email is already taken");
  });
});
