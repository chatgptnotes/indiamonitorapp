import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Maximize, X, ChevronLeft, ChevronRight, Play, Pause, Keyboard } from 'lucide-react'

interface Props { children: React.ReactNode[] }

const PresentationMode = ({ children }: Props) => {
  const [active, setActive] = useState(false)
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [showControls, setShowControls] = useState(false)
  const [progress, setProgress] = useState(0)
  const interval = 8000

  useEffect(() => {
    if (!active || !playing) { setProgress(0); return }
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      setProgress(Math.min((elapsed / interval) * 100, 100))
      if (elapsed >= interval) {
        setCurrent(i => (i + 1) % children.length)
      } else {
        requestAnimationFrame(tick)
      }
    }
    const raf = requestAnimationFrame(tick)
    const t = setInterval(() => { setCurrent(i => (i + 1) % children.length) }, interval)
    return () => { cancelAnimationFrame(raf); clearInterval(t) }
  }, [active, playing, children.length, current])

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setActive(false)
    if (e.key === 'ArrowRight') setCurrent(i => (i + 1) % children.length)
    if (e.key === 'ArrowLeft') setCurrent(i => (i - 1 + children.length) % children.length)
    if (e.key === ' ') { e.preventDefault(); setPlaying(p => !p) }
  }, [children.length])

  useEffect(() => { if (active) { document.addEventListener('keydown', handleKey); return () => document.removeEventListener('keydown', handleKey) } }, [active, handleKey])

  if (!active) return (
    <button onClick={() => setActive(true)} className="flex items-center space-x-2 px-3 py-1.5 bg-neon-cyan/10 text-neon-cyan text-sm rounded-lg border border-neon-cyan/20 hover:bg-neon-cyan/20 transition-colors">
      <Maximize className="h-4 w-4" /><span>Present</span>
    </button>
  )

  return (
    <div className="fixed inset-0 z-[100] bg-cyber-bg flex flex-col">
      {/* Progress bar */}
      <div className="h-0.5 bg-cyber-border">
        <motion.div className="h-full bg-neon-cyan" style={{ width: `${progress}%` }} transition={{ duration: 0.1 }} />
      </div>
      <div className="flex items-center justify-between p-4 bg-cyber-surface border-b border-cyber-border">
        <span className="text-neon-cyan font-mono font-semibold text-sm">IndiaMonitor // Panel {current + 1}/{children.length}</span>
        <div className="flex items-center space-x-2">
          <button onClick={() => setCurrent(i => (i - 1 + children.length) % children.length)} className="p-1.5 text-gray-400 hover:text-neon-cyan rounded transition-colors"><ChevronLeft className="h-5 w-5" /></button>
          <button onClick={() => setPlaying(p => !p)} className="p-1.5 text-gray-400 hover:text-neon-cyan rounded transition-colors">{playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}</button>
          <button onClick={() => setCurrent(i => (i + 1) % children.length)} className="p-1.5 text-gray-400 hover:text-neon-cyan rounded transition-colors"><ChevronRight className="h-5 w-5" /></button>
          <button onClick={() => setShowControls(!showControls)} className="p-1.5 text-gray-400 hover:text-neon-cyan rounded transition-colors ml-2"><Keyboard className="h-5 w-5" /></button>
          <button onClick={() => setActive(false)} className="p-1.5 text-gray-400 hover:text-danger rounded transition-colors ml-2"><X className="h-5 w-5" /></button>
        </div>
      </div>
      {/* Controls overlay */}
      <AnimatePresence>
        {showControls && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-16 right-4 z-10 bg-cyber-card border border-cyber-border rounded-lg p-4 text-sm">
            <div className="space-y-2 text-gray-400">
              <div><kbd className="text-neon-cyan font-mono">Space</kbd> Pause/Resume</div>
              <div><kbd className="text-neon-cyan font-mono">&#8592; &#8594;</kbd> Navigate</div>
              <div><kbd className="text-neon-cyan font-mono">Esc</kbd> Exit</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex-1 p-8 overflow-auto">
        <AnimatePresence mode="wait">
          <motion.div key={current} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }} className="h-full">
            {children[current]}
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Panel dots */}
      <div className="flex justify-center space-x-2 pb-4">
        {children.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all ${i === current ? 'w-8 bg-neon-cyan' : 'w-2 bg-cyber-border hover:bg-gray-600'}`} />
        ))}
      </div>
    </div>
  )
}

export default PresentationMode
