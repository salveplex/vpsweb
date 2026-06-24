import { useState } from 'react'
import type { Locale } from '../types'

const translations = {
  no: {
    title: 'Send oss ei melding',
    privacyTitle: 'Send oss ei melding angåande personvern',
    success: 'Takk for meldinga! ✨',
    successMsg: 'Vi har motteke henvendelsen din og vil svara deg så snart som mogleg.',
    newMessage: 'Send ei ny melding',
    name: 'Namn',
    namePlaceholder: 'Ditt namn',
    email: 'E-post',
    emailPlaceholder: 'din@epost.no',
    subject: 'Emne',
    selectSubject: 'Vel emne...',
    subjects: {
      general: 'Generell henvendelse',
      booking: 'Bestilling / Maxi-Taxi',
      invoice: 'Faktura',
      driverComplaint: 'Klage på sjåfør',
      jobComplaint: 'Klage på utført oppdrag',
      praise: 'Ros til Voss Taxi',
    },
    phone: 'Telefonnummer',
    phonePlaceholder: 'Ditt telefonnummer',
    message: 'Melding',
    messagePlaceholder: 'Skriv meldinga di her...',
    error: 'Noko gjekk gale under sending. Prøv igjen seinare eller kontakt oss på post@vosstaxi.no.',
    sending: 'Sender...',
    send: 'Send melding',
  },
  en: {
    title: 'Send us a message',
    privacyTitle: 'Send us a message regarding privacy',
    success: 'Thank you! ✨',
    successMsg: 'We have received your message and will respond as soon as possible.',
    newMessage: 'Send new message',
    name: 'Name',
    namePlaceholder: 'Your name',
    email: 'Email',
    emailPlaceholder: 'your@email.com',
    subject: 'Subject',
    selectSubject: 'Select subject...',
    subjects: {
      general: 'General inquiry',
      booking: 'Booking / Maxi-Taxi',
      invoice: 'Invoice',
      driverComplaint: 'Driver complaint',
      jobComplaint: 'Job complaint',
      praise: 'Praise for Voss Taxi',
    },
    phone: 'Phone number',
    phonePlaceholder: 'Your phone number',
    message: 'Message',
    messagePlaceholder: 'Write your message here...',
    error: 'Something went wrong. Please try again later or contact us at post@vosstaxi.no.',
    sending: 'Sending...',
    send: 'Send message',
  },
  de: {
    title: 'Senden Sie uns eine Nachricht',
    privacyTitle: 'Senden Sie uns eine Nachricht zum Datenschutz',
    success: 'Vielen Dank! ✨',
    successMsg: 'Wir haben Ihre Nachricht erhalten und antworten Ihnen so bald wie möglich.',
    newMessage: 'Neue Nachricht senden',
    name: 'Name',
    namePlaceholder: 'Ihr Name',
    email: 'E-Mail',
    emailPlaceholder: 'ihre@email.de',
    subject: 'Betreff',
    selectSubject: 'Betreff wählen...',
    subjects: {
      general: 'Allgemeine Anfrage',
      booking: 'Buchung / Maxi-Taxi',
      invoice: 'Rechnung',
      driverComplaint: 'Beschwerde über Fahrer',
      jobComplaint: 'Beschwerde über Fahrt',
      praise: 'Lob für Voss Taxi',
    },
    phone: 'Telefonnummer',
    phonePlaceholder: 'Ihre Telefonnummer',
    message: 'Nachricht',
    messagePlaceholder: 'Schreiben Sie Ihre Nachricht hier...',
    error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns unter post@vosstaxi.no.',
    sending: 'Wird gesendet...',
    send: 'Nachricht senden',
  },
  fr: {
    title: 'Envoyez-nous un message',
    privacyTitle: 'Envoyez-nous un message concernant la confidentialité',
    success: 'Merci ! ✨',
    successMsg: 'Nous avons reçu votre message et vous répondrons dès que possible.',
    newMessage: 'Envoyer un nouveau message',
    name: 'Nom',
    namePlaceholder: 'Votre nom',
    email: 'E-mail',
    emailPlaceholder: 'votre@email.fr',
    subject: 'Sujet',
    selectSubject: 'Sélectionnez un sujet...',
    subjects: {
      general: 'Demande générale',
      booking: 'Réservation / Maxi-Taxi',
      invoice: 'Facture',
      driverComplaint: 'Plainte chauffeur',
      jobComplaint: 'Plainte sur le service',
      praise: 'Compliments pour Voss Taxi',
    },
    phone: 'Numéro de téléphone',
    phonePlaceholder: 'Votre numéro de téléphone',
    message: 'Message',
    messagePlaceholder: 'Écrivez votre message ici...',
    error: 'Une erreur s\'est produite. Veuillez réessayer plus tard ou nous contacter à post@vosstaxi.no.',
    sending: 'Envoi...',
    send: 'Envoyer un message',
  },
  es: {
    title: 'Envíanos un mensaje',
    privacyTitle: 'Envíanos un mensaje sobre privacidad',
    success: '¡Gracias! ✨',
    successMsg: 'Hemos recibido tu mensaje y te responderemos lo antes posible.',
    newMessage: 'Enviar nuevo mensaje',
    name: 'Nombre',
    namePlaceholder: 'Tu nombre',
    email: 'Correo electrónico',
    emailPlaceholder: 'tu@email.es',
    subject: 'Asunto',
    selectSubject: 'Seleccionar asunto...',
    subjects: {
      general: 'Consulta general',
      booking: 'Reserva / Maxi-Taxi',
      invoice: 'Factura',
      driverComplaint: 'Queja del conductor',
      jobComplaint: 'Queja del servicio',
      praise: 'Elogios para Voss Taxi',
    },
    phone: 'Número de teléfono',
    phonePlaceholder: 'Tu número de teléfono',
    message: 'Mensaje',
    messagePlaceholder: 'Escribe tu mensaje aquí...',
    error: 'Algo salió mal. Por favor, intenta de nuevo más tarde o contáctanos en post@vosstaxi.no.',
    sending: 'Enviando...',
    send: 'Enviar mensaje',
  },
}

