import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App' // 👈 ဒီလမ်းကြောင်း မှန်ပါစေ

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
