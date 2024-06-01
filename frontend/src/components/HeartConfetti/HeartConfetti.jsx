//
//

import { useEffect, useState } from "react";
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
  const [hearts, setHearts] = useState([]);
  const { locked } = USE_clickTimeout(3000);

  useEffect(() => {
    if (SHOW_hearts && !locked && hearts.length === 0) {
      // Play animation only if not already playing
      const newHearts = Array.from({ length: 20 }).map((_, index) => (
        <Heart key={index} style={generateHeartStyle()} />
      ));
      setHearts(newHearts);

      setTimeout(() => {
        setHearts([]); // Clear the hearts after animation duration
      }, 3000);
    }
  }, [SHOW_hearts, locked, hearts]);

  return <div className={css.confetti_WRAP}>{hearts}</div>;
};
