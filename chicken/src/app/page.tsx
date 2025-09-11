'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings, RotateCcw, Trophy, Star, Zap, Crown, Gift, Target, Package, Hammer, Sword, Banana, Heart, FlaskConical, Music, Zap as Lightning, RotateCcw as RefreshCw, Award, Target as Aim, Coins, Gem, Skull, Sparkles } from 'lucide-react'
import { useGameState } from './hooks/useGameState'
import { GameStats } from './components/GameStats'
import { GameActions } from './components/GameActions'
import { GameLog } from './components/GameLog'
import { ChickenDisplay } from './components/ChickenDisplay'
import { ClientOnly } from './components/ClientOnly'
import { CombatSystem } from './components/CombatSystem'
import { AchievementSystem } from './components/AchievementSystem'
import { IdleEarningsModal } from './components/IdleEarningsModal'
import { EquipmentSystem } from './components/EquipmentSystem'
import { CraftingSystem } from './components/CraftingSystem'

export default function Home() {
  const {
    gameState,
    setGameState,
    addMessage,
    addExperience,
    updateHealth,
    updateBananas,
    updatePotions,
    updateScore,
    updateGold,
    updateGems,
    upgradeSkill,
    updateStats,
    startCombat,
    revivePlayer,
    resetGame,
    // Idle mechanics
    idleEarnings,
    showIdleModal,
    collectIdleEarnings,
    toggleAutoCombat,
    // Equipment system
    equipItem,
    unequipItem,
    getEquipmentBonus,
    generateEquipmentDrop,
    // Crafting system
    canCraftRecipe,
    craftRecipe,
  } = useGameState()

  const [isFighting, setIsFighting] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [showAchievements, setShowAchievements] = useState(false)
  const [showCombat, setShowCombat] = useState(false)
  const [showEquipment, setShowEquipment] = useState(false)
  const [showCrafting, setShowCrafting] = useState(false)

  const fightChicken = useCallback(() => {
    if (gameState.health <= 0 || gameState.isDead) return

    setIsFighting(true)

    // Calculate damage with equipment bonuses
    const baseDamage = Math.floor(Math.random() * 20) + 10
    const agilityBonus = (gameState.skills.agility + getEquipmentBonus('agility')) * 2
    const finalDamage = Math.max(5, baseDamage - agilityBonus)

    updateHealth(-finalDamage)
    updateScore(10 + gameState.level * 2)
    addExperience(15 + gameState.level * 3)

    // Update stats
    updateStats({ totalDamageTaken: gameState.stats.totalDamageTaken + finalDamage })

    // Combine messages to reduce frequency
    let message = `You fought a chicken! Took ${finalDamage} damage.`

    // Chance to find potions based on luck (including equipment bonus)
    const luckBonus = gameState.skills.luck + getEquipmentBonus('luck')
    if (Math.random() < luckBonus * 0.05) {
      updatePotions(1)
      message += ` Lucky! Found a potion!`
    }

    // Chance to drop equipment
    const equipmentDrop = generateEquipmentDrop(gameState.level)
    if (equipmentDrop) {
      // Add equipment to inventory
      setGameState(prev => ({
        ...prev,
        inventory: [...prev.inventory, equipmentDrop]
      }))
      message += ` Found ${equipmentDrop.name}!`
      addMessage(`${equipmentDrop.name} added to inventory!`)
    }

    addMessage(message)

    setTimeout(() => setIsFighting(false), 1000)
  }, [gameState, updateHealth, updateScore, addExperience, addMessage, updatePotions, updateStats, getEquipmentBonus, generateEquipmentDrop, setGameState])

  const searchBananas = useCallback(() => {
    if (gameState.isDead) return
    
    const baseFound = Math.floor(Math.random() * 5) + 1
    const luckBonus = Math.floor(gameState.skills.luck * 0.5)
    const finalFound = baseFound + luckBonus
    
    updateBananas(finalFound)
    updateScore(5)
    addExperience(10)
    
    // Combine messages
    let message = `You found ${finalFound} bananas!`
    
    // Chance to find extra items
    if (Math.random() < 0.1 + gameState.skills.luck * 0.02) {
      updatePotions(1)
      message += ` Bonus! Found a healing potion!`
    }
    
    addMessage(message)
  }, [gameState.skills.luck, updateBananas, updateScore, addExperience, addMessage, updatePotions])

  const dance = useCallback(() => {
    if (gameState.isDead) return
    
    const baseHeal = Math.floor(Math.random() * 15) + 5
    const healingBonus = gameState.skills.healing * 3
    const finalHeal = baseHeal + healingBonus
    
    updateHealth(finalHeal)
    updateScore(3)
    addExperience(8)
    
    // Update stats
    updateStats({ totalHealingDone: gameState.stats.totalHealingDone + finalHeal })
    
    let message = `You danced and healed ${finalHeal} health!`
    
    // Small chance to find a banana while dancing
    if (Math.random() < 0.2) {
      updateBananas(1)
      message += ` A chicken watched your dance and gave you a banana!`
    }
    
    addMessage(message)
  }, [gameState.skills.healing, updateHealth, updateScore, addExperience, addMessage, updateBananas, updateStats])

  const usePotion = useCallback(() => {
    if (gameState.isDead) return
    
    if (gameState.potions <= 0) {
      addMessage('No potions left!')
      return
    }
    
    const baseHeal = 30
    const healingBonus = gameState.skills.healing * 5
    const finalHeal = baseHeal + healingBonus
    
    updatePotions(-1)
    updateHealth(finalHeal)
    updateStats({ 
      potionsUsed: gameState.stats.potionsUsed + 1,
      totalHealingDone: gameState.stats.totalHealingDone + finalHeal 
    })
    addMessage(`You used a potion and healed ${finalHeal} health!`)
  }, [gameState.potions, gameState.skills.healing, updatePotions, updateHealth, addMessage, updateStats])

  const handleStartCombat = useCallback((enemyType: string) => {
    if (gameState.isDead) return
    
    startCombat(enemyType)
    setShowCombat(true)
  }, [startCombat, gameState.isDead])

  const handleCombatAction = useCallback((action: string, target?: string) => {
    switch (action) {
      case 'takeDamage':
        const damage = parseInt(target || '0')
        updateHealth(-damage)
        updateStats({ totalDamageTaken: gameState.stats.totalDamageTaken + damage })
        break
      case 'heal':
        const healAmount = parseInt(target || '0')
        updateHealth(healAmount)
        updateStats({ totalHealingDone: gameState.stats.totalHealingDone + healAmount })
        break
    }
  }, [updateHealth, updateStats])

  const handleEndCombat = useCallback(() => {
    if (gameState.currentEnemy) {
      // Grant rewards
      const enemy = gameState.currentEnemy
      addExperience(enemy.rewards.experience)
      updateGold(enemy.rewards.gold)
      updateScore(enemy.rewards.experience / 2)
      
      // Update stats
      updateStats({ battlesWon: gameState.stats.battlesWon + 1 })
      
      addMessage(`You defeated the ${enemy.name}! Gained ${enemy.rewards.experience} XP and ${enemy.rewards.gold} gold!`)
    }
    
    setShowCombat(false)
  }, [gameState.currentEnemy, addExperience, updateGold, updateScore, addMessage, updateStats])

  const handleSpecialAbility = useCallback((ability: string) => {
    // Update special abilities usage
    const newSpecialAbilities = { ...gameState.specialAbilities }
    if (newSpecialAbilities[ability as keyof typeof newSpecialAbilities] > 0) {
      newSpecialAbilities[ability as keyof typeof newSpecialAbilities] -= 1
    }
    
    addMessage(`Used ${ability}!`)
  }, [gameState.specialAbilities, addMessage])

  const handleResetGame = useCallback(() => {
    resetGame()
    setShowResetConfirm(false)
    addMessage('Game reset! Starting fresh adventure...')
  }, [resetGame, addMessage])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-yellow-300/30 to-orange-300/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-300/30 to-purple-300/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-pink-300/20 to-red-300/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 h-screen flex flex-col p-2 sm:p-3 overflow-hidden">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
          className="text-center mb-2 sm:mb-3 flex-shrink-0"
        >
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-2 flex items-center justify-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <Star className="w-8 h-8" />
            Chicken Quest
            <Star className="w-8 h-8" />
          </motion.h1>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base font-medium px-2">
            Epic adventures await your brave chicken!
          </p>
            </motion.div>

            {/* Game Stats */}
            <ClientOnly>
          <div className="mb-2 flex-shrink-0">
                <GameStats gameState={gameState} />
              </div>
            </ClientOnly>

        {/* Main Game Area - Single Page Layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-3 min-h-0 overflow-hidden">
          {/* Left Panel - Game Log & Quick Actions */}
          <div className="lg:col-span-1 flex flex-col space-y-2 sm:space-y-3 min-h-0">
                <ClientOnly>
              {/* Game Log */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card hover-lift p-3 flex-1 min-h-0"
              >
                    <GameLog messages={gameState.messages} />
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card hover-lift p-2 flex-shrink-0"
              >
                <div className="grid grid-cols-2 gap-1 text-xs mb-2">
                  <div className="status-badge status-healthy">
                    <Target className="w-3 h-3 inline mr-1" />
                    {gameState.stats.battlesWon}
                  </div>
                  <div className="status-badge status-info">
                    <Sword className="w-3 h-3 inline mr-1" />
                    {gameState.stats.totalDamageDealt}
                      </div>
                  <div className="status-badge status-warning">
                    <Heart className="w-3 h-3 inline mr-1" />
                    {gameState.stats.totalHealingDone}
                              </div>
                  <div className="status-badge status-success">
                    <Trophy className="w-3 h-3 inline mr-1" />
                    {gameState.score}
                  </div>
                </div>

                {/* Idle Stats */}
                <div className="border-t border-gray-600 pt-2">
                  <div className="text-xs text-gray-400 mb-1">Idle Rates (per min)</div>
                  <div className="grid grid-cols-3 gap-1 text-xs">
                    <div className="status-badge status-warning text-center">
                      <Banana className="w-3 h-3 inline mr-1" />
                      {gameState.idleMechanics.bananasPerMinute}
                    </div>
                    <div className="status-badge status-info text-center">
                      <Star className="w-3 h-3 inline mr-1" />
                      {gameState.idleMechanics.experiencePerMinute}
                    </div>
                    <div className="status-badge status-success text-center">
                      <Coins className="w-3 h-3 inline mr-1" />
                      {gameState.idleMechanics.goldPerMinute}
                    </div>
                  </div>
                </div>
              </motion.div>
                </ClientOnly>
              </div>

          {/* Center Panel - Chicken & Actions */}
          <div className="lg:col-span-1 flex flex-col space-y-2 sm:space-y-3 min-h-0">
            {/* Chicken Display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center flex-shrink-0"
            >
                  <ClientOnly>
                    <ChickenDisplay gameState={gameState} isFighting={isFighting} />
                  </ClientOnly>
            </motion.div>

            {/* Game Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex-1 min-h-0"
            >
                  <ClientOnly>
                    <GameActions
                      gameState={gameState}
                      onFight={fightChicken}
                      onSearch={searchBananas}
                      onDance={dance}
                      onUsePotion={usePotion}
                      onUpgradeSkill={upgradeSkill}
                      onStartCombat={handleStartCombat}
                      onSpecialAbility={handleSpecialAbility}
                    />
                  </ClientOnly>
            </motion.div>
                </div>

          {/* Right Panel - Skills & Achievements */}
          <div className="lg:col-span-1 flex flex-col space-y-2 sm:space-y-3 min-h-0">
                  <ClientOnly>
              {/* Skills Panel */}
                    <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card hover-lift p-3"
              >
                <h3 className="text-sm font-semibold mb-2 flex items-center text-gray-700">
                  <Star className="w-4 h-4 mr-2 text-purple-500" />
                        Skills
                      </h3>

                <div className="space-y-2 mb-3">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="text-center p-2 bg-red-50 rounded-lg border border-red-200">
                      <Sword className="w-4 h-4 mx-auto mb-1 text-red-600" />
                      <div className="font-semibold text-red-600">Strength</div>
                      <div className="text-gray-600">Lv. {gameState.skills.strength}</div>
                    </div>
                    <div className="text-center p-2 bg-blue-50 rounded-lg border border-blue-200">
                      <Target className="w-4 h-4 mx-auto mb-1 text-blue-600" />
                      <div className="font-semibold text-blue-600">Agility</div>
                      <div className="text-gray-600">Lv. {gameState.skills.agility}</div>
                        </div>
                    <div className="text-center p-2 bg-yellow-50 rounded-lg border border-yellow-200">
                      <Sparkles className="w-4 h-4 mx-auto mb-1 text-yellow-600" />
                      <div className="font-semibold text-yellow-600">Luck</div>
                      <div className="text-gray-600">Lv. {gameState.skills.luck}</div>
                        </div>
                    <div className="text-center p-2 bg-green-50 rounded-lg border border-green-200">
                      <Heart className="w-4 h-4 mx-auto mb-1 text-green-600" />
                      <div className="font-semibold text-green-600">Healing</div>
                      <div className="text-gray-600">Lv. {gameState.skills.healing}</div>
                        </div>
                        </div>
                      </div>

                {/* Skill Points */}
                {gameState.skillPoints > 0 && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                    className="mb-3"
                          >
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-2 rounded-lg font-bold text-xs mb-2 text-center animate-pulse">
                              <Sparkles className="w-3 h-3 mr-1 inline" />
                      {gameState.skillPoints} Skill Points!
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <motion.button
                                onClick={() => upgradeSkill('strength')}
                        className="btn-playful compact-button"
                                whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                              >
                        <Sword className="w-3 h-3 mr-1 inline" />
                        Strength
                              </motion.button>
                              <motion.button
                                onClick={() => upgradeSkill('agility')}
                        className="btn-playful compact-button"
                                whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                              >
                        <Target className="w-3 h-3 mr-1 inline" />
                        Agility
                              </motion.button>
                              <motion.button
                                onClick={() => upgradeSkill('luck')}
                        className="btn-playful compact-button"
                                whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                              >
                        <Sparkles className="w-3 h-3 mr-1 inline" />
                        Luck
                              </motion.button>
                              <motion.button
                                onClick={() => upgradeSkill('healing')}
                        className="btn-playful compact-button"
                                whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                              >
                        <Heart className="w-3 h-3 mr-1 inline" />
                        Healing
                              </motion.button>
                            </div>
                          </motion.div>
                )}
              </motion.div>

              {/* Achievements Panel */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card hover-lift p-3 flex-1 min-h-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold flex items-center text-gray-700">
                    <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
                    Achievements
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAchievements(true)}
                    className="text-xs text-blue-500 hover:text-blue-600 font-medium"
                  >
                    View All
                  </motion.button>
                </div>

                <div className="space-y-2">
                  {gameState.achievements.slice(0, 3).map((achievement) => (
                    <motion.div
                      key={achievement.id}
                      className={`p-2 rounded-lg border ${
                        achievement.completed
                          ? 'bg-yellow-50 border-yellow-200'
                          : 'bg-gray-50 border-gray-200'
                      } hover-lift`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-medium text-gray-800 text-xs">{achievement.name}</div>
                        <div className="text-sm">{achievement.completed ? <Trophy className="w-4 h-4 text-yellow-500" /> : <Star className="w-4 h-4 text-gray-400" />}</div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1 mb-1">
                        <div
                          className={`h-1 rounded-full transition-all duration-300 ${
                            achievement.completed ? 'bg-yellow-400' : 'bg-blue-400'
                          }`}
                          style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                        />
                          </div>
                      <div className="text-xs text-gray-600">
                        {achievement.progress}/{achievement.maxProgress}
                      </div>
                    </motion.div>
                  ))}
                  </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex space-x-1.5 flex-shrink-0"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCrafting(true)}
                  className="btn-playful flex-1 compact-button flex items-center justify-center"
                >
                  <Hammer className="w-3 h-3 mr-1" />
                  Crafting
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowEquipment(true)}
                  className="btn-playful flex-1 compact-button flex items-center justify-center"
                >
                  <Package className="w-3 h-3 mr-1" />
                  Equipment
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAchievements(true)}
                  className="btn-playful flex-1 compact-button flex items-center justify-center"
                >
                  <Trophy className="w-3 h-3 mr-1" />
                  Achievements
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowResetConfirm(true)}
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white flex-1 compact-button flex items-center justify-center"
                >
                  <RotateCcw className="w-3 h-3 mr-1" />
                  Reset
                </motion.button>
              </motion.div>
                </ClientOnly>
          </div>
        </div>
      </div>

      {/* Combat System Modal */}
      <AnimatePresence>
        {showCombat && gameState.currentEnemy && (
          <CombatSystem
            gameState={gameState}
            onCombatAction={handleCombatAction}
            onEndCombat={handleEndCombat}
          />
        )}
      </AnimatePresence>

      {/* Crafting System Modal */}
      <AnimatePresence>
        {showCrafting && (
          <CraftingSystem
            recipes={gameState.crafting.recipes}
            unlockedRecipes={gameState.crafting.unlockedRecipes}
            playerLevel={gameState.level}
            gold={gameState.gold}
            gems={gameState.gems}
            bananas={gameState.bananas}
            onCraft={craftRecipe}
            onClose={() => setShowCrafting(false)}
          />
        )}
      </AnimatePresence>

      {/* Equipment System Modal */}
      <AnimatePresence>
        {showEquipment && (
          <EquipmentSystem
            equipment={gameState.equipment}
            inventory={gameState.inventory}
            onEquip={equipItem}
            onUnequip={unequipItem}
            onClose={() => setShowEquipment(false)}
          />
        )}
      </AnimatePresence>

      {/* Achievement System Modal */}
      <AnimatePresence>
        {showAchievements && (
          <AchievementSystem
            gameState={gameState}
            onClose={() => setShowAchievements(false)}
          />
        )}
      </AnimatePresence>

      {/* Death/Game Over Modal */}
      <AnimatePresence>
        {gameState.isDead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl p-8 max-w-md mx-4 border border-red-500/30"
            >
              <div className="text-center">
                <div className="text-8xl mb-4 text-red-500">
                  <Skull className="w-20 h-20 mx-auto" />
                </div>
                <h2 className="text-3xl font-bold text-red-400 mb-2">Game Over</h2>
                <p className="text-gray-300 mb-6">Your brave chicken has fallen in battle!</p>
                
                <div className="space-y-3">
                  {!gameState.hasUsedRevive ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={revivePlayer}
                      className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg font-semibold transition-colors flex items-center justify-center"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Revive (50% Health)
                    </motion.button>
                  ) : (
                    <div className="w-full px-6 py-3 bg-gray-600 text-gray-400 rounded-lg font-semibold text-center cursor-not-allowed flex items-center justify-center">
                      <Skull className="w-4 h-4 mr-2" />
                      Revive Already Used
                    </div>
                  )}
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleResetGame}
                    className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-semibold transition-colors flex items-center justify-center"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Start Over
                  </motion.button>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-600">
                  <p className="text-sm text-gray-400">Final Stats:</p>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                    <div>Level: {gameState.level}</div>
                    <div>Score: {gameState.score}</div>
                    <div>Bananas: {gameState.bananas}</div>
                    <div>Gold: {gameState.gold}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Idle Earnings Modal */}
      <AnimatePresence>
        {showIdleModal && (
          <IdleEarningsModal
            idleEarnings={idleEarnings}
            onCollect={collectIdleEarnings}
            onClose={() => {}} // Can't close without collecting
          />
        )}
      </AnimatePresence>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowResetConfirm(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-800 rounded-xl p-6 max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4">Reset Game?</h3>
            <p className="text-gray-400 mb-6">This will permanently delete your progress. Are you sure?</p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleResetGame}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Reset
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
