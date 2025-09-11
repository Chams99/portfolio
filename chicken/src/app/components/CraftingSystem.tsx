'use client'

import { motion } from 'framer-motion'
import { Hammer, X, Coins, Gem, Banana, Award, Sword, Shield, Sparkles } from 'lucide-react'
import { CraftingRecipe } from '../hooks/useGameState'

interface CraftingSystemProps {
  recipes: CraftingRecipe[]
  unlockedRecipes: string[]
  playerLevel: number
  gold: number
  gems: number
  bananas: number
  onCraft: (recipeId: string) => void
  onClose: () => void
}

export const CraftingSystem = ({
  recipes,
  unlockedRecipes,
  playerLevel,
  gold,
  gems,
  bananas,
  onCraft,
  onClose
}: CraftingSystemProps) => {
  const canAffordRecipe = (recipe: CraftingRecipe): boolean => {
    if (recipe.requirements.level && playerLevel < recipe.requirements.level) return false
    if (recipe.requirements.gold && gold < recipe.requirements.gold) return false
    if (recipe.requirements.gems && gems < recipe.requirements.gems) return false
    if (recipe.requirements.bananas && bananas < recipe.requirements.bananas) return false
    return true
  }

  const formatStat = (stat: string, value: number) => {
    const statNames = {
      strength: 'Strength',
      agility: 'Agility',
      luck: 'Luck',
      healing: 'Healing',
      maxHealth: 'Max Health'
    }
    return `${statNames[stat as keyof typeof statNames] || stat}: +${value}`
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-400 bg-gray-50'
      case 'uncommon': return 'border-green-400 bg-green-50'
      case 'rare': return 'border-blue-400 bg-blue-50'
      case 'epic': return 'border-purple-400 bg-purple-50'
      case 'legendary': return 'border-yellow-400 bg-yellow-50'
      default: return 'border-gray-400 bg-gray-50'
    }
  }

  const getRarityTextColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600'
      case 'uncommon': return 'text-green-600'
      case 'rare': return 'text-blue-600'
      case 'epic': return 'text-purple-600'
      case 'legendary': return 'text-yellow-600'
      default: return 'text-gray-600'
    }
  }

  const unlockedRecipeList = recipes.filter(recipe => unlockedRecipes.includes(recipe.id))

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
        className="bg-gradient-to-br from-amber-900/95 to-orange-900/95 rounded-2xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Hammer className="w-6 h-6 mr-3 text-amber-400" />
            Crafting Workshop
          </h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </motion.button>
        </div>

        <div className="bg-amber-800/50 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Available Resources</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center">
              <Coins className="w-5 h-5 mr-2 text-yellow-400" />
              <span className="text-yellow-200">Gold: {gold}</span>
            </div>
            <div className="flex items-center">
              <Gem className="w-5 h-5 mr-2 text-purple-400" />
              <span className="text-purple-200">Gems: {gems}</span>
            </div>
            <div className="flex items-center">
              <Banana className="w-5 h-5 mr-2 text-yellow-400" />
              <span className="text-yellow-200">Bananas: {bananas}</span>
            </div>
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          {unlockedRecipeList.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4 text-orange-500">
                <Hammer className="w-8 h-8 mx-auto" />
              </div>
              <p className="text-gray-300">No crafting recipes unlocked yet!</p>
              <p className="text-gray-400 text-sm">Reach higher levels to unlock crafting recipes.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {unlockedRecipeList.map((recipe) => {
                const canAfford = canAffordRecipe(recipe)
                return (
                  <motion.div
                    key={recipe.id}
                    className={`p-4 rounded-lg border-2 ${getRarityColor(recipe.result.rarity)}`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">
                            {recipe.result.icon === 'Sword' ? <Sword className="w-6 h-6" /> :
                             recipe.result.icon === 'Shield' ? <Shield className="w-6 h-6" /> :
                             recipe.result.icon === 'Gem' ? <Gem className="w-6 h-6" /> :
                             <Sword className="w-6 h-6" />}
                          </span>
                        <div>
                          <div className={`font-semibold ${getRarityTextColor(recipe.result.rarity)}`}>
                            {recipe.name}
                          </div>
                          <div className="text-xs text-gray-400">Creates: {recipe.result.name}</div>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: canAfford ? 1.05 : 1 }}
                        whileTap={{ scale: canAfford ? 0.95 : 1 }}
                        onClick={() => canAfford && onCraft(recipe.id)}
                        disabled={!canAfford}
                        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                          canAfford
                            ? 'bg-amber-600 hover:bg-amber-700 text-white'
                            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        Craft
                      </motion.button>
                    </div>

                    <div className="mb-3">
                      <div className="text-sm text-gray-300 mb-2">
                        {Object.entries(recipe.result.stats).map(([stat, value]) =>
                          value ? <span key={stat}>{formatStat(stat, value)} </span> : null
                        )}
                      </div>
                      <div className="text-xs text-gray-400">{recipe.description}</div>
                    </div>

                    <div className="border-t border-gray-600 pt-3">
                      <div className="text-sm font-medium text-gray-300 mb-2">Requirements:</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {recipe.requirements.level && (
                          <div className={`flex items-center ${playerLevel >= recipe.requirements.level ? 'text-green-400' : 'text-red-400'}`}>
                            <Award className="w-3 h-3 mr-1" />Level {recipe.requirements.level}
                          </div>
                        )}
                        {recipe.requirements.gold && (
                          <div className={`flex items-center ${gold >= recipe.requirements.gold ? 'text-green-400' : 'text-red-400'}`}>
                            <Coins className="w-3 h-3 mr-1" />
                            {recipe.requirements.gold} Gold
                          </div>
                        )}
                        {recipe.requirements.gems && (
                          <div className={`flex items-center ${gems >= recipe.requirements.gems ? 'text-green-400' : 'text-red-400'}`}>
                            <Gem className="w-3 h-3 mr-1" />
                            {recipe.requirements.gems} Gems
                          </div>
                        )}
                        {recipe.requirements.bananas && (
                          <div className={`flex items-center ${bananas >= recipe.requirements.bananas ? 'text-green-400' : 'text-red-400'}`}>
                            <Banana className="w-3 h-3 mr-1" />
                            {recipe.requirements.bananas} Bananas
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
