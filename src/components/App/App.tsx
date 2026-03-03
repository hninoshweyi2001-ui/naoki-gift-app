import React, { useState, useEffect } from "react";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("cases");
  const [balance] = useState(0.01);
  const [multiplier, setMultiplier] = useState(1.00);
  const [isFlying, setIsFlying] = useState(false);
  const [isCrashed, setIsCrashed] = useState(false);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    let timer: any;
    if (activeTab === "crash") {
      if (!isFlying && !isCrashed) {
        if (countdown > 0) { timer = setInterval(() => setCountdown(prev => prev - 1), 1000); }
        else { setIsFlying(true); }
      }
      if (isFlying && !isCrashed) {
        timer = setInterval(() => {
          setMultiplier((prev) => {
            const next = prev + 0.05;
            if (Math.random() < 0.02 && next > 1.2) {
              setIsCrashed(true); setIsFlying(false);
              setTimeout(() => { setMultiplier(1.00); setIsCrashed(false); setCountdown(10); }, 3000);
              return prev;
            }
            return parseFloat(next.toFixed(2));
          });
        }, 100);
      }
    }
    return () => clearInterval(timer);
  }, [isFlying, isCrashed, countdown, activeTab]);

  return (
    <div style={{ background: '#0b0e11', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', paddingBottom: '90px' }}>
      {/* Header - Panda Profile */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '45px', height: '45px', borderRadius: '15px', background: '#1e2329', border: '1px solid #363c44' }}></div>
          <div><div style={{ fontWeight: 'bold' }}>Pâñðâ</div><div style={{ fontSize: '12px', color: '#929aa5' }}>Level 1</div></div>
        </div>
        <div style={{ background: '#1e2329', padding: '10px 18px', borderRadius: '14px', border: '1px solid #2b3139', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontWeight: 'bold' }}>{balance} TON</span>
          <div style={{ background: '#355df5', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</div>
        </div>
      </div>

      <div style={{ padding: '0 20px' }}>
        {/* Inventory Tab */}
        {activeTab === "inventory" && (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <div style={{ fontSize: '80px', marginBottom: '20px' }}>💙</div>
            <h3 style={{ margin: '0 0 10px 0' }}>Your inventory is empty</h3>
            <p style={{ color: '#929aa5', fontSize: '14px', marginBottom: '30px' }}>Add gifts via the bot and get TON!</p>
            <button style={{ width: '100%', padding: '18px', borderRadius: '16px', background: '#355df5', color: 'white', border: 'none', fontWeight: 'bold' }}>🎁 Exchange gift for TON</button>
          </div>
        )}

        {/* Upgrade Tab */}
        {activeTab === "upgrade" && (
          <div style={{ marginTop: '10px' }}>
            <div style={{ background: 'rgba(30,35,41,0.3)', padding: '40px 20px', borderRadius: '24px', border: '1px solid #2b3139', textAlign: 'center', marginBottom: '20px' }}>
               <div style={{ width: '50px', height: '50px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px auto' }}>📦</div>
               <div style={{ color: '#929aa5', fontSize: '14px' }}>Select item to receive</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', background: 'rgba(30,35,41,0.3)', padding: '20px', borderRadius: '24px', border: '1px solid #2b3139', marginBottom: '20px' }}>
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} style={{ aspectRatio: '1/1', background: 'rgba(255,255,255,0.03)', borderRadius: '15px', border: '1px dashed #363c44', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#363c44' }}>+</div>
              ))}
            </div>
            <button style={{ width: '100%', padding: '18px', borderRadius: '16px', background: '#1a2b6d', color: '#355df5', border: 'none', fontWeight: 'bold' }}>UPGRADE</button>
          </div>
        )}

        {/* Cases Tab */}
        {activeTab === "cases" && (
          <div>
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '20px' }}>
              {["All cases", "Free", "Basic", "Classic"].map(t => (
                <button key={t} onClick={() => {}} style={{ padding: '8px 18px', borderRadius: '12px', border: 'none', background: t === "Free" ? '#355df5' : '#1e2329', color: 'white' }}>{t}</button>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div style={{ background: '#1e2329', padding: '20px', borderRadius: '24px', textAlign: 'center', border: '1px solid #2b3139' }}>
                <div style={{ fontSize: '10px', color: '#929aa5' }}>DAILY CASE</div><div style={{ fontSize: '60px', margin: '15px 0' }}>🍱</div>
                <button style={{ width: '100%', background: '#0b0e11', color: '#355df5', border: '1px solid #2b3139', padding: '10px', borderRadius: '12px' }}>05:07:45</button>
              </div>
              <div style={{ background: '#1e2329', padding: '20px', borderRadius: '24px', textAlign: 'center', border: '1px solid #2b3139' }}>
                <div style={{ fontSize: '10px', color: '#929aa5' }}>PROMO CASE</div><div style={{ fontSize: '60px', margin: '15px 0' }}>🧸</div>
                <button style={{ width: '100%', background: '#355df5', color: 'white', border: 'none', padding: '10px', borderRadius: '12px' }}>ACTIVATE</button>
              </div>
            </div>
          </div>
        )}

        {/* Crash Tab */}
        {activeTab === "crash" && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ height: '300px', background: '#1e2329', borderRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #2b3139' }}>
              <div style={{ fontSize: '50px', fontWeight: 'bold', color: isCrashed ? '#f6465d' : '#0ecb81' }}>
                {isFlying || isCrashed ? `${multiplier.toFixed(2)}x` : `${countdown}s`}
              </div>
            </div>
            <button style={{ width: '100%', padding: '18px', marginTop: '20px', borderRadius: '16px', background: isFlying ? '#f6465d' : '#355df5', border: 'none', color: 'white', fontWeight: 'bold' }}>
              {isFlying ? "CASH OUT" : "PLACE BET"}
            </button>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div style={{ marginTop: '10px' }}>
            <div style={{ background: '#1e2329', padding: '20px', borderRadius: '24px', border: '1px solid #2b3139', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '20px', background: '#363c44' }}></div>
                <div><div style={{ fontWeight: 'bold', fontSize: '18px' }}>Pâñðâ</div><div style={{ color: '#929aa5', fontSize: '13px' }}>Hninou23</div></div>
              </div>
              <button style={{ width: '100%', padding: '16px', borderRadius: '16px', background: '#355df5', color: 'white', border: 'none', fontWeight: 'bold' }}>↑ Deposit</button>
            </div>
            <div style={{ background: '#1e2329', padding: '20px', borderRadius: '24px', border: '1px solid #2b3139' }}>
               <h3 style={{ margin: '0 0 15px 0' }}>Referrals</h3>
               <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '15px' }}>
                 <div><div style={{ fontSize: '18px', fontWeight: 'bold' }}>Level 1</div><div style={{ fontSize: '12px', color: '#929aa5' }}>5% income</div></div>
                 <div style={{ fontSize: '30px' }}>🍪</div>
               </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div style={{ position: 'fixed', bottom: 0, width: '100%', background: '#0b0e11', display: 'flex', justifyContent: 'space-around', padding: '15px 0', borderTop: '1px solid #2b3139' }}>
        {['inventory', 'upgrade', 'crash', 'cases', 'profile'].map((id) => (
          <div key={id} onClick={() => setActiveTab(id)} style={{ textAlign: 'center', opacity: activeTab === id ? 1 : 0.4 }}>
            <div style={{ fontSize: '22px' }}>{id === 'inventory' ? '🎁' : id === 'upgrade' ? '⚒️' : id === 'crash' ? '📈' : id === 'cases' ? '🗃️' : '👤'}</div>
            <div style={{ fontSize: '10px' }}>{id.charAt(0).toUpperCase() + id.slice(1)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
