import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import { GlobalErrorBoundary } from './components/ui/GlobalErrorBoundary'

export function render(url: string) {
  const helmetContext = {} as any;
  
  const html = renderToString(
    <StrictMode>
      <GlobalErrorBoundary>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </HelmetProvider>
      </GlobalErrorBoundary>
    </StrictMode>
  )
  
  const { helmet } = helmetContext;
  
  return {
    html,
    head: helmet ? `
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
      ${helmet.style.toString()}
      ${helmet.script.toString()}
    ` : ''
  }
}
