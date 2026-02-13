import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'
import { GlobalErrorBoundary } from './components/ui/GlobalErrorBoundary'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalErrorBoundary>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </GlobalErrorBoundary>
  </StrictMode>,
)
