import React, { useState, useEffect } from "react";

export const App: React.FC = () => {
  // --- States ---
  const [multiplier, setMultiplier] = useState(1.00);
  const [isFlying, setIsFlying] = useState(false);
  const [isCrashed, setIsCrashed] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [balance, setBalance] = useState(0);
  const [promoInput, setPromoInput] = useState("");
  const [message, setMessage] = useState("");
  const [lastClaim, setLastClaim] = useState<number | null>(null);

  const VALID_PROMO = "NAOKI100"; 
  const PROMO_REWARD = 100;
  const DAILY_REWARD = 50;

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

  // --- Rocket Game Logic (10s Cycle) ---
  useEffect(() => {
    let timer: any;
    if (!isFlying && !isCrashed) {
      if (countdown > 0) { timer = setInterval(() => setCountdown(prev => prev - 1), 1000); }
      else { setIsFlying(true); }
    }
    if (isFlying && !isCrashed) {
      timer = setInterval(() => {
        setMultiplier((prev) => {
          const next = prev + 0.03;
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

  const handleDailyClaim = () => {
    const now = Date.now();
    if (!lastClaim || now - lastClaim > 24 * 60 * 60 * 1000) {
      setBalance(prev => prev + DAILY_REWARD);
      setLastClaim(now);
      setMessage(`🎁 Daily Box Opened! +${DAILY_REWARD}`);
    } else { setMessage("⏳ Come back tomorrow!"); }
    setTimeout(() => setMessage(""), 3000);
  };

  const handlePromoCode = () => {
    if (promoInput.toUpperCase() === VALID_PROMO) {
      setBalance(prev => prev + PROMO_REWARD);
      setMessage("🎉 Code Success!");
    } else { setMessage("❌ Invalid Code"); }
    setPromoInput("");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div style={{ textAlign: 'center', background: '#0b0e11', minHeight: '100vh', color: 'white', padding: '15px', fontFamily: 'sans-serif' }}>
      {/* Balance Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#1e2329', borderRadius: '12px', marginBottom: '15px' }}>
        <span style={{ fontWeight: 'bold', color: '#f0b90b' }}>NAOKI ROCKET 🚀</span>
        <span style={{ background: '#0b0e11', padding: '2px 10px', borderRadius: '20px' }}>💰 {balance}</span>
      </div>

      {/* 1. Rocket Animation & Multiplier (အပေါ်ဆုံးမှာ ထားထားပါတယ်) */}
      <div style={{ height: '180px', background: '#1e2329', borderRadius: '15px', marginBottom: '15px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #2b3139' }}>
        {isFlying && !isCrashed && (
          <div style={{ position: 'absolute', bottom: '20px', left: '20px', fontSize: '60px', transition: 'all 0.1s linear', transform: `translate(${(multiplier-1)*60}px, -${(multiplier-1)*60}px) rotate(-45deg)` }}>🚀</div>
        )}
        {isCrashed && <div style={{ fontSize: '50px' }}>💥</div>}
        
        <div style={{ zIndex: 2, textAlign: 'center' }}>
          {!isFlying && !isCrashed ? (
            <div>
              <div style={{ fontSize: '14px', color: '#929aa5' }}>Next Takeoff</div>
              <div style={{ fontSize: '40px', fontWeight: 'bold', color: '#f0b90b' }}>{countdown}s</div>
            </div>
          ) : (
            <div style={{ fontSize: '55px', fontWeight: 'bold', color: isCrashed ? '#f6465d' : '#0ecb81' }}>{multiplier.toFixed(2)}x</div>
          )}
        </div>
      </div>

      {/* 2. Daily Free Box */}
      <button onClick={handleDailyClaim} style={{ width: '100%', padding: '15px', background: 'linear-gradient(45deg, #f0b90b, #ff8e53)', border: 'none', borderRadius: '12px', fontWeight: 'bold', color: 'black', marginBottom: '15px' }}>
        🎁 OPEN DAILY FREE BOX
      </button>

      {/* 3. Promo Code Section */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <input value={promoInput} onChange={(e) => setPromoInput(e.target.value)} placeholder="Enter Promo Code" style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #2b3139', background: '#1e2329', color: 'white' }} />
        <button onClick={handlePromoCode} style={{ padding: '0 20px', background: '#f0b90b', border: 'none', borderRadius: '8px', fontWeight: 'bold', color: 'black' }}>Claim</button>
      </div>

      {message && <div style={{ marginBottom: '15px', color: '#f0b90b', fontWeight: 'bold' }}>{message}</div>}

      {/* 4. NFT Store Section */}
      <h3 style={{ textAlign: 'left', margin: '10px 0', fontSize: '18px' }}>💎 NFT Mystery Boxes</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', paddingBottom: '30px' }}>
        {nftBoxes.map(box => (
          <div key={box.id} style={{ background: '#1e2329', padding: '12px', borderRadius: '12px', border: `1px solid ${box.color}` }}>
            <div style={{ fontSize: '30px' }}>📦</div>
            <div style={{ fontSize: '12px', fontWeight: 'bold', margin: '5px 0' }}>{box.name}</div>
            <div style={{ color: '#f0b90b', fontSize: '14px', marginBottom: '8px' }}>{box.price} TON</div>
            <button style={{ width: '100%', padding: '8px', background: box.color, border: 'none', borderRadius: '6px', fontWeight: 'bold', color: 'black', fontSize: '11px' }}>SPIN</button>
          </div>
        ))}
      </div>
    </div>
  );
};
