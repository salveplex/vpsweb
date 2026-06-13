import { Component, StrictMode, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

class AppErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; message?: string }> {
  state = { hasError: false, message: undefined }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error.message }
  }

  componentDidCatch(error: Error) {
    console.error('Voss Taxi render error', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="grid min-h-screen place-items-center bg-[#0b0b09] px-6 text-[#fff8e8]">
          <section className="max-w-2xl">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#d8ae3d]">Voss Taxi SA</p>
            <h1 className="mt-5 text-5xl font-extrabold leading-none">Nettsiden stoppet i nettleseren.</h1>
            <p className="mt-5 text-lg leading-8 text-[#d8d0bd]">
              Last siden på nytt. Hvis feilen fortsetter, send denne meldingen til utvikler:
            </p>
            <pre className="mt-5 overflow-auto rounded-lg border border-white/15 bg-white/8 p-4 text-sm text-[#d8d0bd]">
              {this.state.message ?? 'Ukjent JavaScript-feil'}
            </pre>
          </section>
        </main>
      )
    }

    return this.props.children
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </StrictMode>,
)
