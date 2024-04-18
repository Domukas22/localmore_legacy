//

import btn_STYLES from "./btn.module.css";

export default function Btn({ style, text }) {
  return (
    <button className={btn_STYLES[style]} data-testid="btn">
      <p>
        {text}
        <span className="spanText"> another</span>
      </p>
      <div className="imageThing"></div>
    </button>
  );
}
