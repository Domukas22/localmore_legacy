//
//

import { useEffect, useState } from "react";
import css from "./HeartConfetti.module.css";

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

export const HeartConfetti = ({ trigger }) => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    if (trigger) {
      const newHearts = Array.from({ length: 20 }).map((_, index) => (
        <Heart key={index} style={generateHeartStyle()} />
      ));
      setHearts(newHearts);

      const timeout = setTimeout(() => {
        setHearts([]);
      }, 3000); // Adjust the duration to match the CSS animation duration

      return () => clearTimeout(timeout);
    }
  }, [trigger]);

  return <div className={css.confetti_WRAP}>{hearts}</div>;
};
