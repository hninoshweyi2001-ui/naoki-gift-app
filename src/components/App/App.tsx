import React, { useState } from "react";
import styles from "./App.module.scss";
import clsx from "clsx";

export const App: React.FC = () => {
  const [coins, setCoins] = useState(0);
  const [isAnimate, setIsAnimate] = useState(false);

  // Rocket ကို နှိပ်ရင် Coin တိုးပြီး Animation ပြမည့် Function
  const handleTap = () => {
    setCoins((prev) => prev + 1);
    setIsAnimate(true);
    setTimeout(() => setIsAnimate(false), 200);
  };

  return (
    <div className={styles.App}>
      <div className={styles.container}>
        {/* Score Board - Coin အရေအတွက်ပြရန် */}
        <div style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '20px', color: '#ffcc00' }}>
          💰 {coins}
        </div>

        {/* Rocket Image - နှိပ်လို့ရသည့် နေရာ */}
        <div 
          onClick={handleTap}
          style={{ 
            cursor: 'pointer',
            transform: isAnimate ? 'scale(0.9) translateY(-10px)' : 'scale(1)',
            transition: '0.1s',
            fontSize: '100px'
          }}
        >
          🚀
        </div>

        <h1 style={{ marginTop: '20px' }}>Naoki Rocket</h1>
        <p style={{ opacity: 0.7 }}>Tap the Rocket to Earn Coins!</p>

        {/* Start Game ခလုတ်ကိုလည်း Coin တိုးအောင် ချိတ်ထားပေးသည် */}
        <button 
          className={styles.button} 
          onClick={handleTap}
          style={{ marginTop: '30px', background: 'linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)' }}
        >
          TAP TO EARN!
        </button>
      </div>
    </div>
  );
};
