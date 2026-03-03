import React from "react";
import styles from "./App.module.scss";
import clsx from "clsx";
import { useShowPopup } from "@vkruglikov/react-telegram-web-app";

export type AppProps = {
  className?: string;
};

export const App: React.FC<AppProps> = ({ className }) => {
  const showPopup = useShowPopup();

  const showPopupOnClick = async () => {
    await showPopup({ 
      title: "Naoki Gift", 
      message: "Welcome to my Rocket Game!" 
    });
  };

  return (
    <div className={clsx(styles.App, className)}>
      <div className={styles.container}>
        <h1>Naoki Rocket Game</h1>
        <button className={styles.button} onClick={showPopupOnClick}>
          Start Game
        </button>
      </div>
    </div>
  );
};
