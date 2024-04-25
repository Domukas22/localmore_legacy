//
// TODO ==> show the correct icon digit count (after implementing filtering)

import userEvent from "@testing-library/user-event";
import { Btn, Btn_profileSearch, Btn_profileName, Btn_profilePreviewIcons } from "./btn";
import { ICON_save, ICON_activeDigit } from "../icons/icons";

function XXX() {
  return <Button>Click Me</Button>;
}

// import { render, screen } from "@testing-library/react";
// import { describe, it, expect, vi, beforeEach } from "vitest";
// import { Button } from "react-aria-components";

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "react-aria-components";

describe("Button Component", () => {
  it("renders a regular button", () => {
    render(<button>Click Me</button>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
  });
  it("renders a react-aria-button", () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
  });
});

// ----

// import { useButton } from "react-aria";
// const MyButton = ({ onPress, children }) => {
//   // useButton hook manages the accessibility features of the button
//   const { buttonProps } = useButton({ onPress });

//   return <button {...buttonProps}>{children}</button>;
// };

// it("renders", () => {
//   // const { getByRole } = render(<Btn />);
//   // expect(getByRole("button")).toBeInTheDocument();
//   const { getByTestId } = render(<Btn />);
//   expect(getByTestId("btn")).toBeInTheDocument();
// });
// it("has correct text", () => {
//   const { getByRole } = render(<Btn text="Button" onClick={() => {}} aria_LABEL="" />);
//   const text = getByRole("paragraph");
//   expect(text).toBeInTheDocument();
// });
// it("has left icon", () => {
//   const { getByTestId } = render(<Btn leftIcon_URL="/url" />);
//   expect(getByTestId("left-icon")).toBeInTheDocument();
// });
// it("has right icon", () => {
//   const { getByTestId } = render(<Btn rightIcon_URL="/url" />);
//   expect(getByTestId("right-icon")).toBeInTheDocument();
// });
// it("has left icon element", () => {
//   const { getByTestId } = render(<Btn left_ICON={<ICON_save />} />);
//   expect(getByTestId("icon-save")).toBeInTheDocument();
// });
// it("has right icon element", () => {
//   const { getByTestId } = render(<Btn right_ICON={<ICON_save />} />);
//   expect(getByTestId("icon-save")).toBeInTheDocument();
// });
// it("fires onClick() when clicked", async () => {
//   const onClickMock = vi.fn();
//   render(<Btn onClick={onClickMock} />);
//   await userEvent.click(screen.getByTestId("btn"));
//   expect(onClickMock).toHaveBeenCalledTimes(1);
// });
// });
// describe("Btn_profileSearch", () => {
//   it("renders", () => {
//     const { getByTestId } = render(<Btn_profileSearch />);
//     expect(getByTestId("btn-profile-search")).toBeInTheDocument();
//   });
//   it("has correct name", () => {
//     const { getByText } = render(<Btn_profileSearch name="John" />);
//     expect(getByText("John")).toBeInTheDocument();
//   });
//   it("has correct search", () => {
//     const { getByText } = render(<Btn_profileSearch search="search text" />);
//     expect(getByText("search text")).toBeInTheDocument();
//   });
//   it("fires onClick() when clicked", async () => {
//     const onClickMock = vi.fn();
//     render(<Btn_profileSearch onClick={onClickMock} />);
//     await userEvent.click(screen.getByTestId("btn-profile-search"));
//     expect(onClickMock).toHaveBeenCalledTimes(1);
//   });
// });
// describe("Btn_profileName", () => {
//   it("renders", () => {
//     const { getByTestId } = render(<Btn_profileName />);
//     expect(getByTestId("btn-profile-name")).toBeInTheDocument();
//   });
//   it("has correct name", () => {
//     const { getByText } = render(<Btn_profileName name="John" />);
//     expect(getByText("John")).toBeInTheDocument();
//   });
//   it("fires onClick() when clicked", async () => {
//     const onClickMock = vi.fn();
//     render(<Btn_profileName onClick={onClickMock} />);
//     await userEvent.click(screen.getByTestId("btn-profile-name"));
//     expect(onClickMock).toHaveBeenCalledTimes(1);
//   });
// });
// describe("Btn_profilePreviewIcons", () => {
//   it("renders", () => {
//     const { getByTestId } = render(<Btn_profilePreviewIcons />);
//     expect(getByTestId("btn-profile-preview-icons")).toBeInTheDocument();
//   });
//   describe("active digit", () => {
//     it("shows active digit", () => {
//       const { getByTestId } = render(
//         <Btn_profilePreviewIcons activeDigit={<ICON_activeDigit count={1} />} />
//       );
//       expect(getByTestId("icon-active-digit")).toBeInTheDocument();
//     });
//     it("hides active digit", () => {
//       const { queryByTestId } = render(<Btn_profilePreviewIcons />);
//       expect(queryByTestId("icon-active-digit")).toBeNull();
//     });
//   });
//   describe("tag icons", () => {
//     it("shows no icons if not provided", () => {
//       const { queryByTestId } = render(<Btn_profilePreviewIcons />);
//       expect(queryByTestId("tag-preview-btn-icon")).toBeNull();
//     });
//     it("shows 1 tagIcon by default", () => {
//       const { getByTestId } = render(<Btn_profilePreviewIcons icons={["url-1"]} />);
//       expect(getByTestId("tag-preview-btn-icon")).toBeInTheDocument();
//     });
//     it("shows 2 tagIcons when 2 are available", () => {
//       const { getAllByTestId } = render(
//         <Btn_profilePreviewIcons visibleIcon_COUNT={2} icons={["url-1", "url-2"]} />
//       );
//       expect(getAllByTestId("tag-preview-btn-icon").length).toBe(2);
//     });
//     it("shows 2 tagIcons when more are available", () => {
//       const { getAllByTestId } = render(
//         <Btn_profilePreviewIcons
//           visibleIcon_COUNT={2}
//           icons={["url-1", "url-2", "url-3", "url-4"]}
//         />
//       );
//       expect(getAllByTestId("tag-preview-btn-icon").length).toBe(2);
//     });
//     it("shows 2 tagIcons when 2 icons are available and visibleCount is 1", () => {
//       const { getAllByTestId } = render(
//         <Btn_profilePreviewIcons visibleIcon_COUNT={1} icons={["url-1", "url-2"]} />
//       );
//       expect(getAllByTestId("tag-preview-btn-icon").length).toBe(2);
//     });
//   });
//   describe("hidden tags text", () => {
//     it("hides hidden tags text", () => {
//       const { queryByTestId } = render(
//         <Btn_profilePreviewIcons visibleIcon_COUNT={3} icons={["url-1", "url-2", "url-3"]} />
//       );
//       expect(queryByTestId("hidden-icon-count")).toBeNull();
//     });
//     it("hides '+1' text", () => {
//       const { queryByTestId } = render(
//         <Btn_profilePreviewIcons visibleIcon_COUNT={1} icons={["url-1", "url-2"]} />
//       );
//       expect(queryByTestId("hidden-icon-count")).toBeNull();
//     });
//     it("shows '+2' hidden tags", () => {
//       const { getByText } = render(
//         <Btn_profilePreviewIcons visibleIcon_COUNT={1} icons={["url-1", "url-2", "url-3"]} />
//       );
//       expect(getByText("+2")).toBeInTheDocument();
//     });
//     it("shows '+3' hidden tags", () => {
//       const { getByText } = render(
//         <Btn_profilePreviewIcons
//           visibleIcon_COUNT={2}
//           icons={["url-1", "url-2", "url-3", "url-4", "url-5"]}
//         />
//       );
//       expect(getByText("+3")).toBeInTheDocument();
//     });
//     it("shows 'No Tags' result", () => {
//       const { getByTestId } = render(<Btn_profilePreviewIcons />);
//       expect(getByTestId("no-tags")).toBeInTheDocument();
//     });
//     it("defaults to 1 visible tag if no count povided", () => {
//       const { getByText } = render(<Btn_profilePreviewIcons icons={["url-1", "url-2", "url-3"]} />);
//       expect(getByText("+2")).toBeInTheDocument();
//     });
//   });
//   it("fires onClick() when clicked", async () => {
//     const onClickMock = vi.fn();
//     render(<Btn_profilePreviewIcons onClick={onClickMock} />);
//     await userEvent.click(screen.getByTestId("btn-profile-preview-icons"));
//     expect(onClickMock).toHaveBeenCalledTimes(1);
//   });
// });
