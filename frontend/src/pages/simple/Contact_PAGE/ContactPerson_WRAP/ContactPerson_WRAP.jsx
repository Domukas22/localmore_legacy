//
//

import css from "../Contact_PAGE.module.css";

import Domas from "../../../../assets/images/Domas.jpg";
import Domas_Blur from "../../../../assets/images/Domas_Blur.jpg";

export default function ContactPerson_WRAP({ IS_mobileDevice }) {
  return (
    <div className={css.contactPerson_WRAP}>
      <div className={css.image_BLOCK}>
        <img src={Domas} alt="Domas Sirbike, Inhaber von Localmore" />
        <div className={css.bottom} style={{ backgroundImage: `url(${Domas_Blur})` }}>
          <div className={css.bottom_BLOCK}>
            <h3>Domas Sirbike</h3>
            <p>Inhaber von Localmore</p>
          </div>
          <div className={css.bottom_BLOCK}>
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
          <div className={css.bottom_BLOCK}>
            <p style={{ fontStyle: "italic" }}>
              Was auch immer Sie uns mitteilen möchten: Wir haben immer ein offenes Ohr für Sie :)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
