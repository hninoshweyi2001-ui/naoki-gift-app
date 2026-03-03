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
    <div style={{ background: '#050709', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <img src={NFT_AVATAR} style={{ width: '110px', borderRadius: '25px', boxShadow: '0 0 30px #355df5', animation: 'float 3s infinite ease-in-out' }} />
        <div style={{ marginTop: '20px', fontSize: '12px', color: '#355df5', letterSpacing: '4px', fontWeight: 'bold' }}>LOADING...</div>
      </div>
      <style>{`@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-15px)} }`}</style>
    </div>
  );

  return (
    <div style={{ background: '#0b0e11', minHeight: '100vh', color: 'white', fontFamily: 'Arial, sans-serif', paddingBottom: '100px' }}>
      
      {/* 1. Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 20px', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <img src={NFT_AVATAR} style={{ width: '45px', height: '45px', borderRadius: '14px', border: '2px solid #355df5' }} />
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '16px' }}>Pâñðâ</div>
            <div style={{ fontSize: '11px', color: '#0ecb81' }}>VIP Level 1</div>
          </div>
        </div>
        <div style={{ background: '#1e2329', padding: '10px 18px', borderRadius: '16px', fontWeight: 'bold', color: '#fcd535' }}>0.01 TON</div>
      </div>

      <div style={{ padding: '0 15px' }}>
        {/* 2. 3D Game Area */}
        <div style={{ background: 'radial-gradient(circle, #1c2127 0%, #0b0e11 100%)', borderRadius: '32px', height: '280px', position: 'relative', border: '1px solid #2b3139', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
          
          {/* Subtle Grid */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'linear-gradient(#355df5 1px, transparent 1px), linear-gradient(90deg, #355df5 1px, transparent 1px)', backgroundSize: '45px 45px' }}></div>

          <div style={{ zIndex: 10, textAlign: 'center', marginTop: '50px' }}>
            {gameState === 'waiting' ? (
              <div style={{ fontSize: '58px', fontWeight: '900', color: '#0ecb81' }}>{countdown.toFixed(2)}</div>
            ) : (
              <div style={{ fontSize: '70px', fontWeight: '900', color: gameState === 'crashed' ? '#f6465d' : 'white' }}>{multiplier}x</div>
            )}
          </div>

          {/* 3D Rocket */}
          {gameState === 'running' && (
            <div style={{ position: 'absolute', bottom: '20%', left: '20%', animation: 'rocketFly 2s infinite ease-in-out' }}>
              <img src={ROCKET_3D} style={{ width: '100px', filter: 'drop-shadow(0 0 15px #355df5)' }} />
            </div>
          )}

          {/* History Badges */}
          <div style={{ position: 'absolute', bottom: '15px', display: 'flex', gap: '8px' }}>
            {history.map((h, i) => (
              <div key={i} style={{ background: h.includes('210') ? '#4b2b5e' : '#1e2329', color: h.includes('210') ? '#a358df' : '#f6465d', padding: '6px 14px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>{h}</div>
            ))}
          </div>
        </div>

        {/* 3. Action Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' }}>
          <button onClick={() => handleBet("🎁")} style={{ background: '#1e2329', color: 'white', padding: '20px', borderRadius: '24px', border: '1px solid #363c44', fontWeight: 'bold' }}>Bet 🎁</button>
          <button onClick={() => handleBet("💎")} style={{ background: 'linear-gradient(135deg, #355df5, #00ccff)', color: 'white', padding: '20px', borderRadius: '24px', border: 'none', fontWeight: 'bold', boxShadow: '0 5px 15px rgba(53, 93, 245, 0.3)' }}>Bet 💎</button>
        </div>

        {/* 4. Live Bet History */}
        <div style={{ marginTop: '25px' }}>
          {bets.map((b, idx) => (
            <div key={idx} style={{ background: '#1e2329', borderRadius: '20px', padding: '15px', display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '12px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#0b0e11', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>{b.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{b.user}</div>
                <div style={{ fontSize: '11px', color: '#929aa5' }}>{b.amount} TON • <span style={{color: '#0ecb81'}}>LIVE x{multiplier}</span></div>
              </div>
              <div style={{ textAlign: 'right', color: '#0ecb81', fontWeight: 'bold' }}>+{(b.amount * multiplier).toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Nav Bar */}
      <div style={{ position: 'fixed', bottom: '0', left: '0', right: '0', background: '#0b0e11', display: 'flex', justifyContent: 'space-around', padding: '20px 0', borderTop: '1px solid #1e2329' }}>
        {[{n:'Inventory',i:'🎁'}, {n:'Upgrade',i:'⚒️'}, {n:'Crash',i:'📈'}, {n:'Cases',i:'🗃️'}, {n:'Profile',i:'👤'}].map(t => (
          <div key={t.n} style={{ textAlign: 'center', opacity: t.n === 'Crash' ? 1 : 0.3 }}>
            <div style={{ fontSize: '24px' }}>{t.i}</div>
            <div style={{ fontSize: '10px', color: '#929aa5', marginTop: '5px' }}>{t.n}</div>
          </div>
        ))}
      </div>

      <style>{`@keyframes rocketFly { 0%,100%{transform:translate(0,0)} 50%{transform:translate(15px,-20px)} }`}</style>
    </div>
  );
};

export default App;
