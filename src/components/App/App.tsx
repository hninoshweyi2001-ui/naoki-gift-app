import React, { useState, useEffect } from "react";

// Premium Assets (Based on Original UI)
const ROCKET_GIF = "https://i.ibb.co/m0fH4q4/rocket-blue.png"; 
const AVATAR = "https://i.ibb.co/L6S8C2V/avatar.jpg";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Crash");
  const [gameState, setGameState] = useState<"waiting" | "running" | "crashed">("waiting");
  const [multiplier, setMultiplier] = useState(1.00);
  const [countdown, setCountdown] = useState(5.00);

  useEffect(() => {
    let timer: any;
    if (gameState === "waiting") {
      timer = setInterval(() => {
        setCountdown(prev => (prev <= 0.1 ? 0 : parseFloat((prev - 0.1).toFixed(2))));
        if (countdown <= 0) setGameState("running");
      }, 100);
    } else if (gameState === "running") {
      timer = setInterval(() => {
        setMultiplier(prev => {
          const next = prev + 0.01;
          if (Math.random() < 0.012 && next > 1.1) {
            setGameState("crashed");
            return prev;
          }
          return parseFloat(next.toFixed(2));
        });
      }, 50);
    } else if (gameState === "crashed") {
      timer = setTimeout(() => {
        setMultiplier(1.00); setCountdown(5.00); setGameState("waiting");
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [gameState, countdown]);

  return (
    <div style={{ background: '#050a17', minHeight: '100vh', color: 'white', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Top Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 20px', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <img src={AVATAR} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #1a2b6d' }} />
          <div>
            <div style={{ fontWeight: '800', fontSize: '14px' }}>Pâñðâ</div>
            <div style={{ fontSize: '10px', color: '#355df5' }}>Level 1</div>
          </div>
        </div>
        <div style={{ background: 'rgba(26, 43, 109, 0.5)', padding: '8px 15px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #1a2b6d' }}>
          <span style={{ color: '#fcd535', fontWeight: 'bold' }}>0.01 TON</span>
          <div style={{ background: '#355df5', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>+</div>
        </div>
      </div>

      {/* Main Game Content */}
      <div style={{ padding: '0 15px' }}>
        <div style={{ 
          background: 'radial-gradient(circle at top right, #0d1b3e, #050a17)', 
          borderRadius: '24px', height: '320px', position: 'relative', border: '1px solid #1a2b6d', overflow: 'hidden' 
        }}>
          {/* Grid Layout */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'linear-gradient(#355df5 1px, transparent 1px), linear-gradient(90deg, #355df5 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', marginTop: '40px' }}>
            <div style={{ fontSize: '64px', fontWeight: '900', color: gameState === 'crashed' ? '#f6465d' : 'white', textShadow: '0 0 20px rgba(53, 93, 245, 0.3)' }}>
              {gameState === 'waiting' ? countdown.toFixed(2) : `${multiplier}x`}
            </div>
            {gameState === 'crashed' && <div style={{ color: '#f6465d', fontWeight: 'bold', letterSpacing: '2px' }}>CRASHED!</div>}
          </div>

          {/* Rocket Animation (3D Move) */}
          {gameState === 'running' && (
            <div style={{ position: 'absolute', bottom: '20%', left: '15%', animation: 'float 2s infinite ease-in-out' }}>
              <img src={ROCKET_GIF} style={{ width: '130px', filter: 'drop-shadow(0 0 15px #355df5)' }} />
              <div style={{ position: 'absolute', bottom: '0', left: '-40px', width: '120px', height: '2px', background: 'linear-gradient(90deg, transparent, #355df5)', transform: 'rotate(-30deg)' }}></div>
            </div>
          )}

          {/* History Badges */}
          <div style={{ position: 'absolute', bottom: '15px', display: 'flex', gap: '6px', padding: '0 15px' }}>
            {['x1.52', 'x1.86', 'x1.00', 'x210.75'].map((h, i) => (
              <div key={i} style={{ background: h.includes('210') ? '#4b2b5e' : '#1a232e', color: h.includes('210') ? '#a358df' : '#f6465d', padding: '4px 10px', borderRadius: '8px', fontSize: '10px', fontWeight: 'bold' }}>{h}</div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '20px' }}>
          <button style={{ background: '#1a232e', color: 'white', padding: '18px', borderRadius: '16px', border: '1px solid #2b3139', fontWeight: 'bold' }}>Bet 🎁</button>
          <button style={{ background: 'linear-gradient(180deg, #355df5 0%, #1a44d6 100%)', color: 'white', padding: '18px', borderRadius: '16px', border: 'none', fontWeight: 'bold', boxShadow: '0 4px 0 #0d278a' }}>Bet 💎</button>
        </div>
      </div>

      {/* Premium Navigation Bar */}
      <div style={{ position: 'fixed', bottom: '0', left: '0', right: '0', background: '#0a0f1e', display: 'flex', justifyContent: 'space-around', padding: '12px 0', borderTop: '1px solid #1a2b6d', paddingBottom: '25px' }}>
        {[
          {n:'Inventory', i:'🎁'}, {n:'Upgrade', i:'⚒️'}, 
          {n:'Crash', i:'📈'}, {n:'Cases', i:'🗃️'}, {n:'Profile', i:'👤'}
        ].map(t => (
          <div key={t.n} onClick={() => setActiveTab(t.n)} style={{ textAlign: 'center', opacity: activeTab === t.n ? 1 : 0.4 }}>
            <div style={{ fontSize: '22px' }}>{t.i}</div>
            <div style={{ fontSize: '10px', marginTop: '4px', fontWeight: 'bold' }}>{t.n}</div>
            {activeTab === t.n && <div style={{ width: '4px', height: '4px', background: '#355df5', borderRadius: '50%', margin: '4px auto 0' }}></div>}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-15px) rotate(-2deg); } }
      `}</style>
    </div>
  );
};

export default App;
