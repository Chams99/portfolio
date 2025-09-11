'use client'

import { motion } from 'framer-motion'
import { Clock, Banana, Star, Coins, Check, Sparkles } from 'lucide-react'

interface IdleEarningsModalProps {
  idleEarnings: {
    totalBananas: number
    totalExperience: number
    totalGold: number
    timeAway: number
  } | null
  onCollect: () => void
  onClose: () => void
}

export const IdleEarningsModal = ({ idleEarnings, onCollect, onClose }: IdleEarningsModalProps) => {
  if (!idleEarnings) return null

  const formatTime = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60))
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60))

    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  const totalValue = idleEarnings.totalBananas + idleEarnings.totalExperience + idleEarnings.totalGold

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-gradient-to-br from-purple-900/90 to-blue-900/90 rounded-2xl p-6 max-w-md mx-4 border border-purple-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-6xl mb-4"
          >
            <Sparkles className="w-8 h-8" />
          </motion.div>

          <h2 className="text-2xl font-bold text-white mb-2">Welcome Back!</h2>
          <p className="text-purple-200 mb-6">
            Your chicken was busy while you were away
          </p>

          <div className="bg-white/10 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center mb-3">
              <Clock className="w-5 h-5 mr-2 text-purple-300" />
              <span className="text-purple-200 font-medium">
                Time Away: {formatTime(idleEarnings.timeAway)}
              </span>
            </div>

            <div className="space-y-3">
              {idleEarnings.totalBananas > 0 && (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-between bg-yellow-500/20 rounded-lg p-3"
                >
                  <div className="flex items-center">
                    <Banana className="w-5 h-5 mr-2 text-yellow-400" />
                    <span className="text-yellow-200 font-medium">Bananas</span>
                  </div>
                  <span className="text-yellow-100 font-bold">+{idleEarnings.totalBananas}</span>
                </motion.div>
              )}

              {idleEarnings.totalExperience > 0 && (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center justify-between bg-blue-500/20 rounded-lg p-3"
                >
                  <div className="flex items-center">
                    <Star className="w-5 h-5 mr-2 text-blue-400" />
                    <span className="text-blue-200 font-medium">Experience</span>
                  </div>
                  <span className="text-blue-100 font-bold">+{idleEarnings.totalExperience}</span>
                </motion.div>
              )}

              {idleEarnings.totalGold > 0 && (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-between bg-green-500/20 rounded-lg p-3"
                >
                  <div className="flex items-center">
                    <Coins className="w-5 h-5 mr-2 text-green-400" />
                    <span className="text-green-200 font-medium">Gold</span>
                  </div>
                  <span className="text-green-100 font-bold">+{idleEarnings.totalGold}</span>
                </motion.div>
              )}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCollect}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center"
          >
            <Check className="w-5 h-5 mr-2" />
            Collect Rewards
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
