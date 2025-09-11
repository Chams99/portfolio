'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { GameState } from '../hooks/useGameState'

interface ChickenDisplayProps {
  gameState: GameState
  isFighting: boolean
}

export const ChickenDisplay = ({ gameState, isFighting }: ChickenDisplayProps) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [chickenEmoji, setChickenEmoji] = useState('🐔')

  useEffect(() => {
    if (isFighting) {
      setIsAnimating(true)
      setChickenEmoji('🐓')
      setTimeout(() => {
        setIsAnimating(false)
        setChickenEmoji('🐔')
      }, 1000)
    }
  }, [isFighting])

  const getChickenSize = () => {
    // More compact sizes for smaller layout
    if (gameState.level >= 10) return 'text-6xl'
    if (gameState.level >= 5) return 'text-5xl'
    return 'text-4xl'
  }

  const getChickenColor = () => {
    if (gameState.health <= 20) return 'text-red-500'
    if (gameState.health <= 50) return 'text-orange-500'
    return 'text-gray-800'
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card hover-lift p-4 text-center w-full max-w-sm mx-auto"
    >
      {/* Chicken Animation */}
      <motion.div
        animate={isAnimating ? {
          scale: [1, 1.2, 1],
          rotate: [0, -10, 10, 0],
          y: [0, -20, 0]
        } : {}}
        transition={{ duration: 0.5 }}
        className={`${getChickenSize()} mb-4 ${isAnimating ? 'animate-wiggle' : ''}`}
        style={{ filter: gameState.health <= 20 ? 'grayscale(0.5) brightness(0.8)' : 'none' }}
      >
        {chickenEmoji}
      </motion.div>

      {/* Chicken Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <h3 className="text-xl font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
          Chicken Warrior Lv.{gameState.level}
        </h3>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 gap-1.5">
          <div className="text-center p-1.5 bg-red-50 rounded border border-red-200">
            <div className="text-red-600 font-semibold text-xs">⚔️ {gameState.skills.strength}</div>
          </div>
          <div className="text-center p-1.5 bg-blue-50 rounded border border-blue-200">
            <div className="text-blue-600 font-semibold text-xs">🏃 {gameState.skills.agility}</div>
          </div>
          <div className="text-center p-1.5 bg-yellow-50 rounded border border-yellow-200">
            <div className="text-yellow-600 font-semibold text-xs">🍀 {gameState.skills.luck}</div>
          </div>
          <div className="text-center p-1.5 bg-green-50 rounded border border-green-200">
            <div className="text-green-600 font-semibold text-xs">💚 {gameState.skills.healing}</div>
          </div>
        </div>

        {/* Status Effects */}
        {gameState.health <= 20 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-2 bg-red-50 rounded border border-red-200"
          >
            <div className="text-red-600 text-xs font-semibold animate-pulse">
              ⚠️ Low Health!
            </div>
          </motion.div>
        )}

        {/* Level Progress */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-600 font-medium">
            <span>EXP</span>
            <span>{gameState.experience}/{gameState.experienceToNext}</span>
          </div>
          <div className="progress-bar">
            <motion.div
              className="bg-gradient-to-r from-blue-400 to-purple-500 progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${(gameState.experience / gameState.experienceToNext) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Health Status */}
        <div className="text-center">
          <div className="inline-flex items-center px-2 py-1 bg-green-50 rounded-full border border-green-200">
            <Heart className="w-3 h-3 text-green-600 mr-1" />
            <span className="text-green-700 font-semibold text-xs">
              {gameState.health}/{gameState.maxHealth} HP
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
} 