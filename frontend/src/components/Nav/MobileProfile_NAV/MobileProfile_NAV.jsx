//
//

import css from "./MobileProfile_NAV.module.css";
import { useNavigate } from "react-router-dom";

import { Btn } from "../../Btn/Btn";
import { ICON_3dots, ICON_arrow } from "../../icons/icons";

export default function MobileProfile_NAV({ profile_NAME, white }) {
  const btn_STYLES = white ? ["btn-36", "round", "grey"] : ["btn-36", "round", "onImg"];
  const icon_COLOR = white ? "dark" : "white";
  const navigate = useNavigate();

  console.log(icon_COLOR);

  return (
    <nav className={css.MobileProfile_NAV} data-white={white}>
      {console.log(white)}
      <Btn
        styles={btn_STYLES}
        left_ICON={<ICON_arrow direction="left" color={icon_COLOR} />}
        onClick={() => navigate(-1)}
      />
      <h4 className={css.name} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        {profile_NAME || "NAME"}
      </h4>
      <Btn styles={btn_STYLES} left_ICON={<ICON_3dots color={icon_COLOR} />} onClick={() => {}} />
    </nav>
  );
}
