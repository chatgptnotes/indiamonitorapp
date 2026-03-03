import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  onSearchOpen: () => void
}

const routes = ['/dashboard', '/analytics', '/compare', '/education', '/healthcare', '/elections', '/crime', '/agriculture', '/settings']

const KeyboardShortcuts = ({ onSearchOpen }: Props) => {
  const navigate = useNavigate()
  const [showHelp, setShowHelp] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === 's' || e.key === 'S') { e.preventDefault(); onSearchOpen(); return }
      if (e.key === 'f' || e.key === 'F') { e.preventDefault(); document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen(); return }
      if (e.key === '?') { setShowHelp(p => !p); return }
      const num = parseInt(e.key)
      if (num >= 1 && num <= 9 && routes[num - 1]) { navigate(routes[num - 1]); return }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [navigate, onSearchOpen])

  if (!showHelp) return null

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowHelp(false)}>
      <div className="bg-cyber-card border border-cyber-border rounded-xl p-6 max-w-md mx-4" onClick={e => e.stopPropagation()}>
        <h3 className="text-neon-cyan font-mono font-bold mb-4">Keyboard Shortcuts</h3>
        <div className="space-y-2 text-sm">
          {[
            ['1-9', 'Switch sections'],
            ['S', 'Global search'],
            ['F', 'Toggle fullscreen'],
            ['?', 'Toggle this help'],
          ].map(([key, desc]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-gray-400">{desc}</span>
              <kbd className="px-2 py-0.5 bg-cyber-border rounded text-neon-cyan font-mono text-xs">{key}</kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default KeyboardShortcuts
