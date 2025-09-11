'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback } from 'react'
import { Trophy, Star, Gift, Target, TrendingUp, Award, Zap, Crown, Sword, Shield, Heart, FlaskRound, Clock } from 'lucide-react'
import { GameState, Achievement, Collection } from '../hooks/useGameState'

interface AchievementSystemProps {
  gameState: GameState
  onClose: () => void
}

export const AchievementSystem = ({ gameState, onClose }: AchievementSystemProps) => {
  const [activeTab, setActiveTab] = useState<'achievements' | 'collections' | 'stats'>('achievements')
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)

  const completedAchievements = gameState.achievements.filter(a => a.completed)
  const totalAchievements = gameState.achievements.length
  const completionRate = (completedAchievements.length / totalAchievements) * 100

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500'
      case 'epic': return 'from-purple-400 to-pink-500'
      case 'rare': return 'from-blue-400 to-cyan-500'
      default: return 'from-gray-400 to-gray-500'
    }
  }

  const getProgressColor = (progress: number, maxProgress: number) => {
    const percentage = (progress / maxProgress) * 100
    if (percentage >= 100) return 'from-green-400 to-green-500'
    if (percentage >= 75) return 'from-yellow-400 to-yellow-500'
    if (percentage >= 50) return 'from-orange-400 to-orange-500'
    return 'from-red-400 to-red-500'
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-gradient-to-br from-gray-800/95 to-gray-900/95 rounded-2xl p-6 max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden border border-gray-700/50"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <div>
              <h2 className="text-2xl font-bold text-white">Achievements & Progress</h2>
              <div className="text-sm text-gray-400">
                {completedAchievements.length}/{totalAchievements} Achievements Unlocked
              </div>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </motion.button>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl p-4 border border-yellow-500/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-400">{completedAchievements.length}</div>
                <div className="text-sm text-gray-400">Achievements</div>
              </div>
              <Trophy className="w-8 h-8 text-yellow-400" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-500/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-400">{gameState.collections.filter(c => c.completed).length}</div>
                <div className="text-sm text-gray-400">Collections</div>
              </div>
              <Gift className="w-8 h-8 text-purple-400" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-4 border border-blue-500/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-400">{gameState.level}</div>
                <div className="text-sm text-gray-400">Level</div>
              </div>
              <Target className="w-8 h-8 text-blue-400" />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-green-500/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-400">{Math.round(completionRate)}%</div>
                <div className="text-sm text-gray-400">Completion</div>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
          </motion.div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-6">
          {[
            { id: 'achievements', label: 'Achievements', icon: Trophy },
            { id: 'collections', label: 'Collections', icon: Gift },
            { id: 'stats', label: 'Statistics', icon: TrendingUp }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[60vh]">
          <AnimatePresence mode="wait">
            {activeTab === 'achievements' && (
              <motion.div
                key="achievements"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                {gameState.achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedAchievement(achievement)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      achievement.completed
                        ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30'
                        : 'bg-gradient-to-r from-gray-700/50 to-gray-800/50 border-gray-600/30 hover:border-gray-500/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div>
                          <div className="font-semibold text-white">{achievement.name}</div>
                          <div className="text-sm text-gray-400">{achievement.description}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        {achievement.completed ? (
                          <div className="flex items-center space-x-2">
                            <Award className="w-5 h-5 text-yellow-400" />
                            <span className="text-sm text-yellow-400">Completed</span>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-400">
                            {achievement.progress}/{achievement.maxProgress}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-3">
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          className={`bg-gradient-to-r ${getProgressColor(achievement.progress, achievement.maxProgress)} h-2 rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>

                    {/* Rewards */}
                    {achievement.completed && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 flex items-center space-x-4 text-sm"
                      >
                        <div className="flex items-center space-x-1 text-blue-400">
                          <Zap className="w-4 h-4" />
                          <span>+{achievement.reward.experience} XP</span>
                        </div>
                        <div className="flex items-center space-x-1 text-yellow-400">
                          <Star className="w-4 h-4" />
                          <span>+{achievement.reward.gold} Gold</span>
                        </div>
                        <div className="flex items-center space-x-1 text-purple-400">
                          <Crown className="w-4 h-4" />
                          <span>+{achievement.reward.gems} Gems</span>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'collections' && (
              <motion.div
                key="collections"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                {gameState.collections.map((collection) => (
                  <motion.div
                    key={collection.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-xl border ${
                      collection.completed
                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30'
                        : 'bg-gradient-to-r from-gray-700/50 to-gray-800/50 border-gray-600/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-semibold text-white">{collection.name}</div>
                        <div className="text-sm text-gray-400">{collection.description}</div>
                      </div>
                      {collection.completed && (
                        <div className="flex items-center space-x-2">
                          <Award className="w-5 h-5 text-purple-400" />
                          <span className="text-sm text-purple-400">Completed</span>
                        </div>
                      )}
                    </div>

                    {/* Collection Items */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {collection.items.map((item) => (
                        <motion.div
                          key={item.id}
                          whileHover={{ scale: 1.05 }}
                          className={`p-3 rounded-lg border text-center ${
                            item.collected
                              ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30'
                              : 'bg-gray-700/30 border-gray-600/30'
                          }`}
                        >
                          <div className="text-2xl mb-2">{item.icon}</div>
                          <div className="text-sm font-semibold text-white">{item.name}</div>
                          <div className="text-xs text-gray-400">{item.description}</div>
                          <div className={`text-xs mt-1 px-2 py-1 rounded-full inline-block ${
                            item.collected
                              ? 'bg-green-500/20 text-green-400'
                              : `bg-gradient-to-r ${getRarityColor(item.rarity)} text-white`
                          }`}>
                            {item.collected ? 'Collected' : item.rarity}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Collection Progress */}
                    <div className="mt-3">
                      <div className="flex justify-between text-sm text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{collection.items.filter(i => i.collected).length}/{collection.items.length}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(collection.items.filter(i => i.collected).length / collection.items.length) * 100}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'stats' && (
              <motion.div
                key="stats"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Damage Dealt', value: gameState.stats.totalDamageDealt, icon: Sword, color: 'red' },
                    { label: 'Total Damage Taken', value: gameState.stats.totalDamageTaken, icon: Shield, color: 'orange' },
                    { label: 'Total Healing Done', value: gameState.stats.totalHealingDone, icon: Heart, color: 'green' },
                    { label: 'Critical Hits', value: gameState.stats.criticalHits, icon: Zap, color: 'yellow' },
                    { label: 'Battles Won', value: gameState.stats.battlesWon, icon: Trophy, color: 'blue' },
                    { label: 'Bananas Collected', value: gameState.stats.bananasCollected, icon: Gift, color: 'yellow' },
                    { label: 'Potions Used', value: gameState.stats.potionsUsed, icon: FlaskRound, color: 'green' },
                    { label: 'Longest Session', value: `${Math.floor(gameState.stats.longestSession / 60000)}m`, icon: Clock, color: 'purple' }
                  ].map((stat) => (
                    <motion.div
                      key={stat.label}
                      whileHover={{ scale: 1.05 }}
                      className={`bg-gradient-to-br from-${stat.color}-500/20 to-${stat.color}-600/20 rounded-xl p-4 border border-${stat.color}-500/30`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-white">{stat.value}</div>
                          <div className="text-sm text-gray-400">{stat.label}</div>
                        </div>
                        <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
} 