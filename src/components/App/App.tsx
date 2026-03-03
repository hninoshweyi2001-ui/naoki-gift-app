import React, { useState, useEffect } from "react";

export const App: React.FC = () => {
  const [multiplier, setMultiplier] = useState(1.00);
  const [isFlying, setIsFlying] = useState(false);
  const [isCrashed, setIsCrashed] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [balance, setBalance] = useState(0); // Player ရဲ့ Coin လက်ကျန်
  const [promoInput, setPromoInput] = useState(""); // Promo code ရိုက်ထည့်သည့်နေရာ
  const [message, setMessage] = useState(""); // အကြောင်းကြားစာ

  // --- Promo Code သတ်မှတ်ချက် (ဒီနေရာမှာ သင်ကြိုက်သလို ပြောင်းနိုင်ပါတယ်) ---
  const VALID_PROMO = "NAOKI100"; // သင်ပေးမယ့် Code
  const PROMO_REWARD = 100; // Code မှန်ရင် ရမယ့် Coin အရေအတွက်

  useEffect(() => {
    let timer: any;
    if (!isFlying && !isCrashed) {
      if (countdown > 0) {
        timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
      } else { setIsFlying(true); }
    }
    if (isFlying && !isCrashed) {
      timer = setInterval(() => {
        setMultiplier((prev) => {
          const next = prev + 0.02;
          if (Math.random() < 0.015 && next > 1.2) {
            setIsCrashed(true);
            setIsFlying(false);
            setTimeout(resetGame, 3000);
            return prev;
          }
          return parseFloat(next.toFixed(2));
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isFlying, isCrashed, countdown]);

  const resetGame = () => {
    setMultiplier(1.00);
    setIsCrashed(false);
    setIsFlying(false);
    setCountdown(10);
  };

  // Promo Code စစ်ဆေးသည့် Function
  const handlePromoCode = () => {
    if (promoInput.toUpperCase() === VALID_PROMO) {
      setBalance(prev => prev + PROMO_REWARD);
      setMessage(`🎉 Success! You got ${PROMO_REWARD} Coins!`);
      setPromoInput("");
    } else {
      setMessage("❌ Invalid Promo Code!");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div style={{ textAlign: 'center', background: '#0b0e11', minHeight: '100vh', color: 'white', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ color: '#f0b90b' }}>Naoki Rocket</h3>
        <div style={{ background: '#2b3139', padding: '5px 15px', borderRadius: '20px' }}>💰 {balance}</div>
      </div>

      {/* Rocket Game Box */}
      <div style={{ height: '200px', background: '#1e2329', borderRadius: '15px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px 0', border: '2px solid #2b3139' }}>
        {!isFlying && !isCrashed && (
          <div>
            <div style={{ fontSize: '14px', color: '#929aa5' }}>Next Flight In</div>
            <div style={{ fontSize: '30px', fontWeight: 'bold', color: '#f0b90b' }}>{countdown}s</div>
          </div>
        )}
        {(isFlying || isCrashed) && (
          <div style={{ fontSize: '50px', fontWeight: 'bold', color: isCrashed ? '#f6465d' : '#0ecb81' }}>
            {multiplier.toFixed(2)}x
          </div>
        )}
      </div>

      {/* --- Promo Code Section --- */}
      <div style={{ background: '#1e2329', padding: '20px', borderRadius: '15px', marginTop: '20px' }}>
        <h4 style={{ margin: '0 0 10px 0' }}>🎁 Promo Code</h4>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value)}
            placeholder="Enter Code..."
            style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #2b3139', background: '#0b0e11', color: 'white' }}
          />
          <button 
            onClick={handlePromoCode}
            style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#f0b90b', color: 'black', fontWeight: 'bold' }}
          >
            Claim
          </button>
        </div>
        {message && <p style={{ fontSize: '12px', marginTop: '10px', color: message.includes('Success') ? '#0ecb81' : '#f6465d' }}>{message}</p>}
      </div>

      <p style={{ color: '#929aa5', fontSize: '12px', marginTop: '20px' }}>Check our Telegram for new Promo Codes!</p>
    </div>
  );
};
