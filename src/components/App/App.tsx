import React, { useState, useEffect } from "react";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("crash");
  const [gameState, setGameState] = useState<"waiting" | "running" | "crashed">("waiting");
  const [multiplier, setMultiplier] = useState(1.00);
  const [countdown, setCountdown] = useState(5);
  const [progress, setProgress] = useState(0);
  const [randomNFT, setRandomNFT] = useState("");

  // NFT ပုံစံအမျိုးမျိုး (ဥပမာ- Bitcoin Gold, Diamond, Panda Rare စသဖြင့်)
  const nftList = ["🪙", "💎", "🐼", "🚀", "👑", "🍀"];

  useEffect(() => {
    // ၁။ Loading စကရင်အတွက် Random NFT ရွေးချယ်ခြင်း
    setRandomNFT(nftList[Math.floor(Math.random() * nftList.length)]);

    // ၂။ Loading Progress Bar (၃ စက္ကန့်ကြာမယ်)
    const loadTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(loadTimer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(loadTimer);
  }, []);

  // --- CRASH GAME ENGINE ---
  useEffect(() => {
    if (loading) return;

    let timer: any;
    if (gameState === "waiting") {
      if (countdown > 0) {
        timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
      } else {
        setGameState("running");
      }
    } else if (gameState === "running") {
      timer = setInterval(() => {
        setMultiplier((prev) => {
          const next = prev + 0.02;
          if (Math.random() < 0.015 && next > 1.2) {
            setGameState("crashed");
            return prev;
          }
          return parseFloat(next.toFixed(2));
        });
      }, 80);
    } else if (gameState === "crashed") {
      timer = setTimeout(() => {
        setMultiplier(1.00);
        setCountdown(5);
        setGameState("waiting");
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [gameState, countdown, loading]);

  // --- LOADING SCREEN UI ---
  if (loading) {
    return (
      <div style={{ background: '#0b0e11', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        {/* Floating NFT Animation */}
        <div style={{ fontSize: '80px', marginBottom: '40px', animation: 'float 3s ease-in-out infinite', filter: 'drop-shadow(0 0 20px rgba(252, 213, 53, 0.4))' }}>
          {randomNFT}
        </div>
        
        {/* Loading Text & Progress */}
        <div style={{ width: '250px', textAlign: 'center' }}>
          <div style={{ marginBottom: '15px', fontSize: '14px', letterSpacing: '2px', fontWeight: 'bold', color: '#355df5' }}>LOADING... {progress}%</div>
          <div style={{ height: '8px', background: '#1e2329', borderRadius: '10px', overflow: 'hidden', border: '1px solid #2b3139' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #355df5, #00ccff)', transition: '0.1s', boxShadow: '0 0 10px #355df5' }}></div>
          </div>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(10deg); }
          }
        `}</style>
      </div>
    );
  }

  // --- MAIN APP UI (Game Area) ---
  return (
    <div style={{ background: '#0b0e11', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '45px', height: '45px', borderRadius: '15px', background: 'linear-gradient(45deg, #355df5, #00ccff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🐼</div>
          <div><div style={{ fontWeight: 'bold' }}>Pâñðâ</div><div style={{ fontSize: '12px', color: '#0ecb81' }}>Level 1</div></div>
        </div>
        <div style={{ background: '#1e2329', padding: '10px 18px', borderRadius: '14px', border: '1px solid #2b3139', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontWeight: 'bold', color: '#fcd535' }}>0.01 TON</span>
          <div style={{ background: '#355df5', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</div>
        </div>
      </div>

      <div style={{ padding: '0 20px' }}>
        {/* Crash Game View */}
        <div style={{ height: '320px', background: '#161a1e', borderRadius: '35px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px solid #2b3139', position: 'relative' }}>
          {gameState === "waiting" && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#929aa5', fontSize: '14px' }}>NEXT ROUND IN</div>
              <div style={{ fontSize: '60px', fontWeight: 'bold', color: '#fcd535' }}>0{countdown}.00</div>
              <div style={{ width: '150px', height: '4px', background: '#2b3139', marginTop: '10px', borderRadius: '2px' }}>
                <div style={{ width: `${(countdown/5)*100}%`, height: '100%', background: '#0ecb81', transition: '1s linear' }}></div>
              </div>
            </div>
          )}
          {gameState === "running" && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '75px', fontWeight: 'bold', color: '#0ecb81' }}>{multiplier}x</div>
              <div style={{ fontSize: '50px', animation: 'rocketFly 1s infinite' }}>🚀</div>
            </div>
          )}
          {gameState === "crashed" && (
            <div style={{ textAlign: 'center', animation: 'shake 0.3s' }}>
              <div style={{ fontSize: '75px', fontWeight: 'bold', color: '#f6465d' }}>{multiplier}x</div>
              <div style={{ color: '#f6465d', fontWeight: 'bold' }}>CRASHED!</div>
            </div>
          )}
        </div>

        {/* Betting Button */}
        <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <button style={{ background: '#1e2329', color: 'white', border: '1px solid #2b3139', padding: '18px', borderRadius: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
             Bet 🎁
          </button>
          <button style={{ background: '#355df5', color: 'white', border: 'none', padding: '18px', borderRadius: '20px', fontWeight: 'bold', boxShadow: '0 4px 15px rgba(53, 93, 245, 0.3)' }}>
             Bet 💎
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ position: 'fixed', bottom: '20px', left: '20px', right: '20px', background: 'rgba(30, 35, 41, 0.95)', display: 'flex', justifyContent: 'space-around', padding: '15px', borderRadius: '25px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
        {['inventory', 'upgrade', 'crash', 'cases', 'profile'].map((id) => (
          <div key={id} onClick={() => setActiveTab(id)} style={{ fontSize: '22px', color: activeTab === id ? '#355df5' : '#929aa5', cursor: 'pointer' }}>
            {id === 'crash' ? '📈' : id === 'cases' ? '🗃️' : id === 'upgrade' ? '⚒️' : id === 'inventory' ? '🎁' : '👤'}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes rocketFly {
          0% { transform: translate(0,0); }
          50% { transform: translate(5px, -5px); }
          100% { transform: translate(0,0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
      `}</style>
    </div>
  );
};

export default App;
