//

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Pagination from "./pagination";

describe("Pagination", () => {
  beforeEach(() => {
    // the function is dependat on the range function (which is being imported from range.js)
    vi.mock("./range", () => {
      return {
        range: () => [1, 2, 3, 4, 5],
        // this mocks the imported range function, which returns this specific array
        // before each "it". If you cahnge the carray to [1,2,3], the first "it" will fail
      };
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders pagination", () => {
    render(<Pagination total={50} limit={10} currentPage={1} />);
    expect(screen.getAllByTestId("page-container").length).toBe(5);
    expect(screen.getAllByTestId("page-container")[0]).toHaveTextContent("1");
  });

  it("should emit clicked page", () => {
    // a simple mock function
    const handleClick = vi.fn();
    render(<Pagination total={50} limit={10} currentPage={1} selectPage={handleClick} />);

    fireEvent.click(screen.getAllByTestId("page-container")[0]);
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
