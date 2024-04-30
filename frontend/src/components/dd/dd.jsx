//

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import css from "./dd.module.css";
// import {Button, Container, Menu} from './styles'

const DD = forwardRef((props, ref) => {
  const { id, label, isMenu = true, children, search = true, onHover = false, href } = props;
  const [expanded, setExpanded] = useState(false);
  const [theId] = useState(id ? id : generateId(10)); // Generate random ID if not specified.
  const containerRef = useRef();
  const menuRef = useRef();
  const buttonRef = useRef();
  const focusable =
    'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
  let hoverIntent = null;

  // Set all the focusable elements in the dropdown.
  function setFocusable() {
    const elements = menuRef?.current?.querySelectorAll(focusable);
    if (elements) {
      elements.forEach((item) => {
        item.tabIndex = "-1";
      });
    }
  }
  function keyboardControls(event) {
    const elements = menuRef?.current?.querySelectorAll(focusable);
    if (!elements) {
      return;
    }

    setFocusable();

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
        case "Down": // Down arrow.
          if (active === buttonRef.current) {
            // Focused on trigger then expand the menu.
            setFocus(elements[0]);
            setExpanded(true);
          } else {
            elements[next] && setFocus(elements[next]);
          }
          event.preventDefault();
          break;

        case "Up":
        case "ArrowUp": // Up arrow.
          elements[prev] && setFocus(elements[prev]);
          event.preventDefault();
          break;

        case "ArrowLeft": // Up arrow.
          elements[prev] && setFocus(elements[prev]);
          event.preventDefault();
          break;

        case "ArrowRight": // Up arrow.
          elements[prev] && setFocus(elements[prev]);
          event.preventDefault();
          break;

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
          search && searchByFirstLetter(target, key);
          break;
      }
    }
  }

  // On mount.
  useEffect(() => {
    setFocusable();
    document.addEventListener("click", clickOutside);
    document.addEventListener("keyup", focusOutside);
    document.addEventListener("keydown", keyboardControls);

    return () => {
      document.removeEventListener("click", clickOutside);
      document.removeEventListener("keyup", focusOutside);
      document.removeEventListener("keydown", keyboardControls);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function toggleMenu() {
    const elements = menuRef?.current?.querySelectorAll(focusable);
    if (elements) {
      if (!expanded) {
        // Set focusable elements on menu open.
        setFocusable();

        // Set initial focus.
        setFocus(elements[0]);
      }
      // Set expanded state.
      setExpanded((expanded) => !expanded);
    }
  }
  function showMenu() {
    document.addEventListener("mousemove", hideMenuHover);
    setFocusable();
    setExpanded(true);
  }
  function hideMenuHover(event) {
    clearTimeout(hoverIntent);
    hoverIntent = setTimeout(function () {
      if (!containerRef?.current.contains(event.target)) {
        setExpanded(false);
        document.removeEventListener("mousemove", hideMenuHover);
      }
    }, 25);
  }

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

  function clickOutside(event) {
    if (!event || !event?.target) {
      return; // exit if event is null.
    }
    if (!menuRef?.current?.contains(event.target) && !buttonRef?.current.contains(event.target)) {
      setExpanded(false);
    }
  }
  function focusOutside(event) {
    if (!containerRef?.current.contains(event.target)) {
      setExpanded(false);
    }
  }

  /**
   * Search the menu elements by first letter.
   *
   * @param {string} current The currently active element.
   * @param {string} char    The character to search.
   * @returns null
   */
  function searchByFirstLetter(current, char) {
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

  /**
   * Get the current index position for the active element.
   *
   * @param   {HTMLElement} el       The current element to compare.
   * @param   {NodeList}    elements The list of elements.
   * @returns {Boolean}              The current index position in array.
   */
  function getActiveIndex(el, elements) {
    const array = Array.prototype.slice.call(elements); // Convert NodeList to array.
    return {
      index: array.indexOf(el),
      length: array.length - 1,
    };
  }

  /**
   * Set focus on element.
   *
   * @param {HTMLElement} element The element to recieve focus.
   */
  function setFocus(element) {
    if (!element) {
      return;
    }
    setTimeout(() => {
      element.focus({ preventScroll: true });
    }, 20);
  }

  /**
   * Create HTML from a string.
   *
   * @param   {string} html The string to set as HTML.
   * @returns {string}      Returns a string to render as HTML.
   */
  function createMarkup(html) {
    return {
      __html: html,
    };
  }

  /**
   * Generate a random string.
   *
   * @param   {int} length The length of the string to generate.
   * @returns {string}     The generated string.
   */
  function generateId(length) {
    var result = "";
    var characters = "0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  return (
    <>
      {!!label && (
        <div
          ref={containerRef}
          id={`dropdown-${theId}`}
          className={css.container}
          data-expanded={expanded}
        >
          <button
            as={href ? "a" : null}
            href={href ? href : null}
            ref={buttonRef}
            id={`button-${theId}`}
            className={css.button}
            onClick={() => toggleMenu()}
            dangerouslySetInnerHTML={createMarkup(label)}
            aria-expanded={expanded ? "true" : "false"}
            aria-haspopup="true"
            aria-controls={isMenu ? `menu-${theId}` : null}
            onFocus={() => onHover && showMenu()}
            onMouseEnter={() => onHover && showMenu()}
            data-expanded={expanded}
          ></button>

          {!!children && (
            <div
              ref={menuRef}
              id={`menu-${theId}`}
              className={css.dropdown}
              aria-hidden={expanded ? "false" : "true"}
              aria-labelledby={isMenu ? `button-${theId}` : null}
              role={isMenu ? `menu` : null}
              data-expanded={expanded}
            >
              {children}
            </div>
          )}
        </div>
      )}
    </>
  );
});
DD.displayName = "Dropdown"; // Adding displayName property

export default DD;
