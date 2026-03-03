import React, { useState, useEffect, useRef } from "react";

const App: React.FC = () => {
  const [page, setPage] = useState<"loading" | "main">("loading");
  const [activeTab, setActiveTab] = useState("Crash");
  const [multiplier, setMultiplier] = useState(1.00);
  const [isSpinning, setIsSpinning] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // NFT Items for Case Opening
  const nftItems = ["💎", "🎁", "🎨", "👾", "🚀", "⚡", "🔥", "🌈", "👑", "🍀", "💎", "🎁", "🎨", "👾", "🚀", "⚡", "🔥", "🌈", "👑", "🍀", "💎", "🎁"];

  // 1. Loading Logic
  useEffect(() => {
    const timer = setTimeout(() => setPage("main"), 2500);
    return () => clearTimeout(timer);
  }, []);

  // 2. Crash Game Logic
  useEffect(() => {
    if (page === "main" && activeTab === "Crash") {
      const interval = setInterval(() => {
        setMultiplier(prev => (prev < 10 ? parseFloat((prev + 0.01).toFixed(2)) : 1.00));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [page, activeTab]);

  // 3. Case Spin Logic (လှည့်တဲ့ Animation)
  const openCase = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    const spinDistance = 1500 + Math.random() * 800;
    if (scrollRef.current) {
      scrollRef.current.style.transition = "transform 4s cubic-bezier(0.15, 0, 0.15, 1)";
      scrollRef.current.style.transform = `translateX(-${spinDistance}px)`;
    }
    setTimeout(() => {
      setIsSpinning(false);
      alert("Congratulations! You won an NFT! 🏆");
      if (scrollRef.current) {
        scrollRef.current.style.transition = "none";
        scrollRef.current.style.transform = "translateX(0)";
      }
    }, 4500);
  };

  if (page === "loading") {
    return (
      <div style={{ background: '#070b18', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '60px', marginBottom: '20px', filter: 'drop-shadow(0 0 10px #355df5)' }}>🪙</div>
        <div style={{ width: '200px', height: '8px', background: '#121a31', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ width: '100%', height: '100%', background: '#355df5', animation: 'load 2s infinite' }}></div>
        </div>
        <style>{`@keyframes load { 0% { transform: translateX(-100%) } 100% { transform: translateX(100%) } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ background: '#070b18', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', paddingBottom: '90px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 20px', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(45deg, #1a2b6d, #355df5)', border: '1px solid #355df5' }}></div>
          <div><div style={{ fontWeight: 'bold', fontSize: '14px' }}>Pâñðâ</div><div style={{ fontSize: '10px', color: '#355df5' }}>Level 1</div></div>
        </div>
        <div style={{ background: '#121a31', padding: '8px 15px', borderRadius: '12px', border: '1px solid #1a2b6d', fontWeight: 'bold', color: '#fcd535' }}>0.01 TON +</div>
      </div>

      <div style={{ padding: '0 15px' }}>
        
        {/* --- 1. CRASH PAGE --- */}
        {activeTab === "Crash" && (
          <div>
            <div style={{ background: 'radial-gradient(circle, #111e40 0%, #070b18 100%)', borderRadius: '28px', height: '280px', border: '1px solid #1a2b6d', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
               <div style={{ fontSize: '50px', fontWeight: 'bold', zIndex: 2 }}>{multiplier}x</div>
               <img src="https://pngimg.com/uploads/rocket/rocket_PNG13280.png" style={{ position: 'absolute', width: '80px', bottom: '20%', left: '15%', transform: 'rotate(45deg)', filter: 'drop-shadow(0 0 10px #355df5)' }} alt="rocket" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '20px' }}>
               <button style={{ background: '#121a31', padding: '18px', borderRadius: '16px', color: 'white', border: '1px solid #1a2b6d', fontWeight: 'bold' }}>Bet 🎁</button>
               <button style={{ background: 'linear-gradient(to right, #355df5, #1a44d6)', padding: '18px', borderRadius: '16px', color: 'white', border: 'none', fontWeight: 'bold' }}>Bet 💎</button>
            </div>
          </div>
        )}

        {/* --- 2. CASES PAGE (ROULETTE) --- */}
        {activeTab === "Cases" && (
          <div>
            <div style={{ color: '#4caf50', fontSize: '12px', marginBottom: '15px' }}>● 286 Online</div>
            <div style={{ background: '#0d1329', height: '100px', borderRadius: '20px', border: '1px solid #1a2b6d', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: '#f6465d', zIndex: 10 }}></div>
              <div ref={scrollRef} style={{ display: 'flex', gap: '10px', padding: '0 50px' }}>
                {nftItems.map((item, i) => (
                  <div key={i} style={{ minWidth: '70px', height: '70px', background: '#121a31', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', border: '1px solid #1a2b6d' }}>{item}</div>
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div style={{ background: '#121a31', borderRadius: '20px', padding: '20px', textAlign: 'center', border: '1px solid #1a2b6d' }}>
                <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '10px' }}>DAILY CASE</div>
                <div style={{ fontSize: '40px' }}>🎁</div>
                <button onClick={openCase} disabled={isSpinning} style={{ width: '100%', background: '#355df5', border: 'none', color: 'white', padding: '10px', borderRadius: '10px', marginTop: '10px', fontWeight: 'bold' }}>{isSpinning ? "SPINNING..." : "OPEN FREE"}</button>
              </div>
              <div style={{ background: '#121a31', borderRadius: '20px', padding: '20px', textAlign: 'center', border: '1px solid #1a2b6d' }}>
                <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '10px' }}>PREMIUM</div>
                <div style={{ fontSize: '40px' }}>💎</div>
                <button style={{ width: '100%', background: 'linear-gradient(to right, #355df5, #a358df)', border: 'none', color: 'white', padding: '10px', borderRadius: '10px', marginTop: '10px', fontWeight: 'bold' }}>0.50 TON</button>
              </div>
            </div>
          </div>
        )}

        {/* --- 3. UPGRADE PAGE --- */}
        {activeTab === "Upgrade" && (
          <div>
            <div style={{ background: '#0d1329', borderRadius: '20px', padding: '40px', textAlign: 'center', border: '1px solid #1a2b6d', marginBottom: '20px' }}>
              <div style={{ fontSize: '16px', color: '#929aa5' }}>Select item to receive</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
              {[1,2,3,4,5,6].map(i => <div key={i} style={{ background: '#0d1329', aspectRatio: '1/1', borderRadius: '15px', border: '1px solid #1a2b6d', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a2b6d', fontSize: '20px' }}>+</div>)}
            </div>
            <button style={{ width: '100%', background: '#1a2b6d', color: '#4a515c', padding: '18px', borderRadius: '16px', border: 'none', fontWeight: 'bold', marginTop: '20px' }}>UPGRADE</button>
          </div>
        )}

        {/* --- 4. INVENTORY --- */}
        {activeTab === "Inventory" && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: '80px', marginBottom: '20px' }}>💙</div>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Your inventory is empty</h2>
            <p style={{ color: '#929aa5', fontSize: '14px' }}>Add gifts via the bot and get TON!</p>
            <button style={{ width: '100%', background: '#355df5', padding: '16px', borderRadius: '14px', border: 'none', color: 'white', marginTop: '20px', fontWeight: 'bold' }}>🎁 Exchange gift for TON</button>
          </div>
        )}

        {/* --- 5. PROFILE (DEPOSIT) --- */}
        {activeTab === "Profile" && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ background: '#121a31', padding: '20px', borderRadius: '24px', border: '1px solid #1a2b6d' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ fontWeight: 'bold' }}>Pâñðâ</div>
                <div style={{ color: '#929aa5', fontSize: '12px' }}>EQDLK...5w</div>
              </div>
              <button style={{ width: '100%', background: '#355df5', padding: '16px', borderRadius: '14px', border: 'none', color: 'white', fontWeight: 'bold', fontSize: '16px' }}>↑ Deposit</button>
            </div>
            <div style={{ background: '#121a31', padding: '20px', borderRadius: '24px', border: '1px solid #1a2b6d' }}>
              <h3 style={{ margin: '0 0 15px 0' }}>Referrals</h3>
              <div style={{ background: '#0a1126', padding: '15px', borderRadius: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div><div style={{ fontWeight: 'bold' }}>Level 1</div><div style={{ fontSize: '12px', color: '#929aa5' }}>5% income</div></div>
                <div style={{ fontSize: '30px' }}>👤</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div style={{ position: 'fixed', bottom: '0', left: '0', right: '0', background: '#0a0f1e', display: 'flex', justifyContent: 'space-around', padding: '15px 0', borderTop: '1px solid #1a2b6d' }}>
        {[{id:'Inventory', i:'🎁'}, {id:'Upgrade', i:'⚒️'}, {id:'Crash', i:'📈'}, {id:'Cases', i:'🗃️'}, {id:'Profile', i:'👤'}].map((item) => (
          <div key={item.id} onClick={() => setActiveTab(item.id)} style={{ textAlign: 'center', opacity: activeTab === item.id ? 1 : 0.4, cursor: 'pointer' }}>
            <div style={{ fontSize: '22px' }}>{item.i}</div>
            <div style={{ fontSize: '10px', marginTop: '4px', fontWeight: 'bold' }}>{item.id}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
