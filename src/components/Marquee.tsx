export function Marquee() {
  return (
    <section className="overflow-hidden border-t py-4" style={{ borderColor: 'var(--line)' }}>
      <div className="marquee-track flex w-max gap-8 whitespace-nowrap font-mono text-xs uppercase tracking-[0.24em]" style={{ color: 'var(--muted)' }}>
        {Array.from({ length: 2 }).map((_, index) => (
          <span key={index} className="flex gap-8">
            <span>Voss Taxi</span>
            <span>Trygg transport</span>
            <span>Maxi-taxi</span>
            <span>Rullestolbil</span>
            <span>Takstar</span>
            <span>Bestilling</span>
          </span>
        ))}
      </div>
    </section>
  )
}
