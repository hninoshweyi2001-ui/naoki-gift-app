import React, { useState } from "react";
import styles from "./App.module.scss";
import clsx from "clsx";

export const App: React.FC = () => {
  const [coins, setCoins] = useState(0);
  const [isAnimate, setIsAnimate] = useState(false);

  const handleTap = () => {
    setCoins((prev) => prev + 1);
    setIsAnimate(true);
    setTimeout(() => setIsAnimate(false), 100);
  };

  return (
    <div className={clsx(styles.App)}>
      <div className={styles.container}>
        <div style={{ fontSize: '40px', fontWeight: 'bold', color: '#ffcc00', marginBottom: '10px' }}>
          💰 {coins}
        </div>
        
        <div 
          onClick={handleTap}
          style={{ 
            fontSize: '120px', 
            cursor: 'pointer',
            display: 'inline-block',
            transition: 'transform 0.1s',
            transform: isAnimate ? 'scale(0.8)' : 'scale(1)'
          }}
        >
          🚀
        </div>

        <h1 style={{ color: 'white', marginTop: '20px' }}>Naoki Rocket</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)' }}>Tap Rocket to Earn Coins!</p>
        
        <button 
          onClick={handleTap}
          style={{
            marginTop: '30px',
            padding: '15px 40px',
            fontSize: '20px',
            borderRadius: '50px',
            border: 'none',
            background: 'linear-gradient(45deg, #0088cc, #00ffcc)',
            color: 'white',
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(0,255,200,0.3)'
          }}
        >
          EARN NOW 💰
        </button>
      </div>
    </div>
  );
};
