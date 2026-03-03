import React, { useState, useEffect } from "react";

export const App: React.FC = () => {
  // Game States
  const [multiplier, setMultiplier] = useState(1.00);
  const [isFlying, setIsFlying] = useState(false);
  const [isCrashed, setIsCrashed] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [balance, setBalance] = useState(0);

  // Feature States
  const [promoInput, setPromoInput] = useState("");
  const [message, setMessage] = useState("");
  const [lastClaim, setLastClaim] = useState<number | null>(null);

  const VALID_PROMO = "NAOKI100"; 
  const PROMO_REWARD = 100;
  const DAILY_REWARD = 50;

  // NFT Boxes Data
  const nftBoxes = [
    { id: 1, price: 0.5, name: "Bronze", color: "#cd7f32" },
    { id: 2, price: 1.0, name: "Silver", color: "#c0c0c0" },
    { id: 3, price: 1.5, name: "Gold", color: "#ffd700" },
    { id: 4, price: 2.0, name: "Platinum", color: "#e5e4e2" },
    { id: 5, price: 4.0, name: "Diamond", color: "#b9f2ff" },
    { id: 6, price: 5.0, name: "Emerald", color: "#50c878" },
    { id: 7, price: 7.0, name: "Ruby", color: "#e0115f" },
    { id: 8, price: 9.0, name: "Sapphire", color: "#0f52ba" },
    { id: 9, price: 10.0, name: "Legendary", color: "#ff00ff" },
    { id: 10, price: 15.0, name: "Mythic", color: "#ff4500" },
  ];

  // Rocket Logic (10s Cycle)
  useEffect(() => {
    let timer: any;
    if (!isFlying && !isCrashed) {
      if (countdown > 0) { timer = setInterval(() => setCountdown(prev => prev - 1), 1000); }
      else { setIsFlying(true); }
    }
    if (isFlying && !isCrashed) {
      timer = setInterval(() => {
        setMultiplier((prev) => {
          const next = prev + 0.02;
          if (Math.random() < 0.015 && next > 1.2) {
            setIsCrashed(true); setIsFlying(false);
            setTimeout(() => { setMultiplier(1.00); setIsCrashed(false); setIsFlying(false); setCountdown(10); }, 3000);
            return prev;
          }
          return parseFloat(next.toFixed(2));
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isFlying, isCrashed, countdown]);

  // Daily Box Logic
  const handleDailyClaim = () => {
    const now = Date.now();
    if (!lastClaim || now - lastClaim > 24 * 60 * 60 * 1000) {
      setBalance(prev => prev + DAILY_REWARD);
      setLastClaim(now);
      setMessage(`🎁 Daily Box Opened! +${DAILY_REWARD} Coins`);
    } else {
      setMessage("⏳ Already claimed! Come back later.");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handlePromoCode = () => {
    if (promoInput.toUpperCase() === VALID_PROMO) {
      setBalance(prev => prev + PROMO_REWARD);
      setMessage("🎉 Promo Code Success!");
    } else { setMessage("❌ Invalid Code"); }
    setPromoInput("");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div style={{ textAlign: 'center', background: '#0b0e11', minHeight: '100vh', color: 'white', padding: '15px', fontFamily: 'sans-serif', paddingBottom: '50px' }}>
      {/* Header & Balance */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#1e2329', borderRadius: '12px', alignItems: 'center' }}>
        <span style={{ fontWeight: 'bold', color: '#f0b90b' }}>NAOKI APP 🚀</span>
        <span style={{ background: '#0b0e11', padding: '5px 12px', borderRadius: '20px' }}>💰 {balance}</span>
      </div>

      {/* 1. Rocket Game Area */}
      <div style={{ height: '140px', background: '#1e2329', borderRadius: '15px', margin: '15px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid #2b3139', position: 'relative' }}>
        <div style={{ fontSize: '14px', color: '#929aa5', position: 'absolute', top: '10px' }}>Rocket Multiplier</div>
        <div style={{ fontSize: '45px', fontWeight: 'bold', color: isCrashed ? '#f6465d' : '#0ecb81' }}>
          {isFlying || isCrashed ? `${multiplier.toFixed(2)}x` : `${countdown}s`}
        </div>
        {!isFlying && !isCrashed && <div style={{ fontSize: '12px', color: '#f0b90b' }}>Waiting for takeoff...</div>}
      </div>

      {/* 2. Daily Free Box */}
      <div style={{ background: 'linear-gradient(45deg, #1e2329, #2b3139)', padding: '15px', borderRadius: '15px', marginBottom: '15px', border: '1px solid #f0b90b' }}>
        <div style={{ fontSize: '30px', marginBottom: '5px' }}>🎁</div>
        <h4 style={{ margin: '0 0 10px 0' }}>Daily Free Box</h4>
        <button onClick={handleDailyClaim} style={{ width: '100%', padding: '10px', background: '#f0b90b', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>CLAIM DAILY COINS</button>
      </div>

      {/* 3. Promo Code Section */}
      <div style={{ background: '#1e2329', padding: '15px', borderRadius: '15px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input value={promoInput} onChange={(e) => setPromoInput(e.target.value)} placeholder="Enter Promo Code" style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #2b3139', background: '#0b0e11', color: 'white' }} />
          <button onClick={handlePromoCode} style={{ padding: '10px 15px', background: '#f0b90b', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}>Claim</button>
        </div>
        {message && <div style={{ fontSize: '12px', marginTop: '10px', color: message.includes('Success') || message.includes('Opened') ? '#0ecb81' : '#f6465d' }}>{message}</div>}
      </div>

      {/* 4. NFT Store Section */}
      <h3 style={{ textAlign: 'left', margin: '20px 0 10px 5px', color: '#f0b90b' }}>💎 NFT Mystery Boxes</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {nftBoxes.map(box => (
          <div key={box.id} style={{ background: '#1e2329', padding: '12px', borderRadius: '12px', border: `1px solid ${box.color}`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: '35px' }}>📦</div>
            <div style={{ fontSize: '13px', fontWeight: 'bold', marginTop: '5px' }}>{box.name}</div>
            <div style={{ color: '#f0b90b', fontSize: '14px', margin: '5px 0' }}>{box.price} TON</div>
            <button style={{ width: '100%', padding: '8px', background: box.color, border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', color: 'black' }}>SPIN</button>
          </div>
        ))}
      </div>
    </div>
  );
};
