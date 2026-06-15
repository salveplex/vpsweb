import { X } from '@phosphor-icons/react'
import { useEffect } from 'react'

export function Lightbox({ src, onClose }: { src: string | null; onClose: () => void }) {
  useEffect(() => {
    if (!src) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [src, onClose])

  if (!src) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      <img
        src={src}
        className="max-h-full max-w-full rounded-lg object-contain"
        alt="Full size image"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        className="absolute right-6 top-6 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition hover:bg-white/20 active:scale-[0.95]"
        onClick={onClose}
        aria-label="Close image viewer"
        type="button"
      >
        <X size={24} />
      </button>
    </div>
  )
}
