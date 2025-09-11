'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback, useEffect } from 'react'
import { Sword, Shield, Zap, Heart, Target, Crown, Star, Award, Sparkles, Skull } from 'lucide-react'
import { GameState, Enemy } from '../hooks/useGameState'

interface CombatSystemProps {
  gameState: GameState
  onCombatAction: (action: string, target?: string) => void
  onEndCombat: () => void
}

export const CombatSystem = ({ gameState, onCombatAction, onEndCombat }: CombatSystemProps) => {
  const [combatLog, setCombatLog] = useState<string[]>([])
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [enemyAnimation, setEnemyAnimation] = useState(false)
  const [playerAnimation, setPlayerAnimation] = useState(false)

  const enemy = gameState.currentEnemy

  useEffect(() => {
    if (enemy) {
      setCombatLog([`A ${enemy.name} appears!`])
    }
  }, [enemy])

  const addCombatMessage = useCallback((message: string) => {
    setCombatLog(prev => [...prev.slice(-4), message])
  }, [])

  const handleAttack = useCallback(() => {
    if (!enemy || !isPlayerTurn || gameState.isDead) return

    setIsPlayerTurn(false)
    setPlayerAnimation(true)
    
    // Calculate damage with critical hit chance
    const baseDamage = 20 + (gameState.skills.strength * 5)
    const criticalChance = gameState.skills.luck * 0.05
    const isCritical = Math.random() < criticalChance
    
    const damage = isCritical ? baseDamage * 2 : baseDamage
    const finalDamage = Math.min(damage, enemy.health)
    
    addCombatMessage(`You attack for ${finalDamage} damage${isCritical ? ' (CRITICAL!)' : ''}`)
    
    // Update enemy health
    enemy.health -= finalDamage
    
    setTimeout(() => {
      setPlayerAnimation(false)
      
      if (enemy.health <= 0) {
        addCombatMessage(`You defeated the ${enemy.name}!`)
        setTimeout(() => {
          onEndCombat()
        }, 2000)
      } else {
        // Enemy turn
        handleEnemyTurn()
      }
    }, 1000)
  }, [enemy, isPlayerTurn, gameState.skills, addCombatMessage, onEndCombat])

  const handleEnemyTurn = useCallback(() => {
    if (!enemy || gameState.isDead) return

    setEnemyAnimation(true)
    
    // Enemy abilities
    let enemyAction = 'attack'
    if (enemy.abilities.includes('heal') && enemy.health < enemy.maxHealth * 0.3) {
      enemyAction = 'heal'
    } else if (enemy.abilities.includes('rage') && enemy.health < enemy.maxHealth * 0.5) {
      enemyAction = 'rage'
    }
    
    setTimeout(() => {
      setEnemyAnimation(false)
      
      switch (enemyAction) {
        case 'heal':
          const healAmount = Math.floor(enemy.maxHealth * 0.2)
          enemy.health = Math.min(enemy.maxHealth, enemy.health + healAmount)
          addCombatMessage(`${enemy.name} heals for ${healAmount} health!`)
          break
        case 'rage':
          enemy.damage = Math.floor(enemy.damage * 1.5)
          addCombatMessage(`${enemy.name} enters a rage!`)
          break
        default:
          // Calculate damage with dodge chance
          const dodgeChance = gameState.skills.agility * 0.05
          const isDodged = Math.random() < dodgeChance
          
          if (isDodged) {
            addCombatMessage(`You dodged the attack!`)
          } else {
            const damage = Math.min(enemy.damage, gameState.health)
            addCombatMessage(`${enemy.name} attacks for ${damage} damage!`)
            onCombatAction('takeDamage', damage.toString())
            
            // Check if player dies from this damage
            if (gameState.health - damage <= 0) {
              addCombatMessage(`You have been defeated!`)
              setTimeout(() => {
                onEndCombat() // End combat when player dies
              }, 2000)
              return
            }
          }
          break
      }
      
      setIsPlayerTurn(true)
    }, 1000)
  }, [enemy, gameState.skills, gameState.health, addCombatMessage, onCombatAction, onEndCombat])

  const handleSpecialAbility = useCallback((ability: string) => {
    if (!enemy || !isPlayerTurn || gameState.isDead) return

    setIsPlayerTurn(false)
    setPlayerAnimation(true)
    
    switch (ability) {
      case 'criticalStrike':
        const damage = (30 + gameState.skills.strength * 8) * 2
        const finalDamage = Math.min(damage, enemy.health)
        enemy.health -= finalDamage
        addCombatMessage(`Critical Strike deals ${finalDamage} damage!`)
        break
      case 'doubleAttack':
        const damage1 = 15 + gameState.skills.strength * 3
        const damage2 = 15 + gameState.skills.strength * 3
        const totalDamage = Math.min(damage1 + damage2, enemy.health)
        enemy.health -= totalDamage
        addCombatMessage(`Double Attack deals ${totalDamage} damage!`)
        break
      case 'healingWave':
        const healAmount = 25 + gameState.skills.healing * 5
        addCombatMessage(`Healing Wave restores ${healAmount} health!`)
        onCombatAction('heal', healAmount.toString())
        break
    }
    
    setTimeout(() => {
      setPlayerAnimation(false)
      
      if (enemy.health <= 0) {
        addCombatMessage(`You defeated the ${enemy.name}!`)
        setTimeout(() => {
          onEndCombat()
        }, 2000)
      } else {
        handleEnemyTurn()
      }
    }, 1000)
  }, [enemy, isPlayerTurn, gameState.skills, addCombatMessage, onCombatAction, onEndCombat])

  if (!enemy) return null

  const healthPercentage = (enemy.health / enemy.maxHealth) * 100
  const playerHealthPercentage = (gameState.health / gameState.maxHealth) * 100

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl p-6 max-w-4xl w-full mx-4 border border-gray-700/50"
      >
        {/* Combat Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Combat</h2>
          <div className="flex justify-center items-center space-x-4">
            <div className="text-sm text-gray-400">
              {isPlayerTurn ? 'Your Turn' : `${enemy.name}'s Turn`}
            </div>
            <div className="text-sm text-gray-400">
              Level {enemy.level} {enemy.type === 'boss' ? '(Boss)' : enemy.type === 'elite' ? '(Elite)' : ''}
            </div>
          </div>
        </div>

        {/* Combat Arena */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Player Side */}
          <motion.div
            animate={playerAnimation ? { scale: [1, 1.1, 1], x: [0, 10, 0] } : {}}
            className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl p-4 border border-blue-500/30"
          >
            <div className="text-center">
              <div className="text-6xl mb-4 text-yellow-400">
                <Star className="w-16 h-16" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Your Chicken</h3>
              
              {/* Player Health */}
              <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-300 mb-1">
                  <span>Health</span>
                  <span>{gameState.health}/{gameState.maxHealth}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <motion.div
                    className="bg-gradient-to-r from-green-500 to-green-400 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${playerHealthPercentage}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Player Stats */}
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                <div className="flex items-center">
                  <Sword className="w-3 h-3 mr-1" />
                  Strength: {gameState.skills.strength}
                </div>
                <div className="flex items-center">
                  <Target className="w-3 h-3 mr-1" />
                  Agility: {gameState.skills.agility}
                </div>
                <div className="flex items-center">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Luck: {gameState.skills.luck}
                </div>
                <div className="flex items-center">
                  <Heart className="w-3 h-3 mr-1" />
                  Healing: {gameState.skills.healing}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enemy Side */}
          <motion.div
            animate={enemyAnimation ? { scale: [1, 1.1, 1], x: [0, -10, 0] } : {}}
            className="bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-xl p-4 border border-red-500/30"
          >
            <div className="text-center">
              <div className="text-6xl mb-4 text-yellow-400">
                {enemy.type === 'boss' ? <Crown className="w-16 h-16" /> : enemy.type === 'elite' ? <Star className="w-16 h-16" /> : <Star className="w-16 h-16" />}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{enemy.name}</h3>
              
              {/* Enemy Health */}
              <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-300 mb-1">
                  <span>Health</span>
                  <span>{enemy.health}/{enemy.maxHealth}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <motion.div
                    className="bg-gradient-to-r from-red-500 to-red-400 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${healthPercentage}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Enemy Stats */}
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                <div className="flex items-center">
                  <Sword className="w-3 h-3 mr-1" />
                  Damage: {enemy.damage}
                </div>
                <div className="flex items-center">
                  <Award className="w-3 h-3 mr-1" />
                  Level: {enemy.level}
                </div>
                <div className="flex items-center">
                  <Target className="w-3 h-3 mr-1" />
                  Type: {enemy.type}
                </div>
                <div className="flex items-center">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Abilities: {enemy.abilities.length}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Combat Actions */}
        {isPlayerTurn && !gameState.isDead && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white text-center mb-4">Choose Your Action</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {/* Basic Attack */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAttack}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white p-4 rounded-lg font-semibold flex flex-col items-center"
              >
                <Sword className="w-6 h-6 mb-2" />
                <span className="text-sm">Attack</span>
              </motion.button>

              {/* Special Abilities */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSpecialAbility('criticalStrike')}
                disabled={gameState.specialAbilities.criticalStrike <= 0}
                className={`p-4 rounded-lg font-semibold flex flex-col items-center ${
                  gameState.specialAbilities.criticalStrike > 0
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Zap className="w-6 h-6 mb-2" />
                <span className="text-sm">Critical Strike</span>
                <span className="text-xs">({gameState.specialAbilities.criticalStrike})</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSpecialAbility('doubleAttack')}
                disabled={gameState.specialAbilities.doubleAttack <= 0}
                className={`p-4 rounded-lg font-semibold flex flex-col items-center ${
                  gameState.specialAbilities.doubleAttack > 0
                    ? 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Target className="w-6 h-6 mb-2" />
                <span className="text-sm">Double Attack</span>
                <span className="text-xs">({gameState.specialAbilities.doubleAttack})</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSpecialAbility('healingWave')}
                disabled={gameState.specialAbilities.healingWave <= 0}
                className={`p-4 rounded-lg font-semibold flex flex-col items-center ${
                  gameState.specialAbilities.healingWave > 0
                    ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Heart className="w-6 h-6 mb-2" />
                <span className="text-sm">Healing Wave</span>
                <span className="text-xs">({gameState.specialAbilities.healingWave})</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Death Message */}
        {gameState.isDead && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-6"
          >
            <div className="text-6xl mb-4 text-red-500">
              <Skull className="w-16 h-16" />
            </div>
            <h3 className="text-2xl font-bold text-red-400 mb-2">You Have Been Defeated!</h3>
            <p className="text-gray-300">Your brave chicken has fallen in battle.</p>
          </motion.div>
        )}

        {/* Combat Log */}
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-white mb-2">Combat Log</h4>
          <div className="bg-gray-900/50 rounded-lg p-3 max-h-32 overflow-y-auto">
            {combatLog.map((message, index) => (
              <div key={index} className="text-sm text-gray-300 mb-1">
                {message}
              </div>
            ))}
          </div>
        </div>

        {/* Escape Button */}
        <div className="mt-4 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEndCombat}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            Escape Combat
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
} 