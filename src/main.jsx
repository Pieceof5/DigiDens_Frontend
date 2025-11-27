import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@uh-design-system/component-library/dist/component-library/component-library.css'
import { defineCustomElements } from '@uh-design-system/component-library/loader'
import App from './App.jsx'

// Design Systemin importtaus
defineCustomElements();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
