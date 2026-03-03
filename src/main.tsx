import React from 'react'
import ReactDOM from 'react-dom/client'
// ဖိုင်လမ်းကြောင်းကို components/App/App ထဲအထိ ပြောင်းလိုက်ပါတယ်
import App from './components/App/App' 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
