import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

let clicked = false
document.getElementById("link1").addEventListener(("click"), (e) => {
  if (clicked) {
    return
  }
  clicked = true
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
