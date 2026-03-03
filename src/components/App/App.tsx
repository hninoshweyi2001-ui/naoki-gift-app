import React, { useState, useEffect } from "react";

// 3D & Premium Assets
const NFT_AVATAR = "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622021.jpg";
const ROCKET_3D = "https://static.vecteezy.com/system/resources/previews/009/384/876/original/rocket-flying-on-transparent-background-free-png.png";

interface BetRecord {
  user: string;
  amount: number;
  icon: string;
  isNew?: boolean;
}

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [gameState, setGameState] = useState<"waiting" | "running" | "crashed">("waiting");
  const [multiplier, setMultiplier] = useState(1.00);
  const [countdown, setCountdown] = useState(5.00);
  const [history, setHistory] = useState<string[]>(["x1.52", "x1.86", "x210.75", "x3.56"]);
  const [bets, setBets] = useState<BetRecord[]>([]);

  useEffect(() => {
    // Loading Screen with 3D Logo Effect
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;
    let timer: any;

    if (gameState === "waiting") {
      timer = setInterval(() => {
        setCountdown(prev => (prev <= 0.1 ? 0 : parseFloat((prev - 0.1).toFixed(2))));
        if (countdown <= 0) setGameState("running");
      }, 100);
    } 
    else if (gameState === "running") {
      timer = setInterval(() => {
        setMultiplier(prev => {
          const next = prev + 0.01;
          if (Math.random() < 0.015 && next > 1.1) {
            setGameState("crashed");
            setHistory(prevH => [`x${next.toFixed(2)}`, ...prevH].slice(0, 6));
            return prev;
          }
          return parseFloat(next.toFixed(2));
        });
      }, 60);
    } 
    else if (gameState === "crashed") {
      timer = setTimeout(() => {
        setMultiplier(1.00);
        setCountdown(5.00);
        setBets([]);
        setGameState("waiting");
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [gameState, countdown, loading]);

  const handleBet = (icon: string) => {
    if (gameState !== "waiting") return;
    const myBet: BetRecord = { user: "Pâñðâ (You)", amount: 0.10, icon: icon, isNew: true };
    setBets(prev => [myBet, ...prev]);
  };

  if (loading) return (
    <div style={{ background: '#050709', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ position: 'relative', marginBottom: '30px' }}>
          <div style={{ position: 'absolute', inset: -20, background: '#355df5', filter: 'blur(50px)', opacity: 0.3 }}></div>
          <img src={NFT_AVATAR} style={{ width: '110px', borderRadius: '25px', position: 'relative', animation: 'float 3s infinite ease-in-out' }} />
        </div>
        <div style={{ fontSize: '12px', letterSpacing: '4px', color: '#355df5', fontWeight: '900' }}>LOADING SYSTEM...</div>
      </div>
      <style>{`@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-15px)} }`}</style>
    </div>
  );

  return (
    <div style={{ background: '#0b0e11', minHeight: '100vh', color: 'white', fontFamily: 'Inter, sans-serif', paddingBottom: '100px' }}>
      
      {/* 1. Profile Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 20px', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <img src={NFT_AVATAR} style={{ width: '45px', height: '45px', borderRadius: '14px', border: '2px solid #355df5', boxShadow: '0 0 10px rgba(53, 93, 245, 0.5)' }} />
          <div>
            <div style={{ fontWeight: '800', fontSize: '16px' }}>Pâñðâ</div>
            <div style={{ fontSize: '11px', color: '#0ecb81', fontWeight: 'bold' }}>VIP LEVEL 1</div>
          </div>
        </div>
        <div style={{ background: 'linear-gradient(180deg, #1e2329 0%, #161a1e 100%)', padding: '10px 18px', borderRadius: '16px', fontWeight: '900', color: '#fcd535', border: '1px solid #2b3139', display: 'flex', alignItems: 'center', gap: '8px' }}>
          0.01 TON <div style={{ background: '#355df5', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: 'white' }}>+</div>
        </div>
      </div>

      <div style={{ padding: '0 15px' }}>
        {/* 2. 3D Game Area (ဇယားကွက်မှိန်မှိန် + Rocket ပျံသန်းမှု) */}
        <div style={{ background: 'radial-gradient(circle at center, #1c2127 0%, #0b0e11 100%)', borderRadius: '32px', height: '280px', position: 'relative', border: '1px solid #2b3139', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
          
          {/* Subtle Grid */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'linear-gradient(#355df5 1px, transparent 1px), linear-gradient(90deg, #355df5 1px, transparent 1px)', backgroundSize: '45px 45px' }}></div>

          <div style={{ zIndex: 10, textAlign: 'center', marginTop: '50px' }}>
            {gameState === 'waiting' ? (
              <>
                <div style={{ fontSize: '58px', fontWeight: '900', color: '#0ecb81', textShadow: '0 0 20px rgba(14, 203, 129, 0.3)' }}>{countdown.toFixed(2)}</div>
                <div style={{ fontSize: '11px', color: '#0ecb81', letterSpacing: '4px', fontWeight: 'bold' }}>STARTING...</div>
              </>
            ) : (
              <div style={{ fontSize: '70px', fontWeight: '900', color: gameState === 'crashed' ? '#f6465d' : 'white', textShadow: '0 5px 30px rgba(255,255,255,0.1)' }}>
                {multiplier}x
              </div>
            )}
            {gameState === 'crashed' && <div style={{ color: '#f6465d', fontWeight: '900', fontSize: '18px', marginTop: '-10px' }}>CRASHED!</div>}
          </div>

          {/* 3D Rocket with Glow */}
          {gameState === 'running' && (
            <div style={{ position: 'absolute', bottom: '15%', left: '15%', animation: 'rocketMove 2s infinite ease-in-out' }}>
              <img src={ROCKET_3D} style={{ width: '100px', filter: 'drop-shadow(0 0 15px #355df5)' }} />
              <div style={{ position: 'absolute', top: '60px', left: '-50px', width: '80px', height: '2px', background: 'linear-gradient(90deg, transparent, rgba(53, 93, 245, 0.8))', transform: 'rotate(-35deg)', borderRadius: '100%' }}></div>
            </div>
          )}

          {/* History Badges */}
          <div style={{ position: 'absolute', bottom: '18px', display: 'flex', gap: '8px', zIndex: 10 }}>
            {history.map((h, i) => (
              <div key={i} style={{ background: h.includes('210') ? 'linear-gradient(135deg, #4b2b5e, #2b1a3a)' : '#1e2329', color: h.includes('210') ? '#a358df' : '#f6465d', padding: '6px 14px', borderRadius: '12px', fontSize: '11px', fontWeight: '900', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>{h}</div>
            ))}
          </div>
        </div>

        {/* 3. Action Buttons (ကာလာအစုံ) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' }}>
          <button onClick={() => handleBet("🎁")} style={{ background: '#1e2329', color: 'white', padding: '20px', borderRadius: '24px', border: '1px solid #363c44', fontWeight: '900', fontSize: '16px', boxShadow: '0 6px 0 #000', active: { transform: 'translateY(4px)' } }}>BET 🎁</button>
          <button onClick={() => handleBet("💎")} style={{ background: 'linear-gradient(135deg, #355df5 0%, #00ccff 100%)', color: 'white', padding: '20px', borderRadius: '24px', border: 'none', fontWeight: '900', fontSize: '16px', boxShadow: '0 6px 0 #1a2b6d', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>BET 💎</button>
        </div>

        {/* 4. Live Bet History List */}
        <div style={{ marginTop: '25px' }}>
          {bets.length > 0 ? bets.map((b, idx) => (
            <div key={idx} style={{ background: 'linear-gradient(90deg, #1e2329 0%, #161a1e 100%)', borderRadius: '20px', padding: '15px', display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '12px', border: '1px solid rgba(255,255,255,0.03)', animation: b.isNew ? 'slideIn 0.3s ease-out' : 'none' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#0b0e11', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', border: '1px solid #2b3139' }}>{b.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: '800', letterSpacing: '0.5px' }}>{b.user}</div>
                <div style={{ fontSize: '11px', color: '#929aa5' }}>{b.amount.toFixed(2)} TON • <span style={{color: '#0ecb81', fontWeight: 'bold'}}>LIVE x{multiplier}</span></div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '15px', fontWeight: '900', color: '#0ecb81' }}>+{(b.amount * multiplier).toFixed(2)}</div>
                <div style={{ fontSize: '9px', color: '#929aa5', fontWeight: 'bold'
