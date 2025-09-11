'use client'

import { motion } from 'framer-motion'
import { Heart, Trophy, Banana, FlaskRound, Zap, Target, Crown, Star, Coins, Gem } from 'lucide-react'
import { GameState } from '../hooks/useGameState'

interface GameStatsProps {
  gameState: GameState
}

export const GameStats = ({ gameState }: GameStatsProps) => {
  const healthPercentage = (gameState.health / gameState.maxHealth) * 100
  const expPercentage = (gameState.experience / gameState.experienceToNext) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card hover-lift p-3"
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
        {/* Health */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-center p-2 bg-red-50 rounded-lg border border-red-200 hover-lift"
        >
          <div className="flex items-center justify-center mb-2">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mr-1" />
            <span className="text-base sm:text-lg font-bold text-red-600">
              {gameState.health}/{gameState.maxHealth}
            </span>
          </div>
          <div className="progress-bar">
            <motion.div
              className="bg-gradient-to-r from-red-400 to-red-500 progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${healthPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="text-xs text-gray-600 mt-1 font-medium">Health</div>
        </motion.div>

        {/* Experience */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-center p-2 bg-blue-50 rounded-lg border border-blue-200 hover-lift"
        >
          <div className="flex items-center justify-center mb-1">
            <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 mr-1" />
            <span className="text-sm sm:text-base font-bold text-blue-600">
              {gameState.experience}/{gameState.experienceToNext}
            </span>
          </div>
          <div className="progress-bar">
            <motion.div
              className="bg-gradient-to-r from-blue-400 to-blue-500 progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${expPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="text-xs text-gray-600 mt-1 font-medium">EXP</div>
        </motion.div>

        {/* Score */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-center p-2 bg-yellow-50 rounded-lg border border-yellow-200 hover-lift"
        >
          <div className="flex items-center justify-center mb-1">
            <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 mr-1" />
            <span className="text-sm sm:text-base font-bold text-yellow-600">{gameState.score}</span>
          </div>
          <div className="text-xs text-gray-600 font-medium">Score</div>
        </motion.div>

        {/* Gold */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-center p-2 bg-amber-50 rounded-lg border border-amber-200 hover-lift"
        >
          <div className="flex items-center justify-center mb-1">
            <Coins className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500 mr-1" />
            <span className="text-sm sm:text-base font-bold text-amber-600">{gameState.gold}</span>
          </div>
          <div className="text-xs text-gray-600 font-medium">Gold</div>
        </motion.div>

        {/* Gems */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-center p-2 bg-purple-50 rounded-lg border border-purple-200 hover-lift"
        >
          <div className="flex items-center justify-center mb-1">
            <Gem className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500 mr-1" />
            <span className="text-sm sm:text-base font-bold text-purple-600">{gameState.gems}</span>
          </div>
          <div className="text-xs text-gray-600 font-medium">Gems</div>
        </motion.div>

        {/* Bananas */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-center p-2 bg-orange-50 rounded-lg border border-orange-200 hover-lift"
        >
          <div className="flex items-center justify-center mb-1">
            <Banana className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500 mr-1" />
            <span className="text-sm sm:text-base font-bold text-orange-600">{gameState.bananas}</span>
          </div>
          <div className="text-xs text-gray-600 font-medium">Bananas</div>
        </motion.div>

        {/* Potions */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-center p-2 bg-green-50 rounded-lg border border-green-200 hover-lift"
        >
          <div className="flex items-center justify-center mb-1">
            <FlaskRound className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1" />
            <span className="text-sm sm:text-base font-bold text-green-600">{gameState.potions}</span>
          </div>
          <div className="text-xs text-gray-600 font-medium">Potions</div>
        </motion.div>

        {/* Level */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-center p-2 bg-indigo-50 rounded-lg border border-indigo-200 hover-lift"
        >
          <div className="flex items-center justify-center mb-1">
            <Target className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-500 mr-1" />
            <span className="text-sm sm:text-base font-bold text-indigo-600">{gameState.level}</span>
          </div>
          <div className="text-xs text-gray-600 font-medium">Level</div>
        </motion.div>
      </div>

      {/* Status Badges */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-2 flex flex-wrap justify-center gap-1"
      >
        {/* Revive Status */}
        <div className={`status-badge ${
          !gameState.hasUsedRevive ? 'status-success' : 'status-danger'
        }`}>
          {!gameState.hasUsedRevive ? (
            <>
              <Heart className="w-3 h-3 mr-1" />
              Revive Ready
            </>
          ) : (
            <>
              💀 No Revive
            </>
          )}
        </div>

        {/* Special Abilities Status */}
        {(gameState.specialAbilities.criticalStrike > 0 ||
          gameState.specialAbilities.doubleAttack > 0 ||
          gameState.specialAbilities.healingWave > 0) && (
          <div className="status-badge status-info">
            <Zap className="w-3 h-3 mr-1" />
            Special Abilities!
          </div>
        )}

        {/* Skill Points Available */}
        {gameState.skillPoints > 0 && (
          <div className="status-badge status-warning animate-bounce">
            <Star className="w-3 h-3 mr-1" />
            {gameState.skillPoints} Skill Points!
          </div>
        )}
      </motion.div>
    </motion.div>
  )
} 