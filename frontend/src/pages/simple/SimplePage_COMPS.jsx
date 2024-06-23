//
//

import { Link_BTN } from "../../components/Btn/Link_BTN/Link_BTN";
import css from "./SimplePage_COMPS.module.css";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import { ICON_arrow } from "../../components/icons/icons";

import logo from "../../assets/icons/logo.png";
import Domas from "../../assets/images/Domas.jpg";
import Domas_Blur from "../../assets/images/Domas_Blur.jpg";

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
export function SimplePage_SIDE() {
  const location_PATHNAME = useLocation().pathname;

  return (
    <div className={css.side}>
      <div className={css.link_BLOCK}>
        <Link_BTN
          styles={["btn-44", "flex", "text-left-auto"]}
          text="Startseite"
          left_ICON={<ICON_arrow direction="left" />}
          href="/"
        />
        <Link_BTN
          styles={[
            "btn-44",
            "flex",
            "text-left-auto",
            `${location_PATHNAME === "/about" ? "active" : ""}`,
          ]}
          text="Über Localmore"
          left_ICON={<img src={logo}></img>}
          href="/about"
        />
        <Link_BTN
          styles={[
            "btn-44",
            "flex",
            "text-left-auto",
            `${location_PATHNAME === "/contact" ? "active" : ""}`,
          ]}
          text="Kontakt"
          left_ICON={
            <img src="https://cdn-icons-png.freepik.com/512/7596/7596763.png?ga=GA1.1.807612306.1716024941" />
          }
          href="/contact"
        />
      </div>
      <div className={css.link_BLOCK}>
        <p>Feedback geben</p>
        <Link_BTN
          styles={[
            "btn-44",
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
            "btn-44",
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
            "btn-44",
            "flex",
            "text-left-auto",
            `${location_PATHNAME === "/survey" ? "active" : ""}`,
          ]}
          text="Schnelle Umfrage"
          left_ICON={
            <img src="https://cdn-icons-png.freepik.com/512/5321/5321120.png?ga=GA1.1.807612306.1716024941" />
          }
          right_ICON={<span>5 min</span>}
          href="/survey"
        />
      </div>
      <div className={css.link_BLOCK}>
        <p>Legal</p>
        <Link_BTN
          styles={[
            "btn-44",
            "flex",
            "text-left-auto",
            `${location_PATHNAME === "/impressum" ? "active" : ""}`,
          ]}
          text="Impressum"
          left_ICON={
            <img src="https://cdn.iconscout.com/icon/free/png-256/free-impressum-1-1181601.png?f=webp"></img>
          }
          href="/impressum"
        />
        <Link_BTN
          styles={[
            "btn-44",
            "flex",
            "text-left-auto",
            `${location_PATHNAME === "/privacy" ? "active" : ""}`,
          ]}
          text="Datenschutz"
          left_ICON={<img src="https://cdn-icons-png.flaticon.com/512/2592/2592317.png"></img>}
          href="/privacy"
        />
        <Link_BTN
          styles={[
            "btn-44",
            "flex",
            "text-left-auto",
            `${location_PATHNAME === "/consent" ? "active" : ""}`,
          ]}
          text="Einwilligung"
          left_ICON={<img src="https://cdn-icons-png.flaticon.com/512/4315/4315445.png"></img>}
          href="/consent"
        />
        <Link_BTN
          styles={[
            "btn-44",
            "flex",
            "text-left-auto",
            `${location_PATHNAME === "/attributions" ? "active" : ""}`,
          ]}
          text="Attributionen"
          left_ICON={<img src="https://cdn-icons-png.flaticon.com/512/2448/2448648.png"></img>}
          href="/attributions"
        />
      </div>
    </div>
  );
}

export function Simple_BLOCK({ children }) {
  return <div className={css.Simple_BLOCK}>{children}</div>;
}
export function ContactPerson_WRAP({ IS_mobileDevice }) {
  return (
    <div className={css.contactPerson_WRAP}>
      <div className={css.image_BLOCK}>
        <img src={Domas} alt="Domas Sirbike, Inhaber von Localmore" />
        <div className={css.text_WRAP} style={{ backgroundImage: `url(${Domas_Blur})` }}>
          <div className={css.block}>
            <h3>Domas Sirbike</h3>
            <p>Inhaber von Localmore</p>
          </div>
          <div className={css.block}>
            <p>
              Handy:{" "}
              {IS_mobileDevice ? (
                <a href="tel:0157 5825 9215" className="link_SPAN" data-dark-mode={true}>
                  0157 5825 9215
                </a>
              ) : (
                <span className="link_SPAN" data-dark-mode={true}>
                  0157 5825 9215
                </span>
              )}
            </p>
            <p>
              E-Mail:{" "}
              <a href="mailto: domassirbike@gmail.com" className="link_SPAN" data-dark-mode={true}>
                domassirbike@gmail.com
              </a>
            </p>
          </div>
          <div className={css.block}>
            <p style={{ fontStyle: "italic" }}>
              Was auch immer Sie uns mitteilen möchten: Wir haben immer ein offenes Ohr für Sie :)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
