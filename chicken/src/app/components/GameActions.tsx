'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback, useEffect } from 'react'
import { Sword, Search, Music, FlaskRound, Zap, Target, Crown, Star, Shield, Heart, Gift, Trophy } from 'lucide-react'
import { GameState } from '../hooks/useGameState'

// Define which actions are special actions that get blocked during cooldowns
const SPECIAL_ACTIONS = ['elite', 'boss', 'treasure']

interface GameActionsProps {
  gameState: GameState
  onFight: () => void
  onSearch: () => void
  onDance: () => void
  onUsePotion: () => void
  onUpgradeSkill: (skill: keyof GameState['skills']) => void
  onStartCombat: (enemyType: string) => void
  onSpecialAbility: (ability: string) => void
}

export const GameActions = ({
  gameState,
  onFight,
  onSearch,
  onDance,
  onUsePotion,
  onUpgradeSkill,
  onStartCombat,
  onSpecialAbility,
}: GameActionsProps) => {
  // SEPARATE COOLDOWN STATES - NO SHARED OBJECTS!
  const [fightCooldown, setFightCooldown] = useState(0)
  const [searchCooldown, setSearchCooldown] = useState(0)
  const [danceCooldown, setDanceCooldown] = useState(0)
  const [eliteCooldown, setEliteCooldown] = useState(0)
  const [bossCooldown, setBossCooldown] = useState(0)
  const [treasureCooldown, setTreasureCooldown] = useState(0)
  
  // Progress tracking for smooth animations
  const [fightProgress, setFightProgress] = useState(0)
  const [searchProgress, setSearchProgress] = useState(0)
  const [danceProgress, setDanceProgress] = useState(0)
  const [eliteProgress, setEliteProgress] = useState(0)
  const [bossProgress, setBossProgress] = useState(0)
  const [treasureProgress, setTreasureProgress] = useState(0)
  
  const [activeTab, setActiveTab] = useState<'combat' | 'exploration' | 'special'>('combat')
  const [showWarning, setShowWarning] = useState(false)

  // Check if any SPECIAL ability is on cooldown (only for special actions)
  const hasActiveSpecialAbility = eliteCooldown > 0 || bossCooldown > 0 || treasureCooldown > 0

  // SIMPLE DIRECT HANDLERS - NO USECALLBACK!
  const handleFight = () => {
    if (fightCooldown > 0) return
    console.log('✅ FIGHT EXECUTING!')
    onFight()
    
    setFightCooldown(3)
    setFightProgress(0)
    
    const startTime = Date.now()
    const updateFight = () => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, 3000 - elapsed)
      const seconds = Math.ceil(remaining / 1000)
      const progress = Math.min(100, (elapsed / 3000) * 100)
      
      if (remaining > 0) {
        setFightCooldown(seconds)
        setFightProgress(progress)
        requestAnimationFrame(updateFight)
      } else {
        setFightCooldown(0)
        setFightProgress(0)
      }
    }
    requestAnimationFrame(updateFight)
  }
  
  const handleSearch = () => {
    if (searchCooldown > 0) return
    console.log('✅ SEARCH EXECUTING!')
    onSearch()
    
    setSearchCooldown(3)
    setSearchProgress(0)
    
    const startTime = Date.now()
    const updateSearch = () => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, 3000 - elapsed)
      const seconds = Math.ceil(remaining / 1000)
      const progress = Math.min(100, (elapsed / 3000) * 100)
      
      if (remaining > 0) {
        setSearchCooldown(seconds)
        setSearchProgress(progress)
        requestAnimationFrame(updateSearch)
      } else {
        setSearchCooldown(0)
        setSearchProgress(0)
      }
    }
    requestAnimationFrame(updateSearch)
  }
  
  const handleDance = () => {
    if (danceCooldown > 0) return
    console.log('✅ DANCE EXECUTING!')
    onDance()
    
    setDanceCooldown(3)
    setDanceProgress(0)
    
    const startTime = Date.now()
    const updateDance = () => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, 3000 - elapsed)
      const seconds = Math.ceil(remaining / 1000)
      const progress = Math.min(100, (elapsed / 3000) * 100)
      
      if (remaining > 0) {
        setDanceCooldown(seconds)
        setDanceProgress(progress)
        requestAnimationFrame(updateDance)
      } else {
        setDanceCooldown(0)
        setDanceProgress(0)
      }
    }
    requestAnimationFrame(updateDance)
  }

  const handleAction = useCallback((action: string, callback: () => void) => {
    // Only for special actions now
    if (SPECIAL_ACTIONS.includes(action)) {
      console.log(`Special action: ${action}`)
      callback()
    }
  }, [hasActiveSpecialAbility])

  const getActionColor = (action: string) => {
    const getCurrentCooldown = (action: string) => {
      switch (action) {
        case 'fight': return fightCooldown
        case 'search': return searchCooldown
        case 'dance': return danceCooldown
        case 'elite': return eliteCooldown
        case 'boss': return bossCooldown
        case 'treasure': return treasureCooldown
        default: return 0
      }
    }
    
    if (getCurrentCooldown(action) > 0) return 'bg-gray-600 cursor-not-allowed'
    switch (action) {
      case 'fight': return 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
      case 'search': return 'bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800'
      case 'dance': return 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
      case 'potion': return 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
      case 'boss': return 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800'
      case 'elite': return 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
      default: return 'bg-gray-600'
    }
  }

  const getSpecialAbilityColor = (ability: string) => {
    switch (ability) {
      case 'criticalStrike': return 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
      case 'doubleAttack': return 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800'
      case 'healingWave': return 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
      default: return 'bg-gray-600'
    }
  }

  // League of Legends style cooldown button component
  const CooldownButton = ({ action, children, onClick, disabled, className, cooldownKey }: {
    action: string
    children: React.ReactNode
    onClick: () => void
    disabled: boolean
    className: string
    cooldownKey: string
  }) => {
    // Get cooldown and progress for this specific button
    const getCurrentCooldown = (key: string) => {
      switch (key) {
        case 'fight': return fightCooldown
        case 'search': return searchCooldown
        case 'dance': return danceCooldown
        case 'elite': return eliteCooldown
        case 'boss': return bossCooldown
        case 'treasure': return treasureCooldown
        default: return 0
      }
    }
    
    const getCurrentProgress = (key: string) => {
      switch (key) {
        case 'fight': return fightProgress
        case 'search': return searchProgress
        case 'dance': return danceProgress
        case 'elite': return eliteProgress
        case 'boss': return bossProgress
        case 'treasure': return treasureProgress
        default: return 0
      }
    }
    
    const currentCooldown = getCurrentCooldown(cooldownKey)
    const currentProgress = getCurrentProgress(cooldownKey)
    const isOnCooldown = currentCooldown > 0
    const isSpecialAction = SPECIAL_ACTIONS.includes(cooldownKey)
    const isRegularAction = ['fight', 'search', 'dance'].includes(cooldownKey)
    
    // ULTIMATE SIMPLE: Regular actions only disabled by own cooldown or external disable
    const isDisabled = isRegularAction 
      ? (disabled || isOnCooldown)  // Regular: ONLY own cooldown matters
      : (disabled || isOnCooldown || (isSpecialAction && hasActiveSpecialAbility))  // Special: can be blocked by other specials
    
    console.log(`🎯 FINAL Button ${cooldownKey}: 
      Regular=${isRegularAction} | CurrentCooldown=${currentCooldown} | Disabled=${isDisabled}
      ${isDisabled ? '🔴 DISABLED' : '🟢 ENABLED - SHOULD WORK!'}`)
    
    return (
      <motion.button
        whileHover={{ scale: isDisabled ? 1 : 1.05 }}
        whileTap={{ scale: isDisabled ? 1 : 0.95 }}
        onClick={onClick}
        disabled={isDisabled}
        className={`${className} relative overflow-hidden ${isOnCooldown ? 'grayscale brightness-50' : ''}`}
        style={{ 
          filter: isOnCooldown ? 'grayscale(1) brightness(0.5)' : 'none',
          transition: 'filter 0.2s ease, opacity 0.2s ease',
          pointerEvents: isDisabled ? 'none' : 'auto'
        }}
      >
        {/* Main button content */}
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          {children}
        </div>
        
        {/* Cooldown overlay with circular sweep */}
        {isOnCooldown && (
          <>
            {/* Gray overlay */}
            <div className="absolute inset-0 bg-black/60 z-20" />
            
            {/* Circular sweep animation - starts from top and sweeps clockwise */}
            <div 
              className="absolute inset-0 z-30"
              style={{
                background: `conic-gradient(from 270deg, transparent ${currentProgress}%, rgba(0,0,0,0.9) ${currentProgress}%)`,
                borderRadius: 'inherit'
              }}
            />
            
            {/* Additional border highlight when on cooldown */}
            <div 
              className="absolute inset-0 z-35 border-2 border-red-500/50 rounded-lg"
              style={{ opacity: isOnCooldown ? 1 : 0, transition: 'opacity 0.2s ease' }}
            />
            
            {/* Cooldown number */}
            <div className="absolute inset-0 z-40 flex items-center justify-center">
              <span className="text-white font-bold text-lg drop-shadow-lg">
                {currentCooldown}
              </span>
            </div>
          </>
        )}


      </motion.button>
    )
  }

  return (
    <div className="space-y-3">
      {/* Main Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card hover-lift p-3"
      >
        <h3 className="text-sm font-semibold mb-2 flex items-center text-gray-700">
          <Zap className="w-4 h-4 mr-2 text-yellow-500" />
          Quick Actions
        </h3>
          
        {/* Primary Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-3">
            <CooldownButton
              action="fight"
              onClick={handleFight}
              disabled={gameState.health <= 0}
            className="btn-playful compact-button flex items-center justify-center"
              cooldownKey="fight"
            >
            <Sword className="w-4 h-4 mr-2" />
              Fight Chicken
            </CooldownButton>

            <CooldownButton
              action="search"
              onClick={handleSearch}
              disabled={false}
            className="btn-success compact-button flex items-center justify-center"
              cooldownKey="search"
            >
            <Search className="w-4 h-4 mr-2" />
              Search Bananas
            </CooldownButton>
          </div>

        <div className="grid grid-cols-2 gap-3">
            <CooldownButton
              action="dance"
              onClick={handleDance}
              disabled={false}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white compact-button flex items-center justify-center"
              cooldownKey="dance"
            >
            <Music className="w-4 h-4 mr-2" />
              Dance & Heal
            </CooldownButton>

            <motion.button
              whileHover={{ scale: gameState.potions <= 0 ? 1 : 1.05 }}
              whileTap={{ scale: gameState.potions <= 0 ? 1 : 0.95 }}
              onClick={onUsePotion}
              disabled={gameState.potions <= 0}
            className={`compact-button flex items-center justify-center ${
              gameState.potions > 0
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <FlaskRound className="w-4 h-4 mr-2" />
              Use Potion ({gameState.potions})
            </motion.button>
          </div>
      </motion.div>

      {/* Advanced Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card hover-lift p-3"
      >
        <h3 className="text-sm font-semibold mb-2 flex items-center text-gray-700">
          <Crown className="w-4 h-4 mr-2 text-purple-500" />
          Advanced Actions
        </h3>

        <div className="grid grid-cols-2 gap-2 mb-2">
            <CooldownButton
            action="elite"
            onClick={() => onStartCombat('elite')}
            disabled={gameState.level < 5}
            className={`compact-button flex items-center justify-center ${
              gameState.level >= 5
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            cooldownKey="elite"
          >
            <Star className="w-4 h-4 mr-2" />
            Elite Battle
            </CooldownButton>
            
          <CooldownButton
            action="boss"
            onClick={() => onStartCombat('boss')}
            disabled={gameState.level < 10}
            className={`compact-button flex items-center justify-center ${
              gameState.level >= 10
                ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            cooldownKey="boss"
          >
            <Crown className="w-4 h-4 mr-2" />
            Boss Battle
          </CooldownButton>
          </div>

      {/* Special Abilities */}
        {(gameState.specialAbilities.criticalStrike > 0 ||
          gameState.specialAbilities.doubleAttack > 0 ||
          gameState.specialAbilities.healingWave > 0) && (
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-gray-600">Special Abilities</h4>
            <div className="grid grid-cols-1 gap-2">
              {gameState.specialAbilities.criticalStrike > 0 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSpecialAbility('criticalStrike')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white compact-button flex items-center justify-center"
                >
                  <Zap className="w-3 h-3 mr-2" />
                  Critical Strike ({gameState.specialAbilities.criticalStrike})
                </motion.button>
              )}

              {gameState.specialAbilities.doubleAttack > 0 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSpecialAbility('doubleAttack')}
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white compact-button flex items-center justify-center"
                >
                  <Target className="w-3 h-3 mr-2" />
                  Double Attack ({gameState.specialAbilities.doubleAttack})
                </motion.button>
              )}

              {gameState.specialAbilities.healingWave > 0 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSpecialAbility('healingWave')}
                  className="bg-gradient-to-r from-green-500 to-teal-500 text-white compact-button flex items-center justify-center"
                >
                  <Heart className="w-3 h-3 mr-2" />
                  Healing Wave ({gameState.specialAbilities.healingWave})
                </motion.button>
              )}
            </div>
          </div>
        )}
        </motion.div>
    </div>
  )
} 