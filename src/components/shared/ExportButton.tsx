import { useState } from 'react'
import { Download, Image, FileSpreadsheet } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  data?: Record<string, unknown>[]
  chartRef?: React.RefObject<HTMLDivElement | null>
  filename?: string
}

const ExportButton = ({ data, chartRef, filename = 'indiamonitor-data' }: Props) => {
  const [open, setOpen] = useState(false)

  const exportCSV = () => {
    if (!data || data.length === 0) return
    const headers = Object.keys(data[0])
    const csv = [headers.join(','), ...data.map(row => headers.map(h => JSON.stringify(row[h] ?? '')).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `${filename}.csv`; a.click()
    URL.revokeObjectURL(url)
    setOpen(false)
  }

  const exportPNG = async () => {
    if (!chartRef?.current) return
    try {
      const { default: html2canvas } = await import('html2canvas')
      const canvas = await html2canvas(chartRef.current, { backgroundColor: '#0A0E1A' })
      const url = canvas.toDataURL('image/png')
      const a = document.createElement('a')
      a.href = url; a.download = `${filename}.png`; a.click()
    } catch {
      // html2canvas not available, skip
    }
    setOpen(false)
  }

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="p-1.5 rounded-lg text-gray-500 hover:text-neon-cyan hover:bg-cyber-border/30 transition-colors" title="Export">
        <Download className="h-4 w-4" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute right-0 top-8 z-50 bg-cyber-card border border-cyber-border rounded-lg shadow-lg p-2 min-w-[140px]"
          >
            {data && (
              <button onClick={exportCSV} className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-300 hover:text-neon-cyan hover:bg-cyber-border/30 rounded transition-colors">
                <FileSpreadsheet className="h-4 w-4" /><span>CSV</span>
              </button>
            )}
            {chartRef && (
              <button onClick={exportPNG} className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-300 hover:text-neon-cyan hover:bg-cyber-border/30 rounded transition-colors">
                <Image className="h-4 w-4" /><span>PNG</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ExportButton
