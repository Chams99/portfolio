'use client'

import { motion } from 'framer-motion'
import { Clock, MessageCircle, Sword, Heart, Banana, Star, FlaskConical, Music, Package, Trophy, RotateCcw, Zap, Skull, Sparkles } from 'lucide-react'

interface LogMessage {
  text: string
  timestamp: number
}

interface GameLogProps {
  messages: string[] | LogMessage[]
}

export const GameLog = ({ messages }: GameLogProps) => {
  const getMessageColor = (message: string) => {
    if (message.includes('damage') || message.includes('hurt')) return 'text-red-600'
    if (message.includes('healed') || message.includes('heal')) return 'text-green-600'
    if (message.includes('found') || message.includes('bananas')) return 'text-orange-600'
    if (message.includes('Level up') || message.includes('🎉')) return 'text-purple-600'
    if (message.includes('used') || message.includes('potion')) return 'text-blue-600'
    return 'text-gray-600'
  }

  const getMessageIcon = (message: string) => {
    if (message.includes('damage') || message.includes('hurt')) return <Sword className="w-4 h-4 text-red-500" />
    if (message.includes('healed') || message.includes('heal')) return <Heart className="w-4 h-4 text-green-500" />
    if (message.includes('found') || message.includes('bananas')) return <Banana className="w-4 h-4 text-orange-500" />
    if (message.includes('Level up') || message.includes('defeated')) return <Trophy className="w-4 h-4 text-purple-500" />
    if (message.includes('used') || message.includes('potion')) return <FlaskConical className="w-4 h-4 text-blue-500" />
    if (message.includes('danced')) return <Music className="w-4 h-4 text-pink-500" />
    if (message.includes('equipment') || message.includes('crafted')) return <Package className="w-4 h-4 text-indigo-500" />
    if (message.includes('reset')) return <RotateCcw className="w-4 h-4 text-gray-500" />
    if (message.includes('critical') || message.includes('special')) return <Zap className="w-4 h-4 text-yellow-500" />
    return <MessageCircle className="w-4 h-4 text-gray-500" />
  }

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    if (seconds < 60) return seconds <= 0 ? 'Now' : `${seconds}s ago`
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return new Date(timestamp).toLocaleDateString()
  }

  // Normalize messages to LogMessage format
  const normalizedMessages = messages.map((msg, index) => {
    if (typeof msg === 'string') {
      return { text: msg, timestamp: Date.now() - (messages.length - index) * 1000 }
    }
    return msg
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card hover-lift p-3 h-full flex flex-col"
    >
      <div className="flex items-center mb-2">
        <MessageCircle className="w-4 h-4 mr-2 text-blue-500" />
        <h3 className="text-sm font-semibold text-gray-700">Game Log</h3>
      </div>

      <div className="space-y-1 flex-1 overflow-y-auto scrollbar-thin min-h-0">
        {messages.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <div className="text-3xl mb-2 animate-bounce text-yellow-500">
              <Star className="inline w-8 h-8" />
            </div>
            <div className="text-sm font-medium">Ready for Adventure!</div>
            <div className="text-xs mt-1">Click actions to start</div>
          </div>
        ) : (
          normalizedMessages.slice(-8).reverse().map((message, index) => (
            <motion.div
              key={`${message.text}-${index}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
              className={`flex items-start space-x-2 p-2 rounded border-l-3 ${
                message.text.includes('Level up') ? 'bg-purple-50 border-purple-400' :
                message.text.includes('damage') ? 'bg-red-50 border-red-400' :
                message.text.includes('healed') ? 'bg-green-50 border-green-400' :
                message.text.includes('found') ? 'bg-orange-50 border-orange-400' :
                'bg-gray-50 border-gray-400'
              }`}
            >
              <span className="flex-shrink-0">{getMessageIcon(message.text)}</span>
              <div className="flex-1 min-w-0">
                <span className={`text-xs ${getMessageColor(message.text)} font-medium block`}>
                  {message.text}
                </span>
                <span className="text-xs text-gray-500">
                  {formatTimestamp(message.timestamp)}
                </span>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {messages.length > 8 && (
        <div className="mt-2 text-center">
          <div className="text-xs text-gray-500 bg-gray-50 rounded-full px-2 py-1">
            +{messages.length - 8} more
          </div>
        </div>
      )}
    </motion.div>
  )
} 