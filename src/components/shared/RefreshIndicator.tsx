import { useState } from 'react'
import { RefreshCw, Clock } from 'lucide-react'

interface Props { onRefresh?: () => Promise<void> }

const RefreshIndicator = ({ onRefresh }: Props) => {
  const [spinning, setSpinning] = useState(false)

  const handleRefresh = async () => {
    if (spinning || !onRefresh) return
    setSpinning(true)
    await onRefresh()
    setTimeout(() => setSpinning(false), 1000)
  }

  return (
    <div className="flex items-center space-x-3 text-xs text-gray-500">
      <Clock className="h-3.5 w-3.5" />
      <span>Data as of March 2026</span>
      {onRefresh && (
        <button onClick={handleRefresh} className="p-1 rounded hover:bg-cyber-border/30 text-gray-500 hover:text-neon-cyan transition-colors" title="Refresh data">
          <RefreshCw className={`h-3.5 w-3.5 ${spinning ? 'animate-spin-refresh' : ''}`} />
        </button>
      )}
    </div>
  )
}

export default RefreshIndicator
