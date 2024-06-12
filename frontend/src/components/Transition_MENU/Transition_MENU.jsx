//
//

import { forwardRef, useRef } from "react";
import { CSSTransition } from "react-transition-group";

export default function Transition_MENU({
  children,
  current_MENU,
  menu_NAME,
  classNames,
  resize = () => {},
}) {
  const nodeRef = useRef();
  return (
    <CSSTransition
      in={current_MENU === menu_NAME}
      timeout={300}
      classNames={classNames}
      onEnter={() => resize(nodeRef.current)}
      unmountOnExit
      nodeRef={nodeRef}
    >
      <ul className="menu" ref={nodeRef}>
        {children && children}
      </ul>
    </CSSTransition>
  );
}
