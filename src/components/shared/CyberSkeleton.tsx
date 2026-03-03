import { motion } from 'framer-motion'

interface Props {
  lines?: number
  className?: string
  type?: 'card' | 'text' | 'chart'
}

const CyberSkeleton = ({ lines = 3, className = '', type = 'text' }: Props) => {
  if (type === 'card') {
    return (
      <div className={`cyber-card p-6 ${className}`}>
        <div className="h-4 w-1/3 rounded bg-cyber-border animate-skeleton-pulse mb-4" />
        <div className="h-8 w-2/3 rounded bg-cyber-border animate-skeleton-pulse mb-6" />
        <div className="space-y-2">
          {Array.from({ length: lines }).map((_, i) => (
            <div key={i} className="h-3 rounded bg-cyber-border animate-skeleton-pulse" style={{ width: `${80 - i * 15}%`, animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      </div>
    )
  }

  if (type === 'chart') {
    return (
      <div className={`cyber-card p-6 ${className}`}>
        <div className="h-4 w-1/4 rounded bg-cyber-border animate-skeleton-pulse mb-4" />
        <div className="flex items-end space-x-2 h-40">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t bg-cyber-border animate-skeleton-pulse"
              style={{ height: `${30 + Math.random() * 70}%`, animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="h-3 rounded bg-cyber-border animate-skeleton-pulse" style={{ width: `${90 - i * 10}%`, animationDelay: `${i * 0.15}s` }} />
      ))}
    </div>
  )
}

export default CyberSkeleton
