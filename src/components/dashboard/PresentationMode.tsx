import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Maximize, X, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'

interface Props { children: React.ReactNode[] }

const PresentationMode: React.FC<Props> = ({ children }) => {
  const [active, setActive] = useState(false)
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    if (!active || !playing) return
    const t = setInterval(() => setCurrent(i => (i + 1) % children.length), 8000)
    return () => clearInterval(t)
  }, [active, playing, children.length])

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setActive(false)
    if (e.key === 'ArrowRight') setCurrent(i => (i + 1) % children.length)
    if (e.key === 'ArrowLeft') setCurrent(i => (i - 1 + children.length) % children.length)
    if (e.key === ' ') { e.preventDefault(); setPlaying(p => !p) }
  }, [children.length])

  useEffect(() => { if (active) { document.addEventListener('keydown', handleKey); return () => document.removeEventListener('keydown', handleKey) } }, [active, handleKey])

  if (!active) return (
    <button onClick={() => setActive(true)} className="flex items-center space-x-2 px-3 py-1.5 bg-primary text-white text-sm rounded-lg hover:bg-primary-dark transition-colors">
      <Maximize className="h-4 w-4" /><span>Present</span>
    </button>
  )

  return (
    <div className="fixed inset-0 z-[100] bg-gray-900 flex flex-col">
      <div className="flex items-center justify-between p-4 bg-gray-800">
        <span className="text-white font-semibold">IndiaMonitor - Presentation Mode ({current + 1}/{children.length})</span>
        <div className="flex items-center space-x-2">
          <button onClick={() => setCurrent(i => (i - 1 + children.length) % children.length)} className="p-1 text-gray-300 hover:text-white"><ChevronLeft className="h-5 w-5" /></button>
          <button onClick={() => setPlaying(p => !p)} className="p-1 text-gray-300 hover:text-white">{playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}</button>
          <button onClick={() => setCurrent(i => (i + 1) % children.length)} className="p-1 text-gray-300 hover:text-white"><ChevronRight className="h-5 w-5" /></button>
          <button onClick={() => setActive(false)} className="p-1 text-gray-300 hover:text-white ml-4"><X className="h-5 w-5" /></button>
        </div>
      </div>
      <div className="flex-1 p-8 overflow-auto">
        <AnimatePresence mode="wait">
          <motion.div key={current} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5 }} className="h-full">
            {children[current]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
export default PresentationMode
