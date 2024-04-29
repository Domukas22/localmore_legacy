//

import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Nav from "./Nav";

describe("Nav", () => {
  it("renders", () => {
    render(<Nav />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });
});
