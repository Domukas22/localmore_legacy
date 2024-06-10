//
//

import { CSSTransition } from "react-transition-group";
export default function Transition_MENU({
  children,
  current_MENU,
  menu_NAME,
  classNames,
  resize = () => {},
}) {
  return (
    <CSSTransition
      in={current_MENU === menu_NAME}
      timeout={300}
      classNames={classNames}
      onEnter={resize}
      unmountOnExit
    >
      <ul className="menu">{children && children}</ul>
    </CSSTransition>
  );
}
