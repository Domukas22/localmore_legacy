//
//

import { useParams } from "react-router-dom";
import { USE_windowSize } from "../../hooks/USE_windowWidth";
import { base_URL } from "../../config.js";
import { USE_fetchData } from "../../hooks/USE_fetchData.js";
import { useMemo, useRef, useState } from "react";
import Nav from "../../components/Nav/Nav.jsx";

export function Profile() {
  const [search, SET_search] = useState("");
  const { width } = USE_windowSize();
  const { id } = useParams();

  const {
    data: profile,
    loading: LOADING_profile,
    error: profile_ERROR,
  } = USE_fetchData(`${base_URL}/profile/${id}`);

  const {
    data: profiles,
    loading: LOADING_profiles,
    error: profiles_ERROR,
  } = USE_fetchData(`${base_URL}/staticProfiles`);

  const {
    data: tags,
    loading: LOADING_tags,
    error: tags_ERROR,
  } = USE_fetchData(`${base_URL}/tags`);

  const {
    data: tagUsages,
    loading: LOADING_tagUsages,
    error: tagUsages_ERROR,
  } = USE_fetchData(`${base_URL}/tagUsages`);

  const {
    data: categories,
    loading: LOADING_categories,
    error: categories_ERROR,
  } = USE_fetchData(`${base_URL}/categories`);

  const {
    data: tagGroups,
    loading: LOADING_tagGroups,
    error: tagGroups_ERROR,
  } = USE_fetchData(`${base_URL}/tagGroups`);

  const available_CATEGORIES = categories?.filter((category) => category?.visible);
  const shuffled_PROFILES = useMemo(
    () => profiles?.sort(() => Math.random() - 0.5),
    [LOADING_profiles]
  );
  const nav_REF = useRef(null);

  if (profile_ERROR) console.log(profile_ERROR);

  return (
    <>
      <Nav
        tagUsages={tagUsages}
        search={search}
        SET_search={SET_search}
        categories={available_CATEGORIES}
        profiles={profiles}
        nav_REF={nav_REF}
      />
      <section>
        <img
          src="path_to_your_image.jpg"
          alt="Basketball court at Fluss Hoops"
          style={{ width: "100%" }}
        />
      </section>

      <section>
        <h1>{profile?.name?.en}</h1>
        <h2>{profile?.subname?.en}</h2>
      </section>

      <section>
        <div>
          <h3>Tags von {profile?.name?.en}</h3>
          <div>
            <span>Kategorie: Sportplätze</span>
            <span>Basketball</span>
            <span>Waiblingen</span>
            <span>1 Korb</span>
            <span>Kein Netz</span>
          </div>
        </div>

        <div>
          <h3>Kurze Infos</h3>
          <p>Adresse: Bahnstadt, Grüne Meile 21</p>
        </div>
      </section>

      <section>
        <h3>Ein ruhiger Basketballplatz am Fluss in Waiblingen</h3>
        <p>
          Direkt neben einem Fußball- und einem Volleyballfeld. Der Eingang befindet sich vor den
          Toren des Sportvereins TSG Rohrbach. Der Platz ist gut gepflegt und verfügt über
          Kettzente. Der Boden besteht aus strapazierfähigem Gummi und ist es schwierig, darauf
          auszurutschen, es sei denn, man spielt nach Regen. Der Nachteil ist, dass die Tore oft
          geschlossen sind und man eine Erlaubnis braucht, um dort zu spielen, es sei denn, man ist
          Mitglied im Sportverein. Der Ort ist weit genug von Straßen entfernt, um weder Autos noch
          Straßenbauarbeiten zu hören.
        </p>
      </section>

      <section>
        <h3>Vor- und Nachteile</h3>
        <ul>
          <li>Wird häufig geputzt.</li>
          <li>Ruhige Umgebung</li>
          <li>Ist im Verein-Gelände, d.h. mann muss zahlen um hier zu spielen.</li>
          <li>Sehr rutschiger Boden nach Regen.</li>
        </ul>
      </section>
    </>
  );
}
