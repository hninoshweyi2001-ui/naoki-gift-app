import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' // 👈 Extension (.tsx) မပါဘဲ ဒီလိုပဲ ရေးပေးပါ

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
