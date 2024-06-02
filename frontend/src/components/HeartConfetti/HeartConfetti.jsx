//
//

import { useEffect, useRef, useState } from "react";
import css from "./HeartConfetti.module.css";
import { USE_clickTimeout } from "../../hooks/USE_clickTimeout";

const Heart = ({ style }) => {
  return <div className={css.heart} style={style}></div>;
};

const generateHeartStyle = () => {
  const left = Math.random() * 100;
  const animationDelay = Math.random() * 0.5;
  const animationDuration = Math.random() * 1 + 1;

  return {
    left: `${left}%`,
    animationDelay: `${animationDelay}s`,
    animationDuration: `${animationDuration}s`,
  };
};

export const HeartConfetti = ({ SHOW_hearts }) => {
  const [heartsSets, SET_heartsSets] = useState([]);
  const { locked } = USE_clickTimeout(3000);
  const counterRef = useRef(0);

  useEffect(() => {
    if (SHOW_hearts && !locked) {
      const newSetId = counterRef.current;
      const newHeartsSet = (
        <div key={newSetId}>
          {Array.from({ length: 25 }).map((_, index) => (
            <Heart key={index} style={generateHeartStyle()} />
          ))}
        </div>
      );

      SET_heartsSets((prevSets) => [...prevSets, newHeartsSet]);

      // Increment the counter value
      counterRef.current += 1;

      setTimeout(() => {
        SET_heartsSets((prevSets) => prevSets.filter((set) => set.key !== `${newSetId}`));
      }, 3000);
    }
  }, [SHOW_hearts, locked]);

  return <div className={css.confetti_WRAP}>{heartsSets}</div>;
};
