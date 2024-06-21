//
//

import { Link_BTN } from "../../components/Btn/Link_BTN/Link_BTN";
import css from "./SimplePage_COMPS.module.css";
import logo from "../../assets/icons/logo.png";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export function SimplePageContent_WRAP({ children }) {
  return (
    <div className={css.all_WRAP}>
      <div className={css.content_WRAP}>{children}</div>
    </div>
  );
}

export function SimplePage_MAIN({ children }) {
  return <div className={css.main}>{children}</div>;
}

export function SimplePage_SIDE({ children }) {
  return <div className={css.side}>{children}</div>;
}

export function LegalPagesSide_LINKS() {
  const location_PATHNAME = useLocation().pathname;

  return (
    <div className={css.SimplePageSide_LINKS}>
      <div className={css.link_BLOCK}>
        <Link_BTN
          styles={[
            "btn-60",
            "flex",
            "text-left-auto",
            `${location_PATHNAME === "/impressum" ? "active" : ""}`,
          ]}
          text="Impressum"
          left_ICON={
            <img
              src="https://cdn.iconscout.com/icon/free/png-256/free-impressum-1-1181601.png?f=webp"
              style={{ opacity: "0.7" }}
            />
          }
          href="/impressum"
        />
        <Link_BTN
          styles={[
            "btn-60",
            "flex",
            "text-left-auto",
            `${location_PATHNAME === "/datenschutz" ? "active" : ""}`,
          ]}
          text="Datenschutz"
          left_ICON={<img src="https://cdn-icons-png.flaticon.com/512/2592/2592317.png"></img>}
          href="/datenschutz"
        />
        <Link_BTN
          styles={[
            "btn-60",
            "flex",
            "text-left-auto",
            `${location_PATHNAME === "/einwilligung" ? "active" : ""}`,
          ]}
          text="Einwilligung"
          left_ICON={<img src="https://cdn-icons-png.flaticon.com/512/4315/4315445.png"></img>}
          href="/einwilligung"
        />
        <Link_BTN
          styles={[
            "btn-60",
            "flex",
            "text-left-auto",
            `${location_PATHNAME === "/attributions" ? "active" : ""}`,
          ]}
          text="Attributionen"
          left_ICON={<img src="https://cdn-icons-png.flaticon.com/512/2448/2448648.png"></img>}
          href="/attributions"
        />
      </div>
      <div className={css.link_BLOCK}>
        <p>Anderes</p>
        <Link_BTN
          styles={["btn-60", "flex", "text-left-auto"]}
          text="Über Localmore"
          left_ICON={<img src={logo}></img>}
          href="/about"
        />
        <Link_BTN
          styles={["btn-60", "flex", "text-left-auto"]}
          text="Kontaktiere uns"
          left_ICON={
            <img src="https://cdn-icons-png.freepik.com/512/7596/7596763.png?ga=GA1.1.807612306.1716024941" />
          }
          href="/contact"
        />
      </div>
    </div>
  );
}
export function FeedbackPagesSide_LINKS() {
  const location_PATHNAME = useLocation().pathname;

  return (
    <div className={css.SimplePageSide_LINKS}>
      <div className={css.link_BLOCK}>
        <Link_BTN
          styles={[
            "btn-60",
            "flex",
            "text-left-auto",
            `${location_PATHNAME === "/suggestIdea" ? "active" : ""}`,
          ]}
          text="Idee vorschlagen"
          left_ICON={
            <img src="https://cdn-icons-png.freepik.com/512/6339/6339162.png?ga=GA1.1.807612306.1716024941" />
          }
          right_ICON={<span>3 min</span>}
          href="/suggestIdea"
        />
        <Link_BTN
          styles={[
            "btn-60",
            "flex",
            "text-left-auto",
            `${location_PATHNAME === "/reportProblem" ? "active" : ""}`,
          ]}
          text="Problem melden"
          left_ICON={
            <img src="https://cdn-icons-png.freepik.com/512/725/725022.png?ga=GA1.1.807612306.17160249411" />
          }
          right_ICON={<span>3 min</span>}
          href="/reportProblem"
        />
        <Link_BTN
          styles={[
            "btn-60",
            "flex",
            "text-left-auto",
            `${location_PATHNAME === "/quickSurvey" ? "active" : ""}`,
          ]}
          text="Schnelle Umfrage"
          left_ICON={
            <img src="https://cdn-icons-png.freepik.com/512/5321/5321120.png?ga=GA1.1.807612306.1716024941" />
          }
          right_ICON={<span>3 min</span>}
          href="/quickSurvey"
        />
      </div>
      <div className={css.link_BLOCK}>
        <p>Anderes</p>
        <Link_BTN
          styles={["btn-60", "flex", "text-left-auto"]}
          text="Über Localmore"
          left_ICON={<img src={logo}></img>}
          href="/about"
        />
        <Link_BTN
          styles={["btn-60", "flex", "text-left-auto"]}
          text="Kontaktiere uns"
          left_ICON={
            <img src="https://cdn-icons-png.freepik.com/512/7596/7596763.png?ga=GA1.1.807612306.1716024941" />
          }
          href="/contact"
        />
      </div>
    </div>
  );
}
