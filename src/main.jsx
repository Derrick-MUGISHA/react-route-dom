import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App2 from './App2'
import { BrowserRouter } from 'react-router-dom'
// import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
    {/* these is the entery part of the website */}
    <App2 /> 
  </StrictMode>,
  </BrowserRouter>
)
