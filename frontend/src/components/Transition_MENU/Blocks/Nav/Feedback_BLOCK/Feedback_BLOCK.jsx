//
//

import css from "../../Blocks.module.css";
import { Btn } from "../../../../Btn/Btn";

export function Feedback_BLOCK() {
  return (
    <div className={css.Block}>
      <p>Provide feedback</p>
      <li>
        <Btn
          styles={["btn-44", "flex", "text-left-auto"]}
          text="Suggest an idea"
          aria_LABEL=""
          left_ICON={
            <img src="https://cdn-icons-png.freepik.com/512/6339/6339162.png?ga=GA1.1.807612306.1716024941" />
          }
          right_ICON={<span>2 min</span>}
          onClick={() => {}}
          FIRE_clickEvent={false}
        />
      </li>
      <li>
        <Btn
          styles={["btn-44", "flex", "text-left-auto"]}
          left_ICON={
            <img src="https://cdn-icons-png.freepik.com/512/725/725022.png?ga=GA1.1.807612306.17160249411" />
          }
          right_ICON={<span>2 min</span>}
          text="Report a problem"
          aria_LABEL=""
          onClick={() => ""}
        />
      </li>
      <li>
        <Btn
          styles={["btn-44", "flex", "text-left-auto"]}
          text="Quick survey"
          left_ICON={
            <img src="https://cdn-icons-png.freepik.com/512/5321/5321120.png?ga=GA1.1.807612306.1716024941" />
          }
          right_ICON={<span>5 min</span>}
          aria_LABEL=""
          onClick={() => {}}
          FIRE_clickEvent={false}
        />
      </li>
    </div>
  );
}
