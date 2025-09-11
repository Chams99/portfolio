import { useState, useEffect, useCallback } from 'react'

export interface LogMessage {
  text: string
  timestamp: number
}

export interface GameState {
  health: number
  maxHealth: number
  bananas: number
  potions: number
  score: number
  level: number
  experience: number
  experienceToNext: number
  skillPoints: number
  skills: {
    strength: number
    agility: number
    luck: number
    healing: number
  }
  messages: LogMessage[]
  gameStarted: boolean
  isDead: boolean
  hasUsedRevive: boolean
  lastSave: number
  
  // New Advanced Systems
  gold: number
  gems: number
  prestige: number
  totalPlayTime: number
  sessionStartTime: number
  
  // Combat System
  combatLevel: number
  currentEnemy: Enemy | null
  combatCooldown: number
  specialAbilities: {
    criticalStrike: number
    doubleAttack: number
    healingWave: number
  }
  
  // Progression Systems
  achievements: Achievement[]
  collections: Collection[]
  quests: Quest[]
  dailyChallenges: DailyChallenge[]
  
  // Events & Random Encounters
  activeEvents: GameEvent[]
  eventCooldowns: Record<string, number>
  
  // Advanced Stats
  stats: {
    totalDamageDealt: number
    totalDamageTaken: number
    totalHealingDone: number
    criticalHits: number
    battlesWon: number
    bananasCollected: number
    potionsUsed: number
    longestSession: number
    totalIdleTime: number
  }
  
  // Unlockables
  unlockedAreas: string[]
  unlockedAbilities: string[]
  unlockedEnemies: string[]
  
  // Settings & Preferences
  settings: {
    soundEnabled: boolean
    musicEnabled: boolean
    autoSave: boolean
    notifications: boolean
  }

  // Idle Mechanics
  idleMechanics: {
    bananasPerMinute: number
    experiencePerMinute: number
    goldPerMinute: number
    autoCombatEnabled: boolean
    autoCombatLevel: number
    lastActivityTime: number
    totalIdleTime: number
    maxIdleTime: number // Max 24 hours worth of progress
  }

  // Equipment System
  equipment: {
    weapon: Equipment | null
    armor: Equipment | null
    accessory: Equipment | null
  }
  inventory: Equipment[]

  // Crafting System
  crafting: {
    recipes: CraftingRecipe[]
    unlockedRecipes: string[]
  }
}

export interface Enemy {
  id: string
  name: string
  health: number
  maxHealth: number
  damage: number
  level: number
  type: 'normal' | 'elite' | 'boss'
  abilities: string[]
  rewards: {
    experience: number
    gold: number
    items: string[]
  }
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  progress: number
  maxProgress: number
  completed: boolean
  reward: {
    experience: number
    gold: number
    gems: number
  }
}

export interface Collection {
  id: string
  name: string
  description: string
  items: CollectionItem[]
  completed: boolean
  reward: {
    experience: number
    gold: number
    gems: number
  }
}

