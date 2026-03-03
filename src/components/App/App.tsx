import React, { useState } from "react";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("cases");

  return (
    <div style={{ background: '#0b0e11', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', paddingBottom: '90px' }}>
      {/* Header Profile */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '45px', height: '45px', borderRadius: '15px', background: '#1e2329', border: '1px solid #363c44' }}></div>
          <div><div style={{ fontWeight: 'bold' }}>Pâñðâ</div><div style={{ fontSize: '12px', color: '#929aa5' }}>Level 1</div></div>
        </div>
        <div style={{ background: '#1e2329', padding: '10px 18px', borderRadius: '14px', border: '1px solid #2b3139', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontWeight: 'bold' }}>0.01 TON</span>
          <div style={{ background: '#355df5', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</div>
        </div>
      </div>

      <div style={{ padding: '0 20px' }}>
        {/* Cases Section */}
        {activeTab === "cases" && (
          <div>
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '20px' }}>
              {["All cases", "Free", "Basic", "Classic"].map(t => (
                <button key={t} style={{ padding: '8px 18px', borderRadius: '12px', border: 'none', background: t === "Free" ? '#355df5' : '#1e2329', color: 'white' }}>{t}</button>
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

        {/* Profile Section */}
        {activeTab === "profile" && (
          <div style={{ marginTop: '10px' }}>
            <div style={{ background: '#1e2329', padding: '20px', borderRadius: '24px', border: '1px solid #2b3139', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '20px', background: '#363c44' }}></div>
                <div><div style={{ fontWeight: 'bold', fontSize: '18px' }}>Pâñðâ</div><div style={{ color: '#929aa5', fontSize: '13px' }}>Hninou23</div></div>
              </div>
              <button style={{ width: '100%', padding: '16px', borderRadius: '16px', background: '#355df5', color: 'white', border: 'none', fontWeight: 'bold' }}>↑ Deposit</button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div style={{ position: 'fixed', bottom: 0, width: '100%', background: '#0b0e11', display: 'flex', justifyContent: 'space-around', padding: '15px 0', borderTop: '1px solid #2b3139' }}>
        {['inventory', 'upgrade', 'crash', 'cases', 'profile'].map((id) => (
          <div key={id} onClick={() => setActiveTab(id)} style={{ textAlign: 'center', opacity: activeTab === id ? 1 : 0.4 }}>
            <div style={{ fontSize: '22px' }}>{id === 'inventory' ? '🎁' : id === 'upgrade' ? '⚒️' : id === 'crash' ? '📈' : id === 'cases' ? '🗃️' : '👤'}</div>
            <div style={{ fontSize: '10px' }}>{id.charAt(0).toUpperCase() + id.slice(1)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
