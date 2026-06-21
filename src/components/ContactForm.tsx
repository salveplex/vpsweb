import { useState } from 'react'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (!res.ok) throw new Error('Network error')
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="p-6 md:p-8 rounded-3xl border max-w-2xl w-full mx-auto my-8 shadow-2xl" style={{ background: 'var(--surface)', borderColor: 'var(--line-strong)' }}>
      <h3 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text)' }}>Send oss ei melding</h3>
      
      {status === 'success' ? (
        <div className="bg-green-900/30 border border-green-500/50 text-green-200 p-8 rounded-2xl text-center">
          <p className="text-xl font-medium mb-2">Takk for meldinga! ✨</p>
          <p className="opacity-80">Vi har motteke henvendelsen din og vil svara deg så snart som mogleg.</p>
          <button 
            onClick={() => setStatus('idle')}
            className="mt-8 px-8 py-3 bg-[#25231c] hover:bg-[#302e26] rounded-full transition-colors font-medium"
          >
            Send ei ny melding
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium opacity-80 ml-1" style={{ color: 'var(--text)' }}>Namn</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-2xl px-5 py-4 focus:outline-none focus:ring-1 transition-all border"
                style={{ background: 'var(--bg-elevated)', borderColor: 'var(--line)', color: 'var(--text)' }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#fcde00'; e.currentTarget.style.boxShadow = '0 0 0 1px #fcde00' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.boxShadow = 'none' }}
                placeholder="Ditt namn"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium opacity-80 ml-1">E-post</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-2xl px-5 py-4 focus:outline-none focus:ring-1 transition-all border"
                style={{ background: 'var(--bg-elevated)', borderColor: 'var(--line)', color: 'var(--text)' }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#fcde00'; e.currentTarget.style.boxShadow = '0 0 0 1px #fcde00' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.boxShadow = 'none' }}
                placeholder="din@epost.no"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium opacity-80 ml-1">Emne</label>
            <div className="relative">
              <select
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full rounded-2xl px-5 py-4 focus:outline-none focus:ring-1 transition-all appearance-none cursor-pointer border"
                style={{ background: 'var(--bg-elevated)', borderColor: 'var(--line)', color: 'var(--text)' }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#fcde00'; e.currentTarget.style.boxShadow = '0 0 0 1px #fcde00' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <option value="" disabled>Vel emne...</option>
                <option value="Generell henvendelse">Generell henvendelse</option>
                <option value="Bestilling / Maxi-Taxi">Bestilling / Maxi-Taxi</option>
                <option value="Faktura">Faktura</option>
                <option value="Klage på sjåfør">Klage på sjåfør</option>
                <option value="Klage på utført oppdrag">Klage på utført oppdrag</option>
                <option value="Ros til Voss Taxi">Ros til Voss Taxi</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 opacity-50" style={{ color: 'var(--text)' }}>
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium opacity-80 ml-1">Melding</label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full rounded-2xl px-5 py-4 focus:outline-none focus:ring-1 transition-all resize-none border"
              style={{ background: 'var(--bg-elevated)', borderColor: 'var(--line)', color: 'var(--text)' }}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#fcde00'; e.currentTarget.style.boxShadow = '0 0 0 1px #fcde00' }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.boxShadow = 'none' }}
              placeholder="Skriv meldinga di her..."
            />
          </div>

          {status === 'error' && (
            <div className="bg-red-900/30 border border-red-500/50 text-red-200 p-5 rounded-2xl text-sm flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Noko gjekk gale under sending. Prøv igjen seinare eller kontakt oss på post@vosstaxi.no.
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-[#fcde00] hover:bg-[#e6c800] text-black font-semibold rounded-2xl px-6 py-4 mt-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(252,222,0,0.2)] hover:shadow-[0_0_30px_rgba(252,222,0,0.4)]"
          >
            {status === 'loading' ? (
              <>
                <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Sender...
              </>
            ) : 'Send melding'}
          </button>
        </form>
      )}
    </div>
  )
}
