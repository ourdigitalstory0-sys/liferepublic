import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { GlobalErrorBoundary } from './components/ui/GlobalErrorBoundary'

hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <GlobalErrorBoundary>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </GlobalErrorBoundary>
  </StrictMode>
)
