//

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import css from "./dd.module.css";
// import {Button, Container, Menu} from './styles'
import { Button } from "react-aria-components";
import css_BTN from "../btn/btn.module.css";
import { ICON_dropDownArrow, ICON_x } from "../icons/icons";
import en_FLAG from "../../assets/icons/flags/en.png";
import de_FLAG from "../../assets/icons/flags/de.webp";

const DD = forwardRef((props, ref) => {
  const { id, btn_TEXT, btnLeft_ICON, width = undefined, align = "left", children } = props;
  const [expanded, setExpanded] = useState(false);
  const [theId] = useState(id ? id : generateId(10)); // Generate random ID if not specified.
  const containerRef = useRef();
  const menuRef = useRef();
  const buttonRef = useRef();
  const focusable =
    'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
  const search = true;

  function HANDLE_keyPress(e) {
    keyboardControls(e, menuRef, buttonRef, setExpanded, containerRef, search, focusable, setFocus);
  }

  // On mount.
  useEffect(() => {
    setFocusable(menuRef, focusable);
    ADD_eventListeners(menuRef, buttonRef, setExpanded, containerRef, HANDLE_keyPress);

    return () => {
      REMOVE_eventListeners(menuRef, buttonRef, setExpanded, containerRef, HANDLE_keyPress);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    FOCUS_first(menuRef, focusable);
  }, [expanded]);

  // Allow for setting the expanded state from parent components.
  // @see https://react.dev/reference/react/useImperativeHandle
  useImperativeHandle(
    ref,
    () => {
      return {
        /**
         * Exposed function to close the dropdown.
         */
        close() {
          setExpanded(false);
        },
      };
    },
    []
  );

  console.log(width);

  return (
    <>
      <div
        ref={containerRef}
        id={`dropdown-${theId}`}
        className={css.container}
        data-expanded={expanded}
      >
        <Button
          ref={buttonRef}
          // id={`button-${theId}`}
          className={["btn-40", "round", "grey", "nav-DD"].map((style) => css_BTN[style]).join(" ")}
          onPress={() => {
            if (!expanded) document.dispatchEvent(new Event("click")); // for the dropdowns
            setExpanded((expanded) => !expanded);
            console.log(expanded);
          }}
          aria-expanded={expanded ? "true" : "false"}
          aria-haspopup="true"
          aria-controls={`menu-${theId}`}
          data-expanded={expanded}
        >
          {btnLeft_ICON && btnLeft_ICON}
          {btn_TEXT && <p className={css_BTN.text}>{btn_TEXT}</p>}
          {expanded ? <ICON_x color={"dark"} small={true} /> : <ICON_dropDownArrow />}
        </Button>

        {!!children && expanded && (
          <div
            ref={menuRef}
            id={`menu-${theId}`}
            className={css.dropdown}
            aria-hidden={expanded ? "false" : "true"}
            aria-labelledby={`button-${theId}`}
            role={"menu"}
            data-expanded={expanded}
            style={{
              width: width ? `${width}px` : "auto",
              left: align === "left" ? "0px" : "auto",
              right: align === "right" ? "0px" : "auto",
            }}
          >
            {console.log("Menu")}
            <ul>{children ?? children}</ul>
          </div>
        )}
      </div>
    </>
  );
});
DD.displayName = "Dropdown"; // Adding displayName property

function generateId(length) {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function getActiveIndex(el, elements) {
  const array = Array.prototype.slice.call(elements); // Convert NodeList to array.
  return {
    index: array.indexOf(el),
    length: array.length - 1,
  };
}
function clickOutside(e, menuRef, buttonRef, setExpanded) {
  if (!e || !e?.target) {
    return; // exit if event is null.
  }
  if (!menuRef?.current?.contains(e.target) && !buttonRef?.current.contains(e.target)) {
    setExpanded(false);
  }
}
function focusOutside(e, setExpanded, containerRef) {
  if (!containerRef?.current.contains(e.target)) {
    setExpanded(false);
  }
}

function setFocusable(menuRef, focusable) {
  // Set all the focusable elements in the dropdown.
  const elements = menuRef?.current?.querySelectorAll(focusable);
  if (elements) {
    elements.forEach((item) => {
      item.tabIndex = "-1";
    });
  }
}
function searchByFirstLetter(current, char, menuRef, focusable) {
  console.log("searchByFirstLetter");
  const elements = menuRef.current.querySelectorAll(focusable);
  let start = 0;
  let index = 0;

  if (char.length > 1 || !elements) {
    return;
  }

  const array = Array.prototype.slice.call(elements);

  // First letters.
  const letters =
    array &&
    array.map((item) => {
      return item?.textContent ? item.textContent.trim()[0].toLowerCase() : "";
    });

  // Get start item from the position of the current item.
  start = array.indexOf(current) + 1;
  if (start >= array.length) {
    start = 0;
  }

  // Check menu elements.
  index = letters.indexOf(char.toLowerCase(), start);

  // Search from beginning.
  if (index === -1) {
    index = letters.indexOf(char.toLowerCase(), 0);
  }

  // Match found, set focus
  if (index > -1) {
    setFocus(array[index]);
  }
}
function setFocus(e) {
  if (!e) {
    return;
  }
  setTimeout(() => {
    e.focus({ preventScroll: true });
  }, 20);
}
function keyboardControls(
  event,
  menuRef,
  buttonRef,
  setExpanded,
  containerRef,
  search,
  focusable,
  setFocus
) {
  if (
    (event.key === "ArrowDown" || event.key === "Down") &&
    document.activeElement === buttonRef.current
  ) {
    event.preventDefault();
    setExpanded(true);
    setFocus(menuRef?.current?.querySelectorAll(focusable)[0]);
  }
  const elements = menuRef?.current?.querySelectorAll(focusable);
  if (!elements) {
    return;
  }

  setFocusable(menuRef, focusable);

  const active = document.activeElement;
  const target = event.target;
  const { index, length } = getActiveIndex(active, elements);
  const { shiftKey, key } = event;
  const next = index === length ? 0 : index + 1;
  const prev = index === 0 ? length : index - 1;

  // Exit if elements are not focusable.
  if (!containerRef?.current.contains(active) || elements.length === 0) {
    switch (key) {
      // Exit if esc and no focusable elements.
      case "Esc":
      case "Escape": // Escape
        setExpanded(false);
        break;

      default:
        break;
    }
    return;
  }

  if (shiftKey) {
    // Shift + Tab
    if (key === "Tab") {
      setExpanded(false);
      return;
    }
  } else {
    switch (key) {
      case " ":
      case "Enter":
        //setFocus(buttonRef.current)
        //setExpanded(false)
        break;
      case "Esc":
      case "Escape": // Escape
        setFocus(buttonRef.current);
        setExpanded(false);
        break;

      case "ArrowDown":
      case "Down":
        if (active === buttonRef.current) {
          setFocus(elements[0]);
          setExpanded(true);
        } else if (index === length) {
          setFocus(buttonRef.current);
        } else {
          elements[next] && setFocus(elements[next]);
        }

        event.preventDefault();
        break;

      case "Up":
      case "ArrowUp": // Up arrow.
        if (active === buttonRef.current) {
          setExpanded(false);
          return;
        }
        if (index === 0) {
          setFocus(buttonRef.current);
          return;
        }
        elements[prev] && setFocus(elements[prev]);
        event.preventDefault();
        break;

      // case "ArrowLeft": // Up arrow.
      //   elements[prev] && setFocus(elements[prev]);
      //   event.preventDefault();
      //   break;

      // case "ArrowRight": // Up arrow.
      //   elements[prev] && setFocus(elements[prev]);
      //   event.preventDefault();
      //   break;

      case "Home":
      case "PageUp": // Home.
        setFocus(elements[0]);
        event.preventDefault();
        break;

      case "End":
      case "PageDown": // End.
        setFocus(elements[elements.length - 1]);
        event.preventDefault();
        break;

      default:
        // Search
        search && searchByFirstLetter(target, key, menuRef, focusable);
        break;
    }
  }
}
function FOCUS_first(menuRef, focusable) {
  const elements = menuRef?.current?.querySelectorAll(focusable);
  if (elements) {
    setFocusable(menuRef, focusable);
    setTimeout(() => {
      elements[0] && setFocus(elements[0]);
    }, 20);
  }
}
function ADD_eventListeners(menuRef, buttonRef, setExpanded, containerRef, HANDLE_keyPress) {
  document.addEventListener("click", (e) => clickOutside(e, menuRef, buttonRef, setExpanded));
  document.addEventListener("keyup", (e) => focusOutside(e, setExpanded, containerRef));
  document.addEventListener("keydown", HANDLE_keyPress);
}
function REMOVE_eventListeners(menuRef, buttonRef, setExpanded, containerRef, HANDLE_keyPress) {
  document.removeEventListener("click", (e) => clickOutside(e, menuRef, buttonRef, setExpanded));
  document.removeEventListener("keyup", (e) => focusOutside(e, setExpanded, containerRef));
  document.removeEventListener("keydown", HANDLE_keyPress);
}

export default DD;
