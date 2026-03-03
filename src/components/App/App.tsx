import React, { useState, useEffect } from "react";

// NFT ပုံရိပ်စစ်စစ်များ (Image Links)
const nftImages = [
  "https://i.postimg.cc/mD3m9n0L/nft1.png", // Futuristic Panda/Ape
  "https://i.postimg.cc/9f4HqXvP/nft2.png", // Cyberpunk Character
  "https://i.postimg.cc/7Z0S2V6M/nft3.png", // Gold Coin/Token
  "https://i.postimg.cc/vT4m1YvN/nft4.png"  // Premium Lootbox
];

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [gameState, setGameState] = useState<"waiting" | "running" | "crashed">("waiting");
  const [multiplier, setMultiplier] = useState(1.00);
  const [countdown, setCountdown] = useState(5.00);
  const [randomNFT, setRandomNFT] = useState(nftImages[0]);
  const [bets, setBets] = useState<any[]>([]);

  useEffect(() => {
    // ဝင်ဝင်ချင်းမှာ Random NFT စိုစိုလေးတစ်ခုရွေးမယ်
    setRandomNFT(nftImages[Math.floor(Math.random() * nftImages.length)]);
    setTimeout(() => setLoading(false), 2500);
  }, []);

  useEffect(() => {
    if (loading) return;
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
          if (Math.random() < 0.012 && next > 1.1) { setGameState("crashed"); return prev; }
          return parseFloat(next.toFixed(2));
        });
      }, 60);
    } else if (gameState === "crashed") {
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
    setBets(prev => [{ user: "Pâñðâ (You)", amount: "0.10", icon: icon }, ...prev]);
  };

  if (loading) {
    return (
      <div style={{ background: '#050709', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {/* NFT Image with Glow Effect */}
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', width: '180px', height: '180px', background: '#355df5', filter: 'blur(80px)', opacity: 0.5 }}></div>
          <img src={randomNFT} alt="NFT" style={{ width: '180px', height: '180px', borderRadius: '30px', position: 'relative', animation: 'float 3s infinite ease-in-out' }} />
        </div>
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <div style={{ color: '#355df5', fontWeight: 'bold', fontSize: '14px', letterSpacing: '3px' }}>SYNCING NFT DATA...</div>
          <div style={{ width: '200px', height: '4px', background: '#1e2329', marginTop: '15px', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: '60%', height: '100%', background: 'linear-gradient(90deg, #355df5, #00ccff)', animation: 'load 2s infinite' }}></div>
          </div>
        </div>
        <style>{`
          @keyframes float { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-20px) scale(1.05); } }
          @keyframes load { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ background: '#0b0e11', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 20px', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <img src={randomNFT} style={{ width: '40px', height: '40px', borderRadius: '10px', border: '1px solid #355df5' }} />
          <div><div style={{ fontWeight: 'bold' }}>Pâñðâ</div><div style={{ fontSize: '11px', color: '#0ecb81' }}>VIP Level 1</div></div>
        </div>
        <div style={{ background: '#1e2329', padding: '8px 15px', borderRadius: '12px', fontWeight: 'bold', color: '#fcd535' }}>0.01 TON</div>
      </div>

      <div style={{ padding: '0 15px' }}>
        {/* Crash Visualizer */}
        <div style={{ background: 'radial-gradient(circle at center, #1e2329 0%, #0b0e11 100%)', borderRadius: '30px', height: '260px', position: 'relative', border: '1px solid #2b3139', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
           <div style={{ textAlign: 'center', zIndex: 2 }}>
             <div style={{ fontSize: '60px', fontWeight: '900', color: gameState === 'crashed' ? '#f6465d' : 'white' }}>
               {gameState === 'waiting' ? countdown.toFixed(2) : multiplier + 'x'}
             </div>
             {gameState === 'waiting' && <div style={{ fontSize: '12px', color: '#0ecb81', letterSpacing: '2px' }}>PREPARING ROCKET...</div>}
           </div>
           {/* Animated Background Grid */}
           <div style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.1, backgroundSize: '40px 40px', backgroundImage: 'linear-gradient(to right, #355df5 1px, transparent 1px), linear-gradient(to bottom, #355df5 1px, transparent 1px)' }}></div>
        </div>

        {/* Bet Options with Better Colors */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' }}>
          <button onClick={() => handleBet("🎁")} style={{ background: '#1e2329', color: 'white', padding: '18px', borderRadius: '20px', border: '1px solid #363c44', fontWeight: 'bold', boxShadow: '0 4px 0 #000' }}>Bet 🎁</button>
          <button onClick={() => handleBet("💎")} style={{ background: 'linear-gradient(135deg, #355df5, #0072ff)', color: 'white', padding: '18px', borderRadius: '20px', border: 'none', fontWeight: 'bold', boxShadow: '0 4px 0 #1a2b6d' }}>Bet 💎</button>
        </div>

        {/* Dynamic Bet Table */}
        <div style={{ marginTop: '25px' }}>
          {bets.map((b, idx) => (
            <div key={idx} style={{ background: 'rgba(30, 35, 41, 0.5)', borderRadius: '15px', padding: '12px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ width: '35px', height: '35px', borderRadius: '8px', background: '#0b0e11', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{b.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{b.user}</div>
                <div style={{ fontSize: '11px', color: '#929aa5' }}>{b.amount} TON • <span style={{color: '#0ecb81'}}>Live</span></div>
              </div>
              <div style={{ textAlign: 'right', color: '#0ecb81', fontWeight: 'bold' }}>+{(parseFloat(b.amount) * multiplier).toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
