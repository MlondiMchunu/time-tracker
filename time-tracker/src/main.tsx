import { StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'


const style = document.createElement('style')
style.textContent = 
  `@tailwind base;
   @tailwind components;
   @tailwind utilities;
   `

document.head.appendChild(style)



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
