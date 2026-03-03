import React, { useState, useEffect } from "react";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("crash");
  const [gameState, setGameState] = useState<"waiting" | "running" | "crashed">("waiting");
  const [multiplier, setMultiplier] = useState(1.00);
  const [countdown, setCountdown] = useState(5.00);
  
  // အရင်ပေါက်ကွဲခဲ့တဲ့ History ဂဏန်းများကို သိမ်းမည့် State
  const [history, setHistory] = useState<string[]>(["x1.52", "x1.86", "x210.75"]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading || activeTab !== "crash") return;
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
          // ပေါက်ကွဲနှုန်း (Random Crash)
          if (Math.random() < 0.012 && next > 1.1) {
            setGameState("crashed");
            // ပေါက်ကွဲသွားတဲ့ ဂဏန်းကို History ထဲ ထည့်လိုက်ခြင်း
            const newResult = `x${next.toFixed(2)}`;
            setHistory(prevH => [newResult, ...prevH].slice(0, 6)); 
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
        setGameState("waiting");
      }, 3000);
    }

    return () => clearInterval(timer);
  }, [gameState, countdown, loading, activeTab]);

  // အရောင်သတ်မှတ်ချက် (IMG_5191 အရ)
  const getBadgeColor = (val: string) => {
    const num = parseFloat(val.replace('x', ''));
    if (num >= 100) return { bg: '#4b2b5e', text: '#a358df' }; // Big Win (Purple)
    if (num >= 2) return { bg: '#1e3d2e', text: '#0ecb81' };   // Good Win (Green)
    return { bg: '#2b3139', text: '#f6465d' };               // Low (Red)
  };

  if (loading) return <div style={{background:'#0b0e11', height:'100vh'}} />;

  return (
    <div style={{ background: '#0b0e11', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 20px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#355df5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🐼</div>
          <div><div style={{ fontWeight: 'bold', fontSize: '14px' }}>Pâñðâ</div><div style={{ fontSize: '11px', color: '#929aa5' }}>Level 1</div></div>
        </div>
        <div style={{ background: '#1e2329', padding: '8px 15px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#fcd535' }}>0.01 TON</span>
          <div style={{ background: '#355df5', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>+</div>
        </div>
      </div>

      <div style={{ padding: '0 15px' }}>
        {/* Game Area */}
        <div style={{ background: '#161a1e', borderRadius: '28px', padding: '20px', position: 'relative', border: '1px solid #2b3139', height: '270px', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '15px', left: '15px', fontSize: '12px', color: '#5e6673', display: 'flex', alignItems: 'center', gap: '5px' }}>
             🕒 Bet history
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '45px' }}>
            {gameState === 'waiting' ? (
              <>
                <div style={{ fontSize: '55px', fontWeight: 'bold', color: '#0ecb81' }}>{countdown.toFixed(2)}</div>
                <div style={{ fontSize: '11px', color: '#0ecb81', letterSpacing: '2px', fontWeight: 'bold' }}>ИГРА ЧЕРЕЗ</div>
                <div style={{ width: '140px', height: '4px', background: '#2b3139', margin: '15px auto', borderRadius: '2px' }}>
                   <div style={{ width: `${(countdown/5)*100}%`, height: '100%', background: '#0ecb81', transition: '0.1s linear' }}></div>
                </div>
              </>
            ) : (
              <div style={{ fontSize: '65px', fontWeight: 'bold', color: gameState === 'crashed' ? '#f6465d' : 'white', transition: '0.1s' }}>
                {multiplier}x
              </div>
            )}
          </div>

          {/* Rocket Animation */}
          {gameState === 'running' && (
            <div style={{ position: 'absolute', bottom: '65px', left: '50px', fontSize: '55px', animation: 'fly 1s infinite ease-in-out' }}>
               🚀
            </div>
          )}

          {/* Dynamic History Bar */}
          <div style={{ position: 'absolute', bottom: '15px', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '6px', padding: '0 10px' }}>
            {history.map((m, i) => {
              const colors = getBadgeColor(m);
              return (
                <div key={i} style={{ background: colors.bg, color: colors.text, padding: '4px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', minWidth: '45px', textAlign: 'center' }}>
                  {m}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bet Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
          <button style={{ background: '#1e2329', color: 'white', padding: '18px', borderRadius: '20px', border: '1px solid #2b3139', fontWeight: 'bold', fontSize: '15px' }}>
            Bet 🎁
          </button>
          <button style={{ background: 'linear-gradient(45deg, #355df5, #00ccff)', color: 'white', padding: '18px', borderRadius: '20px', border: 'none', fontWeight: 'bold', fontSize: '15px', boxShadow: '0 5px 15px rgba(53, 93, 245, 0.3)' }}>
            Bet 💎
          </button>
        </div>

        {/* User Bet Row */}
        <div style={{ marginTop: '15px', background: '#1e2329', borderRadius: '20px', padding: '15px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#0b0e11', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>💎</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>MANIAC | Быков</div>
            <div style={{ fontSize: '11px', color: '#929aa5' }}>0.10 TON • <span style={{color:'#0ecb81'}}>x{multiplier}</span></div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#0ecb81' }}>+{(0.1 * multiplier).toFixed(2)}</div>
            <div style={{ fontSize: '11px', color: '#0ecb81' }}>TON</div>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div style={{ position: 'fixed', bottom: '0', left: '0', right: '0', background: '#0b0e11', display: 'flex', justifyContent: 'space-around', padding: '15px 0', borderTop: '1px solid #1e2329', zIndex: 10 }}>
        {[{n: 'Inventory', i: '🎁'}, {n: 'Upgrade', i: '⚒️'}, {n: 'Crash', i: '📈'}, {n: 'Cases', i: '🗃️'}, {n: 'Profile', i: '👤'}].map(t => (
          <div key={t.n} onClick={() => setActiveTab(t.n.toLowerCase())} style={{ textAlign: 'center', opacity: activeTab === t.n.toLowerCase() ? 1 : 0.4 }}>
            <div style={{ fontSize: '22px' }}>{t.i}</div>
            <div style={{ fontSize: '10px', marginTop: '4px', color: '#929aa5' }}>{t.n}</div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fly { 
          0%, 100% { transform: translate(0,0) rotate(5deg); } 
          50% { transform: translate(10px, -15px) rotate(-5deg); } 
        }
      `}</style>
    </div>
  );
};

export default App;
