import React, { useState, useEffect, useRef } from "react";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Crash");
  const [multiplier, setMultiplier] = useState(1.00);
  const [isSpinning, setIsSpinning] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // ၁။ Crash Game Logic
  useEffect(() => {
    if (activeTab === "Crash") {
      const interval = setInterval(() => {
        setMultiplier(prev => (prev < 10 ? parseFloat((prev + 0.01).toFixed(2)) : 1.00));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  // ၂။ Case Opening Logic (Roulette Animation)
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
      alert("Success! Item Won! 🏆");
      if (scrollRef.current) {
        scrollRef.current.style.transition = "none";
        scrollRef.current.style.transform = "translateX(0)";
      }
    }, 4500);
  };

  return (
    <div style={{ background: '#070b18', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', paddingBottom: '90px' }}>
      
      {/* Top Header - */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 20px', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#355df5' }}></div>
          <div><div style={{ fontWeight: 'bold', fontSize: '14px' }}>Pâñðâ</div><div style={{ fontSize: '10px', color: '#355df5' }}>Level 1</div></div>
        </div>
        <div style={{ background: '#121a31', padding: '8px 15px', borderRadius: '12px', border: '1px solid #1a2b6d', color: '#fcd535' }}>0.01 TON +</div>
      </div>

      <div style={{ padding: '0 15px' }}>
        
        {/* Case Page - */}
        {activeTab === "Cases" && (
          <div>
            <div style={{ color: '#4caf50', fontSize: '12px', marginBottom: '10px' }}>● 286 Online</div>
            <div style={{ background: '#0d1329', height: '100px', borderRadius: '20px', border: '1px solid #1a2b6d', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ position: 'absolute', left: '50%', width: '2px', height: '100%', background: 'red', zIndex: 5 }}></div>
              <div ref={scrollRef} style={{ display: 'flex', gap: '10px', padding: '0 50px' }}>
                {["💎", "🎁", "🎨", "👾", "🚀", "⚡", "🔥", "🌈", "👑", "🍀", "💎", "🎁", "🎨", "👾"].map((item, i) => (
                  <div key={i} style={{ minWidth: '70px', height: '70px', background: '#121a31', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px' }}>{item}</div>
                ))}
              </div>
            </div>
            <button onClick={openCase} style={{ width: '100%', background: '#355df5', padding: '15px', borderRadius: '15px', border: 'none', color: 'white', fontWeight: 'bold' }}>
              {isSpinning ? "SPINNING..." : "OPEN CASE 🎁"}
            </button>
          </div>
        )}

        {/* Crash Page - */}
        {activeTab === "Crash" && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ background: 'radial-gradient(circle, #111e40, #070b18)', height: '280px', borderRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '50px', fontWeight: 'bold', border: '1px solid #1a2b6d' }}>
              {multiplier}x
            </div>
          </div>
        )}

        {/* Upgrade Page - */}
        {activeTab === "Upgrade" && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            {[1,2,3,4,5,6].map(i => <div key={i} style={{ background: '#0d1329', aspectRatio: '1/1', borderRadius: '15px', border: '1px solid #1a2b6d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</div>)}
            <button style={{ gridColumn: 'span 3', background: '#1a2b6d', padding: '15px', borderRadius: '15px', color: '#4a515c', marginTop: '20px' }}>UPGRADE</button>
          </div>
        )}

        {/* Inventory - */}
        {activeTab === "Inventory" && <div style={{ textAlign: 'center', padding: '50px' }}>Your inventory is empty 💙</div>}

        {/* Profile - */}
        {activeTab === "Profile" && <button style={{ width: '100%', background: '#355df5', padding: '15px', borderRadius: '15px', color: 'white' }}>↑ Deposit TON</button>}

      </div>

      {/* Navigation - */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#0a0f1e', display: 'flex', justifyContent: 'space-around', padding: '15px 0', borderTop: '1px solid #1a2b6d' }}>
        {['Inventory', 'Upgrade', 'Crash', 'Cases', 'Profile'].map((name, i) => (
          <div key={name} onClick={() => setActiveTab(name)} style={{ textAlign: 'center', opacity: activeTab === name ? 1 : 0.4 }}>
            <div style={{ fontSize: '20px' }}>{['🎁', '⚒️', '📈', '🗃️', '👤'][i]}</div>
            <div style={{ fontSize: '10px' }}>{name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