export interface CollectionItem {
  id: string
  name: string
  description: string
  icon: string
  collected: boolean
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

export interface Quest {
  id: string
  name: string
  description: string
  type: 'daily' | 'weekly' | 'achievement'
  progress: number
  maxProgress: number
  completed: boolean
  reward: {
    experience: number
    gold: number
    gems: number
  }
  expiresAt?: number
}

export interface DailyChallenge {
  id: string
  name: string
  description: string
  progress: number
  maxProgress: number
  completed: boolean
  reward: {
    experience: number
    gold: number
    gems: number
  }
  expiresAt: number
}

export interface GameEvent {
  id: string
  name: string
  description: string
  type: 'combat' | 'exploration' | 'collection' | 'special'
  duration: number
  startTime: number
  rewards: {
    experience: number
    gold: number
    items: string[]
  }
  requirements: {
    level?: number
    skills?: Partial<GameState['skills']>
  }
}

export interface Equipment {
  id: string
  name: string
  description: string
  type: 'weapon' | 'armor' | 'accessory'
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
  level: number
  stats: {
    strength?: number
    agility?: number
    luck?: number
    healing?: number
    maxHealth?: number
  }
  icon: string
  value: number
}

export interface CraftingRecipe {
  id: string
  name: string
  description: string
  result: Equipment
  requirements: {
    level?: number
    gold?: number
    gems?: number
    bananas?: number
    items?: { id: string; name: string; quantity: number }[]
  }
  unlockLevel: number
}

const INITIAL_STATE: GameState = {
  health: 100,
  maxHealth: 100,
  bananas: 0,
  potions: 2,
  score: 0,
  level: 1,
  experience: 0,
  experienceToNext: 100,
  skillPoints: 0,
  skills: {
    strength: 0,
    agility: 0,
    luck: 0,
    healing: 0,
  },
  messages: [],
  gameStarted: false,
  isDead: false,
  hasUsedRevive: false,
  lastSave: Date.now(),
  
  // New Advanced Systems
  gold: 0,
  gems: 0,
  prestige: 0,
  totalPlayTime: 0,
  sessionStartTime: Date.now(),
  
  // Combat System
  combatLevel: 1,
  currentEnemy: null,
  combatCooldown: 0,
  specialAbilities: {
    criticalStrike: 0,
    doubleAttack: 0,
    healingWave: 0,
  },
  
  // Progression Systems
  achievements: [
    {
      id: 'first_blood',
      name: 'First Blood',
      description: 'Win your first battle',
      icon: 'Sword',
      progress: 0,
      maxProgress: 1,
      completed: false,
      reward: { experience: 50, gold: 10, gems: 1 }
    },
    {
      id: 'banana_collector',
      name: 'Banana Collector',
      description: 'Collect 100 bananas',
      icon: 'Banana',
      progress: 0,
      maxProgress: 100,
      completed: false,
      reward: { experience: 100, gold: 25, gems: 2 }
    },
    {
      id: 'survivor',
      name: 'Survivor',
      description: 'Reach level 10',
      icon: 'Trophy',
      progress: 0,
      maxProgress: 10,
      completed: false,
      reward: { experience: 200, gold: 50, gems: 5 }
    },
    {
      id: 'potion_master',
      name: 'Potion Master',
      description: 'Use 25 potions',
      icon: 'FlaskConical',
      progress: 0,
      maxProgress: 25,
      completed: false,
      reward: { experience: 150, gold: 35, gems: 3 }
    },
    {
      id: 'dancer',
      name: 'Graceful Dancer',
      description: 'Dance 50 times',
      icon: 'Music',
      progress: 0,
      maxProgress: 50,
      completed: false,
      reward: { experience: 120, gold: 30, gems: 2 }
    },
    {
      id: 'damage_dealer',
      name: 'Damage Dealer',
      description: 'Deal 1000 total damage',
      icon: 'Zap',
      progress: 0,
      maxProgress: 1000,
      completed: false,
      reward: { experience: 300, gold: 75, gems: 7 }
    },
    {
      id: 'veteran',
      name: 'Veteran Fighter',
      description: 'Win 50 battles',
      icon: 'Shield',
      progress: 0,
      maxProgress: 50,
      completed: false,
      reward: { experience: 400, gold: 100, gems: 10 }
    }
  ],
  collections: [
    {
      id: 'chicken_eggs',
      name: 'Chicken Eggs',
      description: 'Collect all types of chicken eggs',
      items: [
        { id: 'normal_egg', name: 'Normal Egg', description: 'A regular chicken egg', icon: 'Egg', collected: false, rarity: 'common' },
        { id: 'golden_egg', name: 'Golden Egg', description: 'A rare golden egg', icon: 'Egg', collected: false, rarity: 'rare' },
        { id: 'crystal_egg', name: 'Crystal Egg', description: 'A magical crystal egg', icon: 'Egg', collected: false, rarity: 'epic' }
      ],
      completed: false,
      reward: { experience: 150, gold: 30, gems: 3 }
    }
  ],
  quests: [],
  dailyChallenges: [],
  
  // Events & Random Encounters
  activeEvents: [],
  eventCooldowns: {},
  
  // Advanced Stats
  stats: {
    totalDamageDealt: 0,
    totalDamageTaken: 0,
    totalHealingDone: 0,
    criticalHits: 0,
    battlesWon: 0,
    bananasCollected: 0,
    potionsUsed: 0,
    longestSession: 0,
    totalIdleTime: 0,
  },
  
  // Unlockables
  unlockedAreas: ['forest'],
  unlockedAbilities: ['basic_attack'],
  unlockedEnemies: ['chicken'],
  
  // Settings & Preferences
  settings: {
    soundEnabled: true,
    musicEnabled: true,
    autoSave: true,
    notifications: true,
  },

  // Idle Mechanics
  idleMechanics: {
    bananasPerMinute: 0,
    experiencePerMinute: 0,
    goldPerMinute: 0,
    autoCombatEnabled: false,
    autoCombatLevel: 1,
    lastActivityTime: Date.now(),
    totalIdleTime: 0,
    maxIdleTime: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  },

  // Equipment System
  equipment: {
    weapon: null,
    armor: null,
    accessory: null,
  },
  inventory: [
    {
      id: 'starter_sword',
      name: 'Wooden Sword',
      description: 'A basic wooden sword for beginners',
      type: 'weapon',
      rarity: 'common',
      level: 1,
      stats: { strength: 2 },
      icon: 'Sword',
      value: 10,
    },
    {
      id: 'starter_armor',
      name: 'Leather Armor',
      description: 'Simple leather protection',
      type: 'armor',
      rarity: 'common',
      level: 1,
      stats: { maxHealth: 10 },
      icon: 'Shield',
      value: 15,
    },
  ],

  // Crafting System
  crafting: {
    recipes: [
      {
        id: 'iron_sword',
        name: 'Iron Sword',
        description: 'A sturdy iron sword with good balance',
        result: {
          id: 'crafted_iron_sword',
          name: 'Iron Sword',
          description: 'Forged from iron ore',
          type: 'weapon',
          rarity: 'uncommon',
          level: 3,
          stats: { strength: 5 },
          icon: 'Sword',
          value: 50,
        },
        requirements: {
          level: 3,
          gold: 100,
          bananas: 10,
        },
        unlockLevel: 3,
      },
      {
        id: 'steel_armor',
        name: 'Steel Armor',
        description: 'Heavy but protective steel armor',
        result: {
          id: 'crafted_steel_armor',
          name: 'Steel Armor',
          description: 'Forged from steel ingots',
          type: 'armor',
          rarity: 'rare',
          level: 5,
          stats: { maxHealth: 30 },
          icon: 'Shield',
          value: 150,
        },
        requirements: {
          level: 5,
          gold: 300,
          gems: 5,
        },
        unlockLevel: 5,
      },
      {
        id: 'lucky_charm',
        name: 'Lucky Charm',
        description: 'A magical charm that brings good fortune',
        result: {
          id: 'crafted_lucky_charm',
          name: 'Lucky Charm',
          description: 'Blessed with magical luck',
          type: 'accessory',
          rarity: 'epic',
          level: 8,
          stats: { luck: 8 },
          icon: 'Gem',
          value: 400,
        },
        requirements: {
          level: 8,
          gold: 800,
          gems: 20,
          bananas: 50,
        },
        unlockLevel: 8,
      },
    ],
    unlockedRecipes: [],
  }
}

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE)
  const [isClient, setIsClient] = useState(false)
  const [idleEarnings, setIdleEarnings] = useState<{
    totalBananas: number
    totalExperience: number
    totalGold: number
    timeAway: number
  } | null>(null)
  const [showIdleModal, setShowIdleModal] = useState(false)

  // Load saved state after hydration
  useEffect(() => {
    setIsClient(true)
    const saved = localStorage.getItem('chicken-adventure-save')
    if (saved) {
      const parsed = JSON.parse(saved)
      // Merge with initial state to handle new properties
      const mergedState = { ...INITIAL_STATE, ...parsed }

      // Calculate idle earnings
      const timeAway = Date.now() - mergedState.idleMechanics.lastActivityTime
      if (timeAway > 0 && mergedState.idleMechanics.bananasPerMinute > 0) {
        const idleEarnings = calculateIdleEarnings(mergedState, timeAway)
        if (idleEarnings.totalBananas > 0 || idleEarnings.totalExperience > 0 || idleEarnings.totalGold > 0) {
          // Show idle earnings modal
          setIdleEarnings(idleEarnings)
          setShowIdleModal(true)
        }
      }

      setGameState(mergedState)
    }
  }, [])

  const addMessage = useCallback((text: string) => {
    setGameState(prev => ({
      ...prev,
      messages: [...prev.messages.slice(-6), { text, timestamp: Date.now() }] // Keep only last 6 messages to reduce lag
    }))
  }, [])

  const addExperience = useCallback((amount: number) => {
    setGameState(prev => {
      const newExp = prev.experience + amount
      let newLevel = prev.level
      let newExpToNext = prev.experienceToNext
      let newSkillPoints = prev.skillPoints

      // Level up logic
      if (newExp >= prev.experienceToNext) {
        newLevel++
        newExpToNext = Math.floor(prev.experienceToNext * 1.5)
        newSkillPoints += 2
        addMessage(`Level up! You're now level ${newLevel}!`)
        
        // Check for level-based achievements
        checkAchievements(prev, { level: newLevel })
      }

      return {
        ...prev,
        experience: newExp,
        level: newLevel,
        experienceToNext: newExpToNext,
        skillPoints: newSkillPoints,
      }
    })
  }, [addMessage])

  const updateHealth = useCallback((change: number) => {
    setGameState(prev => {
      const newHealth = Math.max(0, Math.min(prev.maxHealth, prev.health + change))
      const isDying = newHealth <= 0 && !prev.isDead
      
      if (isDying) {
        addMessage('You have been defeated! Your chicken has fallen in battle.')
      }
      
      return {
        ...prev,
        health: newHealth,
        isDead: newHealth <= 0,
        currentEnemy: newHealth <= 0 ? null : prev.currentEnemy // End combat on death
      }
    })
  }, [addMessage])

  const updateBananas = useCallback((change: number) => {
    setGameState(prev => {
      const newBananas = Math.max(0, prev.bananas + change)
      
      // Update stats
      const newStats = { ...prev.stats, bananasCollected: prev.stats.bananasCollected + Math.max(0, change) }
      
      // Check achievements
      checkAchievements(prev, { bananas: newBananas })
      
      return {
        ...prev,
        bananas: newBananas,
        stats: newStats
      }
    })
  }, [])

  const updatePotions = useCallback((change: number) => {
    setGameState(prev => {
      const newPotions = Math.max(0, prev.potions + change)
      const newStats = { ...prev.stats, potionsUsed: prev.stats.potionsUsed + Math.max(0, -change) }
      
      return {
        ...prev,
        potions: newPotions,
        stats: newStats
      }
    })
  }, [])

  const updateScore = useCallback((change: number) => {
    setGameState(prev => ({
      ...prev,
      score: prev.score + change
    }))
  }, [])

  const updateGold = useCallback((change: number) => {
    setGameState(prev => ({
      ...prev,
      gold: Math.max(0, prev.gold + change)
    }))
  }, [])

  const updateGems = useCallback((change: number) => {
    setGameState(prev => ({
      ...prev,
      gems: Math.max(0, prev.gems + change)
    }))
  }, [])

  const upgradeSkill = useCallback((skill: keyof GameState['skills']) => {
    setGameState(prev => {
      if (prev.skillPoints > 0) {
        const newSkills = { ...prev.skills, [skill]: prev.skills[skill] + 1 }
        const newMaxHealth = 100 + (newSkills.strength * 10)
        
        return {
          ...prev,
          skillPoints: prev.skillPoints - 1,
          skills: newSkills,
          maxHealth: newMaxHealth,
          health: Math.min(prev.health, newMaxHealth)
        }
      }
      return prev
    })
  }, [])

  const checkAchievements = useCallback((prevState: GameState, updates: Partial<GameState>) => {
    const newState = { ...prevState, ...updates }
    const newAchievements = [...prevState.achievements]
    
    newAchievements.forEach(achievement => {
      if (achievement.completed) return
      
      let progress = 0
      switch (achievement.id) {
        case 'first_blood':
          progress = newState.stats.battlesWon
          break
        case 'banana_collector':
          progress = newState.bananas
          break
        case 'survivor':
          progress = newState.level
          break
        case 'potion_master':
          progress = newState.stats.potionsUsed
          break
        case 'dancer':
          progress = newState.stats.totalHealingDone >= 500 ? Math.floor(newState.stats.totalHealingDone / 10) : 0 // Approximate dance count
          break
        case 'damage_dealer':
          progress = newState.stats.totalDamageDealt
          break
        case 'veteran':
          progress = newState.stats.battlesWon
          break
      }
      
      if (progress >= achievement.maxProgress && !achievement.completed) {
        achievement.completed = true
        achievement.progress = achievement.maxProgress
        
        // Grant rewards
        addExperience(achievement.reward.experience)
        updateGold(achievement.reward.gold)
        updateGems(achievement.reward.gems)
        addMessage(`Achievement unlocked: ${achievement.name}!`)
      } else {
        achievement.progress = progress
      }
    })
    
    setGameState(prev => ({
      ...prev,
      achievements: newAchievements
    }))
  }, [addExperience, updateGold, updateGems, addMessage])

  const checkSpecialAbilities = useCallback((prevState: GameState) => {
    const newSpecialAbilities = { ...prevState.specialAbilities }
    let abilitiesUnlocked = false
    
    // Unlock Critical Strike after 5 battles
    if (prevState.stats.battlesWon >= 5 && newSpecialAbilities.criticalStrike === 0) {
      newSpecialAbilities.criticalStrike = 3
      abilitiesUnlocked = true
      addMessage(`Unlocked Critical Strike ability!`)
    }
    
    // Unlock Double Attack at level 5
    if (prevState.level >= 5 && newSpecialAbilities.doubleAttack === 0) {
      newSpecialAbilities.doubleAttack = 2
      abilitiesUnlocked = true
      addMessage(`Unlocked Double Attack ability!`)
    }
    
    // Unlock Healing Wave after using 10 potions
    if (prevState.stats.potionsUsed >= 10 && newSpecialAbilities.healingWave === 0) {
      newSpecialAbilities.healingWave = 2
      abilitiesUnlocked = true
      addMessage(`Unlocked Healing Wave ability!`)
    }
    
    if (abilitiesUnlocked) {
      setGameState(prev => ({
        ...prev,
        specialAbilities: newSpecialAbilities
      }))
    }
  }, [addMessage])

  const updateStats = useCallback((updates: Partial<GameState['stats']>) => {
    setGameState(prev => ({
      ...prev,
      stats: { ...prev.stats, ...updates }
    }))
  }, [])

  const startCombat = useCallback((enemyType: string) => {
    const enemy = generateEnemy(enemyType, gameState.level)
    setGameState(prev => ({
      ...prev,
      currentEnemy: enemy,
      combatCooldown: 0
    }))
  }, [gameState.level])

  const generateEnemy = useCallback((type: string, playerLevel: number): Enemy => {
    const baseHealth = 50 + (playerLevel * 10)
    const baseDamage = 10 + (playerLevel * 2)
    
    switch (type) {
      case 'boss':
        return {
          id: 'boss_chicken',
          name: 'Chicken Boss',
          health: baseHealth * 3,
          maxHealth: baseHealth * 3,
          damage: baseDamage * 2,
          level: playerLevel,
          type: 'boss',
          abilities: ['heal', 'rage'],
          rewards: {
            experience: 100 + (playerLevel * 20),
            gold: 50 + (playerLevel * 10),
            items: ['rare_potion', 'golden_banana']
          }
        }
      case 'elite':
        return {
          id: 'elite_chicken',
          name: 'Elite Chicken',
          health: baseHealth * 2,
          maxHealth: baseHealth * 2,
          damage: Math.floor(baseDamage * 1.5),
          level: playerLevel,
          type: 'elite',
          abilities: ['dodge'],
          rewards: {
            experience: 50 + (playerLevel * 10),
            gold: 25 + (playerLevel * 5),
            items: ['potion']
          }
        }
      default:
        return {
          id: 'normal_chicken',
          name: 'Chicken',
          health: baseHealth,
          maxHealth: baseHealth,
          damage: baseDamage,
          level: playerLevel,
          type: 'normal',
          abilities: [],
          rewards: {
            experience: 20 + (playerLevel * 5),
            gold: 10 + (playerLevel * 2),
            items: ['banana']
          }
        }
    }
  }, [])

  const revivePlayer = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      health: Math.floor(prev.maxHealth * 0.5), // Revive with 50% health
      isDead: false,
      hasUsedRevive: true, // Mark revive as used
      currentEnemy: null // Clear any ongoing combat
    }))
    addMessage('✨ You have been revived! Your chicken rises again with renewed determination. (One-time revive used)')
  }, [addMessage])

  const resetGame = useCallback(() => {
    setGameState(INITIAL_STATE)
    if (isClient) {
      localStorage.removeItem('chicken-adventure-save')
    }
  }, [isClient])

  // Auto-save every 30 seconds (only on client)
  useEffect(() => {
    if (!isClient) return
    
    const interval = setInterval(() => {
      localStorage.setItem('chicken-adventure-save', JSON.stringify(gameState))
      setGameState(prev => ({ ...prev, lastSave: Date.now() }))
    }, 30000)

    return () => clearInterval(interval)
  }, [gameState, isClient])

  // Save on unmount (only on client)
  useEffect(() => {
    if (!isClient) return
    
    return () => {
      localStorage.setItem('chicken-adventure-save', JSON.stringify(gameState))
    }
  }, [gameState, isClient])

  // Check for special abilities and achievements periodically
  useEffect(() => {
    checkSpecialAbilities(gameState)
    checkAchievements(gameState, {})
  }, [gameState.stats.battlesWon, gameState.level, gameState.stats.potionsUsed, checkSpecialAbilities, checkAchievements])

  // Idle Mechanics Functions
  const calculateIdleEarnings = useCallback((state: GameState, timeAway: number): {
    totalBananas: number
    totalExperience: number
    totalGold: number
    timeAway: number
  } => {
    // Cap idle time at maximum (24 hours)
    const cappedTimeAway = Math.min(timeAway, state.idleMechanics.maxIdleTime)
    const minutesAway = cappedTimeAway / (1000 * 60)

    const totalBananas = Math.floor(state.idleMechanics.bananasPerMinute * minutesAway)
    const totalExperience = Math.floor(state.idleMechanics.experiencePerMinute * minutesAway)
    const totalGold = Math.floor(state.idleMechanics.goldPerMinute * minutesAway)

    return { totalBananas, totalExperience, totalGold, timeAway: cappedTimeAway }
  }, [])

  const updateIdleRates = useCallback(() => {
    setGameState(prev => {
      // Calculate idle rates based on skills and achievements
      const baseBananaRate = prev.skills.luck * 0.5 + prev.level * 0.2
      const baseExpRate = prev.level * 0.3 + prev.stats.battlesWon * 0.1
      const baseGoldRate = prev.stats.battlesWon * 0.05 + prev.gold * 0.001

      // Bonus multipliers
      const bananaMultiplier = prev.achievements.filter(a => a.completed).length * 0.1 + 1
      const expMultiplier = prev.skills.strength * 0.05 + 1
      const goldMultiplier = prev.prestige * 0.2 + 1

      return {
        ...prev,
        idleMechanics: {
          ...prev.idleMechanics,
          bananasPerMinute: Math.floor(baseBananaRate * bananaMultiplier),
          experiencePerMinute: Math.floor(baseExpRate * expMultiplier),
          goldPerMinute: Math.floor(baseGoldRate * goldMultiplier),
        }
      }
    })
  }, [])

  const toggleAutoCombat = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      idleMechanics: {
        ...prev.idleMechanics,
        autoCombatEnabled: !prev.idleMechanics.autoCombatEnabled
      }
    }))
  }, [])

  const collectIdleEarnings = useCallback(() => {
    if (!idleEarnings) return

    updateBananas(idleEarnings.totalBananas)
    addExperience(idleEarnings.totalExperience)
    updateGold(idleEarnings.totalGold)

    // Update idle stats
    updateStats({
      totalIdleTime: gameState.idleMechanics.totalIdleTime + idleEarnings.timeAway
    })

    addMessage(`While you were away: +${idleEarnings.totalBananas} bananas, +${idleEarnings.totalExperience} XP, +${idleEarnings.totalGold} gold`)

    setIdleEarnings(null)
    setShowIdleModal(false)

    // Update last activity time
    setGameState(prev => ({
      ...prev,
      idleMechanics: {
        ...prev.idleMechanics,
        lastActivityTime: Date.now()
      }
    }))
  }, [idleEarnings, updateBananas, addExperience, updateGold, updateStats, addMessage, gameState.idleMechanics.totalIdleTime])

  // Update idle rates when relevant stats change
  useEffect(() => {
    updateIdleRates()
  }, [gameState.level, gameState.skills, gameState.stats.battlesWon, gameState.achievements, updateIdleRates])

  // Update activity time periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        idleMechanics: {
          ...prev.idleMechanics,
          lastActivityTime: Date.now()
        }
      }))
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  // Equipment System Functions
  const equipItem = useCallback((equipmentId: string) => {
    setGameState(prev => {
      const itemIndex = prev.inventory.findIndex(item => item.id === equipmentId)
      if (itemIndex === -1) return prev

      const item = prev.inventory[itemIndex]
      const newInventory = [...prev.inventory]
      newInventory.splice(itemIndex, 1)

      // Unequip current item of same type if exists
      let unequippedItem = null
      if (prev.equipment[item.type]) {
        unequippedItem = prev.equipment[item.type]
        newInventory.push(prev.equipment[item.type]!)
      }

      const newEquipment = {
        ...prev.equipment,
        [item.type]: item
      }

      // Update max health if armor changed
      let newMaxHealth = prev.maxHealth
      if (item.type === 'armor' && item.stats.maxHealth) {
        newMaxHealth = 100 + (prev.skills.strength * 10) + (item.stats.maxHealth || 0)
        if (unequippedItem?.stats?.maxHealth) {
          newMaxHealth -= unequippedItem.stats.maxHealth
        }
      }

      addMessage(`⚔️ Equipped ${item.name}!`)

      return {
        ...prev,
        equipment: newEquipment,
        inventory: newInventory,
        maxHealth: newMaxHealth,
        health: Math.min(prev.health, newMaxHealth)
      }
    })
  }, [addMessage])

  const unequipItem = useCallback((equipmentType: keyof GameState['equipment']) => {
    setGameState(prev => {
      const item = prev.equipment[equipmentType]
      if (!item) return prev

      const newEquipment = {
        ...prev.equipment,
        [equipmentType]: null
      }

      const newInventory = [...prev.inventory, item]

      // Update max health if armor unequipped
      let newMaxHealth = prev.maxHealth
      if (equipmentType === 'armor' && item.stats.maxHealth) {
        newMaxHealth = 100 + (prev.skills.strength * 10)
      }

      addMessage(`📦 Unequipped ${item.name}`)

      return {
        ...prev,
        equipment: newEquipment,
        inventory: newInventory,
        maxHealth: newMaxHealth,
        health: Math.min(prev.health, newMaxHealth)
      }
    })
  }, [addMessage])

  const getEquipmentBonus = useCallback((stat: keyof Equipment['stats']) => {
    let total = 0
    Object.values(gameState.equipment).forEach(item => {
      if (item && item.stats[stat]) {
        total += item.stats[stat]!
      }
    })
    return total
  }, [gameState.equipment])

  // Generate random equipment drops
  const generateEquipmentDrop = useCallback((playerLevel: number): Equipment | null => {
    // 20% chance to drop equipment
    if (Math.random() > 0.2) return null

    const rarities: Equipment['rarity'][] = ['common', 'uncommon', 'rare', 'epic', 'legendary']
    const rarityWeights = [0.5, 0.3, 0.15, 0.04, 0.01]
    const types: Equipment['type'][] = ['weapon', 'armor', 'accessory']

    let random = Math.random()
    let rarityIndex = 0
    for (let i = 0; i < rarityWeights.length; i++) {
      random -= rarityWeights[i]
      if (random <= 0) {
        rarityIndex = i
        break
      }
    }

    const rarity = rarities[rarityIndex]
    const type = types[Math.floor(Math.random() * types.length)]
    const level = Math.max(1, playerLevel + Math.floor(Math.random() * 3) - 1)

    const baseStats = {
      strength: Math.floor(level * 1.5) + Math.floor(Math.random() * level),
      agility: Math.floor(level * 1.2) + Math.floor(Math.random() * level),
      luck: Math.floor(level * 1.3) + Math.floor(Math.random() * level),
      healing: Math.floor(level * 1.1) + Math.floor(Math.random() * level),
      maxHealth: Math.floor(level * 8) + Math.floor(Math.random() * level * 4)
    } as const

    const statMultipliers = {
      common: 1,
      uncommon: 1.5,
      rare: 2.5,
      epic: 4,
      legendary: 7
    } as const

    const multiplier = statMultipliers[rarity]

    // Determine which stat this equipment will have
    let statKey: keyof typeof baseStats
    if (type === 'weapon') {
      statKey = 'strength'
    } else if (type === 'armor') {
      statKey = 'maxHealth'
    } else {
      // For accessories, randomly choose from available stats
      const statKeys = Object.keys(baseStats) as (keyof typeof baseStats)[]
      statKey = statKeys[Math.floor(Math.random() * statKeys.length)]
    }

    const equipment: Equipment = {
      id: `${rarity}_${type}_${Date.now()}`,
      name: `${rarity.charAt(0).toUpperCase() + rarity.slice(1)} ${type}`,
      description: `A ${rarity} ${type} found in battle`,
      type,
      rarity,
      level,
      stats: {
        [statKey]: Math.floor(baseStats[statKey] * multiplier)
      },
      icon: type === 'weapon' ? 'Sword' : type === 'armor' ? 'Shield' : 'Gem',
      value: Math.floor(level * 10 * multiplier)
    }

    return equipment
  }, [])

  // Crafting System Functions
  const canCraftRecipe = useCallback((recipe: CraftingRecipe): boolean => {
    if (gameState.level < recipe.requirements.level!) return false
    if (recipe.requirements.gold && gameState.gold < recipe.requirements.gold) return false
    if (recipe.requirements.gems && gameState.gems < recipe.requirements.gems) return false
    if (recipe.requirements.bananas && gameState.bananas < recipe.requirements.bananas) return false

    // Check for required items
    if (recipe.requirements.items) {
      for (const item of recipe.requirements.items) {
        const inventoryItem = gameState.inventory.find(inv => inv.id === item.id)
        if (!inventoryItem) return false
      }
    }

    return true
  }, [gameState])

  const craftRecipe = useCallback((recipeId: string) => {
    const recipe = gameState.crafting.recipes.find(r => r.id === recipeId)
    if (!recipe || !canCraftRecipe(recipe)) return

    // Deduct resources
    if (recipe.requirements.gold) {
      setGameState(prev => ({ ...prev, gold: prev.gold - recipe.requirements.gold! }))
    }
    if (recipe.requirements.gems) {
      setGameState(prev => ({ ...prev, gems: prev.gems - recipe.requirements.gems! }))
    }
    if (recipe.requirements.bananas) {
      setGameState(prev => ({ ...prev, bananas: prev.bananas - recipe.requirements.bananas! }))
    }

    // Remove required items from inventory
    if (recipe.requirements.items) {
      for (const item of recipe.requirements.items) {
        // This is simplified - in a real game you'd remove specific quantities
        setGameState(prev => ({
          ...prev,
          inventory: prev.inventory.filter(inv => inv.id !== item.id)
        }))
      }
    }

    // Add crafted item to inventory
    setGameState(prev => ({
      ...prev,
      inventory: [...prev.inventory, recipe.result]
    }))

    addMessage(`🔨 Successfully crafted ${recipe.result.name}!`)
  }, [gameState.crafting.recipes, canCraftRecipe, addMessage, setGameState])

  const unlockRecipes = useCallback(() => {
    setGameState(prev => {
      const newUnlockedRecipes = prev.crafting.recipes
        .filter(recipe => recipe.unlockLevel <= prev.level && !prev.crafting.unlockedRecipes.includes(recipe.id))
        .map(recipe => recipe.id)

      if (newUnlockedRecipes.length > 0) {
        addMessage(`🔓 Unlocked ${newUnlockedRecipes.length} new crafting recipe(s)!`)
      }

      return {
        ...prev,
        crafting: {
          ...prev.crafting,
          unlockedRecipes: [...prev.crafting.unlockedRecipes, ...newUnlockedRecipes]
        }
      }
    })
  }, [addMessage])

  // Unlock recipes when level increases
  useEffect(() => {
    unlockRecipes()
  }, [gameState.level, unlockRecipes])

  return {
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
    updateIdleRates,
    // Equipment system
    equipItem,
    unequipItem,
    getEquipmentBonus,
    generateEquipmentDrop,
    // Crafting system
    canCraftRecipe,
    craftRecipe,
    unlockRecipes,
  }
} 