export function ContactForm({ locale = 'no', type = 'general' }: { locale?: Locale, type?: 'general' | 'privacy' }) {
  const t = translations[locale]
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: type === 'privacy' ? 'Henvendelse personvern' : '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, target: type === 'privacy' ? 'personvern' : 'post' })
      })
      if (!res.ok) throw new Error('Network error')
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setFormData({ name: '', email: '', phone: '', subject: type === 'privacy' ? 'Henvendelse personvern' : '', message: '' })
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
    <div className="p-6 md:p-8 rounded-3xl border max-w-2xl w-full mx-auto my-8 shadow-2xl backdrop-blur-2xl" style={{ background: 'rgba(0, 0, 0, 0.45)', borderColor: 'var(--line-strong)' }}>
      <h3 className="text-2xl font-semibold mb-6" style={{ color: '#d4a943' }}>{type === 'privacy' ? t.privacyTitle : t.title}</h3>

      {status === 'success' ? (
        <div className="bg-green-900/30 border border-green-500/50 text-green-200 p-8 rounded-2xl text-center">
          <p className="text-xl font-medium mb-2">{t.success}</p>
          <p className="opacity-80">{t.successMsg}</p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-8 px-8 py-3 bg-[#25231c] hover:bg-[#302e26] rounded-full transition-colors font-medium"
          >
            {t.newMessage}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium opacity-80 ml-1" style={{ color: '#d4a943' }}>{t.name}</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-2xl px-5 py-4 focus:outline-none focus:ring-1 transition-all border"
                style={{ background: 'var(--bg-elevated)', borderColor: 'var(--line)', color: '#d4a943' }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#fcde00'; e.currentTarget.style.boxShadow = '0 0 0 1px #fcde00' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.boxShadow = 'none' }}
                placeholder={t.namePlaceholder}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium opacity-80 ml-1">{t.email}</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-2xl px-5 py-4 focus:outline-none focus:ring-1 transition-all border"
                style={{ background: 'var(--bg-elevated)', borderColor: 'var(--line)', color: '#d4a943' }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#fcde00'; e.currentTarget.style.boxShadow = '0 0 0 1px #fcde00' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.boxShadow = 'none' }}
                placeholder={t.emailPlaceholder}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium opacity-80 ml-1">{t.phone}</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-2xl px-5 py-4 focus:outline-none focus:ring-1 transition-all border"
              style={{ background: 'var(--bg-elevated)', borderColor: 'var(--line)', color: '#d4a943' }}
              onFocus={(e) => { e.currentTarget.style.borderColor = '#fcde00'; e.currentTarget.style.boxShadow = '0 0 0 1px #fcde00' }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.boxShadow = 'none' }}
              placeholder={t.phonePlaceholder}
            />
          </div>
          
          {type !== 'privacy' && (
          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium opacity-80 ml-1">{t.subject}</label>
            <div className="relative">
              <select
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full rounded-2xl px-5 py-4 focus:outline-none focus:ring-1 transition-all appearance-none cursor-pointer border"
                style={{ background: 'var(--bg-elevated)', borderColor: 'var(--line)', color: '#d4a943' }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#fcde00'; e.currentTarget.style.boxShadow = '0 0 0 1px #fcde00' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <option value="" disabled>{t.selectSubject}</option>
                <option value="general">{t.subjects.general}</option>
                <option value="booking">{t.subjects.booking}</option>
                <option value="invoice">{t.subjects.invoice}</option>
                <option value="driverComplaint">{t.subjects.driverComplaint}</option>
                <option value="jobComplaint">{t.subjects.jobComplaint}</option>
                <option value="praise">{t.subjects.praise}</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 opacity-50" style={{ color: 'var(--text)' }}>
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          )}

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium opacity-80 ml-1">{t.message}</label>
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
              placeholder={t.messagePlaceholder}
            />
          </div>

          {status === 'error' && (
            <div className="bg-red-900/30 border border-red-500/50 text-red-200 p-5 rounded-2xl text-sm flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {t.error}
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
                {t.sending}
              </>
            ) : t.send}
          </button>
        </form>
      )}
    </div>
  )
}
